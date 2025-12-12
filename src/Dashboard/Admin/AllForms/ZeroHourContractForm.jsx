import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ZeroHourContractForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employeeName: "",
    address: "",
    startDate: "",
    hourlyRate: "",
    acceptTerms: false,
    employeeSignature: "",
    authorizedBy: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Zero Hour Contract saved:", formData);
    alert("Zero Hour Contract saved successfully!");
    navigate("/admin/forms");
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
          marginBottom: "15px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        ← Back
      </button>

      <h2 style={{ color: "#00264D", marginBottom: "20px", textAlign: "center" }}>
        Zero Hour Contract
      </h2>

      <form onSubmit={handleSave}>
        {/* Employee Name */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600 }}>Employee Name</label>
          <input
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white"
            }}
          />
        </div>

        {/* Address */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600 }}>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="2"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white"
            }}
          />
        </div>

        {/* Start Date */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600 }}>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white"
            }}
          />
        </div>

        {/* Hourly Rate */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600 }}>Hourly Rate (£)</label>
          <input
            type="text"
            name="hourlyRate"
            value={formData.hourlyRate}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white"
            }}
          />
        </div>

        {/* Accept Terms */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
            />
            I accept terms and conditions of employment
          </label>
        </div>

        {/* Employee Signature */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600 }}>Employee Signature</label>
          <input
            type="text"
            name="employeeSignature"
            value={formData.employeeSignature}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white"
            }}
          />
        </div>

        {/* Authorized By */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600 }}>Authorized by Unite Care Ltd</label>
          <input
            type="text"
            name="authorizedBy"
            value={formData.authorizedBy}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white"
            }}
          />
        </div>

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
          }}
        >
          Save Contract
        </button>
      </form>
    </div>
  );
};

export default ZeroHourContractForm;
