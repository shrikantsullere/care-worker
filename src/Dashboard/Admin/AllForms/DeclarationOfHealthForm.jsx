import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DeclarationOfHealthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ---- ALWAYS EDIT MODE ----
  const [isEditMode, setIsEditMode] = useState(true);

  useEffect(() => {
    if (location.state && location.state.editMode) {
      setIsEditMode(true);
    }
  }, [location]);

  const [formData, setFormData] = useState({
    infectionHistory: '',
    diarrhoea: false,
    vomiting: false,
    rashes: false,
    blackouts: false,
    alcoholDrugTreatment: false,
    backIssues: false,
    pregnancy: false,
    consentToContact: false,
    signature: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Form saved:", formData);
    alert("Form saved successfully!");
    navigate("/admin/forms");
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
          marginBottom: "15px",
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
        Declaration of Health & Medical Fitness
      </h2>

      <form onSubmit={handleSave}>
        {/* Section A */}
        <div
          style={{
            marginBottom: "20px",
            backgroundColor: "#fff",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #e0e0e0"
          }}
        >
          <label
            style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "10px",
              color: "#00264D",
              fontSize: "18px"
            }}
          >
            Section A: History of infections/diseases
          </label>

          <textarea
            name="infectionHistory"
            value={formData.infectionHistory}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white",
              boxSizing: "border-box",
              fontSize: "16px",
              minHeight: "100px"
            }}
            rows="3"
          />
        </div>

        {/* Section B */}
        <div
          style={{
            marginBottom: "20px",
            backgroundColor: "#fff",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #e0e0e0"
          }}
        >
          <label
            style={{
              fontWeight: "600",
              display: "block",
              marginBottom: "12px",
              color: "#00264D",
              fontSize: "18px"
            }}
          >
            Section B: Last 2 years – symptoms?
          </label>

          <div className="checkbox-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "15px" }}>
            <label className="checkbox-item" style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input
                type="checkbox"
                name="diarrhoea"
                checked={formData.diarrhoea}
                onChange={handleChange}
                style={{ width: "18px", height: "18px" }}
              />
              <span style={{ fontSize: "16px" }}>Diarrhoea/vomiting</span>
            </label>

            <label className="checkbox-item" style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input
                type="checkbox"
                name="rashes"
                checked={formData.rashes}
                onChange={handleChange}
                style={{ width: "18px", height: "18px" }}
              />
              <span style={{ fontSize: "16px" }}>Rashes</span>
            </label>

            <label className="checkbox-item" style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input
                type="checkbox"
                name="blackouts"
                checked={formData.blackouts}
                onChange={handleChange}
                style={{ width: "18px", height: "18px" }}
              />
              <span style={{ fontSize: "16px" }}>Blackouts</span>
            </label>
          </div>
        </div>

        {/* Section C */}
        <div
          style={{
            marginBottom: "20px",
            backgroundColor: "#fff",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #e0e0e0"
          }}
        >
          <label
            style={{
              fontWeight: "600",
              display: "block",
              marginBottom: "12px",
              color: "#00264D",
              fontSize: "18px"
            }}
          >
            Section C: Additional conditions
          </label>

          <div className="checkbox-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "15px" }}>
            <label className="checkbox-item" style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input
                type="checkbox"
                name="alcoholDrugTreatment"
                checked={formData.alcoholDrugTreatment}
                onChange={handleChange}
                style={{ width: "18px", height: "18px" }}
              />
              <span style={{ fontSize: "16px" }}>Alcohol/drug treatment</span>
            </label>

            <label className="checkbox-item" style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input
                type="checkbox"
                name="backIssues"
                checked={formData.backIssues}
                onChange={handleChange}
                style={{ width: "18px", height: "18px" }}
              />
              <span style={{ fontSize: "16px" }}>Back issues</span>
            </label>

            <label className="checkbox-item" style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input
                type="checkbox"
                name="pregnancy"
                checked={formData.pregnancy}
                onChange={handleChange}
                style={{ width: "18px", height: "18px" }}
              />
              <span style={{ fontSize: "16px" }}>Pregnancy</span>
            </label>
          </div>
        </div>

        {/* Consent */}
        <div
          style={{
            marginBottom: "20px",
            backgroundColor: "#fff",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #e0e0e0"
          }}
        >
          <label className="checkbox-item" style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <input
              type="checkbox"
              name="consentToContact"
              checked={formData.consentToContact}
              onChange={handleChange}
              style={{ width: "18px", height: "18px" }}
            />
            <span style={{ fontSize: "16px" }}>I consent to GP contact & medical exam</span>
          </label>
        </div>

        {/* Signature + Date */}
        <div
          style={{
            marginTop: "24px",
            backgroundColor: "#fff",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #e0e0e0"
          }}
        >
          <h3
            style={{
              color: "#00264D",
              marginBottom: "15px",
              fontSize: "18px"
            }}
          >
            Declaration
          </h3>
          
          <div className="responsive-row" style={{ display: "flex", gap: "15px", marginBottom: "15px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "250px" }}>
              <label style={{ fontWeight: "600", marginBottom: "8px", display: "block" }}>
                Signature
              </label>
              <input
                type="text"
                name="signature"
                value={formData.signature}
                onChange={handleChange}
                placeholder="Type name"
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
              <label style={{ fontWeight: "600", marginBottom: "8px", display: "block" }}>
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
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
            marginTop: "20px"
          }}
        >
          Save Form
        </button>
      </form>

      <style jsx>{`
        @media (max-width: 768px) {
          .responsive-row {
            flex-direction: column;
            gap: 0;
          }
          
          .checkbox-grid {
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

export default DeclarationOfHealthForm;