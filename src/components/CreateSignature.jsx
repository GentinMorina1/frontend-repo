import React, { useState, useRef, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

// Component to handle cropping
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

// Main component for creating a new signature
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

  const formDataRefs = {
    company_logo: useRef(),
    company_logo1: useRef(),
    company_logo2: useRef(),
    gif: useRef(),
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate email input
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // Handle blur for validation
  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'email' && !validateEmail(value)) {
      setStatusForm({ ...statusForm, email: 'Email is Invalid' });
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append('image', croppedImage);
    fd.append('name', formData.name);
    fd.append('last_name', formData.last_name);
    fd.append('title', formData.title);
    fd.append('company', formData.company);
    fd.append('linkedin_profile', formData.linkedin_profile);
    fd.append('phone', formData.phone);
    fd.append('email', formData.email);
    fd.append('facebook', formData.facebook);
    fd.append('instagram', formData.instagram);
    fd.append('twitter', formData.twitter);
    fd.append('address', formData.address);
    fd.append('website', formData.website);
    fd.append('description', formData.description);
    fd.append('company_logo', formData.company_logo);
    fd.append('company_logo1', formData.company_logo1);
    fd.append('company_logo2', formData.company_logo2);
    fd.append('gif', formData.gif);
    fd.append('meeting_link', formData.meeting_link);
    fd.append('company_linkedin', formData.company_linkedin);
    fd.append('feedback', formData.feedback);

    try {
      const response = await axios.post('http://backend.test/api/save-user', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Signature created successfully!');
    } catch (error) {
      console.error('Axios Error:', error);
      alert('Failed to create signature. Please try again.');
    }
  };

  return (
    <div className="form-content">
      <h2>Create New Signature</h2>
      <form onSubmit={handleSubmit}>
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
        <Form.Control
          className="input-form"
          name="description"
          as="textarea"
          rows={3}
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        />
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
        <Form.Control
          className="input-form"
          type="file"
          name="image"
          onChange={(e) => setCroppedImage(e.target.files[0])}
        />
        {formData.company_logo && (
          <img
            src={URL.createObjectURL(formData.company_logo)}
            alt="Company Logo"
            style={{ width: '100px', height: 'auto', margin: '10px' }}
          />
        )}
        {formData.company_logo1 && (
          <img
            src={URL.createObjectURL(formData.company_logo1)}
            alt="Company Logo 1"
            style={{ width: '100px', height: 'auto', margin: '10px' }}
          />
        )}
        {formData.company_logo2 && (
          <img
            src={URL.createObjectURL(formData.company_logo2)}
            alt="Company Logo 2"
            style={{ width: '100px', height: 'auto', margin: '10px' }}
          />
        )}
        {formData.gif && (
          <img
            src={URL.createObjectURL(formData.gif)}
            alt="GIF"
            style={{ width: '100px', height: 'auto', margin: '10px' }}
          />
        )}
        {croppedImage && (
          <CropperProfile
            image={croppedImage}
            setCroppedImage={(blob) => setCroppedImage(blob)}
          />
        )}
        <button type="submit" className="btn btn-primary">
          Create Signature
        </button>
      </form>
    </div>
  );
};

export default CreateSignature;
