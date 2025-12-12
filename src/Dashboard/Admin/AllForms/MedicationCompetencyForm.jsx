// /src/Dashboard/Admin/AllForms/MedicationCompetencyForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MedicationCompetencyForm = () => {
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState({
    carerName: "",
    employeeID: "",
    organisationName: "",
    dateOfAssessment: "",
    sections: {
      preparationHygiene: "Competent",
      promptingMedication: "Competent",
      marChartReading: "Competent",
      correctSelectionAdmin: "Competent",
      consent: "Competent",
      recordKeeping: "Competent",
      stockControl: "Competent",
      orderingDisposal: "Competent",
      accessingMedicationAdvice: "Competent",
    },
    assessorName: "",
    remarks: "",
  });

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.sections) {
      setFormData((prev) => ({
        ...prev,
        sections: { ...prev.sections, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Form Data Saved:", formData);
    alert("Medication Competency Assessment saved successfully!");
    navigate("/admin/forms");
  };

  const sectionLabels = {
    preparationHygiene: "Preparation & Hygiene",
    promptingMedication: "Prompting Medication",
    marChartReading: "MAR Chart Reading",
    correctSelectionAdmin: "Correct Selection & Administration",
    consent: "Consent",
    recordKeeping: "Record Keeping",
    stockControl: "Stock Control",
    orderingDisposal: "Ordering & Disposal",
    accessingMedicationAdvice: "Accessing Medication Advice",
  };

  // Styles (consistent with SpotCheckForm)
  const formStyle = {
    maxWidth: "100vw",
    margin: "0 auto",
    fontFamily: "Segoe UI",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    backgroundColor: "white",
  };

  const labelStyle = {
    fontWeight: 600,
    marginBottom: "4px",
    display: "block",
  };

  const sectionStyle = {
    fontWeight: 700,
    margin: "16px 0 8px",
    color: "#00264D",
    fontSize: "16px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "3px",
  };

  const buttonStyle = {
    padding: "12px",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: 600,
  };

  const saveBtn = {
    ...buttonStyle,
    backgroundColor: "#00264D",
    color: "#fff",
    border: "none",
    width: "100%",
  };

  const backBtn = {
    ...buttonStyle,
    backgroundColor: "#3A8DFF",
    color: "#fff",
    border: "none",
    marginBottom: "15px",
    padding: "6px 14px",
    fontSize: "14px",
  };

  const rowStyle = {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  };

  return (
    <form style={formStyle} onSubmit={handleSave}>
      {/* Top Back Button */}
      <button type="button" onClick={() => navigate("/admin/forms")} style={backBtn}>
        ← Back
      </button>

      <h2 style={{ color: "#00264D", marginBottom: "20px" }}>
        Medication Competency Assessment
      </h2>

      {/* Assessment Details */}
      <div style={sectionStyle}>Assessment Details</div>
      <div style={rowStyle}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Carer / Employee Name</label>
          <input
            type="text"
            name="carerName"
            value={formData.carerName}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Employee ID (Optional)</label>
          <input
            type="text"
            name="employeeID"
            value={formData.employeeID}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>
      <div style={rowStyle}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Organisation Name</label>
          <input
            type="text"
            name="organisationName"
            value={formData.organisationName}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Date of Assessment</label>
          <input
            type="date"
            name="dateOfAssessment"
            value={formData.dateOfAssessment}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
      </div>

      {/* Competency Checklist */}
      <div style={sectionStyle}>Competency Checklist</div>
      {Object.keys(formData.sections).map((key) => (
        <div key={key}>
          <label style={labelStyle}>{sectionLabels[key]}</label>
          <select
            name={key}
            value={formData.sections[key]}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="Competent">Competent</option>
            <option value="Needs Support">Needs Support</option>
          </select>
        </div>
      ))}

      {/* Assessor Details */}
      <div style={sectionStyle}>Assessor Details</div>
      <div style={{ marginBottom: "14px" }}>
        <label style={labelStyle}>Assessor Name & Signature</label>
        <input
          type="text"
          name="assessorName"
          value={formData.assessorName}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>Remarks / Observations (Optional)</label>
        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          rows="3"
          style={inputStyle}
        ></textarea>
      </div>

      {/* Save Button */}
      <button type="submit" style={saveBtn}>
        Save Assessment
      </button>
    </form>
  );
};

export default MedicationCompetencyForm;