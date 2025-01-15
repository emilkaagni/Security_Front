import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addReview, addToWishlist, createAppointment, getAllChats, getReviewsByProduct, getSingleProduct, removeFromWishlist } from '../../apis/Api';
import ChatPopup from '../../components/chat/ChatPopup';
import './ProductPage.css';


const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [showChat, setShowChat] = useState(false);
    const [chatId, setChatId] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('10:00 AM');
    const [wishlistStatus, setWishlistStatus] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('Cash on arrival'); // Default payment method
    const [showAppointmentConfirmation, setShowAppointmentConfirmation] = useState(false);
    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState('');
    const [ratingSummary, setRatingSummary] = useState({
        averageRating: 0,
        totalReviews: 0,
        ratingBreakdown: [0, 0, 0, 0, 0], // Array to hold the number of ratings for each star (index 0: 5 stars, 1: 4 stars, etc.)
    });

    useEffect(() => {
        getSingleProduct(id).then((res) => {
            setProduct(res.data.product);
            fetchReviews(id);
            setReviews(res.data.product.reviews || []);
            fetchChats(res.data.product.createdBy._id);
            checkWishlistStatus(res.data.product._id);
        }).catch((error) => {
            console.error('Error fetching product:', error);
        });
    }, [id]);

    // const fetchReviews = async (productId) => {
    //     try {
    //         const res = await getReviewsByProduct(productId);
    //         setReviews(res.data.reviews);
    //     } catch (error) {
    //         console.error('Error fetching reviews:', error);
    //     }
    // };
    const fetchReviews = async (productId) => {
        try {
            const res = await getReviewsByProduct(productId);
            const reviews = res.data.reviews;
            // Sort reviews by date (newest first)
            reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setReviews(reviews);
            calculateRatingSummary(reviews); // Call the new function to update the summary
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const calculateRatingSummary = (reviews) => {
        const totalReviews = reviews.length;
        const ratingBreakdown = [0, 0, 0, 0, 0];
        let totalRating = 0;

        reviews.forEach(review => {
            totalRating += review.rating;
            ratingBreakdown[5 - review.rating] += 1;
        });

        const averageRating = totalReviews ? (totalRating / totalReviews).toFixed(1) : 0;

        setRatingSummary({
            averageRating,
            totalReviews,
            ratingBreakdown,
        });
    };

    const fetchChats = async (createdById) => {
        try {
            const res = await getAllChats();
            if (res.data.success) {
                const chat = res.data.chats.find(chat => chat.users.includes(localStorage.getItem('userId')) && chat.users.includes(createdById));
                if (chat) {
                    setChatId(chat._id);
                }
            }
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    };

    const checkWishlistStatus = async (productId) => {
        // Check if the product is in the wishlist
    };

    const handleBookAppointment = () => {
        setShowCalendar(true);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };


    const handleAddReview = async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user._id) {
            console.error('User not found. Please log in again.');
            return;
        }

        const reviewData = {
            productId: product._id,
            userId: user._id,
            rating: newRating,
            comment: newComment,
        };

        try {
            const res = await addReview(reviewData);

            if (res.status === 200 && res.data?.success) {
                console.log('Review added successfully');
                resetReviewForm(); // Reset the form
                fetchReviews(product._id); // Refresh reviews after adding a new one
            } else if (res.data?.error) {
                console.error('Failed to add review:', res.data.error);
            } else {
                console.error('Unexpected response structure:', res);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Error adding review:', error.response.data);
            } else {
                console.error('Error adding review:', error.message);
            }
        }
    };

    const resetReviewForm = () => {
        setNewRating(0);
        setNewComment('');
    };

    const handleAppointmentSubmit = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user._id : null; // Use user._id
        console.log("User ID:", userId); // Debugging log
        console.log("Product ID:", product._id);
        console.log("Date:", selectedDate);
        console.log("Time:", selectedTime);
        console.log("Payment Method:", paymentMethod);

        if (!userId) {
            toast.error('User not found. Please log in again.');
            return;
        }

        const appointmentData = {
            productId: product._id,
            userId,
            date: selectedDate,
            time: selectedTime,
            paymentMethod,
        };

        createAppointment(appointmentData)
            .then((response) => {
                if (response.data.success) {
                    setShowCalendar(false);
                    toast.success('Appointment booked successfully!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setShowAppointmentConfirmation(true); // Show confirmation popup
                } else {
                    toast.error('Failed to book appointment.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch((error) => {
                console.error('Error booking appointment:', error);
                toast.error('Error booking appointment.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    const handleAddToWishlist = async () => {
        try {
            await addToWishlist(product._id);
            setWishlistStatus(true);
            toast.success('Item added to wishlist!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error('Error adding item to wishlist:', error);
            toast.error('Failed to add item to wishlist.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleRemoveFromWishlist = async () => {
        try {
            await removeFromWishlist(product._id);
            setWishlistStatus(false);
            toast.info('Item removed from wishlist.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error('Error removing item from wishlist:', error);
            toast.error('Failed to remove item from wishlist.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }
    const averageRating = product.averageRating ? product.averageRating.toFixed(2) : 'N/A';

    return (
        <div className="productpage-container">
            <ToastContainer /> {/* Toast container for notifications */}
            <div className="productpage-header">
                <div className="productpage-image">
                    <img
                        src={`http://localhost:5500/products/${product.productImage}`}
                        alt={product.productName}
                    />
                </div>
                <div className="productpage-info">
                    <h1 className="productpage-name">{product.productName}</h1>
                    <h3 className="productpage-price">NPR. {product.productPrice}</h3>
                    <p className="productpage-description">{product.productDescription}</p>
                    <div className="productpage-buttons">
                        <button
                            onClick={() => setShowChat(true)}
                            className="productpage-btn chat-btn"
                        >
                            Chat
                        </button>
                        <button
                            onClick={handleBookAppointment}
                            className="productpage-btn appointment-btn"
                        >
                            Book an Appointment
                        </button>
                        <button
                            onClick={wishlistStatus ? handleRemoveFromWishlist : handleAddToWishlist}
                            className="productpage-btn wishlist-btn"
                        >
                            {wishlistStatus ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        </button>
                    </div>
                </div>
            </div>

            {/* <div className="productpage-reviews-container">
                <div className="review-form-section">
                    <h3>Write a Review</h3>
                    <div className="review-form">
                        <form onSubmit={handleAddReview}>
                            <label>
                                Rating:
                                <div className="rating">
                                    {[1, 2, 3, 4, 5].map(value => (
                                        <span
                                            key={value}
                                            className={`star ${value <= newRating ? 'filled' : ''}`}
                                            onClick={() => setNewRating(value)}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </label>
                            <label>
                                Comment:
                                <textarea
                                    className="comment-textarea"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Write your review here..."
                                />
                            </label>
                            <button type="submit">Submit Review</button>
                        </form>
                    </div>
                </div>

                <div className="review-summary">
                    <h3>Average Reviews</h3>
                    <div className="average-rating">
                        <span className="rating-stars">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={`star ${i < ratingSummary.averageRating ? 'filled' : ''}`}>★</span>
                            ))}
                        </span>
                        <span className="rating-number">{ratingSummary.averageRating} / 5</span>
                    </div>
                    <p>Rating based on {ratingSummary.totalReviews} reviews</p>
                    <div className="rating-breakdown">
                        {ratingSummary.ratingBreakdown.map((count, i) => (
                            <div key={i} className="rating-bar">
                                <span>{5 - i} stars</span>
                                <div className="progress">
                                    <div className="progress-bar" style={{ width: `${(count / ratingSummary.totalReviews) * 100}%` }}></div>
                                </div>
                                <span>{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div> */}

            <div className="productpage-reviews-container">
                <div className="review-form-section">
                    <h3>Write a Review</h3>
                    <div className="review-form">
                        <form onSubmit={handleAddReview}>
                            <label>
                                Rating:
                                <div className="rating">
                                    {[1, 2, 3, 4, 5].map(value => (
                                        <span
                                            key={value}
                                            className={`star ${value <= newRating ? 'filled' : ''}`}
                                            onClick={() => setNewRating(value)}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </label>
                            <label>
                                Comment:
                                <textarea
                                    className="comment-textarea"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Write your review here..."
                                />
                            </label>
                            <button type="submit">Submit Review</button>
                        </form>
                    </div>
                </div>

                <div className="review-summary-section">
                    <h3>Average Reviews</h3>
                    <div className="review-summary">
                        <div className="average-rating">
                            <span className="rating-stars">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`star ${i < ratingSummary.averageRating ? 'filled' : ''}`}>★</span>
                                ))}
                            </span>
                            <span className="rating-number">{ratingSummary.averageRating} / 5</span>
                        </div>
                        <p>Rating based on {ratingSummary.totalReviews} reviews</p>
                        <div className="rating-breakdown">
                            {ratingSummary.ratingBreakdown.map((count, i) => (
                                <div key={i} className="rating-bar">
                                    <span>{5 - i} stars</span>
                                    <div className="progress">
                                        <div className="progress-bar" style={{ width: `${(count / ratingSummary.totalReviews) * 100}%` }}></div>
                                    </div>
                                    <span>{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <h2>Customer Reviews</h2>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="review-item">
                        <div className="review-header">
                            <span className="reviewer-name">
                                {review.user ? `${review.user.fname} ${review.user.lname}` : 'Anonymous'}
                            </span>
                            <span className="review-date">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="star">
                            {[...Array(5)].map((star, i) => (
                                <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>★</span>
                            ))}
                        </div>
                        <p className="review-content">{review.comment}</p>
                    </div>
                ))
            ) : (
                <p>No reviews yet.</p>
            )}

            {showChat && <ChatPopup product={product} chatId={chatId} onClose={() => setShowChat(false)} />}

            {showCalendar && (
                <div className="calendar-popup">
                    <h3>Select a Date</h3>
                    <Calendar onChange={handleDateChange} value={selectedDate} />
                    <h3>Select a Time</h3>
                    <input type="time" value={selectedTime} onChange={handleTimeChange} />
                    <h3>Select Payment Method</h3>
                    <select value={paymentMethod} onChange={handlePaymentMethodChange}>
                        <option value="Cash on arrival">Cash on arrival</option>
                        <option value="Khalti Payment">Khalti Payment</option>
                    </select>
                    <button onClick={handleAppointmentSubmit} className="productpage-btn appointment-btn">Confirm</button>
                    <button onClick={() => setShowCalendar(false)} className='calendarcancel-btn'>Cancel</button>
                </div>
            )}

            {showAppointmentConfirmation && (
                <div className="appointment-confirmation-popup">
                    <div className="confirmation-content">
                        <h3>Appointment Booked</h3>
                        <p>Appointment Details:</p>
                        <p>Date: {selectedDate.toLocaleDateString()}</p>
                        <p>Time: {selectedTime}</p>
                        <p>Payment Status: <span style={{ color: 'red' }}>Pending</span></p>
                        <p>Please proceed to payment after your booking has been confirmed.</p>
                        <button onClick={() => setShowAppointmentConfirmation(false)} className="confirmation-close-btn">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductPage;


