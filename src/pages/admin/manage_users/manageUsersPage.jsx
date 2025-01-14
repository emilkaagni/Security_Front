// import React, { useEffect, useState } from 'react';
// import { getAllUsers, deleteUser } from '../../../apis/Api'; // Adjust the path as necessary

// const ManageUsersPage = () => {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = () => {
//         getAllUsers().then((res) => {
//             if (res.data.success) {
//                 setUsers(res.data.users);
//             } else {
//                 console.log(res.data.message);
//             }
//         }).catch((error) => {
//             console.error("Error fetching users:", error);
//         });
//     };

//     const handleDeleteUser = (id) => {
//         const confirmDialog = window.confirm("Are you sure you want to delete this user?");
//         if (confirmDialog) {
//             deleteUser(id).then((res) => {
//                 if (res.status === 200) {
//                     alert(res.data.message);
//                     fetchUsers(); // Refresh the list of users after deletion
//                 }
//             }).catch((error) => {
//                 console.error("Error deleting user:", error);
//             });
//         }
//     };

//     return (
//         <div className='container mt-4'>
//             <h3>Manage Users</h3>
//             <table className='table table-striped table-hover mt-4'>
//                 <thead className='table-dark'>
//                     <tr>
//                         <th scope="col">Name</th>
//                         <th scope="col">Email</th>
//                         <th scope="col">Phone</th>
//                         <th scope="col">Username</th>
//                         <th scope="col">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.length > 0 ? (
//                         users.map((user) => (
//                             <tr key={user._id}>
//                                 <td>{`${user.fname} ${user.lname}`}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.phone}</td>
//                                 <td>{user.username}</td>
//                                 <td>
//                                     <button
//                                         onClick={() => handleDeleteUser(user._id)}
//                                         className='btn btn-sm btn-danger'
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="5" className="text-center">No users available.</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ManageUsersPage;






import React, { useEffect, useState } from 'react';
import { deleteUser, getAllUsers } from '../../../apis/Api'; // Adjust the path as necessary
import './manageUsersPage.css'; // Assuming you want to use a separate CSS file for custom styles

const ManageUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        getAllUsers().then((res) => {
            if (res.data.success) {
                setUsers(res.data.users);
            } else {
                console.log(res.data.message);
            }
        }).catch((error) => {
            console.error("Error fetching users:", error);
        });
    };

    const handleDeleteUser = (id) => {
        const confirmDialog = window.confirm("Are you sure you want to delete this user?");
        if (confirmDialog) {
            deleteUser(id).then((res) => {
                if (res.status === 200) {
                    alert(res.data.message);
                    fetchUsers(); // Refresh the list of users after deletion
                }
            }).catch((error) => {
                console.error("Error deleting user:", error);
            });
        }
    };

    const filteredUsers = users.filter(user =>
        user.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
    );

    return (
        <div className='container mt-4'>
            <h3 className="text-center mb-4">Manage Users</h3>

            <div className="search-bar mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search users by name, email, phone, or username..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <table className='table table-striped table-hover'>
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Username</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <tr key={user._id}>
                                <td>{`${user.fname} ${user.lname}`}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.username}</td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user._id)}
                                        className='btn btn-sm btn-danger'
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsersPage;