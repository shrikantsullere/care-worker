import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MedicationCompetencyForm = () => {
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState({
    carerName: "",
    employeeID: "",
    organisationName: "",
    dateOfAssessment: "",
    sections: {
      preparationHygiene: "Competent",
      promptingMedication: "Competent",
      marChartReading: "Competent",
      correctSelectionAdmin: "Competent",
      consent: "Competent",
      recordKeeping: "Competent",
      stockControl: "Competent",
      orderingDisposal: "Competent",
      accessingMedicationAdvice: "Competent",
    },
    assessorName: "",
    assessorSignature: null, // Changed to null for digital signature
    remarks: "",
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
        setFormData(prev => ({ ...prev, assessorSignature: dataURL }));
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
    
    setFormData(prev => ({ ...prev, assessorSignature: null }));
  };

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.sections) {
      setFormData((prev) => ({
        ...prev,
        sections: { ...prev.sections, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    // Validate digital signature
    if (!formData.assessorSignature) {
      alert("Please provide your digital signature to save the form.");
      return;
    }
    
    console.log("Form Data Saved:", formData);
    alert("Medication Competency Assessment saved successfully!");
    navigate("/admin/forms");
  };

  const sectionLabels = {
    preparationHygiene: "Preparation & Hygiene",
    promptingMedication: "Prompting Medication",
    marChartReading: "MAR Chart Reading",
    correctSelectionAdmin: "Correct Selection & Administration",
    consent: "Consent",
    recordKeeping: "Record Keeping",
    stockControl: "Stock Control",
    orderingDisposal: "Ordering & Disposal",
    accessingMedicationAdvice: "Accessing Medication Advice",
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

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginBottom: "15px",
    backgroundColor: "white",
    boxSizing: "border-box",
    fontSize: "16px"
  };

  const labelStyle = {
    fontWeight: 600,
    marginBottom: "8px",
    display: "block",
    color: "#333"
  };

  const sectionStyle = {
    fontWeight: 700,
    margin: "20px 0 10px",
    color: "#00264D",
    fontSize: "18px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "5px"
  };

  const buttonStyle = {
    padding: "12px 20px",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.3s ease"
  };

  const saveBtn = {
    ...buttonStyle,
    backgroundColor: "#00264D",
    color: "#fff",
    border: "none",
    width: "100%",
    marginTop: "20px"
  };

  const backBtn = {
    ...buttonStyle,
    backgroundColor: "#3A8DFF",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    fontSize: "14px"
  };

  const rowStyle = {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap"
  };

  const selectStyle = {
    ...inputStyle,
    cursor: "pointer"
  };

  return (
    <div style={containerStyle}>
      {/* Header with Logo and Back Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap"
        }}
      >
        <button
          type="button"
          onClick={() => navigate("/admin/forms")}
          style={backBtn}
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
            objectFit: "contain"
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
        Medication Competency Assessment
      </h2>

      <form onSubmit={handleSave}>
        {/* Assessment Details */}
        <div style={sectionStyle}>Assessment Details</div>
        
        <div style={rowStyle}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={labelStyle}>Carer / Employee Name</label>
            <input
              type="text"
              name="carerName"
              value={formData.carerName}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={labelStyle}>Employee ID (Optional)</label>
            <input
              type="text"
              name="employeeID"
              value={formData.employeeID}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>
        
        <div style={rowStyle}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={labelStyle}>Organisation Name</label>
            <input
              type="text"
              name="organisationName"
              value={formData.organisationName}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={labelStyle}>Date of Assessment</label>
            <input
              type="date"
              name="dateOfAssessment"
              value={formData.dateOfAssessment}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
        </div>

        {/* Competency Checklist */}
        <div style={sectionStyle}>Competency Checklist</div>
        
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "15px",
            backgroundColor: "#fff",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #e0e0e0"
          }}
        >
          {Object.keys(formData.sections).map((key) => (
            <div key={key} style={{ marginBottom: "15px" }}>
              <label style={labelStyle}>{sectionLabels[key]}</label>
              <select
                name={key}
                value={formData.sections[key]}
                onChange={handleChange}
                style={selectStyle}
              >
                <option value="Competent">Competent</option>
                <option value="Needs Support">Needs Support</option>
              </select>
            </div>
          ))}
        </div>

        {/* Assessor Details */}
        <div style={sectionStyle}>Assessor Details</div>
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Assessor Name</label>
          <input
            type="text"
            name="assessorName"
            value={formData.assessorName}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Digital Signature */}
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Assessor Digital Signature</label>
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

        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Remarks / Observations (Optional)</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows="4"
            style={{
              ...inputStyle,
              resize: "vertical"
            }}
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          style={saveBtn}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#003d80";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#00264D";
          }}
        >
          Save Assessment
        </button>
      </form>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="display: flex"] {
            flex-direction: column;
            gap: 0;
          }
          
          div[style*="display: grid"] {
            grid-template-columns: 1fr;
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

export default MedicationCompetencyForm;