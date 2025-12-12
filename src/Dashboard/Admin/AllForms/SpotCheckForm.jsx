// /src/Dashboard/Admin/AllForms/SpotCheckForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SpotCheckForm() {
  const navigate = useNavigate();

  // Form data state
  const checklistQuestions = [
    "Arrived on time?",
    "Greeted client?",
    "Communication adequate?",
    "Tasks explained?",
    "Support plan accurate?",
    "Training required?",
    "PPE worn?",
    "Client felt listened?",
    "Competent in tasks?",
    "Concerns about client?",
  ];

  const [formData, setFormData] = useState({
    careWorkerName: "",
    serviceUserName: "",
    date: "",
    time: "",
    checklist: checklistQuestions.reduce((acc, q) => {
      acc[q] = { response: "", comments: "" };
      return acc;
    }, {}),
  });

  // Handlers
  const handleChange = (e, question, field) => {
    const value = e.target.value;
    if (question) {
      setFormData(prev => ({
        ...prev,
        checklist: {
          ...prev.checklist,
          [question]: {
            ...prev.checklist[question],
            [field]: value
          }
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [e.target.name]: value }));
    }
  };

  const handleSave = () => {
    console.log("Spot Check Form Submitted:", formData);
    alert("Spot Check Form saved successfully!");
    navigate("/admin/forms");
  };

  // Styles
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

      <h2 style={{ color: "#00264D", marginBottom: "20px" }}>Spot Check Form</h2>

      {/* Care Worker & Service User */}
      <div style={sectionStyle}>Care Details</div>
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
          <label style={labelStyle}>Service User Name</label>
          <input
            type="text"
            name="serviceUserName"
            value={formData.serviceUserName}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Date & Time */}
      <div style={sectionStyle}>Visit Details</div>
      <div style={rowStyle}>
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
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Checklist */}
      <div style={sectionStyle}>Spot Check Checklist</div>
      {checklistQuestions.map((q) => (
        <div key={q} style={{ marginBottom: "16px" }}>
          <b>{q}</b>
          <div style={{ display: "flex", gap: "12px", marginTop: "6px" }}>
            <label>
              <input
                type="radio"
                name={`${q}-response`}
                value="Yes"
                checked={formData.checklist[q].response === "Yes"}
                onChange={(e) => handleChange(e, q, "response")}
              /> Yes
            </label>
            <label>
              <input
                type="radio"
                name={`${q}-response`}
                value="No"
                checked={formData.checklist[q].response === "No"}
                onChange={(e) => handleChange(e, q, "response")}
              /> No
            </label>
          </div>
          <textarea
            placeholder="Comments"
            value={formData.checklist[q].comments}
            onChange={(e) => handleChange(e, q, "comments")}
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