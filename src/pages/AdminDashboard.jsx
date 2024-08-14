import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { Container, Row, Col, Card, Button, ListGroup, Alert } from "react-bootstrap";
import "../styles/AdminDashboard.css"; // Import the CSS file
import { logout } from "../features/auth/authSlice"; // Import your logout action
import axiosInstance from '../components/axiosInstance';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [signatures, setSignatures] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("accessToken"); // Retrieve token from local storage
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Example data for chart
 

  useEffect(() => {
    // Fetch users and signatures
    const fetchData = async () => {
      try {
        const userResponse = await axiosInstance.get("/get-users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(userResponse.data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error.response?.data || error.message);
        setError("Error fetching users.");
      }

      try {
        const signatureResponse = await axiosInstance.get("/get-signatures", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSignatures(signatureResponse.data.signatures || []);
      } catch (error) {
        console.error("Error fetching signatures:", error.response?.data || error.message);
        setError("Error fetching signatures.");
      }
    };

    fetchData();
  }, [token]);

  

  const handleDeleteSignature = async (signatureId) => {
    try {
      const response = await axiosInstance.delete(`/signature/${signatureId}`, {
        headers: { Authorization: `Bearer ${token}` },
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

  const handleCopyLink = (userId) => {
    const link = `${window.location.origin}/signature/${userId}.html`;
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy link:', err);
    });
  };

  // Combine signatures with their users
  const usersWithSignatures = users.map(user => ({
    ...user,
    signatures: signatures.filter(sig => sig.user_id === user.id)
  }));

  const handleCreateSignature = () => {
    navigate('/create-signature');
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/logout', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Logout Error:', error.response?.data || error.message);
    }
  };

  return (
    <Container className="admin-dashboard">
      <Row className="my-4">
        <Col>
          <h2>Admin Dashboard</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button className="create-button" onClick={handleCreateSignature}>Create New Signature</Button>
          <Button variant="danger" className="logout-button" onClick={handleLogout}>Logout</Button>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
         
        </Col>
       
      </Row>
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>User Management</Card.Title>
              {usersWithSignatures.length > 0 ? (
                usersWithSignatures.map(user => (
                  <Card key={user.id} className="mb-3 user-card">
                    <Card.Body>
                      <Card.Title>{user.name} {user.last_name}</Card.Title>
                      <ListGroup>
                        {user.signatures.length > 0 ? (
                          user.signatures.map(signature => (
                            <ListGroup.Item key={signature.id} className="signature-item">
                              {signature.name} {signature.last_name}
                              <div className="mt-2 signature-actions">
                                <Button
                                  variant="danger"
                                  size="sm"
                                  className="mr-2"
                                  onClick={() => handleDeleteSignature(signature.id)}
                                >
                                  Delete Signature
                                </Button>
                                <Link to={`/edit-signature/${signature.id}`}>
                                  <Button variant="primary" size="sm">
                                    Edit Signature
                                  </Button>
                                </Link>
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  className="ml-2"
                                  onClick={() => handleCopyLink(signature.id)}
                                >
                                  Copy Link
                                </Button>
                              </div>
                            </ListGroup.Item>
                          ))
                        ) : (
                          <ListGroup.Item>No signatures found for this user.</ListGroup.Item>
                        )}
                      </ListGroup>
                      <div className="mt-2">
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete User
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>No users found.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
