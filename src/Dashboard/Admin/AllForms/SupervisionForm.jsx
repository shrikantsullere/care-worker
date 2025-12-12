// /src/Dashboard/Admin/AllForms/SupervisionForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SupervisionForm() {
  const navigate = useNavigate();

  // ALL QUESTIONS FROM PDF
  const discussionQuestions = [
    "How are you finding the role of a care worker?",
    "Do you feel you have the appropriate support from the office?",
    "Do you feel that the communication is adequate to complete your tasks?",
    "Are you made aware of any changes within the company?",
    "Do all of your care & support plans reflect the needs of individual clients?",
    "Are there any changes needed to medication administration for any clients?",
    "Is there any training you would like to undertake?",
    "Is there any other information that you would find useful?",
    "Are you managing with your current rota?",
    "Do you feel listened to?",
    "What could be done to make completing your tasks easier?",
    "Do you have any concerns about any clients?",
    "Is there anything else you would like to discuss?",
  ];

  const [formData, setFormData] = useState({
    careWorkerName: "",
    type: "Telephone",
    date: "",
    time: "",
    discussion: discussionQuestions.reduce((acc, q) => {
      acc[q] = "";
      return acc;
    }, {}),
    actionsAgreed: "",
    followUpDate: "",
    nextSupportDate: "",
    staffFileUpdated: "",
    rosterUpdated: "",
    additionalNotes: "",
  });

  // Change Handlers
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

  // Styles
  const formStyle = {
    maxWidth: "100vw",
    margin: "0 auto",
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "8px",
    fontFamily: "Segoe UI",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  };

  const label = { fontWeight: 600, marginBottom: 4, display: "block" };

  const input = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "10px",
    background: "#fff"
  };

  const section = {
    fontWeight: 700,
    margin: "18px 0 8px",
    borderBottom: "1px solid #ccc",
    color: "#00264D",
    fontSize: 16,
    paddingBottom: 4
  };

  const row = { display: "flex", gap: 12, flexWrap: "wrap" };

  const button = {
    padding: "12px",
    width: "100%",
    borderRadius: "6px",
    background: "#00264D",
    color: "#fff",
    border: "none",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 20
  };

  return (
    <form style={formStyle}>
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate("/admin/forms")}
        style={{
          background: "#3A8DFF",
          color: "#fff",
          border: "none",
          marginBottom: "15px",
          padding: "6px 14px",
          borderRadius: 4,
          cursor: "pointer"
        }}
      >
        ← Back
      </button>

      <h2 style={{ color: "#00264D", marginBottom: 20 }}>
        Telephone / Face to Face Supervision Record
      </h2>

      {/* Supervision Details */}
      <div style={section}>Supervision Details</div>

      <div style={row}>
        <div style={{ flex: 1 }}>
          <label style={label}>Care Worker Name</label>
          <input type="text" name="careWorkerName"
            value={formData.careWorkerName}
            onChange={handleChange}
            style={input}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label style={label}>Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={input}
          >
            <option value="Telephone">Telephone</option>
            <option value="Face to Face">Face to Face</option>
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label style={label}>Date</label>
          <input type="date" name="date"
            value={formData.date}
            onChange={handleChange}
            style={input}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label style={label}>Time</label>
          <input type="time" name="time"
            value={formData.time}
            onChange={handleChange}
            style={input}
          />
        </div>
      </div>

      {/* Discussion Section */}
      <div style={section}>Discussion</div>

      {discussionQuestions.map((q) => (
        <div key={q} style={{ marginBottom: 16 }}>
          <b>{q}</b>
          <textarea
            rows={3}
            style={input}
            value={formData.discussion[q]}
            onChange={(e) => handleChange(e, q)}
          />
        </div>
      ))}

      {/* Actions Agreed */}
      <div style={section}>Actions / Follow-Up</div>

      <textarea
        placeholder="Were there any agreed actions? If yes, describe here."
        rows={3}
        name="actionsAgreed"
        value={formData.actionsAgreed}
        onChange={handleChange}
        style={input}
      />

      <label style={label}>If applicable, when should this be completed?</label>
      <input
        type="date"
        name="followUpDate"
        value={formData.followUpDate}
        onChange={handleChange}
        style={input}
      />

      {/* NEXT SUPPORT SESSION */}
      <label style={label}>Date of next support session</label>
      <input
        type="date"
        name="nextSupportDate"
        value={formData.nextSupportDate}
        onChange={handleChange}
        style={input}
      />

      {/* Office Section */}
      <div style={section}>Office Use</div>

      <label style={label}>Staff file updated?</label>
      <select
        name="staffFileUpdated"
        value={formData.staffFileUpdated}
        onChange={handleChange}
        style={input}
      >
        <option value="">Select</option>
        <option value="YES">YES</option>
        <option value="NO">NO</option>
      </select>

      <label style={label}>Staff roster updated?</label>
      <select
        name="rosterUpdated"
        value={formData.rosterUpdated}
        onChange={handleChange}
        style={input}
      >
        <option value="">Select</option>
        <option value="YES">YES</option>
        <option value="NO">NO</option>
      </select>

      <label style={label}>Additional Notes</label>
      <textarea
        name="additionalNotes"
        rows={3}
        value={formData.additionalNotes}
        onChange={handleChange}
        style={input}
      />

      {/* Save Button */}
      <button type="button" onClick={handleSave} style={button}>
        Save Form
      </button>
    </form>
  );
}
