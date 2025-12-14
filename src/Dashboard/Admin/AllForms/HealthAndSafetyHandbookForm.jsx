import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const HealthAndSafetyHandbookForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Edit Mode
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (location.state && location.state.editMode) {
      setIsEditMode(true);
    }
  }, [location]);

  const sections = [
    "Accident reporting procedure",
    "Alcohol and drugs",
    "Baths",
    "Biohazards",
    "Body jewellery",
    "Cleaning and disinfecting",
    "COSHH assessments",
    "Disciplinary rules",
    "Display screen equipment (DSE)",
    "Drugs and medication",
    "Electricity",
    "Fire",
    "First aid procedures",
    "Food safety procedures",
    "Gas cylinders",
    "Hands and skin",
    "Hazard detection",
    "Hazards and risks",
    "Infection risks in nursing home",
    "Jewellery and perfume",
    "Ladders",
    "Manual handling",
    "New and expectant mothers",
    "Personal clothing",
    "Personal hygiene",
    "Safety in kitchen",
    "Safety signs",
    "Smoking",
    "Training",
    "Visit from enforcement officers",
    "Violence / Stress in workplace",
    "Waste disposal"
  ];

  // Checkbox State
  const [checked, setChecked] = useState(
    sections.reduce((acc, section) => ({ ...acc, [section]: false }), {})
  );

  // Form State
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    fullName: "",
    signature: ""
  });

  // Digital signature state
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [digitalSignature, setDigitalSignature] = useState(null);

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
        setDigitalSignature(dataURL);
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
    
    setDigitalSignature(null);
  };

  // Toggle Checkboxes
  const toggleCheck = (section) => {
    if (!isEditMode) return;

    setChecked((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Save Form
  const handleSave = () => {
    // Validate digital signature
    if (!digitalSignature) {
      alert("Please provide your digital signature to save the form.");
      return;
    }

    console.log("Form Saved:", { checked, formData, digitalSignature });
    alert("Form saved successfully!");
    navigate("/admin/forms");
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
        Health & Safety Handbook Acknowledgment
      </h2>

      <p
        style={{
          marginBottom: "20px",
          fontSize: "16px",
          textAlign: "center"
        }}
      >
        I confirm I have read and understood the following sections:
      </p>

      {/* CHECKBOX LIST */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "12px",
          marginBottom: "24px"
        }}
      >
        {sections.map((section, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              padding: "8px",
              borderRadius: "4px",
              backgroundColor: "#fff",
              border: "1px solid #e0e0e0"
            }}
          >
            <input
              type="checkbox"
              checked={!!checked[section]}
              onChange={() => toggleCheck(section)}
              disabled={!isEditMode}
              style={{
                marginRight: "12px",
                marginTop: "3px",
                cursor: isEditMode ? "pointer" : "not-allowed"
              }}
            />
            <span style={{ fontSize: "15px" }}>{section}</span>
          </div>
        ))}
      </div>

      {/* FORM BOTTOM SECTION */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "15px",
          marginTop: "24px"
        }}
      >
        {/* DATE */}
        <div>
          <label style={{ fontWeight: 600, marginBottom: 8, display: "block" }}>
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white",
              cursor: "text",
              fontSize: "16px",
              boxSizing: "border-box"
            }}
          />
        </div>

        {/* FULL NAME */}
        <div>
          <label style={{ fontWeight: 600, marginBottom: 8, display: "block" }}>
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Type full name"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white",
              cursor: "text",
              fontSize: "16px",
              boxSizing: "border-box"
            }}
          />
        </div>
      </div>

      {/* DIGITAL SIGNATURE SECTION */}
      <div style={{ marginTop: "24px" }}>
        <h3 style={{ 
          color: "#00264D", 
          fontSize: "18px", 
          marginBottom: "15px",
          borderBottom: "1px solid #e0e0e0",
          paddingBottom: "8px"
        }}>
          Digital Signature
        </h3>
        
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

      {/* EDIT / SAVE / CANCEL */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          flexWrap: "wrap"
        }}
      >
        {!isEditMode ? (
          <button
            onClick={() => setIsEditMode(true)}
            style={{
              background: "#4CAF50",
              color: "#fff",
              border: "none",
              padding: "12px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "16px",
              width: "100%"
            }}
          >
            Edit Form
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              style={{
                background: "#00264D",
                color: "#fff",
                border: "none",
                padding: "12px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "16px",
                flex: 1
              }}
            >
              Save Form
            </button>
            <button
              onClick={() => setIsEditMode(false)}
              style={{
                background: "#f44336",
                color: "#fff",
                border: "none",
                padding: "12px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "16px",
                flex: 1
              }}
            >
              Cancel
            </button>
          </>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="display: grid"] {
            grid-template-columns: 1fr;
          }
          
          div[style*="display: flex"] {
            flex-direction: column;
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

export default HealthAndSafetyHandbookForm;