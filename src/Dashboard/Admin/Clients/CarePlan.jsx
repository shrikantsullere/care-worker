// /src/Dashboard/Admin/AllForms/CarePlanForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CarePlanForm() {
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
    gpDetails: "",
    
    // Health and Medical Information
    diagnosis: "",
    allergies: "",
    medications: "",
    mobilityAssistance: "",
    communicationNeeds: "",
    personalCareAssistance: "",
    nutritionalNeeds: "",
    continenceNeeds: "",
    sleepPattern: "",
    socialInterests: "",
    culturalNeeds: "",
    
    // Care Assessment
    riskAssessment: "",
    mentalHealth: "",
    physicalHealth: "",
    socialNeeds: "",
    
    // Care Plan Goals
    carePlanGoals: [""],
    desiredOutcomes: [""],
    
    // Support Requirements
    interventions: [""],
    equipment: [""],
    additionalSupport: "",
    
    // Review and Signature
    reviewDate: "",
    careManagerSignature: "",
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

  // Handle change for array fields
  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      [field]: updatedArray,
    }));
  };

  // Add new item to array
  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  // Remove item from array
  const removeArrayItem = (field, index) => {
    const updatedArray = [...formData[field]];
    updatedArray.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      [field]: updatedArray,
    }));
  };

  const handleSave = () => {
    console.log("Care Plan Form Submitted:", formData);
    alert("Care Plan Form saved successfully!");
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

  const arrayItemStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  };

  const arrayInputStyle = {
    flex: 1,
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginRight: "10px",
    backgroundColor: "white",
    boxSizing: "border-box"
  };

  const removeBtnStyle = {
    backgroundColor: "#F44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "8px 12px",
    cursor: "pointer",
  };

  const addBtnStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "8px 12px",
    cursor: "pointer",
    marginTop: "5px",
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
        
        <h2 style={titleStyle}>Care Plan Form</h2>
        
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

      <label style={labelStyle}>GP Details</label>
      <input
        type="text"
        name="gpDetails"
        value={formData.gpDetails}
        onChange={handleChange}
        style={inputStyle}
      />

      {/* Health and Medical Information Section */}
      <div style={sectionStyle}>Health and Medical Information</div>
      
      <label style={labelStyle}>Diagnosis</label>
      <textarea
        name="diagnosis"
        value={formData.diagnosis}
        onChange={handleChange}
        style={inputStyle}
        rows="3"
      />

      <label style={labelStyle}>Allergies</label>
      <textarea
        name="allergies"
        value={formData.allergies}
        onChange={handleChange}
        style={inputStyle}
        rows="2"
      />

      <label style={labelStyle}>Medications</label>
      <textarea
        name="medications"
        value={formData.medications}
        onChange={handleChange}
        style={inputStyle}
        rows="3"
      />

      <label style={labelStyle}>Mobility Assistance</label>
      <textarea
        name="mobilityAssistance"
        value={formData.mobilityAssistance}
        onChange={handleChange}
        style={inputStyle}
        rows="2"
      />

      <label style={labelStyle}>Communication Needs</label>
      <textarea
        name="communicationNeeds"
        value={formData.communicationNeeds}
        onChange={handleChange}
        style={inputStyle}
        rows="2"
      />

      <label style={labelStyle}>Personal Care Assistance</label>
      <textarea
        name="personalCareAssistance"
        value={formData.personalCareAssistance}
        onChange={handleChange}
        style={inputStyle}
        rows="2"
      />

      <label style={labelStyle}>Nutritional Needs</label>
      <textarea
        name="nutritionalNeeds"
        value={formData.nutritionalNeeds}
        onChange={handleChange}
        style={inputStyle}
        rows="2"
      />

      <label style={labelStyle}>Continence Needs</label>
      <textarea
        name="continenceNeeds"
        value={formData.continenceNeeds}
        onChange={handleChange}
        style={inputStyle}
        rows="2"
      />

      <label style={labelStyle}>Sleep Pattern</label>
      <textarea
        name="sleepPattern"
        value={formData.sleepPattern}
        onChange={handleChange}
        style={inputStyle}
        rows="2"
      />

      <label style={labelStyle}>Social Interests</label>
      <textarea
        name="socialInterests"
        value={formData.socialInterests}
        onChange={handleChange}
        style={inputStyle}
        rows="2"
      />

      <label style={labelStyle}>Cultural Needs</label>
      <textarea
        name="culturalNeeds"
        value={formData.culturalNeeds}
        onChange={handleChange}
        style={inputStyle}
        rows="2"
      />

      {/* Care Assessment Section */}
      <div style={sectionStyle}>Care Assessment</div>
      
      <label style={labelStyle}>Risk Assessment</label>
      <textarea
        name="riskAssessment"
        value={formData.riskAssessment}
        onChange={handleChange}
        style={inputStyle}
        rows="3"
      />

      <label style={labelStyle}>Mental Health</label>
      <textarea
        name="mentalHealth"
        value={formData.mentalHealth}
        onChange={handleChange}
        style={inputStyle}
        rows="3"
      />

      <label style={labelStyle}>Physical Health</label>
      <textarea
        name="physicalHealth"
        value={formData.physicalHealth}
        onChange={handleChange}
        style={inputStyle}
        rows="3"
      />

      <label style={labelStyle}>Social Needs</label>
      <textarea
        name="socialNeeds"
        value={formData.socialNeeds}
        onChange={handleChange}
        style={inputStyle}
        rows="3"
      />

      {/* Care Plan Goals Section */}
      <div style={sectionStyle}>Care Plan Goals</div>
      
      <label style={labelStyle}>Care Plan Goals</label>
      {formData.carePlanGoals.map((goal, index) => (
        <div key={index} style={arrayItemStyle}>
          <input
            type="text"
            value={goal}
            onChange={(e) => handleArrayChange("carePlanGoals", index, e.target.value)}
            style={arrayInputStyle}
            placeholder="Enter a care plan goal"
          />
          {formData.carePlanGoals.length > 1 && (
            <button
              type="button"
              onClick={() => removeArrayItem("carePlanGoals", index)}
              style={removeBtnStyle}
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => addArrayItem("carePlanGoals")}
        style={addBtnStyle}
      >
        Add Goal
      </button>

      <label style={labelStyle}>Desired Outcomes</label>
      {formData.desiredOutcomes.map((outcome, index) => (
        <div key={index} style={arrayItemStyle}>
          <input
            type="text"
            value={outcome}
            onChange={(e) => handleArrayChange("desiredOutcomes", index, e.target.value)}
            style={arrayInputStyle}
            placeholder="Enter a desired outcome"
          />
          {formData.desiredOutcomes.length > 1 && (
            <button
              type="button"
              onClick={() => removeArrayItem("desiredOutcomes", index)}
              style={removeBtnStyle}
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => addArrayItem("desiredOutcomes")}
        style={addBtnStyle}
      >
        Add Outcome
      </button>

      {/* Support Requirements Section */}
      <div style={sectionStyle}>Support Requirements</div>
      
      <label style={labelStyle}>Interventions</label>
      {formData.interventions.map((intervention, index) => (
        <div key={index} style={arrayItemStyle}>
          <input
            type="text"
            value={intervention}
            onChange={(e) => handleArrayChange("interventions", index, e.target.value)}
            style={arrayInputStyle}
            placeholder="Enter an intervention"
          />
          {formData.interventions.length > 1 && (
            <button
              type="button"
              onClick={() => removeArrayItem("interventions", index)}
              style={removeBtnStyle}
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => addArrayItem("interventions")}
        style={addBtnStyle}
      >
        Add Intervention
      </button>

      <label style={labelStyle}>Equipment</label>
      {formData.equipment.map((item, index) => (
        <div key={index} style={arrayItemStyle}>
          <input
            type="text"
            value={item}
            onChange={(e) => handleArrayChange("equipment", index, e.target.value)}
            style={arrayInputStyle}
            placeholder="Enter required equipment"
          />
          {formData.equipment.length > 1 && (
            <button
              type="button"
              onClick={() => removeArrayItem("equipment", index)}
              style={removeBtnStyle}
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => addArrayItem("equipment")}
        style={addBtnStyle}
      >
        Add Equipment
      </button>

      <label style={labelStyle}>Additional Support</label>
      <textarea
        name="additionalSupport"
        value={formData.additionalSupport}
        onChange={handleChange}
        style={inputStyle}
        rows="3"
      />

      {/* Review and Signature Section */}
      <div style={sectionStyle}>Review and Signature</div>
      
      <div style={formRowStyle}>
        <div style={formColumnStyle}>
          <label style={labelStyle}>Review Date</label>
          <input
            type="date"
            name="reviewDate"
            value={formData.reviewDate}
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

      <label style={labelStyle}>Care Manager Signature</label>
      <input
        type="text"
        name="careManagerSignature"
        value={formData.careManagerSignature}
        onChange={handleChange}
        style={inputStyle}
        placeholder="Enter Manager Name"
      />

      {/* Save Button */}
      <button type="button" onClick={handleSave} style={saveBtn}>
        Save Form
      </button>
    </div>
  );
}