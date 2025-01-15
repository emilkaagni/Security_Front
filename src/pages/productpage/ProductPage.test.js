// import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import ProductPage from './ProductPage';
// import '@testing-library/jest-dom'; 

// test('renders ProductPage component without crashing', () => {
//   render(
//     <BrowserRouter>
//       <ProductPage />
//     </BrowserRouter>
//   );

//   // Check if the component renders the loading state initially
//   expect(screen.getByText(/loading/i)).toBeInTheDocument();
// });


import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { addToWishlist, getReviewsByProduct, getSingleProduct, removeFromWishlist } from '../../apis/Api';
import ProductPage from './ProductPage';

jest.mock('../../apis/Api');

// Define mock product data
const mockProduct = {
    _id: '1',
    productName: 'Test Product',
    productPrice: 100,
    productDescription: 'This is a test product',
    productImage: 'test-product.jpg',
    reviews: [],
    createdBy: { _id: '123' },
};

// Define mock functions
beforeEach(() => {
    // Mock the API calls
    getSingleProduct.mockResolvedValue({ data: { product: mockProduct } });
    addToWishlist.mockResolvedValue({ success: true });
    removeFromWishlist.mockResolvedValue({ success: true });
    getReviewsByProduct.mockResolvedValue({ data: { reviews: [] } });
});

describe('ProductPage Component Tests', () => {
    it('renders product details correctly after loading', async () => {
        render(
            <BrowserRouter>
                <ProductPage />
            </BrowserRouter>
        );

        // Wait for the product data to load and check if the details are displayed
        await waitFor(() => {
            expect(screen.getByText('Test Product')).toBeInTheDocument();
            expect(screen.getByText('NPR. 100')).toBeInTheDocument();
            expect(screen.getByText('This is a test product')).toBeInTheDocument();
        });
    });

    it('shows calendar when "Book an Appointment" button is clicked', async () => {
        render(
            <BrowserRouter>
                <ProductPage />
            </BrowserRouter>
        );

        // Wait for the product to load
        await waitFor(() => screen.getByText('Test Product'));

        // Simulate clicking the "Book an Appointment" button
        fireEvent.click(screen.getByText(/book an appointment/i));

        // Check if the calendar is displayed
        expect(screen.getByText(/select a date/i)).toBeInTheDocument();
    });

    it('adds and removes item from wishlist', async () => {
        render(
            <BrowserRouter>
                <ProductPage />
            </BrowserRouter>
        );

        // Wait for the product to load
        await waitFor(() => screen.getByText('Test Product'));

        // Simulate clicking the "Add to Wishlist" button
        fireEvent.click(screen.getByText(/add to wishlist/i));

        // Check if the button text changes to "Remove from Wishlist"
        await waitFor(() => {
            expect(screen.getByText(/remove from wishlist/i)).toBeInTheDocument();
        });

        // Simulate clicking the "Remove from Wishlist" button
        fireEvent.click(screen.getByText(/remove from wishlist/i));

        // Check if the button text changes back to "Add to Wishlist"
        await waitFor(() => {
            expect(screen.getByText(/add to wishlist/i)).toBeInTheDocument();
        });
    });

    it('displays reviews correctly', async () => {
        const mockReviews = [
            { rating: 5, comment: 'Great product!', user: { fname: 'John', lname: 'Doe' }, createdAt: '2023-01-01T00:00:00.000Z' },
            { rating: 4, comment: 'Good value for money.', user: { fname: 'Jane', lname: 'Smith' }, createdAt: '2023-01-02T00:00:00.000Z' },
        ];

        getReviewsByProduct.mockResolvedValue({ data: { reviews: mockReviews } });

        render(
            <BrowserRouter>
                <ProductPage />
            </BrowserRouter>
        );

        // Wait for the product and reviews to load
        await waitFor(() => screen.getByText('Test Product'));

        // Check if the reviews are displayed correctly
        expect(screen.getByText('Great product!')).toBeInTheDocument();
        expect(screen.getByText('Good value for money.')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
});


