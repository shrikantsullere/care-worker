// src/components/forms/InductionCertificate2Form.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InductionCertificate2Form = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    carerName: "",
    trainerName: "",
    dateOfIssue: "",
    trainings: {
      whistleblowing: false,
      medicationAdmin: false,
      fireSafety: false,
      communication: false,
      nutrition: false,
      dementiaCare: false,
      firstAid: false,
      safeguarding: false,
      movingHandling: false,
    },
    carerSignature: "",
    trainerSignature: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        trainings: { ...prev.trainings, [name]: checked },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Induction Certificate 2 saved successfully!");
    console.log("Saved Data:", formData);
    navigate("/admin/forms");
  };

  // Helper function to format training labels
  const formatLabel = (key) => {
    const labels = {
      whistleblowing: "Whistleblowing",
      medicationAdmin: "Medication Administration",
      fireSafety: "Fire Safety",
      communication: "Communication",
      nutrition: "Nutrition",
      dementiaCare: "Dementia Care",
      firstAid: "First Aid",
      safeguarding: "Safeguarding",
      movingHandling: "Moving & Handling"
    };
    return labels[key] || key;
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
          style={{
            background: "#3A8DFF",
            border: "none",
            color: "#ffffff",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            order: 1
          }}
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
            objectFit: "contain",
            order: 2
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
        Induction Certificate 2 (Extended)
      </h2>

      <div
        style={{
          backgroundColor: "#f0f5ff",
          padding: "10px 15px",
          borderRadius: "6px",
          marginBottom: "20px",
          textAlign: "center"
        }}
      >
        <p style={{ fontWeight: "600", marginBottom: "5px" }}>Additional Training:</p>
      </div>

      <form onSubmit={handleSave}>
        {/* Carer Name */}
        <div className="form-group" style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
            Carer Name
          </label>
          <input
            type="text"
            name="carerName"
            value={formData.carerName}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white",
              boxSizing: "border-box",
              fontSize: "16px"
            }}
          />
        </div>

        {/* Trainer Name */}
        <div className="form-group" style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
            Trainer Name
          </label>
          <input
            type="text"
            name="trainerName"
            value={formData.trainerName}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white",
              boxSizing: "border-box",
              fontSize: "16px"
            }}
          />
        </div>

        {/* Date of Issue */}
        <div className="form-group" style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
            Date of Issue
          </label>
          <input
            type="date"
            name="dateOfIssue"
            value={formData.dateOfIssue}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white",
              boxSizing: "border-box",
              fontSize: "16px"
            }}
          />
        </div>

        {/* Training Modules */}
        <div className="form-group" style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#00264D", marginBottom: "15px", fontSize: "18px" }}>
            Training Modules
          </h3>
          
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "15px",
              backgroundColor: "#fff",
              padding: "15px",
              borderRadius: "8px",
              border: "1px solid #e0e0e0"
            }}
          >
            {Object.entries(formData.trainings).map(([key, value]) => (
              <div key={key} className="checkbox-item" style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <input
                  type="checkbox"
                  name={key}
                  checked={value}
                  onChange={handleChange}
                  style={{
                    width: "18px",
                    height: "18px",
                    marginRight: "10px"
                  }}
                />
                <label style={{ fontSize: "16px", cursor: "pointer" }}>
                  {formatLabel(key)}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Signatures */}
        <div className="form-group" style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#00264D", marginBottom: "15px", fontSize: "18px" }}>
            Signatures
          </h3>
          
          <div className="responsive-row" style={{ display: "flex", gap: "15px", marginBottom: "15px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "250px" }}>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
                Carer Signature
              </label>
              <input
                type="text"
                name="carerSignature"
                value={formData.carerSignature}
                onChange={handleChange}
                placeholder="Type carer's signature"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "white",
                  boxSizing: "border-box",
                  fontSize: "16px"
                }}
              />
            </div>
            
            <div style={{ flex: 1, minWidth: "250px" }}>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
                Trainer Signature
              </label>
              <input
                type="text"
                name="trainerSignature"
                value={formData.trainerSignature}
                onChange={handleChange}
                placeholder="Type trainer's signature"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "white",
                  boxSizing: "border-box",
                  fontSize: "16px"
                }}
              />
            </div>
          </div>
        </div>

        {/* Remarks */}
        <div className="form-group" style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#333" }}>
            Remarks (Optional)
          </label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows="3"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white",
              boxSizing: "border-box",
              fontSize: "16px",
              resize: "vertical"
            }}
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          type="submit"
          style={{
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
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#003d80";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#00264D";
          }}
        >
          Save Certificate
        </button>
      </form>

      <style jsx>{`
        @media (max-width: 768px) {
          .responsive-row {
            flex-direction: column;
            gap: 0;
          }
          
          div[style*="display: grid"] {
            grid-template-columns: 1fr;
          }
          
          .checkbox-item {
            padding: 8px 0;
          }
          
          input[type="checkbox"] {
            min-width: 20px;
            min-height: 20px;
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

export default InductionCertificate2Form;