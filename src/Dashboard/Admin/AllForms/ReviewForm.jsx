import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReviewForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serviceUserName: "",
    serviceUserId: "",
    reviewType: "planned",
    requestedBy: "",
    dateDue: "",
    dateCarriedOut: "",
    carePlanChanges: "",
    riskChanges: "",
    carriedOutWith: {
      localAuthority: false,
      serviceUser: false,
      relatives: false,
      observations: false,
      mhProfessional: false,
      healthProfessional: false,
      hospital: false,
      other: false,
      otherText: ""
    },
    reviewCarriedBy: "",
    reviewCarriedSignature: "",
    otherPresent1: "",
    otherPresent1Signature: "",
    otherPresent2: "",
    otherPresent2Signature: "",
    professionalsInformed: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxGroup = (field) => {
    setFormData(prev => ({
      ...prev,
      carriedOutWith: {
        ...prev.carriedOutWith,
        [field]: !prev.carriedOutWith[field]
      }
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saved Data:", formData);
    alert("Review form saved successfully!");
    navigate("/admin/forms");
  };

  // Styles
  const containerStyle = {
    maxWidth: "100%",
    margin: "0 auto",
    fontFamily: "Segoe UI",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    position: "relative"
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap"
  };

  const backBtnStyle = {
    background: "#3A8DFF",
    border: "none",
    color: "#ffffff",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    order: 1
  };

  const logoStyle = {
    height: "50px",
    width: "auto",
    maxWidth: "120px",
    objectFit: "contain",
    order: 2
  };

  const titleStyle = {
    color: "#00264D",
    marginBottom: "20px",
    marginTop: "0",
    textAlign: "center"
  };

  const sectionStyle = {
    fontWeight: 700,
    margin: "20px 0 10px",
    color: "#00264D",
    fontSize: "18px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "5px"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    boxSizing: "border-box",
    fontSize: "16px",
    marginBottom: "15px"
  };

  const rowStyle = {
    display: "flex",
    gap: "15px",
    marginBottom: "15px",
    flexWrap: "wrap"
  };

  const checkboxContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "10px",
    marginBottom: "15px",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #e0e0e0"
  };

  const checkboxItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 0"
  };

  const checkboxStyle = {
    width: "18px",
    height: "18px"
  };

  const saveBtnStyle = {
    padding: "14px 20px",
    backgroundColor: "#00264D",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "16px",
    width: "100%",
    marginTop: "20px",
    transition: "all 0.3s ease"
  };

  return (
    <div style={containerStyle}>
      {/* Header with Logo and Back Button */}
      <div style={headerStyle}>
        <button
          onClick={() => navigate("/admin/forms")}
          style={backBtnStyle}
        >
          ← Back
        </button>
        
        <img
          src="https://unitecare.org/content/images/logo.png"
          alt="Unite Care Ltd Logo"
          style={logoStyle}
        />
      </div>

      <h2 style={titleStyle}>
        Review Form (Care Plan / Risk)
      </h2>

      <form onSubmit={handleSave}>
        {/* Service User Details */}
        <div style={sectionStyle}>Service User Details</div>
        
        <div style={rowStyle}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
              Service User Name
            </label>
            <input
              type="text"
              name="serviceUserName"
              value={formData.serviceUserName}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
              Service User ID
            </label>
            <input
              type="text"
              name="serviceUserId"
              value={formData.serviceUserId}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Review Details */}
        <div style={sectionStyle}>Review Details</div>
        
        <div style={rowStyle}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
              Review Type
            </label>
            <div style={{ display: "flex", gap: "15px", marginBottom: "8px" }}>
              {["planned", "unplanned", "requested"].map(type => (
                <label key={type} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <input
                    type="radio"
                    name="reviewType"
                    value={type}
                    checked={formData.reviewType === type}
                    onChange={handleChange}
                  />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>
            
            {formData.reviewType === "requested" && (
              <input
                type="text"
                name="requestedBy"
                placeholder="Requested by whom?"
                value={formData.requestedBy}
                onChange={handleChange}
                style={inputStyle}
              />
            )}
          </div>
        </div>

        <div style={rowStyle}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
              Date Due
            </label>
            <input
              type="date"
              name="dateDue"
              value={formData.dateDue}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
              Date Carried Out
            </label>
            <input
              type="date"
              name="dateCarriedOut"
              value={formData.dateCarriedOut}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Changes Section */}
        <div style={sectionStyle}>Changes</div>
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
            Changes to Service (Care Plan)
          </label>
          <textarea
            name="carePlanChanges"
            value={formData.carePlanChanges}
            onChange={handleChange}
            rows="3"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
            Changes to Risks
          </label>
          <textarea
            name="riskChanges"
            value={formData.riskChanges}
            onChange={handleChange}
            rows="3"
            style={inputStyle}
          />
        </div>

        {/* Carried Out With Section */}
        <div style={sectionStyle}>Carried Out With</div>
        
        <div style={checkboxContainerStyle}>
          {[
            { field: "localAuthority", label: "Local Authority" },
            { field: "serviceUser", label: "Service User" },
            { field: "relatives", label: "Relative(s)" },
            { field: "observations", label: "Our own Observations / Assessment" },
            { field: "mhProfessional", label: "MH Professional" },
            { field: "healthProfessional", label: "Health Professional (GP / DN)" },
            { field: "hospital", label: "Hospital (NHS)" },
            { field: "other", label: "Other" }
          ].map(({ field, label }) => (
            <div key={field} style={checkboxItemStyle}>
              <input
                type="checkbox"
                checked={formData.carriedOutWith[field]}
                onChange={() => handleCheckboxGroup(field)}
                style={checkboxStyle}
              />
              <span>{label}</span>
            </div>
          ))}

          {formData.carriedOutWith.other && (
            <input
              type="text"
              name="otherText"
              placeholder="Please specify"
              value={formData.carriedOutWith.otherText}
              onChange={handleChange}
              style={{ ...inputStyle, marginTop: "10px" }}
            />
          )}
        </div>

        {/* Review Carried Out By */}
        <div style={sectionStyle}>Review Carried Out By</div>
        
        <div style={rowStyle}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
              Reviewer Name
            </label>
            <input
              type="text"
              name="reviewCarriedBy"
              value={formData.reviewCarriedBy}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
              Reviewer Signature
            </label>
            <input
              type="text"
              name="reviewCarriedSignature"
              value={formData.reviewCarriedSignature}
              onChange={handleChange}
              placeholder="Type signature"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Other Present Section */}
        <div style={sectionStyle}>Other Present</div>
        
        <div style={rowStyle}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
              Other Present (1)
            </label>
            <input
              type="text"
              name="otherPresent1"
              value={formData.otherPresent1}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
              Signature
            </label>
            <input
              type="text"
              name="otherPresent1Signature"
              value={formData.otherPresent1Signature}
              onChange={handleChange}
              placeholder="Type signature"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={rowStyle}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
              Other Present (2)
            </label>
            <input
              type="text"
              name="otherPresent2"
              value={formData.otherPresent2}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
              Signature
            </label>
            <input
              type="text"
              name="otherPresent2Signature"
              value={formData.otherPresent2Signature}
              onChange={handleChange}
              placeholder="Type signature"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Professionals Informed */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
            Other Professionals Informed of Changes
          </label>
          <textarea
            name="professionalsInformed"
            value={formData.professionalsInformed}
            onChange={handleChange}
            rows="3"
            style={inputStyle}
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          style={saveBtnStyle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#003d80";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#00264D";
          }}
        >
          Save Review
        </button>
      </form>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="display: flex"] {
            flex-direction: column;
            gap: 0;
          }
          
          div[style*="display: grid"] {
            grid-template-columns: 1fr;
          }
          
          input[type="date"] {
            font-size: 16px; /* Prevents zoom on iOS */
          }
        }
        
        @media print {
          button {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ReviewForm;