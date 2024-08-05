import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto";
import { Container, Row, Col, Card, Button, ListGroup, Alert } from "react-bootstrap";
import "../styles/AdminDashboard.css"; // Import the CSS file

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [signatures, setSignatures] = useState([]);
  const [error, setError] = useState(null);
  const metrics = useSelector((state) => state.admin.metrics);
  const token = localStorage.getItem("token"); // Retrieve token from local storage

  // Example data for chart
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Signatures",
        data: metrics.signaturesPerMonth, // Array of signature counts per month
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  useEffect(() => {
    // Fetch users
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://backend.test/api/get-users", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token if needed
          },
        });
        setUsers(response.data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users.");
      }
    };

    // Fetch signatures
    const fetchSignatures = async () => {
      try {
        const response = await axios.get("http://backend.test/api/get-signatures", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token if needed
          },
        });
        setSignatures(response.data.signatures || []);
      } catch (error) {
        console.error("Error fetching signatures:", error);
        setError("Error fetching signatures.");
      }
    };

    fetchUsers();
    fetchSignatures();
  }, [token]);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://backend.test/api/delete-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 || response.status === 204) {
        setUsers(users.filter((user) => user.id !== userId));
        setSignatures(signatures.filter((sig) => sig.user_id !== userId));
      } else {
        console.error("Failed to delete user:", response);
        setError("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error.response?.data?.message || "Error deleting user.");
    }
  };
  
  const handleDeleteSignature = async (signatureId) => {
    try {
      const response = await axios.delete(`http://backend.test/api/signature/${signatureId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 || response.status === 204) {
        setSignatures(signatures.filter((sig) => sig.id !== signatureId));
      } else {
        console.error("Failed to delete signature:", response);
        setError("Failed to delete signature.");
      }
    } catch (error) {
      console.error("Error deleting signature:", error);
      setError(error.response?.data?.message || "Error deleting signature.");
    }
  };
  

  // Combine signatures with their users
  const usersWithSignatures = users.map(user => ({
    ...user,
    signatures: signatures.filter(sig => sig.user_id === user.id)
  }));
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


  return (
    <Container className="admin-dashboard">
      <Row className="my-4">
        <Col>
          <h2>Admin Dashboard</h2>
          {error && <Alert variant="danger">{error}</Alert>}
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Metrics</Card.Title>
              <Card.Text>
                <p>Total Signatures: {metrics.totalSignatures}</p>
                <p>Total Users: {metrics.totalUsers}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Signatures Over Time</Card.Title>
              <Line data={data} />
            </Card.Body>
          </Card>
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
                                <Link to={`/admin/edit-signature/${signature.id}`}>
                                  <Button variant="primary" size="sm">
                                    Edit Signature
                                  </Button>
                                </Link>
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
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Links</Card.Title>
              <ListGroup>
                <ListGroup.Item>
                  <Link to="/admin/user-list">Manage Users</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to="/admin/signature-list">Manage Signatures</Link>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
