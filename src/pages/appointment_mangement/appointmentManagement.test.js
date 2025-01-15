import '@testing-library/jest-dom'; // For matcher like toBeInTheDocument
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    deleteAppointment,
    getAllAppointmentsForUser,
    updateAppointmentStatus,
} from '../../apis/Api';
import AppointmentManagementPage from './appointmentManagementPage';

jest.mock('../../apis/Api');
jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

const mockAppointments = [
    {
        _id: '1',
        productId: { productName: 'Test Product' },
        userId: { fname: 'John', lname: 'Doe' },
        date: '2024-08-13T00:00:00.000Z',
        time: '10:00 AM',
        status: 'Pending',
        paymentMethod: 'Cash on arrival',
    },
    {
        _id: '2',
        productId: { productName: 'Another Product' },
        userId: { fname: 'Jane', lname: 'Smith' },
        date: '2024-08-14T00:00:00.000Z',
        time: '11:00 AM',
        status: 'Confirmed',
        paymentMethod: 'Khalti Payment',
    },
];

beforeEach(() => {
    getAllAppointmentsForUser.mockResolvedValue({ data: { success: true, data: mockAppointments } });
    updateAppointmentStatus.mockResolvedValue({ data: { success: true, appointment: { status: 'Confirmed' } } });
    deleteAppointment.mockResolvedValue({ data: { success: true } });
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('AppointmentManagementPage Component', () => {
    test('renders loading state initially', () => {
        render(
            <BrowserRouter>
                <AppointmentManagementPage />
            </BrowserRouter>
        );
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test('renders appointments after loading', async () => {
        render(
            <BrowserRouter>
                <AppointmentManagementPage />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Test Product')).toBeInTheDocument();
            expect(screen.getByText('Another Product')).toBeInTheDocument();
        });
    });

    test('handles error state', async () => {
        getAllAppointmentsForUser.mockRejectedValue(new Error('Failed to fetch appointments'));

        render(
            <BrowserRouter>
                <AppointmentManagementPage />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/error fetching appointments/i)).toBeInTheDocument();
        });
    });

    test('renders no appointments found when list is empty', async () => {
        getAllAppointmentsForUser.mockResolvedValue({ data: { success: true, data: [] } });

        render(
            <BrowserRouter>
                <AppointmentManagementPage />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/no appointments found/i)).toBeInTheDocument();
        });
    });

    test('updates appointment status', async () => {
        render(
            <BrowserRouter>
                <AppointmentManagementPage />
            </BrowserRouter>
        );

        await waitFor(() => screen.getByText('Test Product'));

        const confirmButton = screen.getAllByText(/confirm/i)[0];
        fireEvent.click(confirmButton);

        await waitFor(() => {
            expect(updateAppointmentStatus).toHaveBeenCalledWith({ appointmentId: '1', status: 'Confirmed' });
            expect(toast.success).toHaveBeenCalledWith('Appointment status updated successfully');
        });
    });

    test('deletes an appointment', async () => {
        window.confirm = jest.fn().mockImplementation(() => true);  // Mock confirm dialog

        render(
            <BrowserRouter>
                <AppointmentManagementPage />
            </BrowserRouter>
        );

        await waitFor(() => screen.getByText('Test Product'));

        const deleteButton = screen.getAllByText('🗑️')[0];
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(deleteAppointment).toHaveBeenCalledWith('1');
            expect(toast.success).toHaveBeenCalledWith('Appointment deleted successfully!', expect.anything());
        });
    });
});