import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import 'react-quill/dist/quill.snow.css';
import Signature2 from './Signature2';
import UserForm from './UserForm';

const CreateSignature = () => {
  const { token } = useSelector((state) => state.auth);
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
  const [image, setImage] = useState(null);
  const [users, setUsers] = useState([]);
  const [showEdit, setShowEdit] = useState(false); // Initialize as false
  const [activeComponent, setActiveComponent] = useState(''); // Add this line

  const cropperRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      if (name === 'company_logo' || name === 'company_logo1' || name === 'company_logo2' || name === 'gif') {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: files[0],
        }));
      } else {
        setImage(URL.createObjectURL(files[0]));
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: files[0],
        }));
      }
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const fd = new FormData();
  //   if (croppedImage) {
  //     fd.append('image', croppedImage);
  //   } else if (formData.company_logo) {
  //     fd.append('image', formData.company_logo);
  //   }
  //   Object.keys(formData).forEach((key) => {
  //     if (formData[key] !== null) {
  //       fd.append(key, formData[key]);
  //     }
  //   });

  //   try {
  //     const response = await axios.post('http://backend.test/api/signature/store', fd, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });
  //     console.log('Token:', token);

  //     console.log(response.data);
  //     alert('Signature created successfully!');
  //     navigate('/user-dashboard');
  //   } catch (error) {
  //     console.error('Axios Error:', error);
  //     alert('Failed to create signature. Please try again.');
  //   }
  // };
  

  const cropImage = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.getCroppedCanvas();
      croppedCanvas.toBlob((blob) => setCroppedImage(blob));
    }
  };

  const renderFirstSignature = () => {
    setActiveComponent('A');
  };

  return (
    <>
      <Row>
        <Col md={4}>
          <UserForm
            setShowEdit={setShowEdit}
            formData={formData}
            setFormData={setFormData}
            cropperRef={cropperRef}
            showEdit={showEdit}
          />
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
          <h2></h2>
          {/* <h2>All User IDs:</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} onClick={() => handleEditClick(user.id)}>
                <Link to={`/edit/${user.id}`} relative="/edit/:id">{user.name}</Link>
              </li>
            ))}
          </ul> */}
        </Col>
      </Row>
    </>
  );
};

export default CreateSignature;
