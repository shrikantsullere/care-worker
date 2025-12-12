import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SpotCheckForm() {
  const navigate = useNavigate();

  // FULL checklist from PDF
  const checklistQuestions = [
    "Did the care worker arrive on time?",
    "Did the care worker greet and engage with the client?",
    "Is communication adequate between care worker and client?",
    "Is the client asked/notified of tasks?",
    "Do care & support plans reflect the needs of the client?",
    "Are there any changes needed to the current care plan?",
    "Is there any training the care worker requires?",
    "Did the care worker show their ID?",
    "Was the care worker wearing protective clothing (PPE)?",
    "Did the client feel listened to?",
    "Is the care worker competent & understands tasks?",
    "Do you have any concerns about the client?",
    "Did the care worker stay for the full duration?",
    "Did the allocated time run over?",
    "Were actions agreed or need follow-up?"
  ];

  const [formData, setFormData] = useState({
    careWorkerName: "",
    serviceUserName: "",
    date: "",
    time: "",
    supervisionType: "Face to Face",
    whenToComplete: "",
    nextSupportSession: "",
    staffFileUpdated: "",
    softwareUpdated: "",
    additionalNotes: "",
    careWorkerSignature: "",
    careWorkerDate: "",
    assessorName: "",
    assessorSignature: "",
    assessorDate: "",

    checklist: checklistQuestions.reduce((acc, q) => {
      acc[q] = { response: "", comments: "" };
      return acc;
    }, {}),
  });

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
    maxWidth: "900px",
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

  const sectionStyle = {
    fontWeight: 700,
    margin: "20px 0 10px",
    color: "#00264D",
    fontSize: "17px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "4px"
  };

  const rowStyle = {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap"
  };

  const labelStyle = { fontWeight: 600, marginBottom: "4px", display: "block" };

  return (
    <form style={formStyle}>
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate("/admin/forms")}
        style={{
          backgroundColor: "#3A8DFF",
          color: "#fff",
          padding: "6px 14px",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "15px",
          border: "none",
          fontSize: "14px",
        }}
      >
        ← Back
      </button>

      <h2 style={{ color: "#00264D", marginBottom: "20px" }}>Spot Check Form</h2>

      {/* CARE DETAILS */}
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

      {/* Supervision Type */}
      <div style={sectionStyle}>Type of Supervision</div>
      <select
        name="supervisionType"
        value={formData.supervisionType}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="Face to Face">FACE TO FACE</option>
        <option value="Spot Check">SPOT CHECK</option>
      </select>

      {/* DATE-TIME */}
      <div style={sectionStyle}>Visit Details</div>
      <div style={rowStyle}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Time</label>
          <input type="time" name="time" value={formData.time} onChange={handleChange} style={inputStyle} />
        </div>
      </div>

      {/* CHECKLIST */}
      <div style={sectionStyle}>Spot Check Checklist</div>

      {checklistQuestions.map(q => (
        <div key={q} style={{ marginBottom: "18px" }}>
          <b>{q}</b>

          <div style={{ display: "flex", gap: "16px", marginTop: "6px" }}>
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
            rows="3"
            value={formData.checklist[q].comments}
            onChange={(e) => handleChange(e, q, "comments")}
            style={inputStyle}
          />
        </div>
      ))}

      {/* FOLLOW-UP FIELDS */}
      <div style={sectionStyle}>Follow-Up Information</div>

      <label style={labelStyle}>If applicable, when should this be completed?</label>
      <input
        type="date"
        name="whenToComplete"
        value={formData.whenToComplete}
        onChange={handleChange}
        style={inputStyle}
      />

      <label style={labelStyle}>Date of next support session:</label>
      <input
        type="date"
        name="nextSupportSession"
        value={formData.nextSupportSession}
        onChange={handleChange}
        style={inputStyle}
      />

      {/* STAFF / SOFTWARE UPDATED */}
      <div style={sectionStyle}>Monthly Updates (if no spot check done)</div>

      <label style={labelStyle}>Staff file updated?</label>
      <select
        name="staffFileUpdated"
        value={formData.staffFileUpdated}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="">Select</option>
        <option value="Yes">YES</option>
        <option value="No">NO</option>
      </select>

      <label style={labelStyle}>Software updated?</label>
      <select
        name="softwareUpdated"
        value={formData.softwareUpdated}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="">Select</option>
        <option value="Yes">YES</option>
        <option value="No">NO</option>
      </select>

      {/* Additional Notes */}
      <label style={sectionStyle}>Additional Notes</label>
      <textarea
        name="additionalNotes"
        rows="3"
        value={formData.additionalNotes}
        onChange={handleChange}
        style={inputStyle}
      />

      {/* SIGNATURES */}
      <div style={sectionStyle}>Signatures</div>

      <label style={labelStyle}>Care Worker Signature</label>
      <input
        type="text"
        name="careWorkerSignature"
        value={formData.careWorkerSignature}
        onChange={handleChange}
        style={inputStyle}
        placeholder="Signature"
      />

      <label style={labelStyle}>Date</label>
      <input
        type="date"
        name="careWorkerDate"
        value={formData.careWorkerDate}
        onChange={handleChange}
        style={inputStyle}
      />

      <label style={labelStyle}>Assessor Name</label>
      <input
        type="text"
        name="assessorName"
        value={formData.assessorName}
        onChange={handleChange}
        style={inputStyle}
      />

      <label style={labelStyle}>Assessor Signature</label>
      <input
        type="text"
        name="assessorSignature"
        value={formData.assessorSignature}
        onChange={handleChange}
        style={inputStyle}
      />

      <label style={labelStyle}>Date</label>
      <input
        type="date"
        name="assessorDate"
        value={formData.assessorDate}
        onChange={handleChange}
        style={inputStyle}
      />

      {/* SAVE BUTTON */}
      <button
        type="button"
        onClick={handleSave}
        style={{
          marginTop: "20px",
          width: "100%",
          backgroundColor: "#00264D",
          color: "#fff",
          padding: "12px",
          borderRadius: "6px",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Save Form
      </button>
    </form>
  );
}
