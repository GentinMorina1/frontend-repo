import React, { useState, useRef } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import Signature2 from './Signature2';

// CropperProfile Component
const CropperProfile = ({ image, setCroppedImage }) => {
  const cropperRef = useRef(null);

  const handleCrop = () => {
    const cropper = cropperRef.current.cropper;
    cropper.getCroppedCanvas().toBlob((blob) => {
      setCroppedImage(blob);
    });
  };

  return (
    <div>
      {image && (
        <Cropper
          style={{ height: 400, width: '100%' }}
          initialAspectRatio={1}
          preview=".img-preview"
          src={URL.createObjectURL(image)}
          ref={cropperRef}
          viewMode={1}
          cropend={handleCrop}
          guides={true}
          minCropBoxHeight={110}
          minCropBoxWidth={110}
          background={false}
          responsive={true}
          aspectRatio={1}
          center={false}
          dragMode="move"
          cropBoxMovable={false}
          toggleDragModeOnDblclick={false}
          cropBoxResizable={false}
          rotatable={true}
          checkCrossOrigin={false}
          checkOrientation={false}
        />
      )}
    </div>
  );
};

// CreateSignature Component
const CreateSignature = () => {
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    title: '',
    company: '',
    linkedin_profile: '',
    phone: '',
    email: '',
    facebook: '',
    instagram: '',
    twitter: '',
    address: '',
    website: '',
    description: '',
    company_logo: null,
    company_logo1: null,
    company_logo2: null,
    gif: null,
    meeting_link: '',
    company_linkedin: '',
    feedback: '',
  });
  const [croppedImage, setCroppedImage] = useState(null);
  const [statusForm, setStatusForm] = useState({ email: '' });
  const [showEdit, setShowEdit] = useState([]);
  const [signatures, setSignatures] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeComponent, setActiveComponent] = useState([]);
  const [selectedSignature, setSelectedSignature] = useState(null); // State for selected signature
  const cropperRef = useRef(null);
  const navigate = useNavigate();
  const formDataRefs = {
    company_logo: useRef(),
    company_logo1: useRef(),
    company_logo2: useRef(),
    gif: useRef(),
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'email' && !validateEmail(value)) {
      setStatusForm({ email: 'Email is Invalid' });
    } else {
      setStatusForm({ email: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append('image', croppedImage);
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        fd.append(key, formData[key]);
      }
    });

    const accessToken = localStorage.getItem('accessToken'); // Or from Redux state

    try {
      const response = await axios.post('http://backend.test/api/users/store', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`, // Include the token here
        },
      });
      console.log(response.data);
      alert('Signature created successfully!');
      navigate('/user-dashboard'); // Redirect after successful submission
    } catch (error) {
      console.error('Axios Error:', error);
      alert('Failed to create signature. Please try again.');
    }
  };

  const renderFirstSignature = () => {
    setActiveComponent('A');
  };

  return (
    <>
      <Row>
        <Col md={4}>
          <div className="form-content">
            <h2>Create New Signature</h2>
            <form onSubmit={handleSubmit}>
              {/* Render input fields for all required data */}
              <Form.Control
                className="input-form"
                required
                name="name"
                type="text"
                placeholder="First name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <Form.Control
                className="input-form"
                required
                name="last_name"
                type="text"
                placeholder="Last name"
                value={formData.last_name}
                onChange={handleInputChange}
              />
              <Form.Control
                className="input-form"
                required
                name="title"
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
              />
              <Form.Control
                className="input-form"
                required
                name="company"
                type="text"
                placeholder="Company"
                value={formData.company}
                onChange={handleInputChange}
              />
              <Form.Control
                className="input-form"
                name="meeting_link"
                type="url"
                placeholder="Meeting link"
                value={formData.meeting_link}
                onChange={handleInputChange}
              />
              <Form.Control
                className="input-form"
                name="address"
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <Form.Control
                className="input-form"
                name="website"
                type="url"
                placeholder="Website link"
                value={formData.website}
                onChange={handleInputChange}
              />
              <Form.Control
                className="input-form"
                name="twitter"
                type="url"
                placeholder="Twitter"
                value={formData.twitter}
                onChange={handleInputChange}
              />
              <Form.Control
                className="input-form"
                name="facebook"
                type="url"
                placeholder="Facebook"
                value={formData.facebook}
                onChange={handleInputChange}
              />
              <Form.Control
                className="input-form"
                name="instagram"
                type="url"
                placeholder="Instagram"
                value={formData.instagram}
                onChange={handleInputChange}
              />
              <Form.Control
                className="input-form"
                name="linkedin_profile"
                type="url"
                placeholder="LinkedIn Profile"
                value={formData.linkedin_profile}
                onChange={handleInputChange}
              />
              <Form.Control
                className="input-form"
                name="phone"
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <Form.Control
                className="input-form"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              {statusForm.email && <p>{statusForm.email}</p>}
              <Form.Control
                className="input-form"
                type="file"
                name="company_logo"
                ref={formDataRefs.company_logo}
                onChange={handleFileChange}
              />
              <Form.Control
                className="input-form"
                type="file"
                name="company_logo1"
                ref={formDataRefs.company_logo1}
                onChange={handleFileChange}
              />
              <Form.Control
                className="input-form"
                type="file"
                name="company_logo2"
                ref={formDataRefs.company_logo2}
                onChange={handleFileChange}
              />
              <Form.Control
                className="input-form"
                type="file"
                name="gif"
                ref={formDataRefs.gif}
                onChange={handleFileChange}
              />
              <CropperProfile image={formData.company_logo} setCroppedImage={setCroppedImage} />
              <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={(value) => setFormData({ ...formData, description: value })}
              />
              <button type="submit">Create Signature</button>
            </form>
          </div>
        </Col>
        <Col className="second-column" md={8}>
          <button className="button-13" onClick={renderFirstSignature}>
            First
          </button>
          <div
            style={activeComponent === 'A' ? { display: 'block' } : { display: 'none' }}
          >
            <Signature2
              formData={formData}
              setFormData={setFormData}
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              cropperRef={cropperRef}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CreateSignature;
