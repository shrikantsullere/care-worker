import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DeclarationOfHealthForm = () => {
  const navigate = useNavigate();

  // ---- ALWAYS EDIT MODE ----
  const [isEditMode] = useState(true);

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
    <form
      onSubmit={handleSave}
      style={{
        maxWidth: "100vw",
        margin: "0 auto",
        fontFamily: "Segoe UI",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        borderRadius: "8px"
      }}
    >

      {/* ---- BACK BUTTON ---- */}
      <button
        type="button"
        onClick={() => navigate("/admin/forms")}
        style={{
          background: "#3A8DFF",
          border: "1px solid #999",
          color: "#ffffff",
          padding: "6px 14px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          marginBottom: "12px"
        }}
      >
        ← Back
      </button>

      <h2 style={{ color: "#00264D", marginBottom: "20px" }}>
        Declaration of Health & Medical Fitness
      </h2>

      {/* Section A */}
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontWeight: "600", marginBottom: "6px", color: "#333" }}>
          Section A: History of infections/diseases
        </label>

        <textarea
          name="infectionHistory"
          value={formData.infectionHistory}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "white",
            boxSizing: "border-box"
          }}
          rows="2"
        />
      </div>

      {/* Section B */}
      <div style={{ marginBottom: "16px" }}>
        <label style={{ fontWeight: "600", display: "block", marginBottom: "8px", color: "#333" }}>
          Section B: Last 2 years – symptoms?
        </label>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <input 
              type="checkbox"
              name="diarrhoea"
              checked={formData.diarrhoea}
              onChange={handleChange}
            />
            Diarrhoea/vomiting
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <input 
              type="checkbox"
              name="rashes"
              checked={formData.rashes}
              onChange={handleChange}
            />
            Rashes
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <input 
              type="checkbox"
              name="blackouts"
              checked={formData.blackouts}
              onChange={handleChange}
            />
            Blackouts
          </label>
        </div>
      </div>

      {/* Section C */}
      <div style={{ marginBottom: "16px" }}>
        <label style={{ fontWeight: "600", display: "block", marginBottom: "8px", color: "#333" }}>
          Section C: Additional conditions
        </label>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <input 
              type="checkbox"
              name="alcoholDrugTreatment"
              checked={formData.alcoholDrugTreatment}
              onChange={handleChange}
            />
            Alcohol/drug treatment
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <input 
              type="checkbox"
              name="backIssues"
              checked={formData.backIssues}
              onChange={handleChange}
            />
            Back issues
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <input 
              type="checkbox"
              name="pregnancy"
              checked={formData.pregnancy}
              onChange={handleChange}
            />
            Pregnancy
          </label>
        </div>
      </div>

      {/* Consent */}
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <input 
            type="checkbox" 
            name="consentToContact"
            checked={formData.consentToContact}
            onChange={handleChange}
          />
          I consent to GP contact & medical exam
        </label>
      </div>

      {/* Signature + Date */}
      <div style={{ marginTop: "24px" }}>
        <div style={{ display: "flex", gap: "20px", marginBottom: "16px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: "600", marginBottom: "6px", display: "block" }}>
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
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "white"
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: "600", marginBottom: "6px", display: "block" }}>
              Date
            </label>

            <input 
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "white"
              }}
            />
          </div>
        </div>

        {/* ---- ONLY SAVE BUTTON ---- */}
        <div style={{ marginTop: "20px" }}>
          <button
            type="submit"
            style={{
              padding: "12px 20px",
              backgroundColor: "#00264D",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              width: "100%"
            }}
          >
            Save Form
          </button>
        </div>
      </div>
    </form>
  );
};

export default DeclarationOfHealthForm;
