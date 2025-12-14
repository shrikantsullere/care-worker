import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const JobDescriptionForm = () => {
  const navigate = useNavigate();

  // ---- ALWAYS EDIT MODE ----
  const [isEditMode] = useState(true);

  const [formData, setFormData] = useState({
    // Job Details
    jobTitle: "Care Worker",
    department: "Care Services",
    location: "Various Locations",
    reportingTo: "",
    hours: "Flexible (16-80 hrs/week)",
    contractType: "Permanent",
    salary: "Competitive",
    
    // Job Purpose
    jobPurpose: [
      "Look after physical, emotional, cultural and social needs of Clients",
      "Promote choice, independence, dignity, privacy",
      "Follow all policies & statutory obligations",
    ],
    
    // Key Responsibilities
    keyResponsibilities: [
      "Provide personal care, assist with dressing, bathing, toileting",
      "Medication support per assessment",
      "Food prep, light housekeeping",
      "Manual handling, safe use of equipment",
      "Recording & reporting duties",
      "Assist with mobility and positioning",
      "Support with social activities",
      "Monitor health conditions and report changes",
      "Maintain a safe environment",
    ],
    
    // Person Specification
    qualifications: [
      "Level 2/3 Diploma in Health & Social Care (or willing to work towards)",
      "Previous care experience desirable but not essential",
    ],
    skills: [
      "Good communication skills",
      "Ability to work as part of a team",
      "Empathy and compassion",
      "Basic IT skills",
    ],
    personalAttributes: [
      "Reliable and trustworthy",
      "Flexible and adaptable",
      "Positive attitude",
      "Respectful of confidentiality",
    ],
    
    // Working Conditions
    workingConditions: [
      "Work in clients' homes",
      "May involve lone working",
      "Exposure to bodily fluids",
      "Physical demands including moving and handling",
    ],
    
    // Benefits
    benefits: [
      "Competitive salary",
      "Flexible working hours",
      "Paid training and development",
      "Pension scheme",
      "Paid annual leave",
    ],
    
    // Acknowledgment
    name: "",
    date: new Date().toISOString().split("T")[0],
    signature: null,
  });

  // Digital signature state
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialize canvas for digital signature
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    context.lineWidth = 2;
    context.lineCap = 'round';
    context.strokeStyle = '#000';
    
    // Set canvas size
    canvas.width = 600; // Higher resolution for a smoother line
    canvas.height = 200;

    // Fill with white background
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Function to get correct coordinates, accounting for canvas scaling
  const getCoordinates = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();

    // Calculate the ratio of canvas's internal size to its displayed size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // Get client coordinates from either mouse or touch event
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;

    // Calculate and return the scaled coordinates
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (event) => {
    event.preventDefault(); // Prevent scrolling on touch devices
    const { x, y } = getCoordinates(event);
    const context = canvasRef.current.getContext('2d');
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (event) => {
    event.preventDefault(); // Prevent scrolling on touch devices
    if (!isDrawing) return;

    const { x, y } = getCoordinates(event);
    const context = canvasRef.current.getContext('2d');
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      // Save the canvas content as a data URL when drawing stops
      const canvas = canvasRef.current;
      if (canvas) {
        const dataURL = canvas.toDataURL('image/png');
        setFormData(prev => ({ ...prev, signature: dataURL }));
      }
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Re-fill with white background after clearing
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    setFormData(prev => ({ ...prev, signature: null }));
  };

  const handleSave = () => {
    // Validate digital signature
    if (!formData.signature) {
      alert("Please provide your digital signature to save the form.");
      return;
    }

    console.log("Saved:", formData);
    alert("Form saved successfully!");
    navigate("/admin/forms");
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field, index) => {
    const updated = [...formData[field]];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  return (
    <div
      style={{
        maxWidth: "100%",
        margin: "0 auto",
        fontFamily: "Segoe UI",
        padding: "20px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        position: "relative"
      }}
    >
      {/* Header with Logo and Back Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
          flexWrap: "wrap"
        }}
      >
        <button
          onClick={() => navigate("/admin/forms")}
          style={{
            background: "#3A8DFF",
            border: "none",
            color: "#ffffff",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            order: 1
          }}
        >
          ← Back
        </button>
        
        <img
          src="https://unitecare.org/content/images/logo.png"
          alt="Unite Care Ltd Logo"
          style={{
            height: "50px",
            width: "auto",
            maxWidth: "120px",
            objectFit: "contain",
            order: 2
          }}
        />
      </div>

      <h2
        style={{
          color: "#00264D",
          marginBottom: "20px",
          marginTop: "0",
          textAlign: "center"
        }}
      >
        Job Description – Care Worker
      </h2>

      {/* ---------------- JOB DETAILS ---------------- */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#00264D", marginBottom: "12px" }}>Job Details</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
          <div>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
              Job Title
            </label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => handleChange("jobTitle", e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "white",
                boxSizing: "border-box",
                fontSize: "16px"
              }}
            />
          </div>
          
          <div>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
              Department
            </label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => handleChange("department", e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "white",
                boxSizing: "border-box",
                fontSize: "16px"
              }}
            />
          </div>
          
          <div>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "white",
                boxSizing: "border-box",
                fontSize: "16px"
              }}
            />
          </div>
          
          <div>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
              Reporting to
            </label>
            <input
              type="text"
              value={formData.reportingTo}
              onChange={(e) => handleChange("reportingTo", e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "white",
                boxSizing: "border-box",
                fontSize: "16px"
              }}
            />
          </div>
          
          <div>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
              Hours
            </label>
            <input
              type="text"
              value={formData.hours}
              onChange={(e) => handleChange("hours", e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "white",
                boxSizing: "border-box",
                fontSize: "16px"
              }}
            />
          </div>
          
          <div>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
              Contract Type
            </label>
            <input
              type="text"
              value={formData.contractType}
              onChange={(e) => handleChange("contractType", e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "white",
                boxSizing: "border-box",
                fontSize: "16px"
              }}
            />
          </div>
          
          <div>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
              Salary
            </label>
            <input
              type="text"
              value={formData.salary}
              onChange={(e) => handleChange("salary", e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "white",
                boxSizing: "border-box",
                fontSize: "16px"
              }}
            />
          </div>
        </div>
      </div>

      {/* ---------------- JOB PURPOSE ---------------- */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#00264D", marginBottom: "12px" }}>Job Purpose</h3>
        {formData.jobPurpose.map((item, index) => (
          <div key={index} className="responsive-item" style={{ display: "flex", marginBottom: "10px", alignItems: "center" }}>
            <input
              type="text"
              value={item}
              onChange={(e) => handleArrayChange("jobPurpose", index, e.target.value)}
              style={{
                flex: 1,
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginRight: "10px",
                backgroundColor: "white",
                boxSizing: "border-box",
                fontSize: "16px"
              }}
            />
            <button
              type="button"
              onClick={() => removeArrayItem("jobPurpose", index)}
              style={{
                background: "#f44336",
                border: "none",
                padding: "10px 15px",
                borderRadius: "4px",
                color: "white",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => addArrayItem("jobPurpose")}
          style={{
            background: "#4CAF50",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            marginTop: "5px"
          }}
        >
          Add Item
        </button>
      </div>

      {/* ---------------- RESPONSIBILITIES ---------------- */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#00264D", marginBottom: "12px" }}>Key Responsibilities</h3>
        {formData.keyResponsibilities.map((item, index) => (
          <div key={index} className="responsive-item" style={{ display: "flex", marginBottom: "10px", alignItems: "center" }}>
            <input
              type="text"
              value={item}
              onChange={(e) => handleArrayChange("keyResponsibilities", index, e.target.value)}
              style={{
                flex: 1,
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginRight: "10px",
                backgroundColor: "white",
                boxSizing: "border-box",
                fontSize: "16px"
              }}
            />
            <button
              type="button"
              onClick={() => removeArrayItem("keyResponsibilities", index)}
              style={{
                background: "#f44336",
                border: "none",
                padding: "10px 15px",
                borderRadius: "4px",
                color: "white",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => addArrayItem("keyResponsibilities")}
          style={{
            background: "#4CAF50",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            marginTop: "5px"
          }}
        >
          Add Item
        </button>
      </div>

      {/* ---------------- PERSON SPECIFICATION ---------------- */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#00264D", marginBottom: "12px" }}>Person Specification</h3>
        
        <h4 style={{ color: "#00264D", marginBottom: "8px", fontSize: "16px" }}>Qualifications</h4>
        {formData.qualifications.map((item, index) => (
          <div key={index} className="responsive-item" style={{ display: "flex", marginBottom: "10px", alignItems: "center" }}>
            <input
              type="text"
              value={item}
              onChange={(e) => handleArrayChange("qualifications", index, e.target.value)}
              style={{
                flex: 1,
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginRight: "10px",
                backgroundColor: "white",
                boxSizing: "border-box",
                fontSize: "16px"
              }}
            />
            <button
              type="button"
              onClick={() => removeArrayItem("qualifications", index)}
              style={{
                background: "#f44336",
                border: "none",
                padding: "10px 15px",
                borderRadius: "4px",
                color: "white",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => addArrayItem("qualifications")}
          style={{
            background: "#4CAF50",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            marginTop: "5px",
            marginBottom: "15px"
          }}
        >
          Add Item
        </button>
        
        <h4 style={{ color: "#00264D", marginBottom: "8px", fontSize: "16px" }}>Skills</h4>
        {formData.skills.map((item, index) => (
          <div key={index} className="responsive-item" style={{ display: "flex", marginBottom: "10px", alignItems: "center" }}>
            <input
              type="text"
              value={item}
              onChange={(e) => handleArrayChange("skills", index, e.target.value)}
              style={{
                flex: 1,
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginRight: "10px",
                backgroundColor: "white",
                boxSizing: "border-box",
                fontSize: "16px"
              }}
            />
            <button
              type="button"
              onClick={() => removeArrayItem("skills", index)}
              style={{
                background: "#f44336",
                border: "none",
                padding: "10px 15px",
                borderRadius: "4px",
                color: "white",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => addArrayItem("skills")}
          style={{
            background: "#4CAF50",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            marginTop: "5px",
            marginBottom: "15px"
          }}
        >
          Add Item
        </button>
        
        <h4 style={{ color: "#00264D", marginBottom: "8px", fontSize: "16px" }}>Personal Attributes</h4>
        {formData.personalAttributes.map((item, index) => (
          <div key={index} className="responsive-item" style={{ display: "flex", marginBottom: "10px", alignItems: "center" }}>
            <input
              type="text"
              value={item}
              onChange={(e) => handleArrayChange("personalAttributes", index, e.target.value)}
              style={{
                flex: 1,
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginRight: "10px",
                backgroundColor: "white",
                boxSizing: "border-box",
                fontSize: "16px"
              }}
            />
            <button
              type="button"
              onClick={() => removeArrayItem("personalAttributes", index)}
              style={{
                background: "#f44336",
                border: "none",
                padding: "10px 15px",
                borderRadius: "4px",
                color: "white",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => addArrayItem("personalAttributes")}
          style={{
            background: "#4CAF50",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            marginTop: "5px"
          }}
        >
          Add Item
        </button>
      </div>

      {/* ---------------- WORKING CONDITIONS ---------------- */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#00264D", marginBottom: "12px" }}>Working Conditions</h3>
        {formData.workingConditions.map((item, index) => (
          <div key={index} className="responsive-item" style={{ display: "flex", marginBottom: "10px", alignItems: "center" }}>
            <input
              type="text"
              value={item}
              onChange={(e) => handleArrayChange("workingConditions", index, e.target.value)}
              style={{
                flex: 1,
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginRight: "10px",
                backgroundColor: "white",
                boxSizing: "border-box",
                fontSize: "16px"
              }}
            />
            <button
              type="button"
              onClick={() => removeArrayItem("workingConditions", index)}
              style={{
                background: "#f44336",
                border: "none",
                padding: "10px 15px",
                borderRadius: "4px",
                color: "white",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => addArrayItem("workingConditions")}
          style={{
            background: "#4CAF50",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            marginTop: "5px"
          }}
        >
          Add Item
        </button>
      </div>

      {/* ---------------- BENEFITS ---------------- */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#00264D", marginBottom: "12px" }}>Benefits</h3>
        {formData.benefits.map((item, index) => (
          <div key={index} className="responsive-item" style={{ display: "flex", marginBottom: "10px", alignItems: "center" }}>
            <input
              type="text"
              value={item}
              onChange={(e) => handleArrayChange("benefits", index, e.target.value)}
              style={{
                flex: 1,
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginRight: "10px",
                backgroundColor: "white",
                boxSizing: "border-box",
                fontSize: "16px"
              }}
            />
            <button
              type="button"
              onClick={() => removeArrayItem("benefits", index)}
              style={{
                background: "#f44336",
                border: "none",
                padding: "10px 15px",
                borderRadius: "4px",
                color: "white",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => addArrayItem("benefits")}
          style={{
            background: "#4CAF50",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            marginTop: "5px"
          }}
        >
          Add Item
        </button>
      </div>

      {/* ---------------- NAME / SIGNATURE ---------------- */}
      <div style={{ marginTop: "24px" }}>
        <h3 style={{ color: "#00264D", marginBottom: "12px" }}>Acknowledged By:</h3>
        
        <div className="responsive-row" style={{ display: "flex", gap: "15px", marginBottom: "15px", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              placeholder="Type full name"
              onChange={(e) => handleChange("name", e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "white",
                boxSizing: "border-box",
                fontSize: "16px"
              }}
            />
          </div>
          
          <div style={{ flex: 1, minWidth: "200px" }}>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "white",
                boxSizing: "border-box",
                fontSize: "16px"
              }}
            />
          </div>
        </div>
        
        <div style={{ marginTop: "20px" }}>
          <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
            Digital Signature
          </label>
          <div style={{
            border: "2px dashed #ccc",
            borderRadius: "4px",
            backgroundColor: "#fff",
            position: "relative",
            display: "inline-block",
            width: "100%",
            marginBottom: "10px"
          }}>
            <canvas
              ref={canvasRef}
              style={{
                display: "block",
                width: "100%",
                height: "200px",
                cursor: "crosshair",
                touchAction: "none", // Prevents touch scroll on the canvas
              }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
            <button
              type="button"
              onClick={clearSignature}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "5px 10px",
                fontSize: "14px",
                cursor: "pointer"
              }}
            >
              Clear
            </button>
          </div>
          <p style={{ fontSize: "14px", color: "#6c757d", marginBottom: "20px" }}>
            Draw your signature in the box above with your finger or mouse.
          </p>
        </div>
      </div>

      {/* ---- SAVE BUTTON ---- */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleSave}
          style={{
            padding: "12px 20px",
            backgroundColor: "#00264D",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "16px",
            width: "100%"
          }}
        >
          Save Form
        </button>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .responsive-row {
            flex-direction: column;
            gap: 0;
          }
          
          .responsive-item {
            flex-direction: column;
            align-items: stretch;
          }
          
          .responsive-item input {
            margin-right: 0;
            margin-bottom: 10px;
          }
          
          .responsive-item button {
            align-self: flex-end;
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
};

export default JobDescriptionForm;