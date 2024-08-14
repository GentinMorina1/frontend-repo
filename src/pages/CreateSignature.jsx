import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/axiosInstance';
import Signature2 from '../components/Signature2';
import UserForm from '../components/UserForm';
import 'cropperjs/dist/cropper.css';
import 'react-quill/dist/quill.snow.css';

const CreateSignature = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    last_name: "",
    title: "",
    company: "",
    linkedin_profile: "",
    phone: "",
    email: "",
    facebook: "",
    instagram: "",
    image: "",
    description: "",
    website: "",
    address: "",
    company_logo: null,
    company_logo1: null,
    company_logo2: null,
    meeting_link: "",
    twitter: "",
    company_linkedin: "",
    feedback: "",
    gif: null,
    croppedImage: null,
  });
  const [imageFile, setImageFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [signatureHTML, setSignatureHTML] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [activeComponent, setActiveComponent] = useState('');
  const cropperRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Store the file to be cropped
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'email' && !validateEmail(value)) {
      alert('Invalid email address');
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const fd = new FormData();
  //     fd.append('email', formData.email);
  //     if (croppedImage) {
  //       fd.append('image', croppedImage, 'signature.png'); // Naming the file as 'signature.png'
  //     }
  //     // Append other necessary fields to fd here

  //     const response = await axiosInstance.post('/signature/store', fd, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });
    
      
  //     alert('Signature created successfully!');
  //     generateSignatureHTML();
  //   } catch (error) {
  //     console.error('Error in handleSubmit:', error);
  //     alert('Failed to create signature. Please try again.');
  //   }
  // };

  const cropImage = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.getCroppedCanvas();
      croppedCanvas.toBlob((blob) => {
        setCroppedImage(blob); // Set cropped image as Blob
      });
    }
  };

  const generateSignatureHTML = () => {
    if (!formData.email || !croppedImage) {
      alert('Please complete the form and upload an image.');
      return;
    }

    const imageUrl = URL.createObjectURL(croppedImage);
    const html = `
      <div>
        <p>Email: ${formData.email}</p>
        <img src="${imageUrl}" alt="Signature Image" />
      </div>
    `;
    
    setSignatureHTML(html);
  };

  const copyToClipboard = async () => {
    if (!signatureHTML) {
      alert('No signature to copy. Please generate the signature first.');
      return;
    }

    try {
      await navigator.clipboard.writeText(signatureHTML);
      alert('Signature copied to clipboard!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      alert('Failed to copy signature. Please try again.');
    }
  };

  useEffect(() => {
    console.log('Updated signatureHTML:', signatureHTML);
  }, [signatureHTML]);

  const renderFirstSignature = () => {
    setActiveComponent('A');
  };

  return (
    <>
      <Row>
        <Col md={4}>
          <UserForm
            formData={formData}
            setFormData={setFormData}
            handleFileChange={handleFileChange}
            handleInputChange={handleInputChange}
            cropperRef={cropperRef}
            cropImage={cropImage}
            showEdit={showEdit}
            setShowEdit={setShowEdit}
          />
        </Col>
        <Col md={8}>
          <button className="button-13" onClick={renderFirstSignature}>
            First
          </button>
          <div
            style={activeComponent === 'A' ? { display: 'block' } : { display: 'none' }}
          >
            <Signature2
              formData={formData}
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              copyToClipboard={copyToClipboard}
              croppedImage={formData.croppedImage}

            />
          </div>
          <h2></h2>
          {signatureHTML && (
            <div>
              <button onClick={copyToClipboard}>Copy to Clipboard</button>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CreateSignature;
