

// import React, { useEffect, useState } from 'react';
// import { getUserAppointments } from '../../../apis/Api';
// import './myBookingsPage.css';

// const MyBookingsPage = () => {
//     const [appointments, setAppointments] = useState([]);

//     useEffect(() => {
//         getUserAppointments()
//             .then((res) => {
//                 console.log(res.data); // Check if data is being returned correctly
//                 if (res.data.success) {
//                     setAppointments(res.data.data);
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error fetching user appointments:', error);
//             });
//     }, []);

//     if (appointments.length === 0) {
//         return <div className="my-bookings-container">You have no appointments booked.</div>;
//     }

//     return (
//         <div className="my-bookings-container">
//             <h2>My Bookings</h2>
//             {appointments.map((appointment, index) => (
//                 <div key={index} className="booking-item">
//                     <h3>{appointment.productId.productName}</h3>
//                     <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
//                     <p>Time: {appointment.time}</p>
//                     <p>Status: {appointment.status}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default MyBookingsPage;



import React, { useEffect, useState } from 'react';
import { getUserAppointments } from '../../../apis/Api';
import './myBookingsPage.css';

const MyBookingsPage = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        getUserAppointments()
            .then((res) => {
                console.log(res.data); // Check if data is being returned correctly
                if (res.data.success) {
                    setAppointments(res.data.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching user appointments:', error);
            });
    }, []);

    if (appointments.length === 0) {
        return <div className="my-bookings-container">You have no appointments booked.</div>;
    }

    return (
        <div className="my-bookings-container">
            <h2 className="my-bookings-title">My Bookings</h2>
            <div className="bookings-list">
                {appointments.map((appointment, index) => (
                    <div key={index} className="booking-item">
                        <div className="booking-header">
                            <h3 className="booking-product-name">{appointment.productId.productName}</h3>
                            <p className={`booking-status ${appointment.status.toLowerCase()}`}>{appointment.status}</p>
                        </div>
                        <div className="booking-details">
                            <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {appointment.time}</p>
                            <p><strong>Payment Method:</strong> {appointment.paymentMethod || 'Not provided'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookingsPage;