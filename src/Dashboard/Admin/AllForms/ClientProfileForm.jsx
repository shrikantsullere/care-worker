import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ClientProfileForm() {
  const navigate = useNavigate();

  // INITIAL DATA STRUCTURE
  const [formData, setFormData] = useState({
    // Personal Profile
    name: "",
    address: "",
    gp: "",
    familyContacts: [{ name: "", relation: "", phone: "" }],

    // Medical Profile
    diagnosis: "",
    medicationList: [{ medication: "", dose: "", frequency: "" }],
    allergies: "",
    currentTreatments: "",

    // Care Package Details
    startDate: "",
    hoursPerWeek: "",
    fundingType: "",
    assignedCarers: [""],

    // Document Uploads
    consentForms: null,
    marCharts: null,
    carePlans: null,
    riskAssessments: null,
  });

  // HANDLERS
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (index, field, value, arrayName) => {
    const arr = [...formData[arrayName]];
    arr[index][field] = value;
    setFormData({ ...formData, [arrayName]: arr });
  };

  const handleSimpleArrayChange = (index, value, arrayName) => {
    const arr = [...formData[arrayName]];
    arr[index] = value;
    setFormData({ ...formData, [arrayName]: arr });
  };

  const addRow = (arrayName, newObj) => {
    setFormData({ ...formData, [arrayName]: [...formData[arrayName], newObj] });
  };

  const handleFileUpload = (e, field) => {
    setFormData({ ...formData, [field]: e.target.files[0] });
  };

  const handleSave = () => {
    console.log("CLIENT PROFILE:", formData);
    alert("Client profile saved successfully!");
    navigate("/admin/forms");
  };

  // UI STYLES
  const container = {
    maxWidth: "100vw",
    padding: "20px",
    background: "#fff",
    borderRadius: "8px",
    fontFamily: "Segoe UI",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    position: "relative",
  };

  const header = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
  };

  const logoContainer = {
    width: "150px",
    height: "auto",
  };

  const logo = {
    width: "100%",
    height: "auto",
    maxWidth: "150px",
  };

  const section = {
    fontWeight: "700",
    fontSize: "18px",
    margin: "20px 0 10px",
    borderBottom: "1px solid #ccc",
    color: "#00264D",
    paddingBottom: "4px",
  };

  const input = {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  };

  const row = { display: "flex", gap: "12px", flexWrap: "wrap" };

  const btn = {
    padding: "12px",
    width: "100%",
    background: "#00264D",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
    marginTop: "15px",
  };

  // Responsive styles
  const responsiveStyles = `
    @media (max-width: 768px) {
      .header-container {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .logo-container {
        width: 120px;
        margin-bottom: 10px;
      }
      
      .title-container {
        width: 100%;
        text-align: center;
      }
    }
    
    @media (max-width: 480px) {
      .logo-container {
        width: 100px;
      }
    }
  `;

  return (
    <div style={container}>
      <style>{responsiveStyles}</style>
      
      {/* HEADER WITH LOGO */}
      <div className="header-container" style={header}>
        <button
          onClick={() => navigate("/admin/forms")}
          style={{
            background: "#3A8DFF",
            padding: "6px 14px",
            borderRadius: "4px",
            border: "none",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
        
        <div className="title-container">
          <h2 style={{ textAlign: "center", color: "#00264D", margin: 0 }}>Client Profile Form</h2>
        </div>
        
        <div className="logo-container" style={logoContainer}>
          <img 
            src="https://unitecare.org/content/images/logo.png" 
            alt="UniteCare Logo" 
            style={logo}
          />
        </div>
      </div>

      {/* PERSONAL PROFILE */}
      <div style={section}>Personal Profile</div>
      <input
        name="name"
        placeholder="Client Name"
        value={formData.name}
        onChange={handleChange}
        style={input}
      />
      <textarea
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        style={input}
        rows="3"
      />
      <input
        name="gp"
        placeholder="GP Name & Address"
        value={formData.gp}
        onChange={handleChange}
        style={input}
      />

      {/* FAMILY CONTACTS */}
      <div style={section}>Family Contacts</div>
      {formData.familyContacts.map((fc, index) => (
        <div key={index} style={{ border: "1px solid #ddd", padding: "12px", borderRadius: "6px", marginBottom: "10px" }}>
          <input
            placeholder="Name"
            value={fc.name}
            onChange={(e) => handleArrayChange(index, "name", e.target.value, "familyContacts")}
            style={input}
          />
          <input
            placeholder="Relationship"
            value={fc.relation}
            onChange={(e) => handleArrayChange(index, "relation", e.target.value, "familyContacts")}
            style={input}
          />
          <input
            placeholder="Phone"
            value={fc.phone}
            onChange={(e) => handleArrayChange(index, "phone", e.target.value, "familyContacts")}
            style={input}
          />
        </div>
      ))}
      <button
        onClick={() =>
          addRow("familyContacts", { name: "", relation: "", phone: "" })
        }
        style={{
          background: "#6a5acd",
          color: "#fff",
          border: "none",
          padding: "10px",
          width: "100%",
          borderRadius: "6px",
          marginBottom: "20px",
        }}
      >
        + Add Family Contact
      </button>

      {/* MEDICAL PROFILE */}
      <div style={section}>Medical Profile</div>
      <input
        name="diagnosis"
        placeholder="Diagnosis"
        value={formData.diagnosis}
        onChange={handleChange}
        style={input}
      />

      {/* MEDICATION LIST */}
      <div style={{ fontWeight: 600, marginBottom: "8px" }}>Medication List</div>
      {formData.medicationList.map((med, index) => (
        <div key={index} style={{ border: "1px solid #ddd", padding: "12px", borderRadius: "6px", marginBottom: "10px" }}>
          <input
            placeholder="Medication Name"
            value={med.medication}
            onChange={(e) => handleArrayChange(index, "medication", e.target.value, "medicationList")}
            style={input}
          />
          <input
            placeholder="Dose"
            value={med.dose}
            onChange={(e) => handleArrayChange(index, "dose", e.target.value, "medicationList")}
            style={input}
          />
          <input
            placeholder="Frequency"
            value={med.frequency}
            onChange={(e) => handleArrayChange(index, "frequency", e.target.value, "medicationList")}
            style={input}
          />
        </div>
      ))}

      <button
        onClick={() =>
          addRow("medicationList", { medication: "", dose: "", frequency: "" })
        }
        style={{
          background: "#6a5acd",
          color: "#fff",
          border: "none",
          padding: "10px",
          width: "100%",
          borderRadius: "6px",
          marginBottom: "20px",
        }}
      >
        + Add Medication
      </button>

      <input
        name="allergies"
        placeholder="Allergies"
        value={formData.allergies}
        onChange={handleChange}
        style={input}
      />
      <textarea
        name="currentTreatments"
        placeholder="Current Treatments"
        value={formData.currentTreatments}
        onChange={handleChange}
        rows="3"
        style={input}
      />

      {/* CARE PACKAGE */}
      <div style={section}>Care Package Details</div>

      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        style={input}
      />

      <input
        name="hoursPerWeek"
        placeholder="Hours per week"
        value={formData.hoursPerWeek}
        onChange={handleChange}
        style={input}
      />

      <input
        name="fundingType"
        placeholder="Funding type (e.g. LA / Private / NHS)"
        value={formData.fundingType}
        onChange={handleChange}
        style={input}
      />

      {/* ASSIGNED CARERS */}
      <div style={{ fontWeight: 600, marginBottom: "8px" }}>Assigned Carers</div>
      {formData.assignedCarers.map((carer, index) => (
        <input
          key={index}
          placeholder={`Carer ${index + 1}`}
          value={carer}
          onChange={(e) =>
            handleSimpleArrayChange(index, e.target.value, "assignedCarers")
          }
          style={input}
        />
      ))}

      <button
        onClick={() => addRow("assignedCarers", "")}
        style={{
          background: "#6a5acd",
          color: "#fff",
          width: "100%",
          padding: "10px",
          border: "none",
          borderRadius: "6px",
          marginBottom: "20px",
        }}
      >
        + Add Carer
      </button>

      {/* DOCUMENT UPLOADS */}
      <div style={section}>Document Uploads</div>

      <label>Consent Forms</label>
      <input type="file" onChange={(e) => handleFileUpload(e, "consentForms")} style={input} />

      <label>MAR Charts</label>
      <input type="file" onChange={(e) => handleFileUpload(e, "marCharts")} style={input} />

      <label>Care Plans</label>
      <input type="file" onChange={(e) => handleFileUpload(e, "carePlans")} style={input} />

      <label>Risk Assessments</label>
      <input type="file" onChange={(e) => handleFileUpload(e, "riskAssessments")} style={input} />

      {/* SAVE BUTTON */}
      <button onClick={handleSave} style={btn}>
        Save Client Profile
      </button>
    </div>
  );
}