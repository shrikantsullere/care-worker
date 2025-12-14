import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AppraisalForm() {
  const navigate = useNavigate();

  // Full Rating List from PDF
  const ratingKeys = [
    // PERSONAL QUALITIES
    "Time-keeping (shift hours)",
    "Punctuality (during work)",
    "Sickness absence",
    "Other authorised absence",
    "Unauthorised absence",
    "Appearance / smartness",
    "Manner / politeness",
    "Compassion / attitude towards service users",
    "Honesty / integrity",

    // PROFESSIONAL QUALITIES
    "Care knowledge",
    "Quantity of work",
    "Quality of work",
    "Flexibility towards duties",
    "Ability to work on own initiative",
    "Ability to work as a team",
    "Ability to deal with problems",
    "Willingness to learn",
    "Planning & organisational activity",
    "Leadership (support & supervision)",
    "Achievement of targets",
    "Acceptance of responsibility",
    "Attitude towards fellow staff",
    "Knowledge of job-related policies",
    "Disciplinary record",
  ];

  // Form Data
  const [formData, setFormData] = useState({
    employeeName: "",
    jobPosition: "",
    appraisalDate: "",

    selfAssessment: {
      achievements: "",
      problems: "",
      actionsNeeded: "",
      objectives: "",
      trainingRequired: "",
      generalComments: "",
      employeeSignature: "",
      employeeSignatureDate: "",
    },

    supervisorRatings: ratingKeys.reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {}),

    supervisorComments: {
      strengths: "",
      weaknesses: "",
      targetsAchieved: "",
      problemsEncountered: "",
      disciplinaryComments: "",
      trainingRequirements: "",
      otherComments: "",
    },

    // End Signatures
    employeeEndName: "",
    employeeEndSignature: "",
    employeeEndDate: "",
    supervisorEndName: "",
    supervisorEndSignature: "",
    supervisorEndDate: "",
    nextAppraisalDate: "",
  });

  // Input Handler
  const handleChange = (e, group, key) => {
    const { value, name, type } = e.target;

    if (group && key) {
      setFormData(prev => ({
        ...prev,
        [group]: {
          ...prev[group],
          [key]: value
        },
      }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Appraisal Form:", formData);
    alert("Appraisal saved successfully!");
    navigate("/admin/forms");
  };

  // Styles
  const formStyle = {
    maxWidth: "100vw",
    margin: "0 auto",
    padding: "20px",
    background: "#fff",
    fontFamily: "Segoe UI",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    position: "relative",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
  };

  const logoStyle = {
    height: "60px",
    maxWidth: "150px",
    objectFit: "contain",
  };

  const label = { 
    fontWeight: 600, 
    marginBottom: 4, 
    display: "block" 
  };

  const input = {
    width: "100%",
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 4,
    marginBottom: 12,
    background: "white",
    boxSizing: "border-box",
  };

  const section = {
    fontWeight: 700,
    margin: "18px 0 8px",
    borderBottom: "1px solid #ccc",
    color: "#00264D",
    paddingBottom: 4,
  };

  const row = { 
    display: "flex", 
    gap: 12, 
    flexWrap: "wrap" 
  };

  const responsiveRow = {
    ...row,
    flexDirection: "row",
  };

  const responsiveCol = {
    flex: "1 1 300px",
    minWidth: "250px",
  };

  return (
    <form style={formStyle}>
      {/* Header with Logo */}
      <div style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            type="button"
            onClick={() => navigate("/admin/forms")}
            style={{
              background: "#3A8DFF",
              color: "#fff",
              padding: "6px 14px",
              borderRadius: 4,
              border: "none",
              cursor: "pointer",
              marginRight: "15px",
            }}
          >
            ← Back
          </button>
          <h2 style={{ color: "#00264D", margin: "0" }}>
            Staff Appraisal Form
          </h2>
        </div>
        <img 
          src="https://unitecare.org/content/images/logo.png" 
          alt="Unite Care Logo" 
          style={logoStyle}
        />
      </div>

      {/* Employee Details */}
      <div style={section}>Employee Details</div>
      <div style={responsiveRow}>
        <div style={responsiveCol}>
          <label style={label}>Employee Name</label>
          <input style={input} name="employeeName" value={formData.employeeName}
            onChange={handleChange} />
        </div>
        <div style={responsiveCol}>
          <label style={label}>Job Position</label>
          <input style={input} name="jobPosition" value={formData.jobPosition}
            onChange={handleChange} />
        </div>
        <div style={responsiveCol}>
          <label style={label}>Appraisal Date</label>
          <input type="date" style={input} name="appraisalDate"
            value={formData.appraisalDate} onChange={handleChange} />
        </div>
      </div>

      {/* SELF ASSESSMENT */}
      <div style={section}>A: Pre-Appraisal Questionnaire</div>

      <textarea style={input} rows="3" placeholder="Achievements"
        value={formData.selfAssessment.achievements}
        onChange={(e) => handleChange(e, "selfAssessment", "achievements")}
      />

      <textarea style={input} rows="3" placeholder="Problems"
        value={formData.selfAssessment.problems}
        onChange={(e) => handleChange(e, "selfAssessment", "problems")}
      />

      <textarea style={input} rows="3" placeholder="Actions Needed"
        value={formData.selfAssessment.actionsNeeded}
        onChange={(e) => handleChange(e, "selfAssessment", "actionsNeeded")}
      />

      <textarea style={input} rows="3" placeholder="Objectives"
        value={formData.selfAssessment.objectives}
        onChange={(e) => handleChange(e, "selfAssessment", "objectives")}
      />

      <textarea style={input} rows="3" placeholder="Training Required"
        value={formData.selfAssessment.trainingRequired}
        onChange={(e) => handleChange(e, "selfAssessment", "trainingRequired")}
      />

      <textarea style={input} rows="3" placeholder="General Comments"
        value={formData.selfAssessment.generalComments}
        onChange={(e) => handleChange(e, "selfAssessment", "generalComments")}
      />

      {/* Employee signature for Self Appraisal */}
      <div style={responsiveRow}>
        <div style={responsiveCol}>
          <label style={label}>Employee Signature</label>
          <input style={input}
            value={formData.selfAssessment.employeeSignature}
            onChange={(e) => handleChange(e, "selfAssessment", "employeeSignature")}
          />
        </div>

        <div style={responsiveCol}>
          <label style={label}>Date</label>
          <input type="date" style={input}
            value={formData.selfAssessment.employeeSignatureDate}
            onChange={(e) => handleChange(e, "selfAssessment", "employeeSignatureDate")}
          />
        </div>
      </div>

      {/* SUPERVISOR RATINGS */}
      <div style={section}>B: Appraisal Record (Supervisor Ratings)</div>

      {ratingKeys.map((key) => (
        <div key={key} style={{ marginBottom: 12 }}>
          <b>{key}</b>
          <div style={{ display: "flex", gap: 10, marginTop: 4, flexWrap: "wrap" }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n} style={{ fontSize: 14 }}>
                <input
                  type="radio"
                  name={`rating-${key}`}
                  value={n}
                  checked={formData.supervisorRatings[key] === n}
                  onChange={(e) =>
                    handleChange(e, "supervisorRatings", key)
                  }
                />{" "}
                {n}
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* SUPERVISOR COMMENTS */}
      <div style={section}>Supervisor Comments</div>

      <textarea style={input} rows="3" placeholder="Strengths"
        value={formData.supervisorComments.strengths}
        onChange={(e) => handleChange(e, "supervisorComments", "strengths")}
      />

      <textarea style={input} rows="3" placeholder="Weaknesses"
        value={formData.supervisorComments.weaknesses}
        onChange={(e) => handleChange(e, "supervisorComments", "weaknesses")}
      />

      <textarea style={input} rows="3" placeholder="Targets Achieved"
        value={formData.supervisorComments.targetsAchieved}
        onChange={(e) => handleChange(e, "supervisorComments", "targetsAchieved")}
      />

      <textarea style={input} rows="3" placeholder="Problems Encountered"
        value={formData.supervisorComments.problemsEncountered}
        onChange={(e) => handleChange(e, "supervisorComments", "problemsEncountered")}
      />

      <textarea style={input} rows="3" placeholder="Disciplinary Record Comments"
        value={formData.supervisorComments.disciplinaryComments}
        onChange={(e) => handleChange(e, "supervisorComments", "disciplinaryComments")}
      />

      <textarea style={input} rows="3" placeholder="Training Requirements"
        value={formData.supervisorComments.trainingRequirements}
        onChange={(e) => handleChange(e, "supervisorComments", "trainingRequirements")}
      />

      <textarea style={input} rows="3" placeholder="Other Comments / Issues"
        value={formData.supervisorComments.otherComments}
        onChange={(e) => handleChange(e, "supervisorComments", "otherComments")}
      />

      {/* SIGNATURE BLOCK */}
      <div style={section}>Signatures</div>

      <div style={responsiveRow}>
        <div style={responsiveCol}>
          <label style={label}>Employee Name</label>
          <input style={input}
            name="employeeEndName"
            value={formData.employeeEndName}
            onChange={handleChange}
          />
        </div>

        <div style={responsiveCol}>
          <label style={label}>Employee Signature</label>
          <input style={input}
            name="employeeEndSignature"
            value={formData.employeeEndSignature}
            onChange={handleChange}
          />
        </div>

        <div style={responsiveCol}>
          <label style={label}>Date</label>
          <input type="date" style={input}
            name="employeeEndDate"
            value={formData.employeeEndDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div style={responsiveRow}>
        <div style={responsiveCol}>
          <label style={label}>Supervisor Name</label>
          <input style={input}
            name="supervisorEndName"
            value={formData.supervisorEndName}
            onChange={handleChange}
          />
        </div>

        <div style={responsiveCol}>
          <label style={label}>Supervisor Signature</label>
          <input style={input}
            name="supervisorEndSignature"
            value={formData.supervisorEndSignature}
            onChange={handleChange}
          />
        </div>

        <div style={responsiveCol}>
          <label style={label}>Date</label>
          <input type="date" style={input}
            name="supervisorEndDate"
            value={formData.supervisorEndDate}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Next Appraisal */}
      <label style={label}>Date of Next Appraisal</label>
      <input type="date" style={input}
        name="nextAppraisalDate"
        value={formData.nextAppraisalDate}
        onChange={handleChange}
      />

      {/* Save */}
      <button
        type="button"
        onClick={handleSave}
        style={{
          background: "#00264D",
          color: "#fff",
          padding: 14,
          width: "100%",
          marginTop: 20,
          borderRadius: 6,
          cursor: "pointer",
          border: "none",
          fontWeight: 600,
        }}
      >
        Save Form
      </button>
    </form>
  );
}