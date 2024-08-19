import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import UserForm from '../components/UserForm';
import Signature2 from '../components/Signature2';
import axiosInstance from '../components/axiosInstance';

const EditSignature = () => {
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem('user-id');
  const cropperRef = useRef(null);
const {id}= useParams();
 


const token = localStorage.getItem('token');
const userRole = localStorage.getItem('role-user'); 
console.log('token', token);
  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => {
        setFormData(prev => ({ ...prev, croppedImage: blob }));
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Store the file to be cropped
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

        const signatureResponse = await axiosInstance.get(`/signatures/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const { signature } = signatureResponse.data;
        setFormData(signature);

        // const userResponse = await axiosInstance.get(`/users/${id}`, {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });

        const userData = signatureResponse.data.user || {};
        const imageData = signatureResponse.data.image && signatureResponse.data.image[0] ? signatureResponse.data.image[0] : null;

        const imageCompanyLogo = imageData ? imageData.company_logo : null;
        const imageCompanyLogo1 = imageData ? imageData.company_logo1 : null;
        const imageCompanyLogo2 = imageData ? imageData.company_logo2 : null;
        // const imageGif = imageData ? imageData.gif : null;

        let myFile = null;
        let myFileLogoCompany = null;
        let myFileLogoCompany1 = null;
        let myFileLogoCompany2 = null;
        // let myFileGif = null;

        if (imageData) {
          const imageBlob = await fetch(`http://backend.test/test/app/public/images/${imageData.image}`).then(r => r.blob());
          myFile = new File([imageBlob], 'image.jpeg', {
            type: imageBlob.type,
          });
        }

        if (imageCompanyLogo) {
          const companyLogoBlob = await fetch(`http://backend.test/test/app/public/images/${imageCompanyLogo}`).then(r => r.blob());
          myFileLogoCompany = new File([companyLogoBlob], 'companyLogo.jpeg', {
            type: companyLogoBlob.type,
          });
        }

        if (imageCompanyLogo1) {
          const companyLogoBlob1 = await fetch(`http://backend.test/test/app/public/images/${imageCompanyLogo1}`).then(r => r.blob());
          myFileLogoCompany1 = new File([companyLogoBlob1], 'companyLogo1.jpeg', {
            type: companyLogoBlob1.type,
          });
        }

        if (imageCompanyLogo2) {
          const companyLogoBlob2 = await fetch(`http://backend.test/test/app/public/images/${imageCompanyLogo2}`).then(r => r.blob());
          myFileLogoCompany2 = new File([companyLogoBlob2], 'companyLogo2.jpeg', {
            type: companyLogoBlob2.type,
          });
        }

        // if (imageGif) {
        //   const gifBlob = await fetch(`http://backend.test/test/app/public/images/${imageGif}`).then(r => r.blob());
        //   myFileGif = new File([gifBlob], 'iReview.gif', {
        //     type: gifBlob.type,
        //   });
        // }

       const updatedFormData = {
          ...signature, // Ensure signature data is set first
          ...userData,
          image: imageData ? myFile : null,
          company_logo: imageCompanyLogo ? myFileLogoCompany : null,
          company_logo1: imageCompanyLogo1 ? myFileLogoCompany1 : null,
          company_logo2: imageCompanyLogo2 ? myFileLogoCompany2 : null,
          // gif: imageGif ? myFileGif : null,
        }; 

        setFormData(updatedFormData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
        if (error.response) {
          if (error.response.status === 401) {
            alert('Session expired. Please log in again.');
            navigate('/login');
          } else {
            alert(`Error: ${error.response.data.message || 'Unknown error'}`);
          }
        } else {
          alert('Error: No response from server or unexpected error');
        }
      }
    };

    fetchData();
  }, [id, navigate]);

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

      if (!token) {
        alert('No authentication token found.');
        navigate('/login');
        return;
      }
// console.log('id', id);
      fd.append('_method', 'PUT');     
      const response = await axiosInstance.post(
        `/signature-update/${id}`, fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      alert('Signature updated successfully!');
      if (userRole === 'admin') {
        navigate('/admin-dashboard');
      } else if (userRole === 'user') {
        navigate(`/user-dashboard/${id}`);
      } 
      // navigate(`/user-dashboard/${id}`);
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

  const cropImage = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.getCroppedCanvas();
      croppedCanvas.toBlob((blob) => {
        setFormData(prev => ({ ...prev, croppedImage: blob }));
      });
    }
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
