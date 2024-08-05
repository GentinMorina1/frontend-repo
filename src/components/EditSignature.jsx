import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import UserForm from '../components/UserForm';
import Signature2 from '../components/Signature2';

const EditSignature = () => {
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem('user-id');
  const cropperRef = useRef(null);

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => {
        setFormData(prev => ({ ...prev, croppedImage: blob }));
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('No authentication token found.');
          navigate('/login');
          return;
        }

        const signatureResponse = await axios.get(`http://backend.test/api/signatures/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const { signature } = signatureResponse.data;
        setFormData(signature);

        const userResponse = await axios.get(`http://backend.test/api/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Full API Response:', userResponse.data);

        const userData = userResponse.data.user;
        const imageData = userResponse.data.image && userResponse.data.image[0] ? userResponse.data.image[0] : null;

        const imageCompanyLogo = imageData ? imageData.company_logo : null;
        const imageCompanyLogo1 = imageData ? imageData.company_logo1 : null;
        const imageCompanyLogo2 = imageData ? imageData.company_logo2 : null;
        const imageGif = imageData ? imageData.gif : null;

        console.log('imageData:', imageData);
        console.log('imageCompanyLogo:', imageCompanyLogo);
        console.log('imageCompanyLogo1:', imageCompanyLogo1);
        console.log('imageCompanyLogo2:', imageCompanyLogo2);
        console.log('imageGif:', imageGif);

        let myFile = null;
        let myFileLogoCompany = null;
        let myFileLogoCompany1 = null;
        let myFileLogoCompany2 = null;
        let myFileGif = null;

        if (imageData) {
          const imageBlob = await fetch(`http://backend.test/test/app/public/${imageData.image}`).then(r => r.blob());
          myFile = new File([imageBlob], 'image.jpeg', {
            type: imageBlob.type,
          });
        }

        if (imageCompanyLogo) {
          const companyLogoBlob = await fetch(`http://backend.test/test/app/public/${imageCompanyLogo}`).then(r => r.blob());
          myFileLogoCompany = new File([companyLogoBlob], 'companyLogo.jpeg', {
            type: companyLogoBlob.type,
          });
        }

        if (imageCompanyLogo1) {
          const companyLogoBlob1 = await fetch(`http://backend.test/test/app/public/${imageCompanyLogo1}`).then(r => r.blob());
          myFileLogoCompany1 = new File([companyLogoBlob1], 'companyLogo1.jpeg', {
            type: companyLogoBlob1.type,
          });
        }

        if (imageCompanyLogo2) {
          const companyLogoBlob2 = await fetch(`http://backend.test/test/app/public/${imageCompanyLogo2}`).then(r => r.blob());
          myFileLogoCompany2 = new File([companyLogoBlob2], 'companyLogo2.jpeg', {
            type: companyLogoBlob2.type,
          });
        }

        if (imageGif) {
          const gifBlob = await fetch(`http://backend.test/test/app/public/${imageGif}`).then(r => r.blob());
          myFileGif = new File([gifBlob], 'iReview.gif', {
            type: gifBlob.type,
          });
        }

        const updatedFormData = {
          ...formData,
          id: userData.id,
          name: userData.name,
          last_name: userData.last_name,
          title: userData.title,
          company: userData.company,
          linkedin_profile: userData.linkedin_profile,
          phone: userData.phone,
          email: userData.email,
          facebook: userData.facebook,
          instagram: userData.instagram,
          image: imageData ? myFile : null,
          description: userData.description,
          website: userData.website,
          address: userData.address,
          company_logo: imageCompanyLogo ? myFileLogoCompany : null,
          company_logo1: imageCompanyLogo1 ? myFileLogoCompany1 : null,
          company_logo2: imageCompanyLogo2 ? myFileLogoCompany2 : null,
          gif: imageGif ? myFileGif : null,
          meeting_link: userData.meeting_link,
          twitter: userData.twitter,
          company_linkedin: userData.company_linkedin,
          feedback: userData.feedback,
        };

        setFormData(updatedFormData);
        setLoading(false);
        console.log('Updated FormData:', updatedFormData);

      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
        if (error.response && error.response.status === 401) {
          alert('Session expired. Please log in again.');
          navigate('/login');
        }
      }
    };

    fetchData();
  }, [userId, navigate]);

  const handleUpdate = async () => {
    if (!formData.id) {
      alert('Please select a signature to update.');
      return;
    }

    const fd = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        fd.append(key, formData[key]);
      }
    }

    if (formData.croppedImage) {
      fd.append('image', formData.croppedImage, 'cropped-image.jpeg');
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No authentication token found.');
        navigate('/login');
        return;
      }

      fd.append('_method', 'PUT'); // Ensure method override is included

      const response = await axios.post(
        `http://backend.test/api/signature/${userId}`,
        fd,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        }
      );

      alert('Signature updated successfully!');
      navigate('/user-dashboard');
    } catch (error) {
      console.error('Axios Error:', error);
      if (error.response) {
        alert(`Update failed: ${error.response.data.message || 'Server error'}`);
        if (error.response.status === 401) {
          navigate('/login');
        }
      } else if (error.request) {
        alert('Update failed: No response from server');
      } else {
        alert(`Update failed: ${error.message}`);
      }
    }
  };

  return (
    <>
      <Row>
        <Col md={4}>
          <UserForm
            setFormData={setFormData}
            formData={formData}
          />
        </Col>
        <Col md={8}>
          <Signature2
            formData={formData}
            setFormData={setFormData}
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            handleUpdate={handleUpdate}
            croppedImage={formData.croppedImage}
          />
          <div>
            {image && (
              <Cropper
                style={{ height: 400, width: '100%' }}
                initialAspectRatio={1}
                preview='.img-preview'
                src={typeof image === 'string' && image.includes('http') ? image : URL.createObjectURL(image)}
                ref={cropperRef}
                viewMode={1}
                cropend={handleCrop}
                zoomable={true}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
              />
            )}
          </div>
          <button className="submit-button" onClick={handleUpdate}>
            Update Signature
          </button>
        </Col>
      </Row>
    </>
  );
};

export default EditSignature;
