import React, { useEffect, useState, useRef } from 'react';
import { Container, Alert } from 'react-bootstrap';
import axiosInstance from './axiosInstance';
import Signature2 from './Signature2';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { useParams } from 'react-router-dom';

const SignatureDisplay = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [htmlContent, setHtmlContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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
    const fetchSignatureHtml = async () => {
      try {
        const response = await axiosInstance.get(`/signature-html/${id}`);
        console.log("HTML Content Response:", response);
        
        const userData = response.data.user || {};
        const imageData = response.data.image && response.data.image ? response.data.image : null;

        console.log('imageData:',imageData);
        const imageCompanyLogo = imageData ? imageData.company_logo : null;
        const imageCompanyLogo1 = imageData ? imageData.company_logo1 : null;
        const imageCompanyLogo2 = imageData ? imageData.company_logo2 : null;

        const imageUrls = {
          image: imageData ? `http://backend.test/test/app/public/${imageData.image}` : null,
          company_logo: imageCompanyLogo ? `http://backend.test/test/app/public/${imageCompanyLogo}` : null,
          company_logo1: imageCompanyLogo1 ? `http://backend.test/test/app/public/${imageCompanyLogo1}` : null,
          company_logo2: imageCompanyLogo2 ? `http://backend.test/test/app/public/${imageCompanyLogo2}` : null,
        };
        console.log(imageUrls);
        const updatedFormData = {
          ...userData,
          croppedImage: imageData ? `http://backend.test/test/app/public/${imageData.image}` : null,
        company_logo: imageData ? `http://backend.test/test/app/public/${imageData.company_logo}` : null,
        company_logo1: imageData ? `http://backend.test/test/app/public/${imageData.company_logo1}` : null,
        company_logo2: imageData ? `http://backend.test/test/app/public/${imageData.company_logo2}` : null,
        ...response.data.html_content
        };

        console.log(updatedFormData)

        setHtmlContent({
          ...updatedFormData,
          ...response.data.html_content 
        });
        setLoading(false);
        
      } catch (err) {
        console.error("Fetch Error:", err);
        setError('Failed to load signature.');
        setLoading(false);
      }
    };

    fetchSignatureHtml();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  const cropImage = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.getCroppedCanvas();
      croppedCanvas.toBlob((blob) => {
        setFormData(prev => ({ ...prev, croppedImage: blob }));
      });
    }
  };
  return (
    <Container>
      <Signature2
        formData={htmlContent}
        setFormData={setFormData}
        // cropImage={handleCrop}
        cropImage={cropImage}

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
    </Container>
  );
};

export default SignatureDisplay;
