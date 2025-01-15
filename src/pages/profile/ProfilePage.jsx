// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getUserProfile, updateUserProfile, uploadProfilePicture } from '../../apis/Api';
// import './ProfilePage.css';

// const ProfilePage = () => {
//     const { userId } = useParams();
//     const [activeTab, setActiveTab] = useState('profile');
//     const [user, setUser] = useState(null);
//     const [formData, setFormData] = useState({
//         fname: '',
//         lname: '',
//         email: '',
//         phone: '',
//         username: '',
//         isAdmin: false,
//         profileImage: null
//     });


//     useEffect(() => {
//         getUserProfile(userId).then((res) => {
//             if (res.data.success) {
//                 setUser(res.data.user);
//                 setFormData({
//                     fname: res.data.user.fname,
//                     lname: res.data.user.lname,
//                     email: res.data.user.email,
//                     phone: res.data.user.phone,
//                     username: res.data.user.username,
//                     isAdmin: res.data.user.isAdmin,
//                     profileImage: res.data.user.profileImage
//                 });
//             } else {
//                 console.error('Error fetching user profile:', res.data.message);
//             }
//         }).catch((error) => {
//             console.error('Error fetching user profile:', error);
//         });
//     }, [userId]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         console.log(formData);
//         updateUserProfile(userId, formData).then((res) => {
//             if (res.data.success) {
//                 setUser(res.data.user);
//                 setActiveTab('profile');
//             } else {
//                 console.error('Error updating user profile:', res.data.message);
//             }
//         }).catch((error) => {
//             console.error('Error updating user profile:', error);
//         });
//     };

//     const handleProfilePictureChange = (e) => {
//         const file = e.target.files[0];
//         const formData = new FormData();
//         formData.append('profileImage', file);

//         uploadProfilePicture(formData).then((res) => {
//             if (res.data.success) {
//                 setFormData({ ...formData, profileImage: res.data.profileImage });
//             } else {
//                 console.error('Error uploading profile picture:', res.data.message);
//             }
//         }).catch((error) => {
//             console.error('Error uploading profile picture:', error);
//         });
//     };

//     if (!user) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="profile-container">
//             <div className="profile-tabs">
//                 <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>Profile</button>
//                 <button className={activeTab === 'editProfile' ? 'active' : ''} onClick={() => setActiveTab('editProfile')}>Edit Profile</button>
//                 <button className={activeTab === 'resetPassword' ? 'active' : ''} onClick={() => setActiveTab('resetPassword')}>Reset Password</button>
//             </div>

//             {activeTab === 'profile' && (
//                 <div className="profile-content">
//                     <div className="profile-picture">
//                         <img src={`http://localhost:5500/${user.profileImage || 'uploads/profile_pictures/default.png'}`} alt={user.fname} />
//                     </div>
//                     <div className="profile-details">
//                         <p><strong>Name:</strong> {user.fname} {user.lname}</p>
//                         <p><strong>Email:</strong> {user.email}</p>
//                         <p><strong>Phone:</strong> {user.phone}</p>
//                         <p><strong>Username:</strong> {user.username}</p>
//                         <p><strong>Role:</strong> {user.isAdmin ? 'Admin' : 'User'}</p>
//                     </div>
//                 </div>
//             )}

//             {activeTab === 'editProfile' && (
//                 <form className="profile-form" onSubmit={handleFormSubmit}>
//                     <div className="form-group">
//                         <label>First Name</label>
//                         <input
//                             type="text"
//                             name="fname"
//                             value={formData.fname}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Last Name</label>
//                         <input
//                             type="text"
//                             name="lname"
//                             value={formData.lname}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Phone</label>
//                         <input
//                             type="text"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Username</label>
//                         <input
//                             type="text"
//                             name="username"
//                             value={formData.username}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Profile Picture</label>
//                         <input
//                             type="file"
//                             name="profileImage"
//                             onChange={handleProfilePictureChange}
//                         />
//                     </div>
//                     <button type="submit" className="btn btn-primary">Save</button>
//                 </form>
//             )}

//             {activeTab === 'resetPassword' && (
//                 <div className="reset-password">
//                     <h2>Reset Password</h2>
//                     {/* Implement reset password form here */}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProfilePage;





import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile, updateUserProfile, uploadProfilePicture } from '../../apis/Api';
import './ProfilePage.css';

const ProfilePage = () => {
    const { userId } = useParams();
    const [activeTab, setActiveTab] = useState('profile');
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        username: '',
        isAdmin: false,
        profileImage: null
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await getUserProfile(userId);
                if (res.data.success) {
                    const userData = res.data.user;
                    setUser(userData);
                    setFormData({
                        fname: userData.fname,
                        lname: userData.lname,
                        email: userData.email,
                        phone: userData.phone,
                        username: userData.username,
                        isAdmin: userData.isAdmin,
                        profileImage: userData.profileImage
                    });
                } else {
                    console.error('Error fetching user profile:', res.data.message);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updateUserProfile(userId, formData);
            if (res.data.success) {
                setUser(res.data.user);
                setActiveTab('profile');
            } else {
                console.error('Error updating user profile:', res.data.message);
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    const handleProfilePictureChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('profileImage', file);

        try {
            const res = await uploadProfilePicture(formData);
            if (res.data.success) {
                setFormData({ ...formData, profileImage: res.data.profileImage });
            } else {
                console.error('Error uploading profile picture:', res.data.message);
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-tabs">
                <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>Profile</button>
                <button className={activeTab === 'editProfile' ? 'active' : ''} onClick={() => setActiveTab('editProfile')}>Edit Profile</button>
                <button className={activeTab === 'resetPassword' ? 'active' : ''} onClick={() => setActiveTab('resetPassword')}>Reset Password</button>
            </div>

            {activeTab === 'profile' && (
                <div className="profile-content">
                    <div className="profile-picture">
                        <img src={`http://localhost:5500/${user.profileImage || 'uploads/profile_pictures/default.png'}`} alt={user.fname} />
                    </div>
                    <div className="profile-details">
                        <p><strong>Name:</strong> {user.fname} {user.lname}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Role:</strong> {user.isAdmin ? 'Admin' : 'User'}</p>
                    </div>
                </div>
            )}

            {activeTab === 'editProfile' && (
                <form className="profile-form" onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="fname"
                            value={formData.fname}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lname"
                            value={formData.lname}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Profile Picture</label>
                        <input
                            type="file"
                            name="profileImage"
                            onChange={handleProfilePictureChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            )}

            {activeTab === 'resetPassword' && (
                <div className="reset-password">
                    <h2>Reset Password</h2>
                    {/* Implement reset password form here */}
                </div>
            )}
        </div>
    );
};

export default ProfilePage;