import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EmploymentApplicationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Form should always open in edit mode
  const [isEditMode, setIsEditMode] = useState(true);

  // Form Data
  const [formData, setFormData] = useState({
    applicantName: "",
    employmentFrom: "",
    employmentTo: "",
    capacity: "",
    position: "",
    stillWorking: "",
    stillWorkingDetails: "",
    reemploy: "",
    reemployDetails: "",
    integrity: "",
    temperament: "",
    initiative: "",
    trustworthiness: "",
    reliability: "",
    honesty: "",
    communication: "",
    teamWorking: "",
    timeKeeping: "",
    caring: "",
    additionalComments: "",
    refereeName: "",
    refereePosition: "",
    refereeContact: "",
    companyAddress: "",
    date: "",
    signature: "",
    companyStamp: ""
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Save form
  const handleSave = () => {
    console.log("Saved:", formData);
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
      {/* Back Button */}
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

      <h2 style={{ color: "#00264D", marginBottom: "12px" }}>
        Employment Application
      </h2>

      {/* Applicant Details */}
      <Section title="Applicant Details" />
      <Input label="Employment Applicant's Name" name="applicantName" value={formData.applicantName} onChange={handleChange} />

      {/* Employment Duration */}
      <Section title="Employment Duration" />
      <div style={row}>
        <Input label="From (date)" type="date" name="employmentFrom" value={formData.employmentFrom} onChange={handleChange} flex />
        <Input label="To (date)" type="date" name="employmentTo" value={formData.employmentTo} onChange={handleChange} flex />
      </div>
      <Input label="In what capacity? (role)" name="capacity" value={formData.capacity} onChange={handleChange} />
      <Input label="Application Position" name="position" value={formData.position} onChange={handleChange} />

      {/* Still Working */}
      <Section title="Is the applicant still in your employment?" />
      <Radio name="stillWorking" value={formData.stillWorking} onChange={handleChange} />
      <Input label="If YES, please specify" name="stillWorkingDetails" value={formData.stillWorkingDetails} onChange={handleChange} />

      {/* Re-employ */}
      <Section title="Would you re-employ this person?" />
      <Radio name="reemploy" value={formData.reemploy} onChange={handleChange} />
      <Input label="If YES, please specify" name="reemployDetails" value={formData.reemployDetails} onChange={handleChange} />

      {/* Ratings */}
      <Section title="Rate the applicant on the following" />
      {[
        "Integrity",
        "Temperament",
        "Initiative",
        "Trustworthiness",
        "Reliability",
        "Honesty",
        "Communication",
        "Team working",
        "Time keeping",
        "Caring",
      ].map((item) => (
        <RatingRow
          key={item}
          label={item}
          value={formData[item.toLowerCase().replace(/\s+/g, "")]}
          onChange={handleChange}
        />
      ))}

      <Textarea
        label="Additional Comments / Information"
        name="additionalComments"
        value={formData.additionalComments}
        onChange={handleChange}
      />

      {/* Referee Details */}
      <Section title="Referee Details" />
      <Input label="Full Name" name="refereeName" value={formData.refereeName} onChange={handleChange} />
      <Input label="Position" name="refereePosition" value={formData.refereePosition} onChange={handleChange} />
      <Input label="Telephone & Email" name="refereeContact" value={formData.refereeContact} onChange={handleChange} />
      <Textarea label="Company Address" name="companyAddress" value={formData.companyAddress} onChange={handleChange} />
      <Input label="Date" type="date" name="date" value={formData.date} onChange={handleChange} />
      <Input label="Signature (Type name)" name="signature" value={formData.signature} onChange={handleChange} />
      <Input label="Company Official Stamp" name="companyStamp" value={formData.companyStamp} onChange={handleChange} />

      {/* Save Button */}
      <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
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
            fontSize: "16px"
          }}
        >
          Save Form
        </button>
      </div>
    </div>
  );
};

/* Reusable Components */
const row = { display: "flex", gap: "10px", flexWrap: "wrap" };
const labelStyle = { fontWeight: 600, marginBottom: 4, display: "block" };
const inputStyle = {
  width: "100%",
  padding: "9px",
  borderRadius: "4px",
  border: "1px solid #ccc"
};

const Section = ({ title }) => (
  <div
    style={{
      fontWeight: 700,
      margin: "16px 0 8px",
      color: "#00264D",
      fontSize: "16px",
      borderBottom: "1px solid #ccc",
      paddingBottom: "3px"
    }}
  >
    {title}
  </div>
);

const Input = ({ label, type = "text", flex, name, value, onChange }) => (
  <div style={{ marginBottom: "10px", flex: flex && 1 }}>
    <label style={labelStyle}>{label}</label>
    <input
      type={type}
      style={inputStyle}
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);

const Textarea = ({ label, name, value, onChange }) => (
  <div style={{ marginBottom: "10px" }}>
    <label style={labelStyle}>{label}</label>
    <textarea
      style={inputStyle}
      rows="3"
      name={name}
      value={value}
      onChange={onChange}
    ></textarea>
  </div>
);

const Radio = ({ name, value, onChange }) => (
  <div style={{ marginBottom: "10px" }}>
    <label style={{ marginRight: "20px" }}>
      <input
        type="radio"
        name={name}
        value="yes"
        checked={value === "yes"}
        onChange={onChange}
      />{" "}
      Yes
    </label>
    <label>
      <input
        type="radio"
        name={name}
        value="no"
        checked={value === "no"}
        onChange={onChange}
      />{" "}
      No
    </label>
  </div>
);

const RatingRow = ({ label, value, onChange }) => (
  <div
    style={{
      marginBottom: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap"
    }}
  >
    <span style={{ fontWeight: 600, flex: 1 }}>{label}</span>
    {["Excellent", "Good", "Average", "Poor"].map((level) => (
      <label key={level} style={{ marginRight: "10px", fontSize: "14px" }}>
        <input
          type="radio"
          name={label.toLowerCase().replace(/\s+/g, "")}
          value={level.toLowerCase()}
          checked={value === level.toLowerCase()}
          onChange={onChange}
        />{" "}
        {level}
      </label>
    ))}
  </div>
);

export default EmploymentApplicationForm;
