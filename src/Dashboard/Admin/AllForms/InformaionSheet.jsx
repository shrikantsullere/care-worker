import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InformationSheet = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Information Sheet Submitted:", formData);
    alert("Information Sheet submitted successfully!");
    navigate("/admin/forms");
  };

  const textareaStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    resize: "vertical",
    minHeight: "80px",
    backgroundColor: "white",
    boxSizing: "border-box",
    fontSize: "16px"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    boxSizing: "border-box",
    fontSize: "16px"
  };

  const labelStyle = {
    fontWeight: 600,
    marginBottom: "8px",
    display: "block",
    color: "#333"
  };

  const sectionStyle = {
    fontWeight: 700,
    margin: "20px 0 10px",
    color: "#00264D",
    fontSize: "18px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "5px"
  };

  const buttonStyle = {
    padding: "12px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "16px",
    border: "none",
    transition: "all 0.3s ease"
  };

  const saveBtnStyle = {
    ...buttonStyle,
    backgroundColor: "#00264D",
    color: "white",
    width: "100%",
    marginTop: "20px"
  };

  const backBtnStyle = {
    ...buttonStyle,
    backgroundColor: "#3A8DFF",
    color: "white",
    padding: "8px 16px",
    fontSize: "14px"
  };

  return (
    <div
      style={{
        maxWidth: "100%",
        margin: "0 auto",
        fontFamily: "Segoe UI",
        padding: "20px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        position: "relative"
      }}
    >
      {/* Header with Logo and Back Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap"
        }}
      >
        <button
          onClick={() => navigate("/admin/forms")}
          style={backBtnStyle}
        >
          ← Back
        </button>
        
        <img
          src="https://unitecare.org/content/images/logo.png"
          alt="Unite Care Ltd Logo"
          style={{
            height: "50px",
            width: "auto",
            maxWidth: "120px",
            objectFit: "contain"
          }}
        />
      </div>

      <h2
        style={{
          color: "#00264D",
          marginBottom: "20px",
          marginTop: "0",
          textAlign: "center"
        }}
      >
        INFORMATION SHEET (UNITE CARE LTD)
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Recruitment Stages */}
        <div style={sectionStyle}>Recruitment Stages</div>
        
        <div
          style={{
            backgroundColor: "#fff",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
            marginBottom: "20px"
          }}
        >
          <StageList
            items={[
              "Application received",
              "HR contact within 4 weeks",
              "Fully completed form required"
            ]}
          />
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
            marginBottom: "20px"
          }}
        >
          <div style={sectionStyle}>Stage 2 – Interview Stage:</div>
          <StageList
            items={[
              "Face‑to‑face interview",
              "Written exercise",
              "Two‑member trained panel",
              "Outcome within 7 days"
            ]}
          />
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
            marginBottom: "20px"
          }}
        >
          <div style={sectionStyle}>Stage 3 – Recruitment Stage:</div>
          <StageList
            items={[
              "Enhanced DBS",
              "References (3 required)",
              "Offer letter + medical form",
              "DBS may take 2 weeks–3 months"
            ]}
          />
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
            marginBottom: "20px"
          }}
        >
          <div style={sectionStyle}>Stage 4 – Getting Started:</div>
          <StageList
            items={[
              "Assigned to home within 5 days",
              "Shadow shifts",
              "Contract + ID within 8 weeks"
            ]}
          />
        </div>

        {/* FAQ Section */}
        <div style={sectionStyle}>Frequently Asked Questions:</div>
        
        <div
          style={{
            backgroundColor: "#fff",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
            marginBottom: "20px"
          }}
        >
          {["q1", "q2", "q3", "q4", "q5"].map((q, index) => (
            <div key={q} style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>
                {`Q${index + 1}: ${faqQuestions[index]}`}
              </label>
              <textarea
                name={q}
                value={formData[q]}
                onChange={handleChange}
                style={textareaStyle}
                placeholder="Type your answer here..."
                required
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
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
          Submit
        </button>
      </form>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="display: flex"] {
            flex-direction: column;
            gap: 0;
          }
          
          textarea {
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

/* Reusable Components */
const StageList = ({ items }) => (
  <ul
    style={{
      marginBottom: "12px",
      paddingLeft: "20px"
    }}
  >
    {items.map((item, index) => (
      <li key={index} style={{ marginBottom: "8px" }}>{item}</li>
    ))}
  </ul>
);

const faqQuestions = [
  "How long will the process take?",
  "What if conviction appears on DBS?",
  "Will I pay for DBS?",
  "Will I work shifts?",
  "What about pre-booked holidays?"
];

export default InformationSheet;