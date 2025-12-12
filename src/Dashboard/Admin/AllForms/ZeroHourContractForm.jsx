import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ZeroHourContractForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employeeName: "",
    address: "",
    jobTitle: "Care Worker",
    startDate: "",
    probationPeriod: "3 Months",
    normalHours: "06:00 – 22:00 (Mon–Sun incl. bank holidays)",
    annualLeave: "5.6 weeks (pro-rata)",
    holidayPayHourly: false,
    holidayPayPercent: "12.7",
    hourlyRate: "",
    noticePeriod: "1 calendar month",
    acceptTerms: false,

    // Policy confirmations
    sickPay: true,
    grievancePolicy: true,
    dutiesAccepted: true,
    conductAccepted: true,
    staffHandbookAccepted: true,
    disciplinaryAccepted: true,
    criminalNotification: false,

    // Employee signature
    employeeSignatureName: "",
    employeeSignatureDate: "",
    employeeSignature: "",

    // Employer side
    authorizedBy: "",
    authorizedDesignation: "",
    authorizedDate: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert("Please accept the employment terms before saving.");
      return;
    }
    console.log("Zero Hour Contract saved:", formData);
    alert("Zero Hour Contract saved successfully!");
    navigate("/admin/forms");
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "white",
    marginTop: "4px"
  };

  const labelStyle = {
    fontWeight: 600,
    marginBottom: "4px",
    display: "block"
  };

  const sectionTitle = {
    fontWeight: 700,
    margin: "20px 0 10px",
    color: "#00264D",
    fontSize: "17px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "4px"
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
        borderRadius: "8px"
      }}
    >
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate("/admin/forms")}
        style={{
          backgroundColor: "#3A8DFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          padding: "6px 12px",
          fontSize: "14px",
          cursor: "pointer",
          marginBottom: "15px"
        }}
      >
        ← Back
      </button>

      <h2 style={{ color: "#00264D", marginBottom: "20px", textAlign: "center" }}>
        Zero Hour Contract Agreement
      </h2>

      <form onSubmit={handleSave}>
        {/* EMPLOYEE DETAILS */}
        <div style={sectionTitle}>Employee Information</div>

        <label style={labelStyle}>Employee Name</label>
        <input
          type="text"
          name="employeeName"
          value={formData.employeeName}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Address</label>
        <textarea
          name="address"
          rows="2"
          value={formData.address}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Job Title</label>
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* CONTRACT DETAILS */}
        <div style={sectionTitle}>Contract Terms</div>

        <label style={labelStyle}>Probation Period</label>
        <input style={inputStyle} value={formData.probationPeriod} disabled />

        <label style={labelStyle}>Normal Hours</label>
        <input style={inputStyle} value={formData.normalHours} disabled />

        <label style={labelStyle}>Annual Leave</label>
        <input style={inputStyle} value={formData.annualLeave} disabled />

        {/* Holiday Pay */}
        <label style={labelStyle}>Holiday Pay Option (Hourly)</label>
        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="checkbox"
            name="holidayPayHourly"
            checked={formData.holidayPayHourly}
            onChange={handleChange}
          />
          Pay holiday on hourly basis =
          <input
            type="number"
            name="holidayPayPercent"
            value={formData.holidayPayPercent}
            onChange={handleChange}
            style={{ width: "70px", padding: "6px" }}
          /> %
        </label>

        <label style={labelStyle}>Hourly Rate (£)</label>
        <input
          type="text"
          name="hourlyRate"
          value={formData.hourlyRate}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Notice Period</label>
        <input style={inputStyle} value={formData.noticePeriod} disabled />

        {/* POLICY CONFIRMATIONS */}
        <div style={sectionTitle}>Policy & Handbook Confirmation</div>

        {[
          { key: "sickPay", text: "I understand the Sick Pay policy (Staff Handbook)" },
          { key: "grievancePolicy", text: "I understand the Grievance Policy (Staff Handbook)" },
          { key: "dutiesAccepted", text: "I accept the duties described in Job Description" },
          { key: "conductAccepted", text: "I accept the Code of Conduct" },
          { key: "staffHandbookAccepted", text: "I agree to comply with the Staff Handbook" },
          { key: "disciplinaryAccepted", text: "I understand the Disciplinary Procedure" },
        ].map(item => (
          <label
            key={item.key}
            style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}
          >
            <input
              type="checkbox"
              name={item.key}
              checked={formData[item.key]}
              onChange={handleChange}
            />
            {item.text}
          </label>
        ))}

        {/* Criminal Offence */}
        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="checkbox"
            name="criminalNotification"
            checked={formData.criminalNotification}
            onChange={handleChange}
          />
          I will notify Unite Care Ltd of any criminal conviction / charge.
        </label>

        {/* ACCEPT TERMS */}
        <div style={sectionTitle}>Contract Acceptance</div>

        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
          />
          I accept the terms and conditions of employment.
        </label>

        {/* SIGNATURE SECTION */}
        <div style={sectionTitle}>Employee Signature</div>

        <label style={labelStyle}>Printed Name</label>
        <input
          type="text"
          name="employeeSignatureName"
          value={formData.employeeSignatureName}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Signature</label>
        <input
          type="text"
          name="employeeSignature"
          value={formData.employeeSignature}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Date</label>
        <input
          type="date"
          name="employeeSignatureDate"
          value={formData.employeeSignatureDate}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* EMPLOYER SIGN AREA */}
        <div style={sectionTitle}>Authorized by (Unite Care Ltd)</div>

        <label style={labelStyle}>Name</label>
        <input
          type="text"
          name="authorizedBy"
          value={formData.authorizedBy}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Designation</label>
        <input
          type="text"
          name="authorizedDesignation"
          value={formData.authorizedDesignation}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Date</label>
        <input
          type="date"
          name="authorizedDate"
          value={formData.authorizedDate}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Save Button */}
        <button
          type="submit"
          style={{
            padding: "12px",
            width: "100%",
            backgroundColor: "#00264D",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "20px"
          }}
        >
          Save Contract
        </button>
      </form>
    </div>
  );
};

export default ZeroHourContractForm;
