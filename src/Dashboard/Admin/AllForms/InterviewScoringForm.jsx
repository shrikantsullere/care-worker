import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InterviewScoringForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    question1: "1",
    question2: "1",
    question3: "1",
    question4: "1",
    question5: "1",
    question6: "1",
    question7: "1",
    question8: "1",
    question9: "1",
    question10: "1",
    interviewerName: "",
    interviewerSignature: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Form saved:", formData);
    alert("Interview scores saved successfully!");
    navigate("/admin/forms");
  };

  // ---- ALL 10 QUESTIONS FROM PDF ----
  const questions = [
    "What do you think a Care Worker does and what types of people might you work with?",
    "Describe a stressful or difficult situation and how you handled it.",
    "If you were providing personal support, how would you maintain dignity and respect?",
    "How would you know a person is safe & healthy at home? What would you do if concerned?",
    "What do you understand by person-centred care and how would you achieve this?",
    "What is your understanding of confidentiality in the care sector?",
    "When would you reveal something told to you in confidence by a service user?",
    "What is the simplest task you can do to stop/prevent infection spread?",
    "What would you do if a client offered you gifts or money?",
    "What is your understanding of medication criteria in the care sector?"
  ];

  return (
    <form
      onSubmit={handleSave}
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "Segoe UI",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        borderRadius: "8px"
      }}
    >
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/admin/forms")}
        type="button"
        style={{
          background: "#3A8DFF",
          border: "1px solid #999",
          color: "#ffffff",
          padding: "6px 14px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          marginBottom: "12px"
        }}
      >
        ← Back
      </button>

      <h2 style={{ color: "#00264D", marginBottom: "20px" }}>
        Interview Scoring – Competency
      </h2>

      <p>
        <em>Scoring: 1 = Very weak, 2 = Basic, 3 = Good, 4 = Excellent</em>
      </p>

      {/* ALL 10 QUESTIONS */}
      {questions.map((q, i) => (
        <div key={i} style={{ marginBottom: "18px" }}>
          <label
            style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "6px"
            }}
          >
            {i + 1}. {q}
          </label>

          <select
            name={`question${i + 1}`}
            value={formData[`question${i + 1}`]}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white"
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      ))}

      {/* NAME & SIGNATURE */}
      <div style={{ marginTop: "24px" }}>
        <label style={{ display: "block", fontWeight: "600", marginBottom: "6px" }}>
          Interviewer Name & Signature
        </label>

        <input
          type="text"
          name="interviewerName"
          value={formData.interviewerName}
          onChange={handleChange}
          placeholder="Interviewer Name"
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "12px"
          }}
        />

        <input
          type="text"
          name="interviewerSignature"
          value={formData.interviewerSignature}
          onChange={handleChange}
          placeholder="Interviewer Signature"
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "20px"
          }}
        />

        {/* SAVE BUTTON */}
        <button
          type="submit"
          style={{
            padding: "14px 20px",
            backgroundColor: "#00264D",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            width: "100%"
          }}
        >
          Save Form
        </button>
      </div>
    </form>
  );
};

export default InterviewScoringForm;
