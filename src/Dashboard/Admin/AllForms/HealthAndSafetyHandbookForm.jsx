import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const HealthAndSafetyHandbookForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Edit Mode
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (location.state && location.state.editMode) {
      setIsEditMode(true);
    }
  }, [location]);

  const sections = [
    "Accident reporting procedure",
    "Alcohol and drugs",
    "Baths",
    "Biohazards",
    "Body jewellery",
    "Cleaning and disinfecting",
    "COSHH assessments",
    "Disciplinary rules",
    "Display screen equipment (DSE)",
    "Drugs and medication",
    "Electricity",
    "Fire",
    "First aid procedures",
    "Food safety procedures",
    "Gas cylinders",
    "Hands and skin",
    "Hazard detection",
    "Hazards and risks",
    "Infection risks in the nursing home",
    "Jewellery and perfume",
    "Ladders",
    "Manual handling",
    "New and expectant mothers",
    "Personal clothing",
    "Personal hygiene",
    "Safety in the kitchen",
    "Safety signs",
    "Smoking",
    "Training",
    "Visit from enforcement officers",
    "Violence / Stress in the workplace",
    "Waste disposal"
  ];

  // Checkbox State
  const [checked, setChecked] = useState(
    sections.reduce((acc, section) => ({ ...acc, [section]: false }), {})
  );

  // Form State
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    fullName: "",
    signature: ""
  });

  // Toggle Checkboxes
  const toggleCheck = (section) => {
    if (!isEditMode) return;

    setChecked((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Save Form
  const handleSave = () => {
    console.log("Form Saved:", { checked, formData });
    alert("Form saved successfully!");
    navigate("/admin/forms");
  };

  return (
    <div
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
      {/* BACK BUTTON */}
      <button
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

      <h2 style={{ color: "#00264D", marginBottom: "8px" }}>
        Health & Safety Handbook Acknowledgment
      </h2>

      <p style={{ marginBottom: "16px", fontSize: "15px" }}>
        I confirm I have read and understood the following sections:
      </p>

      {/* CHECKBOX LIST */}
      {sections.map((section, i) => (
        <div
          key={i}
          style={{
            marginBottom: "10px",
            display: "flex",
            alignItems: "flex-start"
          }}
        >
          <input
            type="checkbox"
            checked={!!checked[section]}
            onChange={() => toggleCheck(section)}
            disabled={!isEditMode}
            style={{
              marginRight: "12px",
              marginTop: "3px",
              cursor: isEditMode ? "pointer" : "not-allowed"
            }}
          />
          <span style={{ fontSize: "15px" }}>{section}</span>
        </div>
      ))}

      {/* FORM BOTTOM SECTION */}
      <div style={{ marginTop: "24px" }}>
        {/* DATE */}
        <label style={{ fontWeight: 600, marginBottom: 4, display: "block" }}>
          Date
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          disabled={!isEditMode}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "12px",
            backgroundColor: isEditMode ? "white" : "#f5f5f5",
            cursor: isEditMode ? "text" : "not-allowed"
          }}
        />

        {/* FULL NAME */}
        <label style={{ fontWeight: 600, marginBottom: 4, display: "block" }}>
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          disabled={!isEditMode}
          placeholder="Type full name"
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "12px",
            backgroundColor: isEditMode ? "white" : "#f5f5f5",
            cursor: isEditMode ? "text" : "not-allowed"
          }}
        />

        {/* SIGNATURE */}
        <label style={{ fontWeight: 600, marginBottom: 4, display: "block" }}>
          Signature
        </label>
        <input
          type="text"
          name="signature"
          value={formData.signature}
          onChange={handleChange}
          disabled={!isEditMode}
          placeholder="Type signature name"
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "20px",
            backgroundColor: isEditMode ? "white" : "#f5f5f5",
            cursor: isEditMode ? "text" : "not-allowed"
          }}
        />
      </div>

      {/* EDIT / SAVE / CANCEL */}
      <div style={{ display: "flex", gap: "10px" }}>
        {!isEditMode ? (
          <button
            onClick={() => setIsEditMode(true)}
            style={{
              background: "#4CAF50",
              color: "#fff",
              border: "none",
              padding: "12px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "16px",
              width: "100%"
            }}
          >
            Edit Form
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              style={{
                background: "#00264D",
                color: "#fff",
                border: "none",
                padding: "12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "16px",
                flex: 1
              }}
            >
              Save Form
            </button>
            <button
              onClick={() => setIsEditMode(false)}
              style={{
                background: "#f44336",
                color: "#fff",
                border: "none",
                padding: "12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "16px",
                flex: 1
              }}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default HealthAndSafetyHandbookForm;
