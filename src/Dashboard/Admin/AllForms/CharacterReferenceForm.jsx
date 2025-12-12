import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CharacterReferenceForm = () => {
  const navigate = useNavigate();

  // Form ALWAYS in Edit Mode
  const [isEditMode] = useState(true);

  const [formData, setFormData] = useState({
    forename: "",
    surname: "",
    title: "",
    refereeName: "",
    organisation: "",
    relationship: "",
    knownDuration: "",
    isHonest: "",
    honestDetails: "",
    additionalInfo: "",
    refereeFullName: "",
    signature: "",
    date: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Form data saved:", formData);
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
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/admin/forms")}
        style={{
          background: "#3A8DFF",
          border: "1px solid #999",
          color: "#ffffff",
          padding: "5px 12px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          marginBottom: "10px"
        }}
      >
        ← Back
      </button>

      <h2 style={{ color: "#00264D", marginBottom: "10px", marginTop: "0" }}>
        Character Reference Form
      </h2>

      {/* Candidate Details */}
      <Section title="Candidate Details" />
      <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
        <Input label="Forename(s)" name="forename" value={formData.forename} onChange={handleChange} />
        <Input label="Surname(s)" name="surname" value={formData.surname} onChange={handleChange} />
      </div>

      <Input label="Title (e.g., Mr, Mrs)" name="title" value={formData.title} onChange={handleChange} />

      {/* Referee Details */}
      <Section title="Referee Details" />
      <Input label="Referee Name" name="refereeName" value={formData.refereeName} onChange={handleChange} />
      <Input label="Organisation" name="organisation" value={formData.organisation} onChange={handleChange} />

      {/* Character Details */}
      <Section title="Character Details" />
      <Textarea label="Relationship with Candidate" name="relationship" value={formData.relationship} onChange={handleChange} />

      <Input
        label="How long have you known the Candidate?"
        name="knownDuration"
        value={formData.knownDuration}
        onChange={handleChange}
      />

      <div style={{ marginBottom: "12px" }}>
        <label style={labelStyle}>Is the candidate honest & trustworthy?</label>

        <label style={{ marginRight: 16 }}>
          <input
            type="radio"
            name="isHonest"
            value="yes"
            checked={formData.isHonest === "yes"}
            onChange={handleChange}
          />{" "}
          Yes
        </label>

        <label>
          <input
            type="radio"
            name="isHonest"
            value="no"
            checked={formData.isHonest === "no"}
            onChange={handleChange}
          />{" "}
          No
        </label>
      </div>

      <Textarea
        label="If NO, provide additional details"
        name="honestDetails"
        value={formData.honestDetails}
        onChange={handleChange}
      />

      <Textarea
        label="Additional info (responsibilities, strengths, weaknesses etc.)"
        name="additionalInfo"
        value={formData.additionalInfo}
        onChange={handleChange}
      />

      {/* Signature */}
      <Section title="Referee Signature" />
      <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
        <Input
          label="Referee Full Name"
          name="refereeFullName"
          value={formData.refereeFullName}
          onChange={handleChange}
        />

        <Input type="date" label="Date" name="date" value={formData.date} onChange={handleChange} />
      </div>

      <Input label="Signature (Type name)" name="signature" value={formData.signature} onChange={handleChange} />

      {/* ONLY SAVE BUTTON */}
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
          width: "100%",
          fontSize: "15px",
          marginTop: "15px"
        }}
      >
        Save Form
      </button>
    </div>
  );
};

/* 🔹 Reusable Components */
const labelStyle = { display: "block", fontWeight: 600, marginBottom: 4, color: "#333" };
const inputStyle = {
  width: "100%",
  padding: "9px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  backgroundColor: "white",
  boxSizing: "border-box"
};

const Input = ({ label, type = "text", name, value, onChange }) => (
  <div style={{ flex: 1, marginBottom: "12px" }}>
    <label style={labelStyle}>{label}</label>
    <input type={type} style={inputStyle} name={name} value={value} onChange={onChange} />
  </div>
);

const Textarea = ({ label, name, value, onChange }) => (
  <div style={{ marginBottom: "12px" }}>
    <label style={labelStyle}>{label}</label>
    <textarea style={inputStyle} rows="3" name={name} value={value} onChange={onChange}></textarea>
  </div>
);

const Section = ({ title }) => (
  <div
    style={{
      fontWeight: 700,
      margin: "12px 0 6px",
      color: "#00264D",
      fontSize: "16px",
      borderBottom: "1px solid #ccc",
      paddingBottom: "3px",
      backgroundColor: "#f0f5ff",
      padding: "5px 10px",
      borderRadius: "4px 4px 0 0"
    }}
  >
    {title}
  </div>
);

export default CharacterReferenceForm;
