import "../styles/index.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Signature2 from "../components/Signature2";
import "cropperjs/dist/cropper.css";
import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import axios from "axios";
import UserForm from "../components/UserForm";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

axios.defaults.baseURL = "http://backend.test/api/users";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

export default function Home({ formData, setFormData }) {
  const [showEdit, setShowEdit] = useState([]);
  const [signatures, setSignatures] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeComponent, setActiveComponent] = useState([]);
  const [selectedSignature, setSelectedSignature] = useState(null); // State for selected signature
  const cropperRef = useRef(null);
  const navigate = useNavigate();
  
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://backend.test/api/get-users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEditClick = async (userId) => {
    try {
      const response = await axios.get(`http://backend.test/api/users/${userId}`);
      setFormData(response.data);
      setShowEdit(true);
      setActiveComponent("A");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSignatureClick = (userId) => {
    setSelectedSignature(userId);
    console.log("Clicked signature:", userId);
  };

  const renderFirstSignature = () => {
    setActiveComponent("A");
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Row>
        <Col md={4}>
          <UserForm
            setShowEdit={setShowEdit}
            formData={formData}
            setFormData={setFormData}
            cropperRef={cropperRef}
            signatures={signatures}
            setSignatures={setSignatures}
          />
        </Col>
        <Col className="second-column" md={8}>
          <button className="button-13" onClick={renderFirstSignature}>
            First
          </button>
          <div
            style={activeComponent === "A" ? { display: "block" } : { display: "none" }}
          >
            <Signature2
              formData={formData}
              setFormData={setFormData}
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              cropperRef={cropperRef}
            />
          </div>
          <h2></h2>
          <h2>All User IDs:</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} onClick={() => handleEditClick(user.id)}>
                <Link to={`/edit/${user.id}`} relative="/edit/:id">{user.name}</Link>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </>
  );
}
