// import React, { useState } from 'react';
// import { FaRegComments } from 'react-icons/fa'; // Import the message icon
// import { Link } from 'react-router-dom';
// import PostCard from './postCard/PostCard.Jsx'; // Make sure this import path is correct

// const Navbar = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false); // State to control the visibility of the modal
//     const user = JSON.parse(localStorage.getItem('user')); // Retrieve user data from local storage

//     // Function to handle user logout
//     const handleLogout = () => {
//         localStorage.clear(); // Clear the local storage
//         window.location.href = '/login'; // Redirect the user to the login page
//     };

//     return (
//         <>
//             <nav className="navbar navbar-expand-lg bg-body-tertiary w-100">
//                 <div className="container-fluid">
//                     <a className="navbar-brand" href="/">Maestro<span className='text-danger'>.</span></a>
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                             <li className="nav-item">
//                                 <Link className="btn btn-primary me-1" aria-current="page" to="my-bookings">My Bookings</Link>
//                             </li>
//                         </ul>
//                         <div className="d-flex">
//                             {user ? (
//                                 <div className="dropdown">
//                                     <Link to={'/chats'} className="btn btn-primary me-3" type="button"><FaRegComments /> Chat</Link>
//                                     <Link to={'/user/dashboard'} className="btn btn-primary me-3" type="submit">⊕ Post</Link>
//                                     {/* // Add a link to the wishlist */}
//                                     <Link to="/wishlist" className="btn btn-primary me-3">Wishlist</Link>
//                                     <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                         Welcome, {user.fname}
//                                     </button>
//                                     <ul className="dropdown-menu">
//                                         <li>
//                                             <Link className="dropdown-item" to={`/profile/${user._id}`}>Profile</Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item" to="/user/dashboard">Dashboard</Link> {/* Updated this line */}
//                                         </li>
//                                         <li>
//                                             <button onClick={handleLogout} className="dropdown-item">Logout</button>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             ) : (
//                                 <>
//                                     <Link to={'/login'} className="btn btn-primary" type="button">Login</Link>
//                                     <Link to={'/register'} className="btn btn-success ms-2" type="button">Register</Link>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </nav>
//             {isModalOpen && <PostCard isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
//         </>
//     );
// };

// export default Navbar;
import React, { useState } from 'react';
import { FaRegComments } from 'react-icons/fa'; // Import the message icon
import { Link } from 'react-router-dom';
import PostCard from './postCard/PostCard.Jsx'; // Make sure this import path is correct

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the visibility of the modal
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve user data from local storage
    const isAdmin = user?.isAdmin || false; // Check if the user is an admin

    // Function to handle user logout
    const handleLogout = () => {
        localStorage.clear(); // Clear the local storage
        window.location.href = '/login'; // Redirect the user to the login page
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary w-100">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Maestro<span className='text-danger'>.</span></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* Conditionally render admin-specific links */}
                            {isAdmin ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="btn btn-warning me-1" aria-current="page" to="/admin/dashboard">Product Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="btn btn-danger me-1" aria-current="page" to="/admin/manage-users">Manage Users</Link>
                                    </li>
                                </>
                            ) : (
                                user && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="btn btn-primary me-1" aria-current="page" to="my-bookings">My Bookings</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={'/user/dashboard'} className="btn btn-primary me-3" type="submit">⊕ Post</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/wishlist" className="btn btn-primary me-3">Wishlist</Link>
                                        </li>
                                    </>
                                )
                            )}
                        </ul>
                        <div className="d-flex">
                            {user ? (
                                <div className="dropdown">
                                    <Link to={'/chats'} className="btn btn-primary me-3" type="button"><FaRegComments /> Chat</Link>
                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Welcome, {user.fname}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item" to={`/profile/${user._id}`}>Profile</Link>
                                        </li>
                                        <li>
                                            <button onClick={handleLogout} className="dropdown-item">Logout</button>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <>
                                    <Link to={'/login'} className="btn btn-primary" type="button">Login</Link>
                                    <Link to={'/register'} className="btn btn-success ms-2" type="button">Register</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            {isModalOpen && <PostCard isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

export default Navbar;