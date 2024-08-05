import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import '../styles/UserDashboard.css';

export default function UserDashboard() {
  const [signatures, setSignatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userToken = auth.token;
  const userId = window.localStorage.getItem('user-id');
  const hiddenSignatureRef = useRef(null);

  useEffect(() => {
    const fetchSignatures = async () => {
      try {
        const response = await axios.get(`http://backend.test/api/signatures/${userId}`, {
          headers: {
            'Authorization': `Bearer ${userToken}`
          }
        });
        console.log("API Response:", response.data);
        
        if (response.data.signature) {
          setSignatures([response.data.signature]);
        } else {
          console.warn("Unexpected response structure:", response.data);
          setSignatures([]);
        }

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

  const handleLogout = async () => {
    try {
      await axios.post('http://backend.test/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Logout Error:', error.response?.data || error.message);
    }
  };

  const handleCopy = (signature) => {
    const signatureHTML = hiddenSignatureRef.current.innerHTML;
    navigator.clipboard.writeText(signatureHTML).then(() => {
      alert('Signature copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy signature: ', err);
    });
  };

  return (
    <div className="user-dashboard">
      <header className="dashboard-header">
        <h1>User Dashboard</h1>
        <div>
          <button className="create-button" onClick={handleCreateSignature}>Create New Signature</button>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
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
              <div
                ref={hiddenSignatureRef}
                style={{ display: 'none' }}
                dangerouslySetInnerHTML={{ __html: signature.html_content }} // Assuming signature.html_content contains the HTML structure
              />
              <button className="edit-button" onClick={() => handleEditClick(signature.id)}>Edit</button>
              <button className="copy-button" onClick={() => handleCopy(signature)}>Copy</button>
            </div>
          ))
        ) : (
          <p className="no-signatures">No signatures found.</p>
        )}
      </main>
    </div>
  );
}
