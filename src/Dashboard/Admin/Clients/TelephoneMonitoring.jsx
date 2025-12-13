// /src/Dashboard/Admin/AllForms/TelephoneMonitoringForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TelephoneMonitoringForm() {
  const navigate = useNavigate();

  // Questions from PDF + missing ones added
  const checklistQuestions = [
    "Is the support reliable?",
    "Have all visits been attended?",
    "Are you informed of delays or changes?",
    "Does the worker stay full duration?",
    "Do they wear uniform, ID & PPE?",
    "Are workers friendly & courteous?",
    "Does care match the care plan?",
    "Does care promote independence?",
    "Do you feel safer with our care?",
    "Are you asked to sign a timesheet?",
    "Have you used Out-of-Hours service?",
    "Are you visited regularly by a field supervisor?",
    "Do you know how to contact the office?",
  ];

  // Initial form data
  const [formData, setFormData] = useState({
    serviceUserName: "",
    personMakingCall: "",
    date: "",
    additionalComments: "",
    managerSignature: "",
    managerSignatureDate: "",
    checklist: checklistQuestions.reduce((acc, q) => {
      acc[q] = { response: "", comments: "" };
      return acc;
    }, {}),
  });

  // Handle change for text fields + checklist
  const handleChange = (e, question, field) => {
    const value = e.target.value;

    if (question) {
      setFormData((prev) => ({
        ...prev,
        checklist: {
          ...prev.checklist,
          [question]: {
            ...prev.checklist[question],
            [field]: value,
          },
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: value,
      }));
    }
  };

  const handleSave = () => {
    console.log("Telephone Monitoring Form Submitted:", formData);
    alert("Telephone Monitoring Form saved successfully!");
    navigate("/admin/clients"); // Changed from "/admin/forms" to "/admin/clients"
  };

  // Styles
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
    margin: "18px 0 10px",
    color: "#00264D",
    fontSize: "17px",
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
    backgroundColor: "#7e57c2",
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

  return (
    <div style={formStyle}>
      {/* Back Button */}
      <button 
        type="button" 
        onClick={() => navigate("/admin/clients")} 
        style={backBtn}
      >
        ← Back
      </button>

      <h2 style={{ color: "#00264D", marginBottom: "20px" }}>Telephone Monitoring Form</h2>

      {/* Call Details */}
      <div style={sectionStyle}>Call Details</div>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
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

        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Person Making Call</label>
          <input
            type="text"
            name="personMakingCall"
            value={formData.personMakingCall}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      <label style={labelStyle}>Date</label>
      <input type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle} />

      {/* Checklist Section */}
      <div style={sectionStyle}>Monitoring Questions</div>

      {checklistQuestions.map((q) => (
        <div key={q} style={{ marginBottom: "20px" }}>
          <b>{q}</b>

          <div style={{ display: "flex", gap: "16px", marginTop: "6px" }}>
            <label>
              <input
                type="radio"
                name={`${q}-response`}
                value="Yes"
                checked={formData.checklist[q].response === "Yes"}
                onChange={(e) => handleChange(e, q, "response")}
              />{" "}
              Yes
            </label>

            <label>
              <input
                type="radio"
                name={`${q}-response`}
                value="No"
                checked={formData.checklist[q].response === "No"}
                onChange={(e) => handleChange(e, q, "response")}
              />{" "}
              No
            </label>

            <label>
              <input
                type="radio"
                name={`${q}-response`}
                value="N/A"
                checked={formData.checklist[q].response === "N/A"}
                onChange={(e) => handleChange(e, q, "response")}
              />{" "}
              N/A
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

      {/* Additional Comments */}
      <div style={sectionStyle}>Additional Comments</div>
      <textarea
        name="additionalComments"
        value={formData.additionalComments}
        onChange={handleChange}
        style={inputStyle}
        rows="4"
        placeholder="Anything else you would like to tell us?"
      />

      {/* Care Manager Review */}
      <div style={sectionStyle}>Care Manager Review</div>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Care Manager Signature</label>
          <input
            type="text"
            name="managerSignature"
            value={formData.managerSignature}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter Manager Name"
          />
        </div>

        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Date</label>
          <input
            type="date"
            name="managerSignatureDate"
            value={formData.managerSignatureDate}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Save Button */}
      <button type="button" onClick={handleSave} style={saveBtn}>
        Save Form
      </button>
    </div>
  );
}