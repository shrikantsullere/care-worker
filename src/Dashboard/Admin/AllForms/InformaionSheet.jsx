import React, { useState } from "react";

const InformationSheet = () => {
  const [formData, setFormData] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Information Sheet Submitted:", formData);
    alert("Information Sheet submitted successfully!");
  };

  const textareaStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    resize: "vertical",
    minHeight: "50px",
    backgroundColor: "white"
  };

  return (
    <div
      style={{
        maxWidth: "100vw",
        margin: "0 auto",
        fontFamily: "Segoe UI",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        // borderRadius: "8px"
      }}
    >
      {/* Back Button */}
      <button
        type="button"
        onClick={() => window.history.back()}
        style={{
          backgroundColor: "#3A8DFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          padding: "6px 12px",
          fontSize: "14px",
          cursor: "pointer",
          marginBottom: "15px",
        }}
      >
        ← Back
      </button>

      <h2 style={{ color: "#00264D", marginBottom: "20px", textAlign: "center" }}>
        INFORMATION SHEET (UNITE CARE LTD)
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Recruitment Stages */}
        <Section title="Recruitment Stages" />
        <StageList
          items={[
            "Application received",
            "HR contact within 4 weeks",
            "Fully completed form required"
          ]}
        />
        <Section title="Stage 2 – Interview Stage:" />
        <StageList
          items={[
            "Face‑to‑face interview",
            "Written exercise",
            "Two‑member trained panel",
            "Outcome within 7 days"
          ]}
        />
        <Section title="Stage 3 – Recruitment Stage:" />
        <StageList
          items={[
            "Enhanced DBS",
            "References (3 required)",
            "Offer letter + medical form",
            "DBS may take 2 weeks–3 months"
          ]}
        />
        <Section title="Stage 4 – Getting Started:" />
        <StageList
          items={[
            "Assigned to home within 5 days",
            "Shadow shifts",
            "Contract + ID within 8 weeks"
          ]}
        />

        <Section title="Frequently Asked Questions:" />

        {["q1", "q2", "q3", "q4", "q5"].map((q, index) => (
          <div key={q} style={{ marginBottom: "16px" }}>
            <strong>
              {`Q${index + 1}: ${faqQuestions[index]}`}
            </strong>
            <textarea
              name={q}
              value={formData[q]}
              onChange={handleChange}
              style={textareaStyle}
              placeholder="Type your answer here..."
              required
            />
          </div>
        ))}

        <button
          type="submit"
          style={{
            padding: "12px",
            width: "100%",
            backgroundColor: "#00264D",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "20px"
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

/* 🔹 Reusable Components */
const Section = ({ title }) => (
  <div
    style={{
      fontWeight: 700,
      margin: "16px 0 8px",
      color: "#00264D",
      fontSize: "16px",
      borderBottom: "1px solid #ccc",
      paddingBottom: "3px",
    }}
  >
    {title}
  </div>
);

const StageList = ({ items }) => (
  <ul style={{ marginBottom: "12px", paddingLeft: "20px" }}>
    {items.map((item, index) => (
      <li key={index} style={{ marginBottom: "6px" }}>{item}</li>
    ))}
  </ul>
);

const faqQuestions = [
  "How long will the process take?",
  "What if conviction appears on DBS?",
  "Will I pay for DBS?",
  "Will I work shifts?",
  "What about pre‑booked holidays?"
];

export default InformationSheet;
