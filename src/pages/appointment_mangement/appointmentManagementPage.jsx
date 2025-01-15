import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteAppointment, getAllAppointmentsForUser, updateAppointmentStatus } from '../../apis/Api';
import './appointmentManagementPage.css';

const AppointmentManagementPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllAppointmentsForUser()
            .then((res) => {
                if (res.data.success) {
                    setAppointments(res.data.data);
                } else {
                    setError('Failed to fetch appointments.');
                }
            })
            .catch((err) => {
                console.error('Error fetching appointments:', err);
                setError('Error fetching appointments.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    const handleUpdateStatus = (appointmentId, status) => {
        console.log('Appointment ID:', appointmentId);
        console.log('Status:', status);

        if (!appointmentId || !status) {
            console.error('Appointment ID and status are required');
            return;
        }

        updateAppointmentStatus({ appointmentId, status })
            .then((res) => {
                console.log('Response Data:', res.data);
                if (res.data.success) {
                    setAppointments((prevAppointments) =>
                        prevAppointments.map((appointment) =>
                            appointment._id === appointmentId
                                ? { ...appointment, status: res.data.appointment.status }
                                : appointment
                        )
                    );
                    toast.success('Appointment status updated successfully');
                } else {
                    console.error('Failed to update appointment status:', res.data.message);
                    toast.error('Failed to update appointment status');
                }
            })
            .catch((err) => {
                console.error('Error updating appointment status:', err);
                toast.error('Error updating appointment status');
            });
    };
    // const handleDeleteAppointment = (appointmentId) => {
    //     deleteAppointment(appointmentId)
    //         .then((res) => {
    //             if (res.data.success) {
    //                 setAppointments((prevAppointments) =>
    //                     prevAppointments.filter((appointment) => appointment._id !== appointmentId)
    //                 );
    //             } else {
    //                 console.error('Failed to delete appointment:', res.data.message);
    //             }
    //         })
    //         .catch((err) => {
    //             console.error('Error deleting appointment:', err);
    //         });
    // };
    const handleDeleteAppointment = (appointmentId) => {
        const confirmDeletion = window.confirm('Are you sure you want to delete this appointment?');

        if (confirmDeletion) {
            deleteAppointment(appointmentId)
                .then((res) => {
                    if (res.data.success) {
                        setAppointments((prevAppointments) =>
                            prevAppointments.filter((appointment) => appointment._id !== appointmentId)
                        );
                        toast.success('Appointment deleted successfully!', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else {
                        console.error('Failed to delete appointment:', res.data.message);
                    }
                })
                .catch((err) => {
                    console.error('Error deleting appointment:', err);
                    toast.error('Failed to delete appointment.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        }
    };




    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (appointments.length === 0) {
        return <div className="no-appointments">No appointments found.</div>;
    }

    return (
        <div className="appointment-management-container">
            <div className='dashboard-menu'>
                <Link to="/user/dashboard" className='dashboard-menu-item '>Dashboard</Link>
                <Link to="/appointment" className='dashboard-menu-item active'>Booking Inquiry</Link>
            </div>
            <h2>Manage Appointments</h2>
            <div className="appointment-list">
                {appointments.map((appointment) => (
                    <div key={appointment._id} className="appointment-card">
                        {/* <div className="appointment-header">
                            <h3>{appointment.productId.productName}</h3>
                            <p>Booked by: {appointment.userId ? `${appointment.userId.fname} ${appointment.userId.lname}` : 'Unknown User'}</p>
                            <button onClick={() => handleDeleteAppointment(appointment._id)} className="delete-btn">
                                🗑️
                            </button>
                        </div> */}
                        <div className="appointment-header">
                            <div>
                                <h3>{appointment.productId.productName}</h3>
                                <p>Booked by: {appointment.userId ? `${appointment.userId.fname} ${appointment.userId.lname}` : 'Unknown User'}</p>
                            </div>
                            <button onClick={() => handleDeleteAppointment(appointment._id)} className="delete-btn">
                                🗑️
                            </button>
                        </div>
                        <div className="appointment-details">
                            <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {appointment.time}</p>
                            <p><strong>Status:</strong> <span className={`status ${appointment.status.toLowerCase()}`}>{appointment.status}</span></p>
                            <p><strong>Payment Method:</strong> {appointment.paymentMethod || 'Not specified'}</p>
                        </div>
                        <div className="appointment-actions">
                            <button
                                className="confirm-btn"
                                onClick={() => handleUpdateStatus(appointment._id, 'Confirmed')}
                                disabled={appointment.status === 'Confirmed'}
                            >
                                Confirm
                            </button>
                            <button
                                className="cancel-btn"
                                onClick={() => handleUpdateStatus(appointment._id, 'Cancelled')}
                                disabled={appointment.status === 'Cancelled'}
                            >
                                Cancel
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppointmentManagementPage;