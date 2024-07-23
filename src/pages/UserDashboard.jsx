import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "../components/UserForm";
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const [formData, setFormData] = useState({});
  const [signatures, setSignatures] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all signatures when the component mounts
    const fetchSignatures = async () => {
      try {
        const response = await axios.get('http://backend.test/api/users');
        setSignatures(response.data);
      } catch (error) {
        console.error("Error fetching signatures:", error);
      }
    };

    fetchSignatures();
  }, []);

  const handleCreateSignature = () => {
    setFormData({});
    setEditing(false);
    navigate('/create-signature'); // Redirect to create signature page if necessary
  };

  const handleEditClick = (id) => {
    setEditId(id);
    setEditing(true);
    navigate(`/edit-signature/${id}`); // Redirect to edit signature page
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <button onClick={handleCreateSignature}>Create New Signature</button>
      <div>
        {signatures.map(signature => (
          <div key={signature.id}>
            <h2>{signature.name} {signature.last_name}</h2>
            <button onClick={() => handleEditClick(signature.id)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}
