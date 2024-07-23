import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css'; // Assuming you have CSS for styling

export default function Sidebar(){
  return (
    <nav className="sidebar">
      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/users">User Management</Link></li>
        <li><Link to="/admin/signatures">Signature Management</Link></li>
        <li><Link to="/admin/settings">Settings</Link></li>
      </ul>
    </nav>
  );
};


