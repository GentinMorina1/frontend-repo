import photo from "/Users/gentin/Desktop/EmailSignature/src/images/address.png";
import emailL from "/Users/gentin/Desktop/EmailSignature/src/images/email.png";
import phoneE from "/Users/gentin/Desktop/EmailSignature/src/images/phone.png";
import web from "/Users/gentin/Desktop/EmailSignature/src/images/web.png";
import meetingLogo from "/Users/gentin/Desktop/EmailSignature/src/images/MeetingLink.png";
import "./secondSignature.css";
import linkedinLogo from "/Users/gentin/Desktop/EmailSignature/src/images/LinkedinProfile.png";
import linkedin from "/Users/gentin/Desktop/EmailSignature/src/images/linkedin.png";
import x from "/Users/gentin/Desktop/EmailSignature/src/images/twitter.png";
import facebook from "/Users/gentin/Desktop/EmailSignature/src/images/facebook.png";
import instagram from "/Users/gentin/Desktop/EmailSignature/src/images/instagram.png";
import Cropper from "react-cropper";
import { CropperProfile } from "./UserForm";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";





export default function Signature2({
  showEdit,
  setShowEdit,
  formData,
  setFormData,
  handleCrop,
  cropperRef
}) {

  console.log({cropperRef})
  return (
    <>
  
      <div className="content2">
        <div className="signature-content2">
          {/* {formData.image && (
            <img
              className="profile-picture"
              style={{
                "borderRadius": "50%",
                height: "110px",
                width: "110px",
              }}
              src={URL.createObjectURL(formData.image)}
            />
          )} */}

{/* {formData.croppedImage && (
          <img
            className="profile-picture"
            style={{ borderRadius: "50%", height: "110px", width: "110px" }}
            src={formData.croppedImage}
          />
        )} */}
   
        <div
            className="img-preview"
            style={{ width: "110px", float: "left", height: "110px", overflow:"hidden", "border-radius":"50%"}}
          />
{/* {formData.image && <CropperProfile className="img-preview2" style={{ borderRadius: "50%", height: "110px", width: "110px" }} image={formData.image}  />} */}
{/* {formData.image} */}

<div/>
       {/* <div
       className="img-preview2"
       style={{   maxWidth:"110px", maxHeight:"110px", width:"110px", height:"110px", float: "left" }}
>
            
            
            
            </div> */}
             
         

      
          <div className="signature-details2">
            <div>
           
                <span className="username2" style={{ "font-size": "15px", "font-weight": "bold" }}>
                  {formData.name} {formData.lastName}
                </span>{" "}
          
              <p className="title-company2">
                {formData.title}
                {formData.company && <span>,</span>} {formData.company}
              </p>
            </div>
            <hr id="horizontal-line2" />
            <div className="contact-info2">
              {formData.email && (
                <a className="links2" href={"mailto: " + formData.email}>
                  <img
                    className="mail-logo2"
                    src={emailL}
                    width="16"
                    height="16"
                    border="0"
                  />{" "}
                  {formData.email}
                </a>
              )}
              {formData.meetingLink && (
                <a className="links2" href={formData.meetingLink}>
                  <img
                    className="meeting-logo2"
                    src={meetingLogo}
                    alt="Meeting Logo"
                  />{" "}
                  Meeting Link{" "}
                </a>
              )}
              {formData.linkedinProfile && (
                <a className="links2" href={formData.linkedinProfile}>
                  <img
                    className="logos2"
                    src={linkedinLogo}
                    alt="Linkedin Link"
                  />
                  Linkedin Profile{" "}
                </a>
              )}
            </div>
            <div className="web-phone2">
              {formData.website && (
                <a
                  className="web-phone-content2"
                  href={formData.website}
                  rel="noopener"
                  target="_blank"
                  data-saferedirecturl
                >
                  <img className="logos2" src={web} /> Website Link
                </a>
              )}
              {formData.phone && (
                <a className="web-phone-content2" href="tel:{formData.phone}">
                  <img className="logos2" src={phoneE} alt="phone-number" />{" "}
                  {formData.phone}
                </a>
              )}
            </div>
            <div className="address-content2">
              <span className="address2">
                {formData.address && (
                  <img
                    className="address-logo2"
                    src={photo}
                    alt="address"
                    width="13"
                    height="13"
                    border="0"
                  />
                )}{" "}
                {formData.address}
              </span>
            </div>
            <div className="socialmedia-links2">
              {formData.companyLinkedin && (
                <a className="anchor-link2" href={formData.companyLinkedin}>
                  <img
                    className="social-media-logo2"
                    src={linkedin}
                    alt="linkedin company"
                  />
                </a>
              )}
              {formData.x && (
                <a className="anchor-link2" href={formData.x}>
                  <img className="social-media-logo2" src={x} alt="x" />
                </a>
              )}
              {formData.instagram && (
                <a className="anchor-link2" href={formData.instagram}>
                  <img
                    className="social-media-logo2"
                    src={instagram}
                    alt="Instagram"
                  />
                </a>
              )}
              {formData.facebook && (
                <a className="anchor-link2" href={formData.facebook}>
                  <img
                    className="facebook-logo2"
                    src={facebook}
                    alt="facebook"
                  />
                </a>
              )}
              <span className="feedback-content2"> {formData.feedback}</span>
              {formData.gif && (
                <img
                  style={{ width: "82px", height:"42px" }}
                  src={URL.createObjectURL(formData.gif)}
                />
              )}
            </div>
          </div>
        </div>
        <div className="companies2">
        {formData.companyLogo && (
            <img
            className="company-logo2"
             style={{width:"100px"}}
             src={URL.createObjectURL(formData.companyLogo)}
             />
           )}
           {formData.companyLogo1 && (
            <img
               className=""
               style={{width:"200px"}}
               src={URL.createObjectURL(formData.companyLogo1)}
             />
           )}
           {formData.companyLogo2 && (
            <img
               className=""
               style={{width:"150px"}}

               src={URL.createObjectURL(formData.companyLogo2)}
             />
           )}
        </div>
        <div className="descripton2">
        <span className="description-area2">
            <p className="desc-test2"> <div dangerouslySetInnerHTML={{ __html: formData.description }} /></p> 
           </span>
        </div>
      </div>

      {/* 
<div class="grid-container">
  <div class="box"> <div className="profile-picture">
          {formData.image && (
              <img
                className="profile-picture"
                style={{
                  "border-radius": "50%",
                  height: "110px",
                  width: "110px",
                }}
                src={URL.createObjectURL(formData.image)}
              />
            )}
            
          </div></div>
  <div class="box"> <div className="signature-details"><span>{formData.name} {formData.lastName}</span>
          <div>{formData.title}
              {formData.company && <span>,</span>} {formData.company}</div></div>
          <div className="contact-info">
          {formData.email && (
            <a className="contact-links" href={"mailto: " + formData.email}>
              <img src={emailL} width="13" height="13" border="0" /> Email
            </a>
          )}
          {formData.meetingLink && <a href={formData.meetingLink}><img src={meetingLogo} alt="Meeting Logo"   style={{ width: "16px", height: "15px" }} /> Meeting Link </a>}
        
          </div></div>
  <div class="box box-span-two">New Box</div>
</div> */}
    </>
  );
}