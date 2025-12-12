import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JobDescriptionForm = () => {
  const navigate = useNavigate();

  // ---- ALWAYS EDIT MODE ----
  const [isEditMode] = useState(true);

  const [formData, setFormData] = useState({
    reportingTo: "",
    hours: "Flexible (16–80 hrs/week)",
    jobPurpose: [
      "Look after physical, emotional, cultural and social needs of Clients",
      "Promote choice, independence, dignity, privacy",
      "Follow all policies & statutory obligations",
    ],
    keyResponsibilities: [
      "Provide personal care, assist with dressing, bathing, toileting",
      "Medication support per assessment",
      "Food prep, light housekeeping",
      "Manual handling, safe use of equipment",
      "Recording & reporting duties",
    ],
    name: "",
    signature: "",
  });

  const handleSave = () => {
    console.log("Saved:", formData);
    alert("Form saved successfully!");
    navigate("/admin/forms");
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field, index) => {
    const updated = [...formData[field]];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, [field]: updated }));
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
        borderRadius: "8px",
      }}
    >
      {/* ---- BACK BUTTON ---- */}
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
          marginBottom: "12px",
        }}
      >
        ← Back
      </button>

      <h2 style={{ color: "#00264D", marginBottom: "12px" }}>
        Job Description – Care Worker
      </h2>

      {/* ---------------- REPORTING TO ---------------- */}
      <div style={{ marginBottom: "14px" }}>
        <label style={{ fontWeight: 600 }}>Reporting to:</label>
        <input
          type="text"
          value={formData.reportingTo}
          onChange={(e) => handleChange("reportingTo", e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginTop: "6px",
            backgroundColor: "white",
          }}
        />
      </div>

      {/* ---------------- HOURS ---------------- */}
      <div style={{ marginBottom: "14px" }}>
        <label style={{ fontWeight: 600 }}>Hours:</label>
        <input
          type="text"
          value={formData.hours}
          onChange={(e) => handleChange("hours", e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginTop: "6px",
            backgroundColor: "white",
          }}
        />
      </div>

      {/* ---------------- JOB PURPOSE ---------------- */}
      <h3 style={{ marginTop: "20px" }}>Job Purpose</h3>
      {formData.jobPurpose.map((item, index) => (
        <div key={index} style={{ display: "flex", marginBottom: "10px" }}>
          <input
            type="text"
            value={item}
            onChange={(e) => handleArrayChange("jobPurpose", index, e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <button
            type="button"
            onClick={() => removeArrayItem("jobPurpose", index)}
            style={{
              marginLeft: "8px",
              background: "#f44336",
              border: "none",
              padding: "10px",
              borderRadius: "4px",
              color: "white",
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() => addArrayItem("jobPurpose")}
        style={{
          background: "#4CAF50",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "12px",
        }}
      >
        Add Item
      </button>

      {/* ---------------- RESPONSIBILITIES ---------------- */}
      <h3>Key Responsibilities</h3>
      {formData.keyResponsibilities.map((item, index) => (
        <div key={index} style={{ display: "flex", marginBottom: "10px" }}>
          <input
            type="text"
            value={item}
            onChange={(e) => handleArrayChange("keyResponsibilities", index, e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <button
            type="button"
            onClick={() => removeArrayItem("keyResponsibilities", index)}
            style={{
              marginLeft: "8px",
              background: "#f44336",
              border: "none",
              padding: "10px",
              borderRadius: "4px",
              color: "white",
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() => addArrayItem("keyResponsibilities")}
        style={{
          background: "#4CAF50",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "12px",
        }}
      >
        Add Item
      </button>

      {/* ---------------- NAME / SIGNATURE ---------------- */}
      <div style={{ marginTop: "24px" }}>
        <label style={{ fontWeight: 600 }}>Acknowledged By:</label>

        <input
          type="text"
          value={formData.name}
          placeholder="Name"
          onChange={(e) => handleChange("name", e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginTop: "6px",
            marginBottom: "10px",
            backgroundColor: "white",
          }}
        />

        <input
          type="text"
          value={formData.signature}
          placeholder="Signature"
          onChange={(e) => handleChange("signature", e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "20px",
            backgroundColor: "white",
          }}
        />
      </div>

      {/* ---- ONLY SAVE BUTTON ---- */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleSave}
          style={{
            padding: "12px 20px",
            backgroundColor: "#00264D",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            width: "100%",
          }}
        >
          Save Form
        </button>
      </div>
    </div>
  );
};

export default JobDescriptionForm;
