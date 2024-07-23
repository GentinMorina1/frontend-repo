
import "../styles/index.css";
import "react-quill/dist/quill.snow.css";
import Signature2 from "../components/Signature2";
import "cropperjs/dist/cropper.css";
import React, { useState, useRef, memo, useEffect } from "react";
import axios from "axios";
import UserForm from "../components/UserForm";
import { useParams } from 'react-router-dom';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



export default function Edit({
  formData,
  setFormData,
}) {
  const { id } = useParams();
  const [showEdit, setShowEdit] = useState(true);
  const [activeComponent, setActiveComponent] = useState(null);
  const [signatures, setSignatures] = useState([]);
  const [users, setUsers] = useState([]);
const cropperRef=useRef(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);




useEffect(() => {
  const fetchData = async (id) => {
    try {
      const response = await axios.get(`http://backend.test/api/users/${id}`);
      console.log('Full API Response:', response.data);

      const userData = response.data.user;
      const imageData = response.data.image && response.data.image[0] ? response.data.image[0] : null;

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
        const imageBlob = await fetch(`http://backend.test/test/app/public/images/${imageData.image}`).then(r => r.blob());
        myFile = new File([imageBlob], 'image.jpeg', {
          type: imageBlob.type,
        });
      }

      if (imageCompanyLogo) {
        // console.log('Company Logo URL:', `http://backend.test/test/app/public/images/${imageCompanyLogo}`);
        const companyLogoBlob = await fetch(`http://backend.test/test/app/public/images/${imageCompanyLogo}`).then(r => r.blob());
        console.log('Company Logo Blob:', companyLogoBlob);
        myFileLogoCompany = new File([companyLogoBlob], 'companyLogo.jpeg', {
          type: companyLogoBlob.type,
        });
      } else {
        console.log('imageCompanyLogo is null');
      }

      if (imageCompanyLogo1) {
        // console.log('Company Logo1 URL:', `http://backend.test/test/app/public/images/${imageCompanyLogo1}`);
        const companyLogoBlob1 = await fetch(`http://backend.test/test/app/public/images/${imageCompanyLogo1}`).then(r => r.blob());
        console.log('Company Logo1 Blob:', companyLogoBlob1);
        myFileLogoCompany1 = new File([companyLogoBlob1], 'companyLogo1.jpeg', {
          type: companyLogoBlob1.type,
        });
      } else {
        console.log('imageCompanyLogo1 is null');
      }

      if (imageCompanyLogo2) {
        // console.log('Company Logo2 URL:', `http://backend.test/test/app/public/images/${imageCompanyLogo2}`);
        const companyLogoBlob2 = await fetch(`http://backend.test/test/app/public/images/${imageCompanyLogo2}`).then(r => r.blob());
        console.log('Company Logo2 Blob:', companyLogoBlob2);
        myFileLogoCompany2 = new File([companyLogoBlob2], 'companyLogo2.jpeg', {
          type: companyLogoBlob2.type,
        });
      } else {
        console.log('imageCompanyLogo2 is null');
      }

      if (imageGif) {
        const gifBlob = await fetch(`http://backend.test/test/app/public/images/${imageGif}`).then(r => r.blob());
        console.log('Gif Blob:', gifBlob);
        myFileGif = new File([gifBlob], 'iReview.gif', {
          type: gifBlob.type,
        });
      } else {
        console.log('imageGif is null');
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
    }
  };

  fetchData(id); // Fetch data when id changes
}, [id, setFormData]);



const handleUpdate = async () => {
    const fd = new FormData();
    for (const key in formData) {
      fd.append(key, formData[key]);
    }
    console.log("handle update");
    console.log(formData);

    //-------------------------------
    try {
      if (formData.id) {
        // Append _method=PUT for Laravel
        console.log("aa", formData);
        formData["_method"] = "PUT";
        const response = await axios.post(
          `http://backend.test/api/users/${formData.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        alert("User updated successfully!");
      } else {
        alert("Please select a user to update."); // Handle error scenario
      }
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
  };
  


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
 <Row>
 <Col md={4}>
     <UserForm
       setShowEdit={setShowEdit}
       formData={formData}
       setFormData={setFormData}
       cropperRef={cropperRef}
       signatures={signatures}
       setSignatures={setSignatures}
     />
      </Col>
      <Col md={8}>

  <Signature2
        formData={formData}
            setFormData={setFormData}
          showEdit={showEdit}
        setShowEdit={setShowEdit}
         cropperRef={cropperRef}
       />
       

    
    {showEdit && (
      <button className="submit-button" onClick={handleUpdate}>
        Update
      </button>
    )}
          </Col>

    </Row>
    </>
  );
}

