import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./index.css";
import App from "./App";
// import Signature from "./Signature";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Signature2 from "./Signature2";
import "cropperjs/dist/cropper.css";
import React, { useState, useRef, memo } from "react";
import Cropper from "react-cropper";
import axios from "axios";


axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

export function CropperProfile({image="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg", cropperRef}){




  const handleCrop = () => {
    const cropper = cropperRef.current.cropper;
    onCrop(cropper.getCroppedCanvas().toDataURL());
  };

  return (<div>  {image &&  <Cropper
    style={{ height: 400, width: "400px" }}
    initialAspectRatio={1}
    preview=".img-preview"
    src={URL.createObjectURL(image)}
    ref={cropperRef}
    viewMode={1}
    guides={true}
    minCropBoxHeight={110}
    minCropBoxWidth={110}
    background={false}
    responsive={true}
    aspectRatio={1}
    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
  />}
 </div>)
}

const MemoCropperProfile = memo(CropperProfile)

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
  setFormData(e.target.value);
};

export default function UserForm({ setShowEdit, formData, setFormData }) {
  const [statusForm, setStatusForm] = useState({
    email: "",
  });
  const handleCrop = (croppedImage) => {
    setFormData({ ...formData, croppedImage });
  };

  function handleInputBlur(e) {
    const nameInput = e.target.name;
    if (nameInput === "email" && !validateEmail(e.target.value)) {
      setStatusForm({
        ...statusForm,
        email: "Email is Invalid",
      });
    }
  }
  function handleInputFocus(e) {
    const nameInput = e.target.name;
    setStatusForm({
      ...statusForm,
      [nameInput]: "",
    });
  }
  function handleDeleteClick(){
    setFormData('');
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    const fd = new FormData();
    for ( var key in formData ) {
      fd.append(key, formData[key]);
   

  }
    // const response = await axios.post('http://localhost:8000/api/users', fd);
    
    // const data = new FormData();
    // for (const key in formData) {
    //   data.append(key, formData[key]);
    // }

    // try {
    //   if (isEdit) {
    //     const response = await axios.put(`https://your-backend-endpoint.com/api/form/${formData.id}`, formData);
    //     console.log(response.data);
    //     alert('Form updated successfully!');
    //   } else {
    //     
    //     console.log(response.data);
    //     alert('Form submitted successfully!');
    //   }

    //   setFormData({
    //     name: '', email: '', message: '', lastName: '', title: '', company: '', profile: '', meetingLink: '', address: '', website: '', x: '', companyLinkedin: '', facebook: '', instagram: '', feedback: '', phone: '', image: null, companyLogo: null, companyLogo1: null, companyLogo2: null, companyLogo3: null, gif: null, description: ''
    //   });
    // } catch (error) {
    //   console.error('There was an error submitting the form!', error);
    //   alert('There was an error submitting the form.');
    // }
  //   setShowEdit(false);
  // };
  console.log('Form Data:', formData);

  try {
    const response = await axios.post('http://localhost:8000/api/users', fd, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    console.log(response.data);
    alert('Form submitted successfully!');
    setFormData({
      name: "",
      lastName: "",
      title: "",
      company: "",
      meetingLink: "",
      address: "",
      website: "",
      x: "",
      companyLinkedin: "",
      linkedinProfile:"",
      facebook: "",
      instagram: "",
      feedback: "",
      phone: "",
      email: "",   
      profilePic:null,
      "company-logo1": null,
      "company-logo2": null,
      "company-logo3": null,
      gif: null,
      description: "",
    });
} catch (error) {
  console.error('Axios Error:', error);

  if (error.response) {
    // The request was made and the server responded with a status code
    console.error('Server Error:', error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response from server:', error.request);
  } else {
    // Something happened in setting up the request that triggered an error
    console.error('Request error:', error.message);
  }
  // Handle error
}

setShowEdit(false);
};


  // const emailIsInvalid= formData.email !== '' && !formData.email.includes('@');
  const openLinkedInProfile = () => {
    window.open("https://www.linkedin.com/", "_blank");
  };  
  
  return (
    <>
      <div className="form-content">
        <h2>Signature details</h2>
       


<div
            
          />
        <form action="">
          <Form.Control
            className="input-form"
            required
            name="name"
            type="text"
            placeholder="First name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
          <Form.Control
            className="input-form"
            required
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={(e) => {
              setFormData({ ...formData, lastName: e.target.value });
            }}
          />
          <Form.Control
            className="input-form"
            required
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />
          <Form.Control
            className="input-form"
            required
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={(e) => {
              setFormData({ ...formData, company: e.target.value });
            }}
          />
           <Form.Control
              className="input-form"
              name="meetingLink"
              type="url"
              placeholder="Meeting link"
              value={formData.meetingLink}
              onChange={(e) => {
                setFormData({ ...formData, meetingLink: e.target.value });
              }}
            />
          <Form.Control
            className="input-form"
            required
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => {
              setFormData({ ...formData, address: e.target.value });
            }}
          />
          <Form.Control
            className="input-form"
            type="url"
            placeholder="Website link"
            name="website"
            value={formData.website}
            onChange={(e) => {
              setFormData({ ...formData, website: e.target.value });
            }}
          />
          <Form.Control
            className="input-form"
            type="url"
            placeholder="X"
            name="x"
            value={formData.x}
            onChange={(e) => {
              setFormData({ ...formData, x: e.target.value });
            }}
          />
          <Form.Control
            className="input-form"
            type="url"
            placeholder="Company Linkedin Profile URL"
            name="companyLinkedin"
            value={formData.companyLinkedin}
            onChange={(e) => {
              setFormData({ ...formData, companyLinkedin: e.target.value });
            }}
          />
          <Form.Group className="mb-3">
            <Form.Control
              className="input-form"
              type="url"
              placeholder="Enter your LinkedIn profile URL"
              name="linkedinProfile"
              value={formData.linkedinProfile}
              onChange={(e) => {
                setFormData({ ...formData, linkedinProfile: e.target.value });
              }}
            />
            <Form.Control
              className="input-form"
              required
              type="url"
              name="facebook"
              placeholder="Facebook"
              value={formData.facebook}
              onChange={(e) => {
                setFormData({ ...formData, facebook: e.target.value });
              }}
            />
            <Form.Control
              className="input-form"
              required
              name="instagram"
              type="url"
              placeholder="Instagram"
              value={formData.instagram}
              onChange={(e) => {
                setFormData({ ...formData, instagram: e.target.value });
              }}
            />
             <Form.Control
              className="input-form"
              required
              name="feedback"
              type="text"
              placeholder="Feedback"
              value={formData.feedback}
              onChange={(e) => {
                setFormData({ ...formData, feedback: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Control
            className="input-form"
            name="phone"
            required
            type = "text" inputmode = "numeric"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
            }}
          />
          <Form.Control
            className="input-form"
            required
            type="email"
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          <div className="email-error">
            {" "}
            {statusForm.email && <p>{statusForm.email}</p>}
          </div>
          <label htmlFor="Profile-img">Profile Picture:</label>
          <Form.Control
            className="input-form"
            type="file"
            placeholder="Image"
            name="profilePic"
            onChange={(e) => {
              setFormData({ ...formData, image: e.target.files[0] });
            }}
          />
          <MemoCropperProfile image={formData.image}/>
          <label htmlFor="Company-logo">Company Logo:</label>
          <Form.Control
            className="input-form"
            type="file"
            name="company-logo1"
            placeholder="Company Logo"
            onChange={(e) => {
              setFormData({ ...formData, companyLogo: e.target.files[0] });
            }}
          />
          <label htmlFor="Company-logo">Company Logo:</label>
          <Form.Control
            className="input-form"
            type="file"
            name="company-logo2"

            placeholder="Company Logo"
            onChange={(e) => {
              setFormData({ ...formData, companyLogo1: e.target.files[0] });
            }}
          />
          <label htmlFor="Company-logo">Company Logo:</label>
          <Form.Control
            className="input-form"
            type="file"
            name="company-logo3"

            placeholder="Company Logo"
            onChange={(e) => {
              setFormData({ ...formData, companyLogo2: e.target.files[0] });
            }}
          />
          {/* <label htmlFor="Company-logo">Company Logo:</label>
          <Form.Control
            className="input-form"
            type="file"
            name="company-logo4"

            placeholder="Company Logo"
            onChange={(e) => {
              setFormData({ ...formData, companyLogo3: e.target.files[0] });
            }}
          /> */}
           <label htmlFor="Gif-logo">Gif </label>
          <Form.Control
            className="input-form"
            type="file"
            name="gif"
            placeholder="Gif"
            onChange={(e) => {
              setFormData({ ...formData, gif: e.target.files[0] });
            }}
          />
          <ReactQuill
            theme="snow"
            name="description"
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e });
            }}
          />
          <button className="button" type="button "onClick={handleDeleteClick}>Clear</button>
          <button className="button" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
        
      </div>
    </>
  );
}
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};