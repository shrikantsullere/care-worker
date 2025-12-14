import React, { useState } from "react";

const CareWorkerShadowingForm = () => {
  // State to store all the form data
  const [formData, setFormData] = useState({
    // Care Worker Information
    careWorkerName: "",
    date: "",
    // Shadowing Assessment
    assessment: {
      arrivedOnTime: "",
      greetedUser: "",
      readCarePlan: "",
      explainedTasks: "",
      worePPE: "",
      respectedPrivacy: "",
      completedLogbook: "",
      leftClean: "",
      competentEquipment: "",
      needsMoreShadowing: "",
    },
    // Comments
    comments: ["", "", ""],
    // Signatures
    signatures: {
      careWorker: { signature: "", date: "" },
      fieldCareManager: { signature: "", date: "" },
      registeredManager: { signature: "", date: "" },
    },
  });

  // Handler to update state when user types in an input
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (name.includes("assessment.")) {
      const assessmentKey = name.split(".")[1];
      setFormData(prevState => ({
        ...prevState,
        assessment: {
          ...prevState.assessment,
          [assessmentKey]: value,
        },
      }));
    } else if (name.includes("signatures.")) {
      const [signer, field] = name.split(".").slice(1);
      setFormData(prevState => ({
        ...prevState,
        signatures: {
          ...prevState.signatures,
          [signer]: {
            ...prevState.signatures[signer],
            [field]: value,
          },
        },
      }));
    } else if (name.includes("comments")) {
      const index = parseInt(name.split(".")[1], 10);
      const newComments = [...formData.comments];
      newComments[index] = value;
      setFormData(prevState => ({
        ...prevState,
        comments: newComments,
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from reloading on submit
    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully! Check the console for the data.");
    // Here you would typically send the data to your server
  };

  // Reusable styles
  const labelStyle = { fontWeight: 600, marginBottom: 4, display: "block" };
  const inputStyle = {
    padding: "9px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
    boxSizing: "border-box",
  };
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
    overflowX: "auto",
    display: "block",
  };
  const thTdStyle = {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "left",
  };
  const thStyle = {
    ...thTdStyle,
    backgroundColor: "#f2f2f2",
    fontWeight: 700,
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
    flexWrap: "wrap",
  };

  const logoStyle = {
    height: "60px",
    maxWidth: "150px",
    objectFit: "contain",
  };

  const responsiveCol = {
    flex: "1 1 300px",
    minWidth: "250px",
  };

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: "100vw",
      margin: "0 auto",
      fontFamily: "Segoe UI",
      padding: "20px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    }}>

      {/* Header with Logo */}
      <div style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            type="button"
            onClick={() => window.history.back()}
            style={{
              background: "#007bff",
              border: "1px solid #007bff",
              color: "#fff",
              padding: "6px 14px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              marginRight: "15px"
            }}
          >
            ← Back
          </button>
          <h2 style={{ 
            color: "#00264D", 
            margin: 0,
            fontSize: window.innerWidth < 768 ? "20px" : "24px"
          }}>
            CARE WORKER SHADOWING
          </h2>
        </div>
        <img 
          src="https://unitecare.org/content/images/logo.png" 
          alt="Unite Care Logo" 
          style={logoStyle}
        />
      </div>

      {/* Care Worker Information */}
      <div style={{ marginBottom: "20px" }}>
        <p style={{ fontWeight: 700, color: "#00264D" }}>Care Worker Information</p>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
          <div style={responsiveCol}>
            <label style={labelStyle}>Care Worker Name:</label>
            <input type="text" name="careWorkerName" value={formData.careWorkerName} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={responsiveCol}>
            <label style={labelStyle}>Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle} />
          </div>
        </div>
      </div>

      {/* Shadowing Assessment */}
      <div style={{ marginBottom: "20px" }}>
        <p style={{ fontWeight: 700, color: "#00264D" }}>Shadowing Assessment (YES / NO)</p>
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Question</th>
                <th style={{ ...thStyle, width: "100px" }}>YES</th>
                <th style={{ ...thStyle, width: "100px" }}>NO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={thTdStyle}>Arrived on time?</td>
                <td style={{ ...thTdStyle, textAlign: "center" }}>
                  <input type="radio" name="assessment.arrivedOnTime" value="YES" checked={formData.assessment.arrivedOnTime === "YES"} onChange={handleChange} />
                </td>
                <td style={{ ...thTdStyle, textAlign: "center" }}>
                  <input type="radio" name="assessment.arrivedOnTime" value="NO" checked={formData.assessment.arrivedOnTime === "NO"} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td style={thTdStyle}>Greeted service user & introduced themselves?</td>
                <td style={{ ...thTdStyle, textAlign: "center" }}>
                  <input type="radio" name="assessment.greetedUser" value="YES" checked={formData.assessment.greetedUser === "YES"} onChange={handleChange} />
                </td>
                <td style={{ ...thTdStyle, textAlign: "center" }}>
                  <input type="radio" name="assessment.greetedUser" value="NO" checked={formData.assessment.greetedUser === "NO"} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td style={thTdStyle}>Read care plan & understood tasks?</td>
                <td style={{ ...thTdStyle, textAlign: "center" }}>
                  <input type="radio" name="assessment.readCarePlan" value="YES" checked={formData.assessment.readCarePlan === "YES"} onChange={handleChange} />
                </td>
                <td style={{ ...thTdStyle, textAlign: "center" }}>
                  <input type="radio" name="assessment.readCarePlan" value="NO" checked={formData.assessment.readCarePlan === "NO"} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td style={thTdStyle}>Explained tasks to service user?</td>
                <td style={{ ...thTdStyle, textAlign: "center" }}>
                  <input type="radio" name="assessment.explainedTasks" value="YES" checked={formData.assessment.explainedTasks === "YES"} onChange={handleChange} />
                </td>
                <td style={{ ...thTdStyle, textAlign: "center" }}>
                  <input type="radio" name="assessment.explainedTasks" value="NO" checked={formData.assessment.explainedTasks === "NO"} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td style={thTdStyle}>Wore PPE correctly?</td>
                <td style={{ ...thTdStyle, textAlign: "center" }}>
                  <input type="radio" name="assessment.worePPE" value="YES" checked={formData.assessment.worePPE === "YES"} onChange={handleChange} />
                </td>
                <td style={{ ...thTdStyle, textAlign: "center" }}>
                  <input type="radio" name="assessment.worePPE" value="NO" checked={formData.assessment.worePPE === "NO"} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td style={thTdStyle}>Respected privacy & dignity?</td>
                <td style={{ ...thTdStyle, textAlign: "center" }}>
                  <input type="radio" name="assessment.respectedPrivacy" value="YES" checked={formData.assessment.respectedPrivacy === "YES"} onChange={handleChange} />
                </td>
                <td style={{ ...thTdStyle, textAlign: "center" }}>
                  <input type="radio" name="assessment.respectedPrivacy" value="NO" checked={formData.assessment.respectedPrivacy === "NO"} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td style={thTdStyle}>Completed logbook (legible)?</td>
                <td style={{ ...thTdStyle, textAlign: "center" }}>
                  <input type="radio" name="assessment.completedLogbook" value="YES" checked={formData.assessment.completedLogbook === "YES"} onChange={handleChange} />
                </td>
                <td style={{ ...thTdStyle, textAlign: "center" }}>
                  <input type="radio" name="assessment.completedLogbook" value="NO" checked={formData.assessment.completedLogbook === "NO"} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td style={thTdStyle}>Left environment clean & tidy?</td>
                <td style={{ ...thTdStyle, textAlign: "center" }}>
                  <input type="radio" name="assessment.leftClean" value="YES" checked={formData.assessment.leftClean === "YES"} onChange={handleChange} />
                </td>
                <td style={{ ...thTdStyle, textAlign: "center" }}>
                  <input type="radio" name="assessment.leftClean" value="NO" checked={formData.assessment.leftClean === "NO"} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td style={thTdStyle}>Competent with equipment?</td>
                <td style={{ ...thTdStyle, textAlign: "center" }}>
                  <input type="radio" name="assessment.competentEquipment" value="YES" checked={formData.assessment.competentEquipment === "YES"} onChange={handleChange} />
                </td>
                <td style={{ ...thTdStyle, textAlign: "center" }}>
                  <input type="radio" name="assessment.competentEquipment" value="NO" checked={formData.assessment.competentEquipment === "NO"} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td style={thTdStyle}>Needs more shadowing?</td>
                <td style={{ ...thTdStyle, textAlign: "center" }}>
                  <input type="radio" name="assessment.needsMoreShadowing" value="YES" checked={formData.assessment.needsMoreShadowing === "YES"} onChange={handleChange} />
                </td>
                <td style={{ ...thTdStyle, textAlign: "center" }}>
                  <input type="radio" name="assessment.needsMoreShadowing" value="NO" checked={formData.assessment.needsMoreShadowing === "NO"} onChange={handleChange} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Comments */}
      <div style={{ marginBottom: "20px" }}>
        <p style={{ fontWeight: 700, color: "#00264D" }}>Comments (If NO or Needs More Shadowing)</p>
        {[0, 1, 2].map((index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <label style={labelStyle}>{index + 1}.</label>
            <input type="text" name={`comments.${index}`} value={formData.comments[index]} onChange={handleChange} style={inputStyle} />
          </div>
        ))}
      </div>

      {/* Signatures */}
      <div style={{ marginBottom: "20px" }}>
        <p style={{ fontWeight: 700, color: "#00264D" }}>Signatures</p>
        {[
          { title: "Care Worker Signature", name: "careWorker" },
          { title: "Field Care Manager Signature", name: "fieldCareManager" },
          { title: "Registered Manager Signature", name: "registeredManager" },
        ].map((signer) => (
          <div key={signer.name} style={{ display: "flex", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
            <div style={responsiveCol}>
              <label style={labelStyle}>{signer.title}:</label>
              <input type="text" name={`signatures.${signer.name}.signature`} value={formData.signatures[signer.name].signature} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={responsiveCol}>
              <label style={labelStyle}>Date:</label>
              <input type="date" name={`signatures.${signer.name}.date`} value={formData.signatures[signer.name].date} onChange={handleChange} style={inputStyle} />
            </div>
          </div>
        ))}
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        style={{
          background: "#00264D",
          color: "#fff",
          border: "none",
          padding: "12px",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: 500,
          fontSize: "16px",
          marginTop: "18px",
          width: "100%"
        }}
      >
        Save Form
      </button>
    </form>
  );
};

export default CareWorkerShadowingForm;