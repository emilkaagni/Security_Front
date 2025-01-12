// import axios from 'axios';

// // Creating backend config
// const Api = axios.create({
//     baseURL: "http://localhost:5500",
//     withCredentials: true,
//     headers: {
//         "Content-Type": "multipart/form-data",
//     }
// });

// // Config function for token
// const config = () => {
//     const token = localStorage.getItem('token');
//     console.log("Token:", token); // Debugging log
//     return {
//         headers: {
//             'authorization': `Bearer ${token}`
//         }
//     };
// };
// const configMultipart = () => {
//     const token = localStorage.getItem('token');
//     return {
//         headers: {
//             'Content-Type': 'multipart/form-data',
//             'authorization': `Bearer ${token}`
//         }
//     };
// };

// // Test API
// export const testApi = () => Api.get('/test');

// // Register API
// export const registerUserApi = (data) => Api.post('/api/user/create', data);

// // Login API
// export const loginUserApi = (data) => Api.post('/api/user/login', data);

// // Create product API
// export const createProductApi = (data) => Api.post('/api/product/create', data, config());

// // Get all products API
// export const getAllProducts = () => Api.get('/api/product/get_all_products');

// // Get all products with auth API
// export const getAllProductsAuth = () => Api.get('/api/product/get_all_products_auth', config());

// // Get single product API
// export const getSingleProduct = (id) => Api.get(`/api/product/get_single_product/${id}`, config());

// // Delete product API
// export const deleteProduct = (id) => Api.delete(`/api/product/delete_product/${id}`, config());

// // Update product API
// export const updateProduct = (id, data) => Api.put(`/api/product/update_product/${id}`, data, config());

// // Forgot password API
// export const forgotPasswordApi = (data) => Api.post('/api/user/forgot_password', data);

// // Verify OTP API
// export const verifyOtpApi = (data) => Api.post('/api/user/verify_otp', data);

// // Chat APIs
// export const getAllChats = () => Api.get('/api/chat/get_all_chats', config());
// export const sendMessage = (chatId, message) => Api.post(`/api/chat/send_message/${chatId}`, message, config());
// export const getMessages = (chatId) => Api.get(`/api/chat/get_messages/${chatId}`, config());

// // User APIs
// export const getUserProfile = (userId) => Api.get(`/api/user/${userId}`, config());
// export const updateUserProfile = (userId, data) => Api.put(`/api/user/${userId}`, data, config());
// // export const uploadProfilePicture = (formData) => Api.post('/api/user/uploadProfilePicture', formData, config());
// export const uploadProfilePicture = (data) => Api.post('/api/user/upload_profile_picture', data, configMultipart());

// // wishlist
// export const getUserWishlist = (data) => Api.get('/api/wishlist/all', config());
// export const addToWishlist = (productId) => { return Api.post('/api/wishlist/add', { productId }, config()); };
// export const removeFromWishlist = (productId) => { return Api.delete(`/api/wishlist/remove/${productId}`, config()); };

// // Appointment
// export const createAppointment = (data) => Api.post('/api/appointments/create', data, config());
// // Get all appointments for the user who posted the product
// export const getAllAppointmentsForUser = () => Api.get('/api/appointments/all_appointments', config());
// // Update appointment status by the user who posted the product
// export const updateAppointmentStatus = async ({ appointmentId, status }) => {
//     const token = localStorage.getItem('token');
//     return await Api.put('/api/appointments/status',
//         { appointmentId, status },
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );
// };
// // Get the logged-in user's appointments
// export const getUserAppointments = () => Api.get('/api/appointments/myappointments', config());
// // Update payment method for an appointment
// export const updatePaymentMethod = (appointmentId, paymentMethod) =>
//     Api.put(`/api/appointments/payment`, { appointmentId, paymentMethod }, config());

// // // Add review API
// // export const addReview = (productId, reviewData) => Api.post(`/api/review/add_review/${productId}`, reviewData, config());

