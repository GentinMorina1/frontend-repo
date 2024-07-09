import Table from "react-bootstrap/Table";
import UserForm from "./UserForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import "./index.css";
import photo from "/assets/images/address.png";
import emailL from "/assets/images/email.png";
import phoneE from "/assets/images/phone.png";
import web from "/assets/images/web.png";
import App from "./App";
import { left } from "@popperjs/core";


export default function Signature({
  showEdit,
  setShowEdit,
  formData,
  setFormData,
}) {
  return (
    <div className="signature-background">
    <div className="main-signature">
      <div className="signature-content">
        <div className="title-company">
          {" "}
          <div className="username">
            <span>
              <b>
                {formData.name} {formData.last_name}
              </b>
            </span>
            <div>
              {formData.title}
              {formData.company && <span>,</span>} {formData.company}
            </div>
          </div>
          <span className="profile">
            {formData.image && (
              <img
                className="profile-picture"
                style={{
                  "border-radius": "50%",
                  height: "100px",
                  width: "100px",
                }}
                src={URL.createObjectURL(formData.image)}
              />
            )}
          </span>
        </div>

        <div className="email-phone-website">
          {formData.email && (
            <a className="contact-links" href={"mailto: " + formData.email}>
              <img src={emailL} width="13" height="13" border="0" /> Email
            </a>
          )}
          {formData.phone && <span style={{ "margin-left": "10px" }}> |</span>}
          {formData.phone && (
            <span style={{ "margin-left": "20px" }}>
              <a className="contact-links" href="tel:{formData.phone}">
                <img src={phoneE} width="13" height="13" border="0" /> Phone
              </a>
            </span>
          )}
          {formData.website && (
            <span style={{ "margin-left": "10px" }}> |</span>
          )}
          {formData.website && (
            <a
              className="contact-links"
              style={{ "margin-left": "20px" }}
              href={formData.website}
              rel="noopener"
              target="_blank"
              data-saferedirecturl
            >
              <img src={web} width="13" height="13" border="0" /> Website Link
            </a>
          )}
          <span className="profile"></span>
        </div>

        <div className="address-links">
          <span className="address">
            {formData.address && (
              <img
                src={photo}
                alt="address"
                width="13"
                height="13"
                border="0"
              />
            )}{" "}
            {formData.address}
          </span>

          {formData.linkedin_profile && (
            <a
              className="anchor-link"
              href={formData.linkedin_profile}
              rel="noopener"
              target="_blank"
              data-saferedirecturl
            >
              <FontAwesomeIcon
                style={{ height: "22px" }}
                icon={faLinkedin}
              ></FontAwesomeIcon>{" "}
            </a>
          )}
          {formData.instagram && (
            <span style={{ "margin-left": "10px" }}>|</span>
          )}
          {formData.instagram && (
            <a
              className="anchor-link"
              href={formData.instagram}
              rel="noopener"
              target="_blank"
              data-saferedirecturl
            >
              <FontAwesomeIcon style={{ height: "22px" }} icon={faInstagram} />{" "}
            </a>
          )}
          {formData.facebook && (
            <span style={{ "margin-left": "10px" }}>|</span>
          )}
          {formData.facebook && (
            <a
              className="anchor-link"
              href={formData.facebook}
              rel="noopener"
              target="_blank"
              data-saferedirecturl
            >
              <FontAwesomeIcon style={{ height: "22px" }} icon={faFacebook} />
            </a>
          )}
        </div>

        <div className="company-logos">
          {formData.company_logo && (
            <img
              className=""
              style={{ width: "100px" }}
              src={URL.createObjectURL(formData.company_logo)}
            />
          )}
          {formData.company_logo1 && (
            <img
              className=""
              style={{ width: "100px", "margin-left": "10px" }}
              src={URL.createObjectURL(formData.company_logo1)}
            />
          )}
          {formData.company_logo2 && (
            <img
              className=""
              style={{ width: "100px", "margin-left": "10px" }}
              src={URL.createObjectURL(formData.company_logo2)}
            />
          )}
          {/* {formData.companyLogo3 && (
            <img
              className=""
              style={{ width: "100px", "margin-left": "10px" }}
              src={URL.createObjectURL(formData.companyLogo3)}
            />
          )} */}
        </div>
        <div>
          <hr />
          <div id="text">
            <span className="description-area">
              <div dangerouslySetInnerHTML={{ __html: formData.description }} />
            </span>
          </div>
          {!showEdit && (
            <button className="edit-button" onClick={() => setShowEdit(true)}>
              EDIT
            </button>
          )}
        </div>
      </div>
    </div> 
    </div>
  );
}
