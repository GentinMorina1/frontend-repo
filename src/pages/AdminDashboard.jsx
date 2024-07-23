import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2'; // Example for chart visualization
import 'chart.js/auto';

const AdminDashboard = () => {
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
