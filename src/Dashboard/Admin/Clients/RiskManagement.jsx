// /src/Dashboard/Admin/AllForms/RiskManagementForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RiskManagementForm() {
  const navigate = useNavigate();

  // Initial form data
  const [formData, setFormData] = useState({
    // Client Information
    clientName: "",
    dateOfBirth: "",
    nhsNumber: "",
    address: "",
    phoneNumber: "",
    emergencyContact: "",
    emergencyContactPhone: "",
    
    // Risk Assessment
    assessmentDate: "",
    assessorName: "",
    nextReviewDate: "",
    overallRiskLevel: "Low",
    
    // Risk Categories (Dynamic)
    risks: [
      {
        id: Date.now(),
        riskCategory: "",
        riskDescription: "",
        likelihood: "Unlikely",
        severity: "Insignificant",
        riskLevel: "Low",
        controlMeasures: [""],
        responsiblePerson: "",
        reviewDate: ""
      }
    ],
    
    // Emergency Procedures
    emergencyProcedures: "",
    emergencyContacts: "",
    
    // Review and Signature
    reviewerName: "",
    reviewerSignature: "",
    date: "",
  });

  // Handle change for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle change for risk fields
  const handleRiskChange = (index, field, value) => {
    const updatedRisks = [...formData.risks];
    updatedRisks[index][field] = value;
    
    // Calculate risk level based on likelihood and severity
    if (field === "likelihood" || field === "severity") {
      const likelihood = updatedRisks[index].likelihood;
      const severity = updatedRisks[index].severity;
      
      let riskLevel = "Low";
      if (
        (likelihood === "Likely" && severity !== "Insignificant") ||
        (likelihood === "Possible" && (severity === "Major" || severity === "Catastrophic")) ||
        (likelihood === "Unlikely" && severity === "Catastrophic")
      ) {
        riskLevel = "High";
      } else if (
        (likelihood === "Possible" && severity !== "Insignificant") ||
        (likelihood === "Unlikely" && (severity === "Moderate" || severity === "Major"))
      ) {
        riskLevel = "Medium";
      }
      
      updatedRisks[index].riskLevel = riskLevel;
    }
    
    setFormData((prev) => ({
      ...prev,
      risks: updatedRisks,
    }));
  };

  // Handle change for control measures
  const handleControlMeasureChange = (riskIndex, measureIndex, value) => {
    const updatedRisks = [...formData.risks];
    updatedRisks[riskIndex].controlMeasures[measureIndex] = value;
    setFormData((prev) => ({
      ...prev,
      risks: updatedRisks,
    }));
  };

  // Add new risk
  const addRisk = () => {
    setFormData((prev) => ({
      ...prev,
      risks: [
        ...prev.risks,
        {
          id: Date.now(),
          riskCategory: "",
          riskDescription: "",
          likelihood: "Unlikely",
          severity: "Insignificant",
          riskLevel: "Low",
          controlMeasures: [""],
          responsiblePerson: "",
          reviewDate: ""
        }
      ],
    }));
  };

  // Remove risk
  const removeRisk = (index) => {
    const updatedRisks = [...formData.risks];
    updatedRisks.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      risks: updatedRisks,
    }));
  };

  // Add control measure to a risk
  const addControlMeasure = (riskIndex) => {
    const updatedRisks = [...formData.risks];
    updatedRisks[riskIndex].controlMeasures.push("");
    setFormData((prev) => ({
      ...prev,
      risks: updatedRisks,
    }));
  };

  // Remove control measure from a risk
  const removeControlMeasure = (riskIndex, measureIndex) => {
    const updatedRisks = [...formData.risks];
    updatedRisks[riskIndex].controlMeasures.splice(measureIndex, 1);
    setFormData((prev) => ({
      ...prev,
      risks: updatedRisks,
    }));
  };

  const handleSave = () => {
    console.log("Risk Management Form Submitted:", formData);
    alert("Risk Management Form saved successfully!");
    navigate("/admin/clients");
  };

  // Responsive styles
  const formStyle = {
    maxWidth: "100vw",
    margin: "0 auto",
    fontFamily: "Segoe UI",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    boxSizing: "border-box",
    overflow: "hidden"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    backgroundColor: "white",
    boxSizing: "border-box"
  };

  const labelStyle = {
    fontWeight: 600,
    marginBottom: "4px",
    display: "block",
  };

  const sectionStyle = {
    fontWeight: 700,
    margin: "18px 0 10px",
    color: "#00264D",
    fontSize: "17px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "3px",
  };

  const buttonStyle = {
    padding: "12px",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: 600,
  };

  const saveBtn = {
    ...buttonStyle,
    backgroundColor: "#00264D",
    color: "#fff",
    border: "none",
    width: "100%",
  };

  const backBtn = {
    ...buttonStyle,
    backgroundColor: "#3A8DFF",
    color: "#fff",
    border: "none",
    marginBottom: "15px",
    padding: "6px 14px",
    fontSize: "14px",
  };

  const riskCardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "15px",
    backgroundColor: "white",
    boxSizing: "border-box"
  };

  const riskHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  };

  const removeBtnStyle = {
    backgroundColor: "#F44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "6px 12px",
    cursor: "pointer",
  };

  const addBtnStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "8px 12px",
    cursor: "pointer",
    marginTop: "10px",
  };

  const formRowStyle = {
    display: "flex",
    gap: "20px",
    marginBottom: "15px",
    flexWrap: "wrap",
  };

  const formColumnStyle = {
    flex: 1,
    minWidth: "250px",
  };

  const riskLevelColors = {
    Low: "#4CAF50",
    Medium: "#FF9800",
    High: "#F44336",
  };

  // Header styles
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "10px"
  };

  const titleStyle = {
    color: "#00264D",
    fontSize: "22px",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1
  };

  const logoStyle = {
    height: "50px",
    width: "auto",
    maxWidth: "120px",
    objectFit: "contain"
  };

  return (
    <div style={formStyle}>
      {/* Header with Logo and Title */}
      <div style={headerStyle}>
        <button 
          type="button" 
          onClick={() => navigate("/admin/clients")} 
          style={backBtn}
        >
          ← Back
        </button>
        
        <h2 style={titleStyle}>Risk Management Form</h2>
        
        <img 
          src="https://unitecare.org/content/images/logo.png" 
          alt="Unite Care Ltd Logo" 
          style={logoStyle}
        />
      </div>

      {/* Client Information Section */}
      <div style={sectionStyle}>Client Information</div>
      
      <div style={formRowStyle}>
        <div style={formColumnStyle}>
          <label style={labelStyle}>Client Name</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        
        <div style={formColumnStyle}>
          <label style={labelStyle}>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      <div style={formRowStyle}>
        <div style={formColumnStyle}>
          <label style={labelStyle}>NHS Number</label>
          <input
            type="text"
            name="nhsNumber"
            value={formData.nhsNumber}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        
        <div style={formColumnStyle}>
          <label style={labelStyle}>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      <label style={labelStyle}>Address</label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        style={inputStyle}
      />

      <div style={formRowStyle}>
        <div style={formColumnStyle}>
          <label style={labelStyle}>Emergency Contact</label>
          <input
            type="text"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        
        <div style={formColumnStyle}>
          <label style={labelStyle}>Emergency Contact Phone</label>
          <input
            type="tel"
            name="emergencyContactPhone"
            value={formData.emergencyContactPhone}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Risk Assessment Section */}
      <div style={sectionStyle}>Risk Assessment</div>
      
      <div style={formRowStyle}>
        <div style={formColumnStyle}>
          <label style={labelStyle}>Assessment Date</label>
          <input
            type="date"
            name="assessmentDate"
            value={formData.assessmentDate}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        
        <div style={formColumnStyle}>
          <label style={labelStyle}>Assessor Name</label>
          <input
            type="text"
            name="assessorName"
            value={formData.assessorName}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      <div style={formRowStyle}>
        <div style={formColumnStyle}>
          <label style={labelStyle}>Next Review Date</label>
          <input
            type="date"
            name="nextReviewDate"
            value={formData.nextReviewDate}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        
        <div style={formColumnStyle}>
          <label style={labelStyle}>Overall Risk Level</label>
          <select
            name="overallRiskLevel"
            value={formData.overallRiskLevel}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Risk Categories Section */}
      <div style={sectionStyle}>Risk Categories</div>
      
      {formData.risks.map((risk, index) => (
        <div key={risk.id} style={riskCardStyle}>
          <div style={riskHeaderStyle}>
            <h4 style={{ margin: 0, color: "#00264D" }}>Risk #{index + 1}</h4>
            {formData.risks.length > 1 && (
              <button
                type="button"
                onClick={() => removeRisk(index)}
                style={removeBtnStyle}
              >
                Remove Risk
              </button>
            )}
          </div>

          <div style={formRowStyle}>
            <div style={formColumnStyle}>
              <label style={labelStyle}>Risk Category</label>
              <select
                value={risk.riskCategory}
                onChange={(e) => handleRiskChange(index, "riskCategory", e.target.value)}
                style={inputStyle}
              >
                <option value="">Select Category</option>
                <option value="Falls">Falls</option>
                <option value="Medication Errors">Medication Errors</option>
                <option value="Nutrition/Hydration">Nutrition/Hydration</option>
                <option value="Social Isolation">Social Isolation</option>
                <option value="Pressure Ulcers">Pressure Ulcers</option>
                <option value="Infection Control">Infection Control</option>
                <option value="Wandering">Wandering</option>
                <option value="Self-Neglect">Self-Neglect</option>
                <option value="Financial Abuse">Financial Abuse</option>
                <option value="Physical Abuse">Physical Abuse</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div style={formColumnStyle}>
              <label style={labelStyle}>Risk Level</label>
              <div 
                style={{
                  ...inputStyle,
                  backgroundColor: riskLevelColors[risk.riskLevel],
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {risk.riskLevel}
              </div>
            </div>
          </div>

          <label style={labelStyle}>Risk Description</label>
          <textarea
            value={risk.riskDescription}
            onChange={(e) => handleRiskChange(index, "riskDescription", e.target.value)}
            style={inputStyle}
            rows="3"
            placeholder="Describe risk in detail"
          />

          <div style={formRowStyle}>
            <div style={formColumnStyle}>
              <label style={labelStyle}>Likelihood</label>
              <select
                value={risk.likelihood}
                onChange={(e) => handleRiskChange(index, "likelihood", e.target.value)}
                style={inputStyle}
              >
                <option value="Unlikely">Unlikely</option>
                <option value="Possible">Possible</option>
                <option value="Likely">Likely</option>
              </select>
            </div>
            
            <div style={formColumnStyle}>
              <label style={labelStyle}>Severity</label>
              <select
                value={risk.severity}
                onChange={(e) => handleRiskChange(index, "severity", e.target.value)}
                style={inputStyle}
              >
                <option value="Insignificant">Insignificant</option>
                <option value="Minor">Minor</option>
                <option value="Moderate">Moderate</option>
                <option value="Major">Major</option>
                <option value="Catastrophic">Catastrophic</option>
              </select>
            </div>
          </div>

          <label style={labelStyle}>Control Measures</label>
          {risk.controlMeasures.map((measure, measureIndex) => (
            <div key={measureIndex} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <input
                type="text"
                value={measure}
                onChange={(e) => handleControlMeasureChange(index, measureIndex, e.target.value)}
                style={{ ...inputStyle, marginBottom: 0 }}
                placeholder="Enter a control measure"
              />
              {risk.controlMeasures.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeControlMeasure(index, measureIndex)}
                  style={{ ...removeBtnStyle, padding: "10px" }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addControlMeasure(index)}
            style={addBtnStyle}
          >
            Add Control Measure
          </button>

          <div style={formRowStyle}>
            <div style={formColumnStyle}>
              <label style={labelStyle}>Responsible Person</label>
              <input
                type="text"
                value={risk.responsiblePerson}
                onChange={(e) => handleRiskChange(index, "responsiblePerson", e.target.value)}
                style={inputStyle}
                placeholder="Name of responsible person"
              />
            </div>
            
            <div style={formColumnStyle}>
              <label style={labelStyle}>Review Date</label>
              <input
                type="date"
                value={risk.reviewDate}
                onChange={(e) => handleRiskChange(index, "reviewDate", e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addRisk}
        style={addBtnStyle}
      >
        Add New Risk
      </button>

      {/* Emergency Procedures Section */}
      <div style={sectionStyle}>Emergency Procedures</div>
      
      <label style={labelStyle}>Emergency Procedures</label>
      <textarea
        name="emergencyProcedures"
        value={formData.emergencyProcedures}
        onChange={handleChange}
        style={inputStyle}
        rows="4"
        placeholder="Describe emergency procedures to follow"
      />

      <label style={labelStyle}>Emergency Contacts</label>
      <textarea
        name="emergencyContacts"
        value={formData.emergencyContacts}
        onChange={handleChange}
        style={inputStyle}
        rows="3"
        placeholder="List emergency contacts and their roles"
      />

      {/* Review and Signature Section */}
      <div style={sectionStyle}>Review and Signature</div>
      
      <div style={formRowStyle}>
        <div style={formColumnStyle}>
          <label style={labelStyle}>Reviewer Name</label>
          <input
            type="text"
            name="reviewerName"
            value={formData.reviewerName}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        
        <div style={formColumnStyle}>
          <label style={labelStyle}>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      <label style={labelStyle}>Reviewer Signature</label>
      <input
        type="text"
        name="reviewerSignature"
        value={formData.reviewerSignature}
        onChange={handleChange}
        style={inputStyle}
        placeholder="Enter reviewer name as signature"
      />

      {/* Save Button */}
      <button type="button" onClick={handleSave} style={saveBtn}>
        Save Form
      </button>
    </div>
  );
}