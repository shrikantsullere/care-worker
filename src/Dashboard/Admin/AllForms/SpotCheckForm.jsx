import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SpotCheckForm() {
  const navigate = useNavigate();

  // FULL checklist from PDF
  const checklistQuestions = [
    "Did the care worker arrive on time?",
    "Did the care worker greet and engage with the client?",
    "Is communication adequate between the care worker and client?",
    "Was the client asked/notified of tasks?",
    "Do care & support plans reflect the needs of the client?",
    "Are there any changes needed to the current care plan?",
    "Is there any training that the care worker requires?",
    "Did the care worker show their ID?",
    "Was the care worker wearing protective clothing (PPE)?",
    "Did the client feel listened to?",
    "Is the care worker competent & understands tasks?",
    "Do you have any concerns about the client?",
    "Did the care worker stay for the full duration?",
    "Did the allocated time run over?",
    "Were actions agreed or need follow-up?"
  ];

  // Get current date for default values
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate date 3 months from now
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
  const threeMonthsLater = threeMonthsFromNow.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    careWorkerName: "",
    serviceUserName: "",
    date: today,
    time: "",
    supervisionType: "Spot Check",
    whenToComplete: "",
    nextSupportSession: "",
    staffFileUpdated: "",
    softwareUpdated: "",
    additionalNotes: "",
    careWorkerSignature: "",
    careWorkerDate: "",
    assessorName: "",
    assessorSignature: "",
    assessorDate: "",
    
    // New fields for 3-month tracking
    lastSpotCheckDate: "",
    nextSpotCheckDue: threeMonthsLater,
    spotCheckOverdue: false,
    
    checklist: checklistQuestions.reduce((acc, q) => {
      acc[q] = { response: "", comments: "" };
      return acc;
    }, {})
  });

  // Check if spot check is overdue
  useEffect(() => {
    if (formData.lastSpotCheckDate) {
      const lastCheck = new Date(formData.lastSpotCheckDate);
      const today = new Date();
      const dueDate = new Date(lastCheck);
      dueDate.setMonth(dueDate.getMonth() + 3);
      
      setFormData(prev => ({
        ...prev,
        nextSpotCheckDue: dueDate.toISOString().split('T')[0],
        spotCheckOverdue: today > dueDate
      }));
    }
  }, [formData.lastSpotCheckDate]);

  const handleChange = (e, question, field) => {
    const value = e.target.value;
    
    if (question) {
      setFormData(prev => ({
        ...prev,
        checklist: {
          ...prev.checklist,
          [question]: {
            ...prev.checklist[question],
            [field]: value
          }
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [e.target.name]: value }));
    }
  };

  const handleSave = () => {
    console.log("Spot Check Form Submitted:", formData);
    alert("Spot Check Form saved successfully! Next spot check due on: " + formData.nextSpotCheckDue);
    navigate("/admin/forms");
  };

  // Styles
  const containerStyle = {
    maxWidth: "100%",
    margin: "0 auto",
    fontFamily: "Segoe UI",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    position: "relative"
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap"
  };

  const logoContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  };

  const logoStyle = {
    height: "50px",
    width: "auto",
    maxWidth: "120px",
    objectFit: "contain"
  };

  const backBtnStyle = {
    background: "#3A8DFF",
    border: "none",
    color: "#ffffff",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px"
  };

  const titleStyle = {
    color: "#00264D",
    marginBottom: "20px",
    marginTop: "0",
    textAlign: "center",
    width: "100%"
  };

  const sectionStyle = {
    fontWeight: 700,
    margin: "20px 0 10px",
    color: "#00264D",
    fontSize: "18px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "5px"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    boxSizing: "border-box",
    fontSize: "16px",
    marginBottom: "15px"
  };

  const labelStyle = {
    fontWeight: 600,
    marginBottom: "8px",
    display: "block",
    color: "#333"
  };

  const rowStyle = {
    display: "flex",
    gap: "15px",
    marginBottom: "15px",
    flexWrap: "wrap"
  };

  const checkboxContainerStyle = {
    display: "flex",
    gap: "15px",
    marginBottom: "15px",
    alignItems: "center"
  };

  const checkboxStyle = {
    width: "18px",
    height: "18px",
    marginRight: "8px"
  };

  const textareaStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    boxSizing: "border-box",
    fontSize: "16px",
    resize: "vertical",
    marginBottom: "15px"
  };

  const saveBtnStyle = {
    padding: "14px 20px",
    backgroundColor: "#00264D",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "16px",
    width: "100%",
    marginTop: "20px",
    transition: "all 0.3s ease"
  };

  const alertStyle = {
    padding: "10px 15px",
    borderRadius: "4px",
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  };

  const warningStyle = {
    ...alertStyle,
    backgroundColor: "#fff3cd",
    border: "1px solid #ffeeba",
    color: "#856404"
  };

  const dangerStyle = {
    ...alertStyle,
    backgroundColor: "#f8d7da",
    border: "1px solid #f5c6cb",
    color: "#721c24"
  };

  const infoStyle = {
    ...alertStyle,
    backgroundColor: "#d1ecf1",
    border: "1px solid #bee5eb",
    color: "#0c5460"
  };

  return (
    <div style={containerStyle}>
      {/* Header with Back Button on Left and Logo on Right */}
      <div style={headerStyle}>
        <button
          onClick={() => navigate("/admin/forms")}
          style={backBtnStyle}
        >
          ← Back
        </button>
        
        <div style={logoContainerStyle}>
          <img
            src="https://unitecare.org/content/images/logo.png"
            alt="Unite Care Ltd Logo"
            style={logoStyle}
          />
        </div>
      </div>

      <h2 style={titleStyle}>Spot Check Form</h2>

      {/* 3-MONTH REQUIREMENT ALERT */}
      <div style={formData.spotCheckOverdue ? dangerStyle : infoStyle}>
        <span style={{ fontSize: "18px", marginRight: "5px" }}>
          {formData.spotCheckOverdue ? "⚠️" : "ℹ️"}
        </span>
        <div>
          <strong>Spot Check Requirement:</strong> A new spot check must be completed every 3 months.
          {formData.lastSpotCheckDate && (
            <div>
              Last spot check: {formData.lastSpotCheckDate} | 
              Next spot check due: {formData.nextSpotCheckDue}
              {formData.spotCheckOverdue && (
                <span style={{ color: "#721c24", fontWeight: "bold" }}> (OVERDUE)</span>
              )}
            </div>
          )}
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        {/* CARE DETAILS */}
        <div style={sectionStyle}>Care Details</div>
        <div style={rowStyle}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={labelStyle}>Care Worker Name</label>
            <input
              type="text"
              name="careWorkerName"
              value={formData.careWorkerName}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={labelStyle}>Service User Name</label>
            <input
              type="text"
              name="serviceUserName"
              value={formData.serviceUserName}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        {/* SUPERVISION TYPE */}
        <div style={sectionStyle}>Type of Supervision</div>
        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Select supervision type:</label>
          <select
            name="supervisionType"
            value={formData.supervisionType}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="Face to Face">FACE TO FACE</option>
            <option value="Spot Check">SPOT CHECK</option>
          </select>
        </div>

        {/* LAST SPOT CHECK DATE */}
        <div style={sectionStyle}>Previous Spot Check Information</div>
        <div style={rowStyle}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={labelStyle}>Date of Last Spot Check</label>
            <input
              type="date"
              name="lastSpotCheckDate"
              value={formData.lastSpotCheckDate}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={labelStyle}>Next Spot Check Due Date</label>
            <input
              type="date"
              name="nextSpotCheckDue"
              value={formData.nextSpotCheckDue}
              readOnly
              style={{
                ...inputStyle,
                backgroundColor: "#f5f5f5",
                cursor: "not-allowed"
              }}
            />
          </div>
        </div>

        {/* VISIT DETAILS */}
        <div style={sectionStyle}>Current Visit Details</div>
        <div style={rowStyle}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={labelStyle}>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={labelStyle}>Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        {/* CHECKLIST */}
        <div style={sectionStyle}>Spot Check Checklist</div>
        <div style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          marginBottom: "20px"
        }}>
          {checklistQuestions.map((q, index) => (
            <div key={index} style={{ marginBottom: "15px" }}>
              <b style={{ display: "block", marginBottom: "8px", fontSize: "16px" }}>{q}</b>
              
              <div style={checkboxContainerStyle}>
                <label>
                  <input
                    type="radio"
                    name={`${q}-response`}
                    value="Yes"
                    checked={formData.checklist[q].response === "Yes"}
                    onChange={(e) => handleChange(e, q, "response")}
                    style={checkboxStyle}
                  /> Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name={`${q}-response`}
                    value="No"
                    checked={formData.checklist[q].response === "No"}
                    onChange={(e) => handleChange(e, q, "response")}
                    style={checkboxStyle}
                  /> No
                </label>
              </div>
              
              <textarea
                placeholder="Comments"
                rows="2"
                value={formData.checklist[q].comments}
                onChange={(e) => handleChange(e, q, "comments")}
                style={textareaStyle}
              />
            </div>
          ))}
        </div>

        {/* FOLLOW-UP FIELDS */}
        <div style={sectionStyle}>Follow-Up Information</div>
        
        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>If applicable, when should this be completed?</label>
          <input
            type="date"
            name="whenToComplete"
            value={formData.whenToComplete}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Date of next support session:</label>
          <input
            type="date"
            name="nextSupportSession"
            value={formData.nextSupportSession}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* MONTHLY UPDATES */}
        <div style={sectionStyle}>Monthly Updates</div>
        
        <div style={rowStyle}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={labelStyle}>Staff file updated?</label>
            <select
              name="staffFileUpdated"
              value={formData.staffFileUpdated}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select</option>
              <option value="Yes">YES</option>
              <option value="No">NO</option>
            </select>
          </div>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={labelStyle}>Software updated?</label>
            <select
              name="softwareUpdated"
              value={formData.softwareUpdated}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select</option>
              <option value="Yes">YES</option>
              <option value="No">NO</option>
            </select>
          </div>
        </div>

        {/* ADDITIONAL NOTES */}
        <div style={sectionStyle}>Additional Notes</div>
        <div style={{ marginBottom: "15px" }}>
          <textarea
            name="additionalNotes"
            rows="3"
            value={formData.additionalNotes}
            onChange={handleChange}
            style={textareaStyle}
          />
        </div>

        {/* SIGNATURES */}
        <div style={sectionStyle}>Signatures</div>
        
        <div style={rowStyle}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={labelStyle}>Care Worker Signature</label>
            <input
              type="text"
              name="careWorkerSignature"
              value={formData.careWorkerSignature}
              onChange={handleChange}
              placeholder="Type signature"
              style={inputStyle}
            />
          </div>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={labelStyle}>Date</label>
            <input
              type="date"
              name="careWorkerDate"
              value={formData.careWorkerDate}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={rowStyle}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={labelStyle}>Assessor Name</label>
            <input
              type="text"
              name="assessorName"
              value={formData.assessorName}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={labelStyle}>Assessor Signature</label>
            <input
              type="text"
              name="assessorSignature"
              value={formData.assessorSignature}
              onChange={handleChange}
              placeholder="Type signature"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={rowStyle}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={labelStyle}>Date</label>
            <input
              type="date"
              name="assessorDate"
              value={formData.assessorDate}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          type="submit"
          style={saveBtnStyle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#003d80";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#00264D";
          }}
        >
          Save Form
        </button>
      </form>

      <style jsx>{`
        @media (max-width: 768px) {
          .headerStyle {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          
          .logoStyle {
            height: "40px";
            maxWidth: "100px";
          }
          
          .titleStyle {
            margin-top: "10px";
          }
          
          div[style*="display: flex"] {
            flex-direction: column;
            gap: 0;
          }
          
          input[type="date"], input[type="time"] {
            font-size: 16px; /* Prevents zoom on iOS */
          }
        }
        
        @media (max-width: 480px) {
          .logoStyle {
            height: "35px";
            maxWidth: "80px";
          }
          
          .backBtnStyle {
            padding: "6px 12px";
            font-size: "12px";
          }
        }
        
        @media print {
          button {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}