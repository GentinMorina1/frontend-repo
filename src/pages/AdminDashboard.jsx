import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2'; // For chart visualization
import axios from 'axios';
import 'chart.js/auto';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const metrics = useSelector((state) => state.admin.metrics);

  // Example data for chart
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Signatures',
        data: metrics.signaturesPerMonth, // Array of signature counts per month
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };

  useEffect(() => {
    // Fetch all users and their signatures
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://backend.test/api/get-users', {headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token if needed
        }}); // Update with the correct endpoint
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteSignature = async (userId, signatureId) => {
    try {
      await axios.delete(`http://backend.test/api/delete-signature/${signatureId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token if needed
        }
      });
      // Update the users state by removing the deleted signature
      setUsers(users.map(user =>
        user.id === userId
          ? { ...user, signatures: user.signatures.filter(sig => sig.id !== signatureId) }
          : user
      ));
    } catch (error) {
      console.error("Error deleting signature:", error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <p>Total Signatures: {metrics.totalSignatures}</p>
        <p>Total Users: {metrics.totalUsers}</p>
      </div>
      <div>
        <h3>Signatures Over Time</h3>
        <Line data={data} />
      </div>
      <div>
        <h3>User Management</h3>
        {users.length > 0 ? (
          users.map(user => (
            <div key={user.id}>
              <h4>{user.name}</h4>
              <ul>
                {JSON.stringify(user)}
                {/* {user.map(signature => (
                  <li key={signature.id}>
                    {signature.name} {signature.last_name}
                    <button onClick={() => handleDeleteSignature(user.id, signature.id)}>Delete</button>
                    <Link to={`/admin/edit-signature/${signature.id}`}>Edit</Link>
                  </li>
                ))} */}
              </ul>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
      <div>
        <h3>Links</h3>
        <ul>
          <li>
            <Link to="/admin/user-list">Manage Users</Link>
          </li>
          <li>
            <Link to="/admin/signature-list">Manage Signatures</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
