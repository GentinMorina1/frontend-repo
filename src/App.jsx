import { useState, useRef } from "react";
import reactLogo from "/assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./index.css";
// import Signature from "./Signature";
import UserForm from "./UserForm";
import Signature2 from "./Signature2";
import Signature from "./Signature";
import "./secondSignature.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    title: "",
    company: "",
    linkedinProfile: "",
    phone: "",
    email: "",
    facebook: "",
    instagram: "",
    image: "",
    description: "",
    website: "",
    address: "",
    companyLogo: null,
    companyLogo1: null,
    companyLogo2: null,
    companyLogo3: null,
    meetingLink:"",
    x:"",
    companyLinkedin:"",
    feedback:"",
    gif:null
  });
  const [showEdit, setShowEdit] = useState(true);
  const [activeComponent, setActiveComponent] = useState(null);
 const renderFirstSignature= () => {
  setActiveComponent('A');
 }
 const renderSecondSignature= () => {
  setActiveComponent('B');
 }
 const cropperRef = useRef(null);

  return (
    <>
      <Row>
        {showEdit && (
          <Col md={4}>
            <UserForm
              setShowEdit={setShowEdit}
              formData={formData}
              setFormData={setFormData}
              cropperRef={cropperRef}
            />
          </Col>
        )}
        <Col className="second-column" md={8}>
     <button onClick={renderFirstSignature}>First</button>
<div style={(activeComponent === 'A')? {display:"block"}: {display:"none"}}> <Signature2 formData={formData}
            setFormData={setFormData} cropperRef={cropperRef}/></div>
            <button onClick={renderSecondSignature}>second</button>
<div style={(activeComponent === 'B')? {display:"block"}: {display:"none"}} ><Signature formData={formData} showEdit={showEdit}
            setShowEdit={setShowEdit} /></div>
          {/* <Signature
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            formData={formData}
            setFormData={setFormData}
          /> */}
          {/* <Signature2   formData={formData}
            setFormData={setFormData}/> */}
        </Col>
      </Row>
    </>
  );
}

export default App;
