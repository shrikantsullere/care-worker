import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TrainingMatrixForm() {
  const navigate = useNavigate();

  // Default mandatory training list (15+)
  const defaultCourses = [
    "Infection Prevention & Control",
    "Moving & Handling",
    "Safeguarding Adults",
    "Safeguarding Children",
    "Health & Safety",
    "Fire Safety",
    "Basic Life Support / First Aid",
    "Medication Administration",
    "Food Hygiene",
    "Mental Capacity Act",
    "Dementia Awareness",
    "Equality & Diversity",
    "Challenging Behaviour",
    "Data Protection & GDPR",
    "Care Certificate Theory",
  ];

  const [formData, setFormData] = useState({
    courses: defaultCourses.map((course) => ({
      name: course,
      completedDate: "",
      expiryDate: "",
      certificate: null,
    })),
  });

  const handleCourseChange = (index, field, value) => {
    const updated = [...formData.courses];
    updated[index][field] = value;
    setFormData({ ...formData, courses: updated });
  };

  const handleCertificateUpload = (index, file) => {
    const updated = [...formData.courses];
    updated[index].certificate = file;
    setFormData({ ...formData, courses: updated });
  };

  const addCourse = () => {
    setFormData((prev) => ({
      ...prev,
      courses: [
        ...prev.courses,
        { name: "", completedDate: "", expiryDate: "", certificate: null },
      ],
    }));
  };

  const handleSave = () => {
    console.log("Training Matrix Submitted:", formData);
    alert("Training Matrix saved successfully!");
    navigate("/admin/forms");
  };

  const container = {
    maxWidth: "100vw",
    margin: "0 auto",
    fontFamily: "Segoe UI",
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  };

  const section = {
    fontWeight: 700,
    fontSize: "18px",
    margin: "15px 0",
    color: "#00264D",
    borderBottom: "1px solid #ccc",
    paddingBottom: "4px",
  };

  const row = {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "12px",
  };

  const input = {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    background: "white",
  };

  const button = {
    padding: "12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
    width: "100%",
  };

  return (
    <div style={container}>
      {/* Back Button */}
      <button
        onClick={() => navigate("/admin/forms")}
        style={{
          background: "#3A8DFF",
          color: "#fff",
          padding: "6px 14px",
          fontSize: "14px",
          borderRadius: "4px",
          border: "none",
          marginBottom: "15px",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <h2 style={{ textAlign: "center", color: "#00264D", marginBottom: "10px" }}>
        Training Matrix
      </h2>

      <div style={section}>Mandatory & Additional Training</div>

      {formData.courses.map((course, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            borderRadius: "6px",
            padding: "15px",
            marginBottom: "15px",
            background: "#fff",
          }}
        >
          {/* COURSE NAME */}
          <label style={{ fontWeight: 600 }}>Course Name</label>
          <input
            type="text"
            value={course.name}
            onChange={(e) => handleCourseChange(index, "name", e.target.value)}
            style={input}
            placeholder="Enter course name"
          />

          <div style={row}>
            {/* COMPLETED DATE */}
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: 600 }}>Completed Date</label>
              <input
                type="date"
                value={course.completedDate}
                onChange={(e) =>
                  handleCourseChange(index, "completedDate", e.target.value)
                }
                style={input}
              />
            </div>

            {/* EXPIRY DATE */}
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: 600 }}>Expiry Date</label>
              <input
                type="date"
                value={course.expiryDate}
                onChange={(e) =>
                  handleCourseChange(index, "expiryDate", e.target.value)
                }
                style={input}
              />
            </div>
          </div>

          {/* CERTIFICATE UPLOAD */}
          <label style={{ fontWeight: 600 }}>Upload Certificate (PDF / Image)</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) =>
              handleCertificateUpload(index, e.target.files[0] || null)
            }
            style={input}
          />

          {/* Show filename if uploaded */}
          {course.certificate && (
            <p style={{ fontSize: "14px", color: "green", marginTop: "6px" }}>
              Uploaded: {course.certificate.name}
            </p>
          )}
        </div>
      ))}

      {/* ADD NEW COURSE BUTTON */}
      <button
        onClick={addCourse}
        style={{
          ...button,
          background: "#6a5acd",
          color: "#fff",
          marginBottom: "15px",
        }}
      >
        + Add More Training
      </button>

      {/* SAVE */}
      <button
        onClick={handleSave}
        style={{ ...button, background: "#00264D", color: "#fff" }}
      >
        Save Training Matrix
      </button>
    </div>
  );
}
