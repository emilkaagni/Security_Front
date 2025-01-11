// import {
//   Route,
//   BrowserRouter as Router,
//   Routes
// } from "react-router-dom";
// import './App.css';
// import Navbar from './components/Navbar';
// import Homepage from './pages/homepage/Homepage';
// import Login from './pages/login/Login';
// import Register from './pages/register/Register';

// // Toast Config
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import MainComponent from "./components/searchBar/SearchCompponent";
// import AdminDashboard from './pages/admin/admin_dashboard/AdminDashboard';
// import UpdateProduct from './pages/admin/update_product/UpdateProduct';
// import ForgotPassword from './pages/forgot_password/ForgotPassword';
// import ProductPage from "./pages/productpage/ProductPage";
// import Profile from './pages/profile/ProfilePage';
// import UserDashboard from "./pages/user/UserDashboard";
// import AdminRoutes from './protected_routes/AdminRoutes';
// import UserRoutes from './protected_routes/UserRoutes';
// import Chat from "./pages/chat/Chat";

// // Task create for login and register
// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <ToastContainer />
//       <Routes>
//         <Route path='/' element={<Homepage />} />
//         <Route path='/register' element={<Register />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/search' element={<MainComponent />} />
//         {/* Product route */}
//         <Route path='/product/:id' element={<ProductPage />} />





//         {/* Admin routes */}
//         <Route element={<AdminRoutes />}>
//           <Route path='/admin/dashboard' element={<AdminDashboard />} />
//           <Route path='/admin/update/:id' element={<UpdateProduct />} />
//         </Route>



//         {/* User Routes */}
//         <Route element={<UserRoutes />}>

//           {/* <Route path='/profile/:userId' element={<Profile />} /> */}
//           <Route path='/profile/:userId' element={<Profile />} />
//           <Route path='/user/dashboard' element={<UserDashboard />} />


//         </Route>

//         <Route path='/forgot_password' element={<ForgotPassword />} />

//         {/* Chat Routes */}
//         <Route path="/chat/:id" element={Chat} />

//         {/* <Route path="/chats" element={<ChatPage />} />  */}

//         {/* <Route path="/chats" element={<ChatPage />} /> */}

//       </Routes>
//     </Router>
//   );
// }

// export default App;



import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Homepage from './pages/homepage/Homepage';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

// Toast Config
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainComponent from "./components/searchBar/SearchCompponent";
import AdminDashboard from './pages/admin/admin_dashboard/AdminDashboard';
import ManageUsersPage from "./pages/admin/manage_users/manageUsersPage";
import UpdateProduct from './pages/admin/update_product/UpdateProduct';
import AppointmentManagementPage from "./pages/appointment_mangement/appointmentManagementPage";
import MyBookings from "./pages/appointment_mangement/my_booking/myBookingsPage";
import ChatPage from "./pages/chat/ChatPage";
import ForgotPassword from './pages/forgot_password/ForgotPassword';
import ProductPage from "./pages/productpage/ProductPage";
import Profile from './pages/profile/ProfilePage';
import UserDashboard from "./pages/user/UserDashboard";
import WishlistPage from "./pages/wishlist/wishlistPage";
import AdminRoutes from './protected_routes/AdminRoutes';
import UserRoutes from './protected_routes/UserRoutes';
// Task create for login and register
function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/search' element={<MainComponent />} />
        {/* Product route */}
        <Route path='/product/:id' element={<ProductPage />} />

        {/* Admin routes */}
        <Route element={<AdminRoutes />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/update/:id' element={<UpdateProduct />} />
          <Route path='/admin/manage-users' element={<ManageUsersPage />} />
        </Route>

        {/* User Routes */}
        <Route element={<UserRoutes />}>
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/user/dashboard' element={<UserDashboard />} />
          <Route path='/appointment' element={< AppointmentManagementPage />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Route>

        <Route path='/forgot_password' element={<ForgotPassword />} />

        <Route path="/wishlist" element={<WishlistPage />} />

        {/* Chat Routes */}
        <Route path="/chat/:id" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;