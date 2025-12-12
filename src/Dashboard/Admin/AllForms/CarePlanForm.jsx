import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CarePlanForm() {
  const navigate = useNavigate();

  const riskAreas = [
    "Mobility risk",
    "Fall risk",
    "Medication risk",
    "Behavioural risk",
    "Infection risk",
    "Environment risk",
  ];

  const dailyNeeds = [
    "Personal Care",
    "Meals & Hydration",
    "Mobility Support",
    "Continence Care",
    "Medication schedule",
    "Sleeping pattern",
    "Social needs",
  ];

  const [formData, setFormData] = useState({
    // Personal Info
    clientName: "",
    nhsNumber: "",
    dob: "",
    primaryDiagnosis: "",
    allergies: "",
    emergencyContact: "",

    // Risk assessments
    risks: riskAreas.reduce((acc, risk) => {
      acc[risk] = {
        severity: "",
        mitigation: "",
        assignedStaff: ""
      };
      return acc;
    }, {}),

    // Daily care requirements
    dailyRequirements: dailyNeeds.reduce((acc, need) => {
      acc[need] = "";
      return acc;
    }, {}),

    // Goals & outcomes
    clientGoals: "",
    reviewCycle: "",
    keyWorker: "",

    // Signatures
    clientSignature: "",
    familySignature: "",
    careManagerSignature: "",
    reviewDate: "",
  });

  const handleChange = (e, risk, field) => {
    const value = e.target.value;

    // Nested update for risks
    if (risk) {
      setFormData(prev => ({
        ...prev,
        risks: {
          ...prev.risks,
          [risk]: {
            ...prev.risks[risk],
            [field]: value
          }
        }
      }));
      return;
    }

    // Flat update
    setFormData(prev => ({ ...prev, [e.target.name]: value }));
  };

  const handleDailyChange = (e, need) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      dailyRequirements: {
        ...prev.dailyRequirements,
        [need]: value,
      }
    }));
  };

  const handleSave = () => {
    console.log("CARE PLAN FORM DATA:", formData);
    alert("Care Plan saved successfully!");
    navigate("/admin/forms");
  };

  const container = {
    maxWidth: "100vw",
    margin: "0 auto",
    fontFamily: "Segoe UI",
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  };

  const sectionStyle = {
    fontWeight: 700,
    margin: "18px 0 12px",
    fontSize: "17px",
    color: "#00264D",
    borderBottom: "1px solid #ccc",
    paddingBottom: "3px"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "10px"
  };

  const row = { display: "flex", gap: "12px", flexWrap: "wrap" };

  const btn = {
    padding: "12px",
    background: "#00264D",
    color: "#fff",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
    marginTop: "15px"
  };

  return (
    <div style={container}>
      <button
        onClick={() => navigate("/admin/forms")}
        style={{
          background: "#3A8DFF",
          color: "#fff",
          padding: "6px 14px",
          fontSize: "14px",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
          marginBottom: "15px"
        }}
      >
        ← Back
      </button>

      <h2 style={{ color: "#00264D", textAlign: "center", marginBottom: "12px" }}>
        CARE PLAN FORM
      </h2>

      {/* PERSONAL INFORMATION */}
      <div style={sectionStyle}>Personal Information</div>

      <Input label="Client Name" name="clientName" value={formData.clientName} onChange={handleChange} />
      <div style={row}>
        <Input label="NHS Number" name="nhsNumber" value={formData.nhsNumber} onChange={handleChange} flex />
        <Input label="DOB" type="date" name="dob" value={formData.dob} onChange={handleChange} flex />
      </div>
      <Input label="Primary Diagnosis" name="primaryDiagnosis" value={formData.primaryDiagnosis} onChange={handleChange} />
      <Input label="Allergies" name="allergies" value={formData.allergies} onChange={handleChange} />
      <Input label="Emergency Contact" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} />

      {/* RISK ASSESSMENTS */}
      <div style={sectionStyle}>Risk Assessments</div>

      {riskAreas.map((risk) => (
        <div key={risk} style={{ marginBottom: "20px", padding: "12px", border: "1px solid #ddd", borderRadius: "6px" }}>
          <b>{risk}</b>
          <div style={row}>
            <div style={{ flex: 1 }}>
              <label>Severity</label>
              <select
                style={inputStyle}
                value={formData.risks[risk].severity}
                onChange={(e) => handleChange(e, risk, "severity")}
              >
                <option value="">Select</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <Input
              label="Assigned Staff"
              value={formData.risks[risk].assignedStaff}
              onChange={(e) => handleChange(e, risk, "assignedStaff")}
              flex
            />
          </div>

          <label>Mitigation Plan</label>
          <textarea
            rows="3"
            style={inputStyle}
            value={formData.risks[risk].mitigation}
            onChange={(e) => handleChange(e, risk, "mitigation")}
          />
        </div>
      ))}

      {/* DAILY CARE REQUIREMENTS */}
      <div style={sectionStyle}>Daily Care Requirements</div>

      {dailyNeeds.map((need) => (
        <div key={need} style={{ marginBottom: "15px" }}>
          <label><b>{need}</b></label>
          <textarea
            rows="3"
            style={inputStyle}
            value={formData.dailyRequirements[need]}
            onChange={(e) => handleDailyChange(e, need)}
            placeholder={`Describe ${need.toLowerCase()} needs…`}
          />
        </div>
      ))}

      {/* GOALS & OUTCOMES */}
      <div style={sectionStyle}>Goals & Outcomes</div>

      <Input label="Client Goals" name="clientGoals" value={formData.clientGoals} onChange={handleChange} />
      <Input label="Review Cycle (e.g., every 3 months)" name="reviewCycle" value={formData.reviewCycle} onChange={handleChange} />
      <Input label="Assigned Key Worker" name="keyWorker" value={formData.keyWorker} onChange={handleChange} />

      {/* SIGNATURES */}
      <div style={sectionStyle}>Signatures</div>

      <Input label="Client / Family Signature" name="clientSignature" value={formData.clientSignature} onChange={handleChange} />
      <Input label="Care Manager Signature" name="careManagerSignature" value={formData.careManagerSignature} onChange={handleChange} />

      <Input label="Review Date" type="date" name="reviewDate" value={formData.reviewDate} onChange={handleChange} />

      <button onClick={handleSave} style={btn}>Save Care Plan</button>
    </div>
  );
}

/* Reusable Input Component */
const Input = ({ label, type = "text", flex, name, value, onChange }) => (
  <div style={{ marginBottom: "10px", flex: flex ? 1 : "unset" }}>
    <label style={{ fontWeight: 600, marginBottom: 4, display: "block" }}>{label}</label>
    <input
      type={type}
      style={{
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);
