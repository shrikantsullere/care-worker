import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InductionChecklistForm() {
  const navigate = useNavigate();

  // EXACT requirement items
  const checklistItems = [
    "Company Policies",
    "Medication Handling",
    "PPE Training",
    "Lone Worker Policy",
    "Manual Handling",
    "Fire Safety",
    "Infection Control",
    "Shadowing Completed",
  ];

  const [formData, setFormData] = useState({
    checklist: checklistItems.reduce((acc, item) => {
      acc[item] = false;
      return acc;
    }, {}),
    inductionSignature: "",
    date: "",
  });

  const toggleCheckbox = (item) => {
    setFormData((prev) => ({
      ...prev,
      checklist: {
        ...prev.checklist,
        [item]: !prev.checklist[item],
      },
    }));
  };

  const handleSave = () => {
    console.log("Induction Checklist Submitted:", formData);
    alert("Induction Checklist Saved Successfully!");
    navigate("/admin/forms");
  };

  // Styles
  const container = {
    maxWidth: "100vw",
    padding: "20px",
    fontFamily: "Segoe UI",
    background: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  };

  const section = {
    fontWeight: 700,
    fontSize: "18px",
    margin: "18px 0 10px",
    borderBottom: "1px solid #ccc",
    color: "#00264D",
    paddingBottom: "4px",
  };

  const input = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "12px",
  };

  const btn = {
    padding: "12px",
    background: "#00264D",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
    width: "100%",
    marginTop: "15px",
    border: "none",
  };

  const backBtn = {
    padding: "6px 14px",
    background: "#3A8DFF",
    color: "#fff",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    marginBottom: "14px",
  };

  return (
    <div style={container}>
      {/* Back Button */}
      <button onClick={() => navigate("/admin/forms")} style={backBtn}>
        ← Back
      </button>

      <h2 style={{ textAlign: "center", color: "#00264D" }}>
        Induction Checklist
      </h2>

      <div style={section}>Checklist Items</div>

      {checklistItems.map((item) => (
        <label
          key={item}
          style={{
            display: "block",
            marginBottom: "10px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          <input
            type="checkbox"
            checked={formData.checklist[item]}
            onChange={() => toggleCheckbox(item)}
            style={{ marginRight: "10px" }}
          />
          {item}
        </label>
      ))}

      {/* Signature */}
      <div style={section}>Induction Signature</div>

      <input
        type="text"
        name="inductionSignature"
        placeholder="Type Induction Signature"
        value={formData.inductionSignature}
        onChange={(e) =>
          setFormData({ ...formData, inductionSignature: e.target.value })
        }
        style={input}
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        style={input}
      />

      <button onClick={handleSave} style={btn}>
        Save Checklist
      </button>
    </div>
  );
}