// // Add review API
// // export const addReview = (productId, data) => Api.post(`/api/review/add_review/${productId}`, data, config());

import axios from "axios";

// Backend configuration
const Api = axios.create({
  baseURL: "http://localhost:5500",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Config function for token
const getTokenConfig = (isMultipart = false) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      authorization: `Bearer ${token}`,
      ...(isMultipart && { "Content-Type": "multipart/form-data" }),
    },
  };
};

// Test API
export const testApi = () => Api.get("/test");

// User APIs
export const registerUserApi = (data) => Api.post("/api/user/create", data);
export const loginUserApi = (data) => Api.post("/api/user/login", data);
export const getUserProfile = (userId) =>
  Api.get(`/api/user/${userId}`, getTokenConfig());
export const updateUserProfile = (userId, data) =>
  Api.put(`/api/user/${userId}`, data, getTokenConfig());
export const uploadProfilePicture = (data) =>
  Api.post("/api/user/upload_profile_picture", data, getTokenConfig(true));
export const getAllUsers = () =>
  Api.get("/api/admin/get_all_users", getTokenConfig());
export const deleteUser = (userId) =>
  Api.delete(`/api/admin/delete_user/${userId}`, getTokenConfig());

// Product APIs
export const createProductApi = (data) =>
  Api.post("/api/product/create", data, getTokenConfig());
export const getAllProducts = () => Api.get("/api/product/get_all_products");
export const getAllProductsAuth = () =>
  Api.get("/api/product/get_all_products_auth", getTokenConfig());
export const getSingleProduct = (id) =>
  Api.get(`/api/product/get_single_product/${id}`, getTokenConfig());
export const deleteProduct = (id) =>
  Api.delete(`/api/product/Ndelete_product/${id}`, getTokenConfig());
export const updateProduct = (id, data) =>
  Api.put(`/api/product/update_product/${id}`, data, getTokenConfig());

// Password Recovery APIs
export const forgotPasswordApi = (data) =>
  Api.post("/api/user/forgot_password", data);
export const verifyOtpApi = (data) => Api.post("/api/user/verify_otp", data);

// Chat APIs
export const getAllChats = () =>
  Api.get("/api/chat/get_all_chats", getTokenConfig());
export const sendMessage = (chatId, message) =>
  Api.post(`/api/chat/send_message/${chatId}`, message, getTokenConfig());
export const getMessages = (chatId) =>
  Api.get(`/api/chat/get_messages/${chatId}`, getTokenConfig());

// Wishlist APIs
export const getUserWishlist = () =>
  Api.get("/api/wishlist/all", getTokenConfig());
export const addToWishlist = (productId) =>
  Api.post("/api/wishlist/add", { productId }, getTokenConfig());
export const removeFromWishlist = (productId) =>
  Api.delete(`/api/wishlist/remove/${productId}`, getTokenConfig());

// Appointment APIs
export const createAppointment = (data) =>
  Api.post("/api/appointments/create", data, getTokenConfig());
export const getAllAppointmentsForUser = () =>
  Api.get("/api/appointments/all_appointments", getTokenConfig());
export const updateAppointmentStatus = ({ appointmentId, status }) =>
  Api.put(
    "/api/appointments/status",
    { appointmentId, status },
    getTokenConfig()
  );
export const getUserAppointments = () =>
  Api.get("/api/appointments/myappointments", getTokenConfig());
export const updatePaymentMethod = (appointmentId, paymentMethod) =>
  Api.put(
    `/api/appointments/payment`,
    { appointmentId, paymentMethod },
    getTokenConfig()
  );
export const deleteAppointment = (appointmentId) =>
  Api.delete(`/api/appointments/delete/${appointmentId}`, getTokenConfig());

// Review Apis
export const getReviewsByProduct = (productId) =>
  Api.get(`/api/rating/product/${productId}`);
export const addReview = (data) =>
  Api.post("/api/rating/add", data, getTokenConfig());
