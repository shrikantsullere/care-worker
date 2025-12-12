// /src/Dashboard/Admin/AllForms/AppraisalForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AppraisalForm() {
  const navigate = useNavigate();

  const ratingKeys = [
    "Time-keeping",
    "Punctuality",
    "Appearance",
    "Compassion",
    "Work Quality",
    "Teamwork",
    "Problem solving",
    "Responsibility",
  ];

  // Form data state
  const [formData, setFormData] = useState({
    employeeName: "",
    jobPosition: "",
    appraisalDate: "",
    selfAssessment: {
      achievements: "",
      problems: "",
      actionsNeeded: "",
      objectives: "",
      trainingRequired: "",
      comments: "",
    },
    supervisorRatings: ratingKeys.reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {}),
    supervisorComments: {
      strengths: "",
      weaknesses: "",
      targetsAchieved: "",
      trainingRequirements: "",
    },
    employeeSignature: "",
    supervisorSignature: "",
  });

  // Handlers
  const handleChange = (e, group, key) => {
    const { value, type, name } = e.target;
    const val = type === 'number' ? parseInt(value) : value;

    if (group && key) {
      setFormData(prev => ({
        ...prev,
        [group]: {
          ...prev[group],
          [key]: val,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    console.log("Appraisal Form Submitted:", formData);
    alert("Appraisal Form saved successfully!");
    navigate("/admin/forms");
  };

  // Styles (consistent with SpotCheckForm)
  const formStyle = {
    maxWidth: "100vw",
    margin: "0 auto",
    fontFamily: "Segoe UI",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px"
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
    display: "block"
  };

  const sectionStyle = {
    fontWeight: 700,
    margin: "16px 0 8px",
    color: "#00264D",
    fontSize: "16px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "3px"
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
    width: "100%"
  };
  
  const backBtn = { 
    ...buttonStyle, 
    backgroundColor: "#3A8DFF", 
    color: "#fff", 
    border: "none", 
    marginBottom: "15px",
    padding: "6px 14px",
    fontSize: "14px"
  };

  const rowStyle = {
    display: "flex", 
    gap: "12px", 
    flexWrap: "wrap"
  };

  return (
    <form style={formStyle}>
      {/* Top Back Button */}
      <button type="button" onClick={() => navigate("/admin/forms")} style={backBtn}>
        ← Back
      </button>

      <h2 style={{ color: "#00264D", marginBottom: "20px" }}>Staff Appraisal Form</h2>

      {/* Employee Details */}
      <div style={sectionStyle}>Employee Details</div>
      <div style={rowStyle}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Employee Name</label>
          <input
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Job Position</label>
          <input
            type="text"
            name="jobPosition"
            value={formData.jobPosition}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Appraisal Date</label>
          <input
            type="date"
            name="appraisalDate"
            value={formData.appraisalDate}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Self Assessment */}
      <div style={sectionStyle}>Self Assessment</div>
      <textarea
        placeholder="Achievements"
        style={{ ...inputStyle, minHeight: '70px' }}
        value={formData.selfAssessment.achievements}
        onChange={(e) => handleChange(e, 'selfAssessment', 'achievements')}
      />
      <textarea
        placeholder="Problems"
        style={{ ...inputStyle, minHeight: '70px' }}
        value={formData.selfAssessment.problems}
        onChange={(e) => handleChange(e, 'selfAssessment', 'problems')}
      />
      <textarea
        placeholder="Actions Needed"
        style={{ ...inputStyle, minHeight: '70px' }}
        value={formData.selfAssessment.actionsNeeded}
        onChange={(e) => handleChange(e, 'selfAssessment', 'actionsNeeded')}
      />
      <textarea
        placeholder="Objectives"
        style={{ ...inputStyle, minHeight: '70px' }}
        value={formData.selfAssessment.objectives}
        onChange={(e) => handleChange(e, 'selfAssessment', 'objectives')}
      />
      <textarea
        placeholder="Training Required"
        style={{ ...inputStyle, minHeight: '70px' }}
        value={formData.selfAssessment.trainingRequired}
        onChange={(e) => handleChange(e, 'selfAssessment', 'trainingRequired')}
      />
      <textarea
        placeholder="Comments"
        style={{ ...inputStyle, minHeight: '70px' }}
        value={formData.selfAssessment.comments}
        onChange={(e) => handleChange(e, 'selfAssessment', 'comments')}
      />

      {/* Supervisor Ratings */}
      <div style={sectionStyle}>Supervisor Ratings</div>
      {ratingKeys.map((key) => (
        <div key={key} style={{ marginBottom: "12px" }}>
          <b>{key}</b>
          <div style={{ display: "flex", gap: "10px" }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n}>
                <input
                  type="radio"
                  name={`rating-${key}`}
                  value={n}
                  checked={formData.supervisorRatings[key] === n}
                  onChange={(e) => handleChange(e, 'supervisorRatings', key)}
                /> {n}
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* Supervisor Comments */}
      <div style={sectionStyle}>Supervisor Comments</div>
      <textarea
        placeholder="Strengths"
        style={{ ...inputStyle, minHeight: '70px' }}
        value={formData.supervisorComments.strengths}
        onChange={(e) => handleChange(e, 'supervisorComments', 'strengths')}
      />
      <textarea
        placeholder="Weaknesses"
        style={{ ...inputStyle, minHeight: '70px' }}
        value={formData.supervisorComments.weaknesses}
        onChange={(e) => handleChange(e, 'supervisorComments', 'weaknesses')}
      />
      <textarea
        placeholder="Targets Achieved"
        style={{ ...inputStyle, minHeight: '70px' }}
        value={formData.supervisorComments.targetsAchieved}
        onChange={(e) => handleChange(e, 'supervisorComments', 'targetsAchieved')}
      />
      <textarea
        placeholder="Training Requirements"
        style={{ ...inputStyle, minHeight: '70px' }}
        value={formData.supervisorComments.trainingRequirements}
        onChange={(e) => handleChange(e, 'supervisorComments', 'trainingRequirements')}
      />

      {/* Signatures */}
      <div style={sectionStyle}>Signatures</div>
      <div style={rowStyle}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Employee Signature</label>
          <input
            type="text"
            name="employeeSignature"
            value={formData.employeeSignature}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Supervisor Signature</label>
          <input
            type="text"
            name="supervisorSignature"
            value={formData.supervisorSignature}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Save Button */}
      <div style={{ marginTop: "20px" }}>
        <button type="button" onClick={handleSave} style={saveBtn}>
          Save Form
        </button>
      </div>
    </form>
  );
}