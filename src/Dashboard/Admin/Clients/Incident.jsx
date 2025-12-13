// /src/Dashboard/Admin/AllForms/IncidentForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IncidentForm() {
  const navigate = useNavigate();

  // Initial form data
  const [formData, setFormData] = useState({
    // Client Information
    clientName: "",
    dateOfBirth: "",
    nhsNumber: "",
    address: "",
    
    // Incident Details
    incidentDate: "",
    incidentTime: "",
    location: "",
    incidentType: "",
    description: "",
    
    // People Involved
    staffInvolved: [""],
    witnesses: [""],
    
    // Injuries
    injuriesSustained: "",
    bodyPartsInjured: "",
    firstAidProvided: "",
    medicalAttentionRequired: "",
    hospitalizationRequired: "",
    
    // Immediate Actions
    immediateActions: "",
    familyNotified: "",
    familyNotifiedBy: "",
    familyNotificationTime: "",
    
    // Follow-up Actions
    followUpActions: [""],
    reviewRequired: "",
    reviewDate: "",
    
    // Reporting Details
    reportedBy: "",
    reportDate: "",
    reportTime: "",
    managerNotified: "",
    managerNotificationTime: "",
    
    // Review and Signature
    reviewerName: "",
    reviewerPosition: "",
    reviewerSignature: "",
    reviewDate: "",
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
    console.log("Incident Form Submitted:", formData);
    alert("Incident Form saved successfully!");
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
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    backgroundColor: "white",
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
    backgroundColor: "#7e57c2",
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

  const radioContainerStyle = {
    display: "flex",
    gap: "16px",
    marginTop: "6px",
    marginBottom: "10px",
  };

  const radioLabelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    cursor: "pointer",
  };

  return (
    <div style={formStyle}>
      {/* Back Button */}
      <button 
        type="button" 
        onClick={() => navigate("/admin/clients")} 
        style={backBtn}
      >
        ← Back
      </button>

      <h2 style={{ color: "#00264D", marginBottom: "20px" }}>Incident Form</h2>

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
          <label style={labelStyle}>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Incident Details Section */}
      <div style={sectionStyle}>Incident Details</div>
      
      <div style={formRowStyle}>
        <div style={formColumnStyle}>
          <label style={labelStyle}>Incident Date</label>
          <input
            type="date"
            name="incidentDate"
            value={formData.incidentDate}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        
        <div style={formColumnStyle}>
          <label style={labelStyle}>Incident Time</label>
          <input
            type="time"
            name="incidentTime"
            value={formData.incidentTime}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      <label style={labelStyle}>Location</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        style={inputStyle}
        placeholder="Where did the incident occur?"
      />

      <label style={labelStyle}>Incident Type</label>
      <select
        name="incidentType"
        value={formData.incidentType}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="">Select Incident Type</option>
        <option value="Fall">Fall</option>
        <option value="Medication Error">Medication Error</option>
        <option value="Injury">Injury</option>
        <option value="Verbal Aggression">Verbal Aggression</option>
        <option value="Physical Aggression">Physical Aggression</option>
        <option value="Self-Harm">Self-Harm</option>
        <option value="Wandering">Wandering</option>
        <option value="Pressure Ulcer">Pressure Ulcer</option>
        <option value="Infection">Infection</option>
        <option value="Other">Other</option>
      </select>

      <label style={labelStyle}>Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        style={inputStyle}
        rows="4"
        placeholder="Provide a detailed description of what happened"
      />

      {/* People Involved Section */}
      <div style={sectionStyle}>People Involved</div>
      
      <label style={labelStyle}>Staff Involved</label>
      {formData.staffInvolved.map((staff, index) => (
        <div key={index} style={arrayItemStyle}>
          <input
            type="text"
            value={staff}
            onChange={(e) => handleArrayChange("staffInvolved", index, e.target.value)}
            style={arrayInputStyle}
            placeholder="Enter staff name and role"
          />
          {formData.staffInvolved.length > 1 && (
            <button
              type="button"
              onClick={() => removeArrayItem("staffInvolved", index)}
              style={removeBtnStyle}
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => addArrayItem("staffInvolved")}
        style={addBtnStyle}
      >
        Add Staff Member
      </button>

      <label style={labelStyle}>Witnesses</label>
      {formData.witnesses.map((witness, index) => (
        <div key={index} style={arrayItemStyle}>
          <input
            type="text"
            value={witness}
            onChange={(e) => handleArrayChange("witnesses", index, e.target.value)}
            style={arrayInputStyle}
            placeholder="Enter witness name and contact"
          />
          {formData.witnesses.length > 1 && (
            <button
              type="button"
              onClick={() => removeArrayItem("witnesses", index)}
              style={removeBtnStyle}
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => addArrayItem("witnesses")}
        style={addBtnStyle}
      >
        Add Witness
      </button>

      {/* Injuries Section */}
      <div style={sectionStyle}>Injuries</div>
      
      <label style={labelStyle}>Injuries Sustained</label>
      <textarea
        name="injuriesSustained"
        value={formData.injuriesSustained}
        onChange={handleChange}
        style={inputStyle}
        rows="3"
        placeholder="Describe any injuries sustained"
      />

      <label style={labelStyle}>Body Parts Injured</label>
      <input
        type="text"
        name="bodyPartsInjured"
        value={formData.bodyPartsInjured}
        onChange={handleChange}
        style={inputStyle}
        placeholder="e.g., head, arm, leg"
      />

      <label style={labelStyle}>First Aid Provided</label>
      <textarea
        name="firstAidProvided"
        value={formData.firstAidProvided}
        onChange={handleChange}
        style={inputStyle}
        rows="3"
        placeholder="Describe first aid provided"
      />

      <div style={formRowStyle}>
        <div style={formColumnStyle}>
          <label style={labelStyle}>Medical Attention Required</label>
          <div style={radioContainerStyle}>
            <label style={radioLabelStyle}>
              <input
                type="radio"
                name="medicalAttentionRequired"
                value="Yes"
                checked={formData.medicalAttentionRequired === "Yes"}
                onChange={handleChange}
              />{" "}
              Yes
            </label>
            <label style={radioLabelStyle}>
              <input
                type="radio"
                name="medicalAttentionRequired"
                value="No"
                checked={formData.medicalAttentionRequired === "No"}
                onChange={handleChange}
              />{" "}
              No
            </label>
          </div>
        </div>
        
        <div style={formColumnStyle}>
          <label style={labelStyle}>Hospitalization Required</label>
          <div style={radioContainerStyle}>
            <label style={radioLabelStyle}>
              <input
                type="radio"
                name="hospitalizationRequired"
                value="Yes"
                checked={formData.hospitalizationRequired === "Yes"}
                onChange={handleChange}
              />{" "}
              Yes
            </label>
            <label style={radioLabelStyle}>
              <input
                type="radio"
                name="hospitalizationRequired"
                value="No"
                checked={formData.hospitalizationRequired === "No"}
                onChange={handleChange}
              />{" "}
              No
            </label>
          </div>
        </div>
      </div>

      {/* Immediate Actions Section */}
      <div style={sectionStyle}>Immediate Actions</div>
      
      <label style={labelStyle}>Immediate Actions Taken</label>
      <textarea
        name="immediateActions"
        value={formData.immediateActions}
        onChange={handleChange}
        style={inputStyle}
        rows="3"
        placeholder="Describe immediate actions taken"
      />

      <div style={formRowStyle}>
        <div style={formColumnStyle}>
          <label style={labelStyle}>Family Notified</label>
          <div style={radioContainerStyle}>
            <label style={radioLabelStyle}>
              <input
                type="radio"
                name="familyNotified"
                value="Yes"
                checked={formData.familyNotified === "Yes"}
                onChange={handleChange}
              />{" "}
              Yes
            </label>
            <label style={radioLabelStyle}>
              <input
                type="radio"
                name="familyNotified"
                value="No"
                checked={formData.familyNotified === "No"}
                onChange={handleChange}
              />{" "}
              No
            </label>
          </div>
        </div>
        
        <div style={formColumnStyle}>
          <label style={labelStyle}>Family Notified By</label>
          <input
            type="text"
            name="familyNotifiedBy"
            value={formData.familyNotifiedBy}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Who notified the family?"
          />
        </div>
      </div>

      <label style={labelStyle}>Family Notification Time</label>
      <input
        type="time"
        name="familyNotificationTime"
        value={formData.familyNotificationTime}
        onChange={handleChange}
        style={inputStyle}
      />

      {/* Follow-up Actions Section */}
      <div style={sectionStyle}>Follow-up Actions</div>
      
      <label style={labelStyle}>Follow-up Actions Required</label>
      {formData.followUpActions.map((action, index) => (
        <div key={index} style={arrayItemStyle}>
          <input
            type="text"
            value={action}
            onChange={(e) => handleArrayChange("followUpActions", index, e.target.value)}
            style={arrayInputStyle}
            placeholder="Enter a follow-up action"
          />
          {formData.followUpActions.length > 1 && (
            <button
              type="button"
              onClick={() => removeArrayItem("followUpActions", index)}
              style={removeBtnStyle}
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => addArrayItem("followUpActions")}
        style={addBtnStyle}
      >
        Add Follow-up Action
      </button>

      <div style={formRowStyle}>
        <div style={formColumnStyle}>
          <label style={labelStyle}>Review Required</label>
          <div style={radioContainerStyle}>
            <label style={radioLabelStyle}>
              <input
                type="radio"
                name="reviewRequired"
                value="Yes"
                checked={formData.reviewRequired === "Yes"}
                onChange={handleChange}
              />{" "}
              Yes
            </label>
            <label style={radioLabelStyle}>
              <input
                type="radio"
                name="reviewRequired"
                value="No"
                checked={formData.reviewRequired === "No"}
                onChange={handleChange}
              />{" "}
              No
            </label>
          </div>
        </div>
        
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
      </div>

      {/* Reporting Details Section */}
      <div style={sectionStyle}>Reporting Details</div>
      
      <div style={formRowStyle}>
        <div style={formColumnStyle}>
          <label style={labelStyle}>Reported By</label>
          <input
            type="text"
            name="reportedBy"
            value={formData.reportedBy}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Who reported the incident?"
          />
        </div>
        
        <div style={formColumnStyle}>
          <label style={labelStyle}>Manager Notified</label>
          <input
            type="text"
            name="managerNotified"
            value={formData.managerNotified}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Manager name"
          />
        </div>
      </div>

      <div style={formRowStyle}>
        <div style={formColumnStyle}>
          <label style={labelStyle}>Report Date</label>
          <input
            type="date"
            name="reportDate"
            value={formData.reportDate}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        
        <div style={formColumnStyle}>
          <label style={labelStyle}>Manager Notification Time</label>
          <input
            type="time"
            name="managerNotificationTime"
            value={formData.managerNotificationTime}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

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
          <label style={labelStyle}>Reviewer Position</label>
          <input
            type="text"
            name="reviewerPosition"
            value={formData.reviewerPosition}
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

      <label style={labelStyle}>Review Date</label>
      <input
        type="date"
        name="reviewDate"
        value={formData.reviewDate}
        onChange={handleChange}
        style={inputStyle}
      />

      {/* Save Button */}
      <button type="button" onClick={handleSave} style={saveBtn}>
        Save Form
      </button>
    </div>
  );
}