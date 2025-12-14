import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InductionChecklistForm() {
  const navigate = useNavigate();

  // EXACT requirement items from the document
  const checklistItems = [
    "Outline of role, responsibilities, level of authority and work priorities",
    "No matters outstanding from recruitment process",
    "Payment method and time(s) explained",
    "Completion of time sheets explained",
    "Staff Handbook contents explained",
    "Care Plans and Duty sheets explained",
    "Risk Assessments, Service User Monitoring Information, Report/Record Sheets explained",
    "PPE provided and explained",
    "Recording and Reporting Incidents, Accidents, Complaints, Comments, Safeguarding issues explained",
    "ECM explained",
    "Basic amenities location shown",
    "Emergency procedures explained",
    "Introduced to relevant team members",
    "ECM apps and ID Badge supplied",
    "Safeguarding policies (inc Whistleblowing, No Secrets, Prevent) explained",
    "Equality, Diversity, Dignity, Inclusion policies explained",
    "Medicine Administration policy explained",
    "Other relevant policies and procedures explained"
  ];

  const [formData, setFormData] = useState({
    employeeName: "",
    checklist: checklistItems.reduce((acc, item) => {
      acc[item] = false;
      return acc;
    }, {}),
    managerSignature: "",
    managerDate: "",
    employeeDeclaration: false,
    employeeSignature: "",
    employeeDate: ""
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSave = () => {
    console.log("Induction Checklist Submitted:", formData);
    alert("Induction Checklist Saved Successfully!");
    navigate("/admin/forms");
  };

  // Styles
  const container = {
    maxWidth: "100%",
    padding: "20px",
    fontFamily: "Segoe UI",
    background: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    position: "relative"
  };

  const header = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  };

  const logo = {
    height: "50px",
    width: "auto",
    maxWidth: "120px",
    objectFit: "contain"
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
    fontSize: "16px"
  };

  const checkboxContainer = {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "10px",
    fontSize: "16px"
  };

  const checkbox = {
    marginRight: "10px",
    marginTop: "4px"
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

  const signatureContainer = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px"
  };

  const signatureBox = {
    flex: "1",
    minWidth: "200px"
  };

  return (
    <div style={container}>
      {/* Header with Back Button and Logo */}
      <div style={header}>
        <button onClick={() => navigate("/admin/forms")} style={backBtn}>
          ← Back
        </button>
        <img
          src="https://unitecare.org/content/images/logo.png"
          alt="Unite Care Ltd Logo"
          style={logo}
        />
      </div>

      <h2 style={{ textAlign: "center", color: "#00264D" }}>
        Unite Care Ltd Induction Checklist
      </h2>

      {/* Employee Name */}
      <div style={section}>Employee Information</div>
      <input
        type="text"
        name="employeeName"
        placeholder="Employee Name"
        value={formData.employeeName}
        onChange={handleInputChange}
        style={input}
      />

      {/* Checklist Items */}
      <div style={section}>Induction Checklist</div>

      {checklistItems.map((item) => (
        <div key={item} style={checkboxContainer}>
          <input
            type="checkbox"
            checked={formData.checklist[item]}
            onChange={() => toggleCheckbox(item)}
            style={checkbox}
          />
          <label style={{ cursor: "pointer" }}>{item}</label>
        </div>
      ))}

      {/* Manager Signature */}
      <div style={section}>Manager Confirmation</div>
      <div style={signatureContainer}>
        <div style={signatureBox}>
          <label style={{ fontWeight: "600", display: "block", marginBottom: "5px" }}>
            Signed Manager:
          </label>
          <input
            type="text"
            name="managerSignature"
            value={formData.managerSignature}
            onChange={handleInputChange}
            style={input}
          />
        </div>
        <div style={signatureBox}>
          <label style={{ fontWeight: "600", display: "block", marginBottom: "5px" }}>
            Date Induction Completed:
          </label>
          <input
            type="date"
            name="managerDate"
            value={formData.managerDate}
            onChange={handleInputChange}
            style={input}
          />
        </div>
      </div>

      {/* Employee Declaration */}
      <div style={section}>Employee Declaration</div>
      <div style={{ 
        padding: "10px", 
        backgroundColor: "#f5f5f5", 
        borderRadius: "4px",
        border: "1px solid #ddd",
        marginBottom: "10px"
      }}>
        I have received induction and all above mentioned. I have read and understood all necessary policy and procedures and agree to implement all in order to provide safe, responsive, effective and caring service to the service users.
      </div>
      
      <div style={checkboxContainer}>
        <input
          type="checkbox"
          name="employeeDeclaration"
          checked={formData.employeeDeclaration}
          onChange={handleInputChange}
          style={checkbox}
        />
        <label style={{ cursor: "pointer" }}>I agree to the declaration above</label>
      </div>

      {/* Employee Signature */}
      <div style={signatureContainer}>
        <div style={signatureBox}>
          <label style={{ fontWeight: "600", display: "block", marginBottom: "5px" }}>
            Signed:
          </label>
          <input
            type="text"
            name="employeeSignature"
            value={formData.employeeSignature}
            onChange={handleInputChange}
            style={input}
          />
        </div>
        <div style={signatureBox}>
          <label style={{ fontWeight: "600", display: "block", marginBottom: "5px" }}>
            Date:
          </label>
          <input
            type="date"
            name="employeeDate"
            value={formData.employeeDate}
            onChange={handleInputChange}
            style={input}
          />
        </div>
      </div>

      <button onClick={handleSave} style={btn}>
        Save Form
      </button>
    </div>
  );
}