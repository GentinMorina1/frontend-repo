import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/UserDashboard.css';

export default function UserDashboard() {
  const [signatures, setSignatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const userToken = auth.token;
  const userId = window.localStorage.getItem('user-id'); // Retrieve user ID from local storage
  
  useEffect(() => {
    const fetchSignatures = async () => {
      try {
        const response = await axios.get(`http://backend.test/api/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${userToken}`
          }
        });
        setSignatures(response.data); // Ensure response.data is an array of signatures
        setLoading(false);
      } catch (error) {
        setError('Error fetching signatures. Please try again later.');
        setLoading(false);
        console.error("Error fetching signatures:", error);
      }
    };

    if (userToken) {
      fetchSignatures();
    } else {
      console.error("User token not found.");
      navigate('/login');
    }
  }, [userToken, navigate, userId]);

  const handleCreateSignature = () => {
    navigate('/create-signature');
  };

  const handleEditClick = (id) => {
    navigate(`/edit-signature/${id}`);
  };

  return (
    <div className="user-dashboard">
      <header className="dashboard-header">
        <h1>User Dashboard</h1>
        <button className="create-button" onClick={handleCreateSignature}>Create New Signature</button>
      </header>
      <main className="signature-list">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : signatures.length > 0 ? (
          signatures.map(signature => (
            <div key={signature.id} className="signature-card">
              <h2>{signature.name} {signature.last_name}</h2>
              <button className="edit-button" onClick={() => handleEditClick(signature.id)}>Edit</button>
            </div>
          ))
        ) : (
          <p className="no-signatures">No signatures found.</p>
        )}
      </main>
    </div>
  );
}
