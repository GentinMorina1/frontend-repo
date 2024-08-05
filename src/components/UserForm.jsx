import { Form } from "react-bootstrap";
import "../styles/index.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "cropperjs/dist/cropper.css";
import React, { useState, useRef, memo, useEffect } from "react";
import Cropper from "react-cropper";
import axios from "axios";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://backend.test/api/users";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

export function CropperProfile({
  image = "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg",
  setFormData,
}) {
  const cropperRef = useRef(null);
  const handleCrop = () => {
    const cropper = cropperRef.current.cropper;
    console.log(
      "cropped end",
      cropper.getCroppedCanvas().toBlob(function (blob) {
        console.log("blob", blob);
        setFormData((p) => {
          return { ...p, croppedImage: blob };
        });
      })
    );
    // onCrop(cropper.getCroppedCanvas().toDataURL());
  };
  console.log(image);
  return (
    <div>
      {" "}
      {image && (
        <Cropper
          style={{ height: 400, width: "400px" }}
          initialAspectRatio={1}
          preview=".img-preview"
          src={
            typeof image === "string" && image.includes("http")
              ? image
              : URL.createObjectURL(image)
          }
          ref={cropperRef}
          viewMode={1}
          crossOrigin="anonymous"
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
}

const MemoCropperProfile = memo(CropperProfile);

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
  setFormData(e.target.value);
};

export default function UserForm({
  setShowEdit,
  formData,
  setFormData,
  signatures,
  setSignatures,
  handleEditClick,
}) {
  const formDataImageRef = useRef();
  const formDataCompanyLogoRef= useRef();
  const formDataCompanyLogoRef1= useRef();
   const formDataCompanyLogoRef2= useRef();
   const formDataGifRef = useRef(null);
   const navigate = useNavigate();




  const [statusForm, setStatusForm] = useState({
    email: "",
    name: "",
  });
  const [userId, setUserId] = useState(null);


  useEffect(()=>{
    if(formData?.image){

      let listTransfer = new DataTransfer();
      // x.files.push(formData.image);
      listTransfer.items.add(formData.image);
      formDataImageRef.current.files = listTransfer.files;
    }
  },[formData?.image]);

  useEffect(()=>{
    if(formData?.company_logo){

      let listTransfer = new DataTransfer();
      // x.files.push(formData.image);
      listTransfer.items.add(formData.company_logo);
      formDataCompanyLogoRef.current.files = listTransfer.files;
    }

  },[formData?.company_logo]);
  useEffect(()=>{
    if(formData?.company_logo1){

      let listTransfer = new DataTransfer();
      // x.files.push(formData.image);
      listTransfer.items.add(formData.company_logo1);
      formDataCompanyLogoRef1.current.files = listTransfer.files;
    }

  },[formData?.company_logo1]);
  useEffect(()=>{
    if(formData?.company_logo2){

      let listTransfer = new DataTransfer();
      // x.files.push(formData.image);
      listTransfer.items.add(formData.company_logo2);
      formDataCompanyLogoRef2.current.files = listTransfer.files;
    }

  },[formData?.company_logo2]);
  useEffect(()=>{
    if(formData?.gif){
      let listTransfer = new DataTransfer();
      listTransfer.items.add(formData.gif);
      formDataGifRef.current.files = listTransfer.files;
    }
  },[formData?.gif]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

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
  function handleDeleteClick() {
    setFormData("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("image", formData.croppedImage);
    fd.append("name", formData.name);
    fd.append("last_name", formData.last_name);
    fd.append("title", formData.title);
    fd.append("company", formData.company);
    fd.append("linkedin_profile", formData.linkedin_profile);
    fd.append("facebook", formData.facebook);
    fd.append("instagram", formData.instagram);
    fd.append("twitter", formData.twitter);
    fd.append("address", formData.address);
    fd.append("website", formData.website);
    fd.append("description", formData.description);
    fd.append("phone", formData.phone);
    fd.append("email", formData.email);
    fd.append("company_linkedin", formData.company_linkedin);
    fd.append("feedback", formData.feedback);
    fd.append("meeting_link", formData.meeting_link);
    fd.append("gif", formData.gif);
    fd.append("company_logo", formData.company_logo);
    fd.append("company_logo1", formData.company_logo1);
    fd.append("company_logo2", formData.company_logo2);
    fd.append("id", formData.id);

    try {
      const token = localStorage.getItem('token'); // Ensure you have the token stored in localStorage
      const response = await axios.post('http://backend.test/api/signature/store', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(response.data);
      alert("Form submitted successfully!");
      navigate('/user-dashboard'); // Navigate to the user dashboard

    } catch (error) {
      console.error("Axios Error:", error);
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("No response from server:", error.request);
      } else {
        console.error("Request error:", error.message);
      }
    }
  
    setShowEdit(false);
  };
  const openLinkedInProfile = () => {
    window.open("https://www.linkedin.com/", "_blank");
  };

  return (
    <>
      <div className="form-content">
        <h2>Signature details</h2>

        <div />
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
            name="last_name"
            placeholder="Last name"
            value={formData.last_name}
            onChange={(e) => {
              setFormData({ ...formData, last_name: e.target.value });
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
            name="meeting_link"
            type="url"
            placeholder="Meeting link"
            value={formData.meetingLink}
            onChange={(e) => {
              setFormData({ ...formData, meeting_link: e.target.value });
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
            name="twitter"
            value={formData.x}
            onChange={(e) => {
              setFormData({ ...formData, twitter: e.target.value });
            }}
          />
          <Form.Control
            className="input-form"
            type="url"
            placeholder="Company Linkedin Profile URL"
            name="company_linkedin"
            value={formData.companyLinkedin}
            onChange={(e) => {
              setFormData({ ...formData, company_linkedin: e.target.value });
            }}
          />
          <Form.Group className="mb-3">
            <Form.Control
              className="input-form"
              type="url"
              placeholder="Enter your LinkedIn profile URL"
              name="linkedin_profile"
              value={formData.linkedinProfile}
              onChange={(e) => {
                setFormData({ ...formData, linkedin_profile: e.target.value });
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
            type="text"
            inputmode="numeric"
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
          <label htmlFor="image">Profile Picture:</label>
          <Form.Control
            className="input-form"
            type="file"
            placeholder="Image"
            name="image"
            ref={formDataImageRef}
            onChange={(e) => {
              setFormData({ ...formData, image: e.target.files[0] });
            }}
          />
          {/* <img src={formData.image} style={{ "width": "200px", "height":"200px", "outline": "2px solid red"}} /> */}
          <MemoCropperProfile
            setFormData={setFormData}
            image={formData.image}
          />
          <label htmlFor="company_logo">Company Logo:</label>
          <Form.Control
            className="input-form"
            type="file"
            name="company_logo"         
            placeholder="Company Logo"
            ref={formDataCompanyLogoRef}
            onChange={(e) => {
              setFormData({ ...formData, company_logo: e.target.files[0] });
            }}
          />
          <label htmlFor="company_logo1">Company Logo:</label>
          <Form.Control
            className="input-form"
            type="file"
            name="company_logo1"
            placeholder="Company Logo"
           ref={formDataCompanyLogoRef1}

            onChange={(e) => {
              setFormData({ ...formData, company_logo1: e.target.files[0] });
            }}
          />
          <label htmlFor="company_logo2">Company Logo:</label>
          <Form.Control
            className="input-form"
            type="file"
            name="company_logo2"
            placeholder="Company Logo"
            ref={formDataCompanyLogoRef2}

            onChange={(e) => {
              setFormData({ ...formData, company_logo2: e.target.files[0] });
            }}
          />

          <label htmlFor="gif">Gif </label>
          <Form.Control
            className="input-form"
            type="file"
            name="gif"
            placeholder="Gif"
            ref={formDataGifRef}
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
          {/* <Button type="submit" className="btn-primary">
          {formData.id ? "Update Signature" : "Add Signature"}
        </Button> */}
          <button className="button" type="button " onClick={handleDeleteClick}>
            Clear
          </button>
          <button className="button" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
