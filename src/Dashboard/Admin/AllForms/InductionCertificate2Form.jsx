// src/components/forms/InductionCertificate2Form.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InductionCertificate2Form = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    carerName: "",
    trainerName: "",
    dateOfIssue: "",
    trainings: {
      whistleblowing: false,
      medicationAdmin: false,
      fireSafety: false,
      communication: false,
      nutrition: false,
      dementiaCare: false,
      firstAid: false,
      safeguarding: false,
      movingHandling: false,
    },
    carerSignature: "",
    trainerSignature: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        trainings: { ...prev.trainings, [name]: checked },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Induction Certificate 2 saved successfully!");
    console.log("Saved Data:", formData);
    navigate("/admin/forms");
  };

  return (
    <div
      className="container my-4 p-4 border rounded shadow"
      style={{
        maxWidth: "100vw",
        backgroundColor: "#f9f9f9",
        fontFamily: "Segoe UI",
      }}
    >
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/admin/forms")}
        style={{
          background: "#3A8DFF",
          color: "#FFF",
          border: "none",
          padding: "6px 12px",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "15px",
        }}
      >
        ← Back
      </button>

      <h2 className="text-primary text-center mb-3">
        Induction Certificate 2 (Extended)
      </h2>

      <p><strong>Additional Training:</strong></p>

      <form onSubmit={handleSave}>
        {/* Carer Name */}
        <div className="mb-3">
          <label className="form-label">Carer Name</label>
          <input
            type="text"
            className="form-control"
            name="carerName"
            value={formData.carerName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Trainer Name */}
        <div className="mb-3">
          <label className="form-label">Trainer Name</label>
          <input
            type="text"
            className="form-control"
            name="trainerName"
            value={formData.trainerName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Date of Issue */}
        <div className="mb-3">
          <label className="form-label">Date of Issue</label>
          <input
            type="date"
            className="form-control"
            name="dateOfIssue"
            value={formData.dateOfIssue}
            onChange={handleChange}
            required
          />
        </div>

        {/* Trainings */}
        <div className="mb-3">
          <label className="form-label">Training Modules</label>

          {Object.entries(formData.trainings).map(([key, value]) => (
            <div className="form-check" key={key}>
              <input
                className="form-check-input"
                type="checkbox"
                name={key}
                checked={value}
                onChange={handleChange}
              />

              <label className="form-check-label">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </label>
            </div>
          ))}
        </div>

        {/* Signatures */}
        <div className="mb-3">
          <label className="form-label">Signatures</label>
          <div className="d-flex gap-3">
            <input
              type="text"
              placeholder="Carer Signature"
              className="form-control"
              name="carerSignature"
              value={formData.carerSignature}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              placeholder="Trainer Signature"
              className="form-control"
              name="trainerSignature"
              value={formData.trainerSignature}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Remarks */}
        <div className="mb-3">
          <label className="form-label">Remarks (Optional)</label>
          <textarea
            className="form-control"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

{/* ONLY SAVE BUTTON */}
<button
  type="submit"
  className="w-100"
  style={{
    padding: "12px",
    fontSize: "16px",
    fontWeight: 600,
    color: "#fff",
    background: "linear-gradient(90deg, #3A8DFF, #0052CC)", // gradient
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = "translateY(-2px)";
    e.target.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)";
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = "translateY(0)";
    e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  }}
>
  Save Certificate
</button>

      </form>
    </div>
  );
};

export default InductionCertificate2Form;
