import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InductionForm() {
  const navigate = useNavigate();

  // Checklist items from the uploaded PDF
  const inductionItems = [
    "Outline of role, responsibilities, level of authority and work priorities explained",
    "Pre-employment checks verified, all information obtained",
    "Payment method and timings explained",
    "Time sheet completion explained",
    "Staff Handbook contents explained",
    "Care Plans & Duty sheets explained",
    "Risk Assessments, Service User Monitoring Info, Record Sheets explained",
    "PPE explained & issued",
    "Incident/Accident/Complaints/Safeguarding reporting explained",
    "ECM explained",
    "Basic amenities shown",
    "Emergency procedures explained",
    "Introduced to relevant team members",
    "Supplied with ECM apps, ID Badge",
  ];

  const policyItems = [
    "Safeguarding (including Whistleblowing, No Secrets, Prevent)",
    "Equality, Diversity, Dignity, Inclusion",
    "Medicine Administration",
    "All other relevant policies explained",
  ];

  // Initial form data state
  const [formData, setFormData] = useState({
    employeeName: "",
    inductionChecklist: inductionItems.reduce((acc, item) => {
      acc[item] = false;
      return acc;
    }, {}),
    policyChecklist: policyItems.reduce((acc, item) => {
      acc[item] = false;
      return acc;
    }, {}),
    managerSignature: "",
    dateCompleted: "",
    employeeSignature: "",
    employeeDate: "",
  });

  const handleCheckbox = (section, item) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [item]: !prev[section][item],
      },
    }));
  };

  const handleSave = () => {
    console.log("Induction Form Submitted:", formData);
    alert("Induction Form saved successfully!");
    navigate("/admin/forms");
  };

  // UI styles
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
    margin: "20px 0 10px",
    color: "#00264D",
    fontSize: "17px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "4px",
  };

  const input = {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  };

  const btn = {
    padding: "12px",
    background: "#00264D",
    color: "#fff",
    fontWeight: 600,
    borderRadius: "6px",
    width: "100%",
    border: "none",
    cursor: "pointer",
    marginTop: "15px",
  };

  const backBtn = {
    padding: "6px 14px",
    background: "#3A8DFF",
    fontSize: "14px",
    borderRadius: "4px",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginBottom: "15px",
  };

  return (
    <div style={container}>
      {/* BACK BUTTON */}
      <button onClick={() => navigate("/admin/forms")} style={backBtn}>
        ← Back
      </button>

      <h2 style={{ textAlign: "center", color: "#00264D" }}>
        Unite Care Ltd – Induction Form
      </h2>

      {/* EMPLOYEE NAME */}
      <div style={section}>Employee Information</div>

      <input
        type="text"
        name="employeeName"
        value={formData.employeeName}
        onChange={(e) =>
          setFormData({ ...formData, employeeName: e.target.value })
        }
        placeholder="Employee Name"
        style={input}
      />

      {/* INDUCTION CHECKLIST */}
      <div style={section}>Induction Checklist</div>

      {inductionItems.map((item) => (
        <label
          key={item}
          style={{
            display: "block",
            marginBottom: "8px",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          <input
            type="checkbox"
            checked={formData.inductionChecklist[item]}
            onChange={() => handleCheckbox("inductionChecklist", item)}
            style={{ marginRight: "8px" }}
          />
          {item}
        </label>
      ))}

      {/* POLICIES & PROCEDURES */}
      <div style={section}>Relevant Policies & Procedures</div>

      {policyItems.map((item) => (
        <label key={item} style={{ display: "block", marginBottom: "8px" }}>
          <input
            type="checkbox"
            checked={formData.policyChecklist[item]}
            onChange={() => handleCheckbox("policyChecklist", item)}
            style={{ marginRight: "8px" }}
          />
          {item}
        </label>
      ))}

      {/* SIGNATURES */}
      <div style={section}>Manager Sign-off</div>

      <input
        type="text"
        name="managerSignature"
        placeholder="Manager Signature"
        value={formData.managerSignature}
        onChange={(e) =>
          setFormData({ ...formData, managerSignature: e.target.value })
        }
        style={input}
      />

      <input
        type="date"
        name="dateCompleted"
        value={formData.dateCompleted}
        onChange={(e) =>
          setFormData({ ...formData, dateCompleted: e.target.value })
        }
        style={input}
      />

      <div style={section}>Employee Declaration</div>

      <p style={{ marginBottom: "8px" }}>
        I have received induction and all above items. I have read all policies 
        and understand the responsibilities of my role.
      </p>

      <input
        type="text"
        name="employeeSignature"
        placeholder="Employee Signature"
        value={formData.employeeSignature}
        onChange={(e) =>
          setFormData({ ...formData, employeeSignature: e.target.value })
        }
        style={input}
      />

      <input
        type="date"
        name="employeeDate"
        value={formData.employeeDate}
        onChange={(e) =>
          setFormData({ ...formData, employeeDate: e.target.value })
        }
        style={input}
      />

      {/* SAVE BUTTON */}
      <button onClick={handleSave} style={btn}>
        Save Induction Form
      </button>
    </div>
  );
}
