import React, { useState, useEffect } from 'react';
import './styles/Admin.css';

const AdminPage = () => {
  // Sample booking data
  const initialBookings = [
    {
      id: 1,
      customerName: 'John Doe',
      phone: '123-456-7890',
      email: 'john@example.com',
      serviceType: 'Wash & Fold',
      weight: 5,
      pickupDate: '2023-06-15',
      deliveryDate: '2023-06-17',
      status: 'Pending',
      address: '123 Main St, Apt 4B'
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      phone: '987-654-3210',
      email: 'jane@example.com',
      serviceType: 'Dry Cleaning',
      items: 3,
      pickupDate: '2023-06-14',
      deliveryDate: '2023-06-16',
      status: 'In Progress',
      address: '456 Oak Ave'
    },
    {
      id: 3,
      customerName: 'Bob Johnson',
      phone: '555-123-4567',
      email: 'bob@example.com',
      serviceType: 'Ironing',
      items: 10,
      pickupDate: '2023-06-16',
      deliveryDate: '2023-06-18',
      status: 'Completed',
      address: '789 Pine Rd'
    },
  ];

  const [bookings, setBookings] = useState(initialBookings);
  const [filter, setFilter] = useState('All');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Filter bookings based on status
  const filteredBookings = filter === 'All' 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  // Update booking status
  const updateStatus = (id, newStatus) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
    setIsEditing(false);
    setSelectedBooking(null);
  };

  // Calculate statistics
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    inProgress: bookings.filter(b => b.status === 'In Progress').length,
    completed: bookings.filter(b => b.status === 'Completed').length,
  };

  return (
    <div className="admin-container">
      <h1>Laundry Shop Booking Admin</h1>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Bookings</h3>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <p>{stats.inProgress}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p>{stats.completed}</p>
        </div>
      </div>

      <div className="filter-controls">
        <label>Filter by Status:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="bookings-container">
        <div className="bookings-list">
          <h2>Bookings</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Pickup Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map(booking => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.customerName}</td>
                  <td>{booking.serviceType}</td>
                  <td>{booking.pickupDate}</td>
                  <td>
                    <span className={`status-badge ${booking.status.toLowerCase().replace(' ', '-')}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="view-btn"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedBooking && (
          <div className="booking-details">
            <h2>Booking Details</h2>
            {isEditing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Status:</label>
                  <select 
                    value={selectedBooking.status}
                    onChange={(e) => setSelectedBooking({
                      ...selectedBooking,
                      status: e.target.value
                    })}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button 
                    className="save-btn"
                    onClick={() => updateStatus(selectedBooking.id, selectedBooking.status)}
                  >
                    Save
                  </button>
                  <button 
                    className="cancel-btn"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p><strong>Customer:</strong> {selectedBooking.customerName}</p>
                <p><strong>Phone:</strong> {selectedBooking.phone}</p>
                <p><strong>Email:</strong> {selectedBooking.email}</p>
                <p><strong>Address:</strong> {selectedBooking.address}</p>
                <p><strong>Service:</strong> {selectedBooking.serviceType}</p>
                {selectedBooking.weight && <p><strong>Weight:</strong> {selectedBooking.weight} kg</p>}
                {selectedBooking.items && <p><strong>Items:</strong> {selectedBooking.items}</p>}
                <p><strong>Pickup Date:</strong> {selectedBooking.pickupDate}</p>
                <p><strong>Delivery Date:</strong> {selectedBooking.deliveryDate}</p>
                <p><strong>Status:</strong> {selectedBooking.status}</p>
                
                <div className="detail-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Status
                  </button>
                  <button 
                    className="close-btn"
                    onClick={() => setSelectedBooking(null)}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;