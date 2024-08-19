import React from 'react';
import "../styles/secondSignature.css";
import emailL from "/assets/images/email.png";
import phoneE from "/assets/images/phone.png";
import web from "/assets/images/web.png";
import meetingLogo from "/assets/images/MeetingLink.png";
import linkedinLogo from "/assets/images/LinkedinProfile.png";
import linkedin from "/assets/images/linkedin.png";
import x from "/assets/images/twitter.png";
import facebook from "/assets/images/facebook.png";
import instagram from "/assets/images/instagram.png";
import photo from "/assets/images/address.png";
import irevu from "/assets/images/irevu.gif";

export default function Signature2({
  showEdit,
  setShowEdit,
  formData,
  copyToClipboard,
}) {
  // Render image preview
  
  const renderImagePreview = (imageSrc) => (
    <img
      className="img-preview"
      style={{
        width: "110px",
        float: "left",
        height: "110px",
        overflow: "hidden",
        borderRadius: "50%",
      }}
      src={imageSrc}
      alt="Preview"
    />
  );

  // Get image source
  const getImageSrc = (image) => {
    if (!image) return null;

    if (typeof image === "string" && (image.startsWith("data:image") || image.startsWith("http"))) {
      return image;
    }

    return URL.createObjectURL(image);
  };

  console.log('aaaa',formData)
  return (
    <div className="content2">
      <div className="signature-content2">
        {/* Display cropped image preview */}
        {formData.croppedImage && renderImagePreview(
          getImageSrc(formData.croppedImage)
        )}

        <div className="signature-details2">
          <div>
            <span className="username2" style={{ fontSize: "13px", fontWeight: "bold" }}>
              {formData.name} {formData.last_name}
            </span>{" "}
            <p className="title-company2">
              {formData.title}
              {formData.company && <span>,</span>} {formData.company}
            </p>
          </div>
          <hr id="horizontal-line2" />
          <div className="contact-info2">
            {formData.email && (
              <a className="links2" href={`mailto:${formData.email}`}>
                <img className="mail-logo2" src={emailL} width="16" height="16" border="0" /> {formData.email}
              </a>
            )}
            {formData.meeting_link && (
              <a className="links2" href={formData.meeting_link}>
                <img className="meeting-logo2" src={meetingLogo} alt="Meeting Logo" /> Meeting Link
              </a>
            )}
            {formData.linkedin_profile && (
              <a className="links2" href={formData.linkedin_profile}>
                <img className="logos2" src={linkedinLogo} alt="Linkedin Link" />
                Linkedin Profile
              </a>
            )}
          </div>
          <div className="web-phone2">
            {formData.website && (
              <a className="web-phone-content2" href={formData.website} rel="noopener" target="_blank">
                <img className="logos2" src={web} alt="Website link" /> Website link
              </a>
            )}
            {formData.phone && (
              <a className="web-phone-content2" href={`tel:${formData.phone}`}>
                <img className="logos2" src={phoneE} alt="Phone number" /> {formData.phone}
              </a>
            )}
          </div>
          <div className="address-content2">
            <span className="address2">
              {formData.address && (
                <img className="address-logo2" src={photo} alt="Address" width="13" height="13" border="0" />
              )} {formData.address}
            </span>
          </div>
          <div className="socialmedia-links2">
            {formData.company_linkedin && (
              <a className="anchor-link2" href={formData.company_linkedin}>
                <img className="social-media-logo2" src={linkedin} alt="LinkedIn company" />
              </a>
            )}
            {formData.twitter && (
              <a className="anchor-link2" href={formData.twitter}>
                <img className="social-media-logo2" src={x} alt="Twitter" />
              </a>
            )}
            {formData.instagram && (
              <a className="anchor-link2" href={formData.instagram}>
                <img className="social-media-logo2" src={instagram} alt="Instagram" />
              </a>
            )}
            {formData.facebook && (
              <a className="anchor-link2" href={formData.facebook}>
                <img className="facebook-logo2" src={facebook} alt="Facebook" />
              </a>
            )}
            <span className="feedback-content2"> {formData.feedback}</span>
            
            {formData.gif && (
              <a href={formData.gif} rel='noopener' target='_blank'>
                <img style={{ width: "82px", height: "42px", display: 'inline-block' }} src={irevu} alt='GIF' />
              </a>
            )}
          </div>
        </div>
        <div className="companies2">
          {formData.company_logo && (
            <img className="company-logo2" style={{ width: "100px" }} src={getImageSrc(formData.company_logo)} alt="Company Logo" />
          )}
          {formData.company_logo1 && (
            <img className="company-logo2" style={{ width: "200px" }} src={getImageSrc(formData.company_logo1)} alt="Company Logo 1" />
          )}
          {formData.company_logo2 && (
            <img className="company-logo2" style={{ width: "150px" }} src={getImageSrc(formData.company_logo2)} alt="Company Logo 2" />
          )}
        </div>
        <div className="description2">
          <span className="description-area2">
            <p className="desc-test2">
              <div dangerouslySetInnerHTML={{ __html: formData.description }} />
            </p>
          </span>
        </div>
        
        {/* Optional edit button */}
        {/* {!showEdit && (
          <button className="edit-button" onClick={() => setShowEdit(true)}>
            EDIT
          </button>
        )} */}
      </div>
    </div>
  );
}
