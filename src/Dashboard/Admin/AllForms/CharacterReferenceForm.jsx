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
    date: "",
    wordFile: null,
    manualForm: null
  });

  const [errors, setErrors] = useState({
    wordFile: "",
    manualForm: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      // Clear error when file is selected
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSave = () => {
    // Validate attachments
    let hasError = false;
    const newErrors = {
      wordFile: formData.wordFile ? "" : "Word document is required",
      manualForm: formData.manualForm ? "" : "Manual form is required"
    };

    if (newErrors.wordFile || newErrors.manualForm) {
      setErrors(newErrors);
      hasError = true;
    }

    if (hasError) {
      alert("Please attach all required documents");
      return;
    }

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
      <div className="responsive-row" style={{ display: "flex", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
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

      {/* Attachments Section */}
      <Section title="Required Attachments" />
      <div style={{ marginBottom: "20px", backgroundColor: "#fff8dc", padding: "15px", borderRadius: "6px" }}>
        <p style={{ color: "#d9534f", fontWeight: "bold", marginBottom: "10px" }}>
          <span style={{ color: "red" }}>*</span> All attachments are mandatory
        </p>
        
        <FileUpload
          label="Word Document"
          name="wordFile"
          file={formData.wordFile}
          onChange={handleFileChange}
          error={errors.wordFile}
          accept=".doc,.docx"
        />
        
        <FileUpload
          label="Manually Filled Form"
          name="manualForm"
          file={formData.manualForm}
          onChange={handleFileChange}
          error={errors.manualForm}
          accept=".pdf,.jpg,.jpeg,.png"
        />
      </div>

      {/* Signature */}
      <Section title="Referee Signature" />
      <div className="responsive-row" style={{ display: "flex", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
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

      <style jsx>{`
        @media (max-width: 768px) {
          .responsive-row {
            flex-direction: column;
            gap: 0;
          }
        }
      `}</style>
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
  <div style={{ flex: 1, marginBottom: "12px", minWidth: "200px" }}>
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

const FileUpload = ({ label, name, file, onChange, error, accept }) => (
  <div style={{ marginBottom: "15px" }}>
    <label style={labelStyle}>
      {label} <span style={{ color: "red" }}>*</span>
    </label>
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="file"
        id={name}
        name={name}
        onChange={onChange}
        accept={accept}
        style={{ display: "none" }}
      />
      <label
        htmlFor={name}
        style={{
          display: "inline-block",
          padding: "8px 12px",
          background: "#f0f0f0",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
          marginRight: "10px"
        }}
      >
        Choose File
      </label>
      <span style={{ fontSize: "14px" }}>
        {file ? file.name : "No file chosen"}
      </span>
    </div>
    {error && <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{error}</p>}
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