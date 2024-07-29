import React from 'react';
import { Form } from 'react-bootstrap';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const CropperProfile = ({ cropperRef, formData, setCroppedImage, formDataRefs, handleFileChange }) => {
  const handleCrop = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      const croppedDataURL = croppedCanvas.toDataURL();
      setCroppedImage(croppedDataURL);
    }
  };

  return (
    <>
      <Form.Group controlId="formCompanyLogo">
        <Form.Label>Company Logo</Form.Label>
        <Form.Control
          type="file"
          name="company_logo"
          onChange={handleFileChange}
          ref={formDataRefs.company_logo}
        />
        {formData.company_logo && (
          <Cropper
            src={URL.createObjectURL(formData.company_logo)}
            style={{ height: 400, width: '100%' }}
            initialAspectRatio={1}
            aspectRatio={1}
            guides={false}
            ref={cropperRef}
            crop={handleCrop}
          />
        )}
      </Form.Group>

      <Form.Group controlId="formCompanyLogo1">
        <Form.Label>Company Logo 1</Form.Label>
        <Form.Control
          type="file"
          name="company_logo1"
          onChange={handleFileChange}
          ref={formDataRefs.company_logo1}
        />
        {formData.company_logo1 && (
          <Cropper
            src={URL.createObjectURL(formData.company_logo1)}
            style={{ height: 400, width: '100%' }}
            initialAspectRatio={1}
            aspectRatio={1}
            guides={false}
            ref={cropperRef}
            crop={handleCrop}
          />
        )}
      </Form.Group>

      <Form.Group controlId="formCompanyLogo2">
        <Form.Label>Company Logo 2</Form.Label>
        <Form.Control
          type="file"
          name="company_logo2"
          onChange={handleFileChange}
          ref={formDataRefs.company_logo2}
        />
        {formData.company_logo2 && (
          <Cropper
            src={URL.createObjectURL(formData.company_logo2)}
            style={{ height: 400, width: '100%' }}
            initialAspectRatio={1}
            aspectRatio={1}
            guides={false}
            ref={cropperRef}
            crop={handleCrop}
          />
        )}
      </Form.Group>

      <Form.Group controlId="formGif">
        <Form.Label>GIF</Form.Label>
        <Form.Control
          type="file"
          name="gif"
          onChange={handleFileChange}
          ref={formDataRefs.gif}
        />
        {formData.gif && (
          <Cropper
            src={URL.createObjectURL(formData.gif)}
            style={{ height: 400, width: '100%' }}
            initialAspectRatio={1}
            aspectRatio={1}
            guides={false}
            ref={cropperRef}
            crop={handleCrop}
          />
        )}
      </Form.Group>
    </>
  );
};

export default CropperProfile;
