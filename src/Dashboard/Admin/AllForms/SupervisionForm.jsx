// /src/Dashboard/Admin/AllForms/SupervisionForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SupervisionForm() {
  const navigate = useNavigate();

  // Form data state
  const discussionQuestions = [
    "How are you finding the role?",
    "Is support from office adequate?",
    "Is communication enough?",
    "Support plans reflect client needs?",
    "Training required?",
    "Managing rota well?",
    "Do you feel listened to?",
    "Concerns about clients?",
  ];

  const [formData, setFormData] = useState({
    careWorkerName: "",
    type: "Telephone",
    date: "",
    discussion: discussionQuestions.reduce((acc, q) => {
      acc[q] = "";
      return acc;
    }, {}),
  });

  // Handlers
  const handleChange = (e, question) => {
    const value = e.target.value;
    if (question) {
      setFormData(prev => ({
        ...prev,
        discussion: {
          ...prev.discussion,
          [question]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [e.target.name]: value }));
    }
  };

  const handleSave = () => {
    console.log("Supervision Form Submitted:", formData);
    alert("Supervision Form saved successfully!");
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

      <h2 style={{ color: "#00264D", marginBottom: "20px" }}>Supervision Form</h2>

      {/* Care Worker, Type, and Date */}
      <div style={sectionStyle}>Supervision Details</div>
      <div style={rowStyle}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Care Worker Name</label>
          <input
            type="text"
            name="careWorkerName"
            value={formData.careWorkerName}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="Telephone">Telephone</option>
            <option value="Face to Face">Face to Face</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Discussion Questions */}
      <div style={sectionStyle}>Discussion</div>
      {discussionQuestions.map((q) => (
        <div key={q} style={{ marginBottom: "16px" }}>
          <b>{q}</b>
          <textarea
            placeholder="Enter your response here"
            value={formData.discussion[q]}
            onChange={(e) => handleChange(e, q)}
            style={inputStyle}
            rows="3"
          />
        </div>
      ))}

      {/* Save Button */}
      <div style={{ marginTop: "20px" }}>
        <button type="button" onClick={handleSave} style={saveBtn}>
          Save Form
        </button>
      </div>
    </form>
  );
}