import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { Container, Row, Col, Card, Button, ListGroup, Alert } from "react-bootstrap";
import '../styles/UserDashboard.css';
import axiosInstance from "../components/axiosInstance";

export default function UserDashboard() {
  const [signatures, setSignatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userToken = auth.token || window.localStorage.getItem('token'); // Ensure token is available
  const userId = window.localStorage.getItem('user-id'); // Ensure user ID is available
  const hiddenSignatureRef = useRef(null);
const {id}= useParams();
console.log('id from params', id);

  useEffect(() => {
    const fetchSignatures = async () => {
      try {
        const response = await axiosInstance.get(`/signature/me`, {
          headers: {
            'Authorization': `Bearer ${userToken}`
          }
        });
        
        console.log("API Response:", response.data);
    
        // Check if signatures exist and are in the expected format
        if (Array.isArray(response.data.signatures)) {
          setSignatures(response.data.signatures);
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
    

    if (userToken && userId) {
      fetchSignatures();
    } else {
      console.error("User token or ID not found.");
      navigate('/login');
    }
  }, [id, userToken, navigate]);
console.log('Signature State:', signatures);
  const handleCreateSignature = () => {
    navigate('/create-signature');
  };

  const handleEditClick = (id) => {
    navigate(`/edit-signature/${id}`);
  };


  const handleDeleteSignature = async (signatureId) => {
    try {
      const response = await axiosInstance.delete(`/signature/${signatureId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      if (response.status === 200 || response.status === 204) {
        setSignatures(signatures.filter((sig) => sig.id !== signatureId));
      } else {
        setError("Failed to delete signature.");
      }
    } catch (error) {
      console.error("Error deleting signature:", error.response?.data || error.message);
      setError("Error deleting signature.");
    }
  };
  const handleLogout = async () => {
    try {
      await axiosInstance.post('/logout', {}, {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
      dispatch(logout());
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('role-user');
      window.localStorage.removeItem('user-id');
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
  const handleCopyLink = (userId) => {
    const link = `${window.location.origin}/signature/${userId}.html`;
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy link:', err);
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
        dangerouslySetInnerHTML={{ __html: signature.html_content }}
      />
  <Button
                                  variant="danger"
                                  size="sm"
                                  className="mr-2"
                                  onClick={() => handleDeleteSignature(signature.id)}
                                >
                                  Delete Signature
                                </Button>
      <button className="edit-button" onClick={() => handleEditClick(signature.id)}>Edit</button>
      <button className="copy-button" onClick={() => handleCopyLink(signature.id)}>Copy</button>
    </div>
  ))
) : (
  <p className="no-signatures">No signatures found.</p>
)}

</main>


    </div>
  );
}
