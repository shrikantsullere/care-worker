import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SupervisionForm() {
  const navigate = useNavigate();

  // ALL QUESTIONS FROM PDF
  const discussionQuestions = [
    "How are you finding your role of a care worker?",
    "Do you feel you have appropriate support from the office?",
    "Do you feel that communication is adequate to complete your tasks?",
    "Are you made aware of any changes within the company?",
    "Do all of your care & support plans reflect the needs of individual clients?",
    "Are there any changes needed to medication administration for any clients?",
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
  
  // Calculate date 6 months from now
  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
  const sixMonthsLater = sixMonthsFromNow.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    careWorkerName: "",
    type: "Telephone",
    date: today,
    time: "",
    discussion: discussionQuestions.reduce((acc, q) => {
      acc[q] = "";
      return acc;
    }, {}),
    actionsAgreed: "",
    followUpDate: "",
    nextSupportDate: "",
    staffFileUpdated: "",
    rosterUpdated: "",
    additionalNotes: "",
    careWorkerSignature: null, // Changed to null for digital signature
    careWorkerDate: "",
    assessorName: "",
    assessorSignature: null, // Changed to null for digital signature
    assessorDate: "",
    
    // New fields for 6-month tracking
    lastSupervisionDate: "",
    nextSupervisionDue: sixMonthsLater,
    supervisionOverdue: false,
  });

  // Check if supervision is overdue
  useEffect(() => {
    if (formData.lastSupervisionDate) {
      const lastSupervision = new Date(formData.lastSupervisionDate);
      const today = new Date();
      const dueDate = new Date(lastSupervision);
      dueDate.setMonth(dueDate.getMonth() + 6);
      
      setFormData(prev => ({
        ...prev,
        nextSupervisionDue: dueDate.toISOString().split('T')[0],
        supervisionOverdue: today > dueDate
      }));
    }
  }, [formData.lastSupervisionDate]);

  // --- Digital Signature State for Care Worker ---
  const careWorkerCanvasRef = useRef(null);
  const [isCareWorkerDrawing, setIsCareWorkerDrawing] = useState(false);

  // --- Digital Signature State for Assessor ---
  const assessorCanvasRef = useRef(null);
  const [isAssessorDrawing, setIsAssessorDrawing] = useState(false);

  // --- Initialize Canvases ---
  useEffect(() => {
    // Care Worker Canvas
    const careWorkerCanvas = careWorkerCanvasRef.current;
    if (careWorkerCanvas) {
      const context = careWorkerCanvas.getContext('2d');
      context.lineWidth = 2;
      context.lineCap = 'round';
      context.strokeStyle = '#000';
      careWorkerCanvas.width = 600;
      careWorkerCanvas.height = 200;
      context.fillStyle = '#fff';
      context.fillRect(0, 0, careWorkerCanvas.width, careWorkerCanvas.height);
    }

    // Assessor Canvas
    const assessorCanvas = assessorCanvasRef.current;
    if (assessorCanvas) {
      const context = assessorCanvas.getContext('2d');
      context.lineWidth = 2;
      context.lineCap = 'round';
      context.strokeStyle = '#000';
      assessorCanvas.width = 600;
      assessorCanvas.height = 200;
      context.fillStyle = '#fff';
      context.fillRect(0, 0, assessorCanvas.width, assessorCanvas.height);
    }
  }, []);

  // --- Digital Signature Logic ---
  const getCoordinates = (event, canvas) => {
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  // Care Worker Signature Functions
  const startCareWorkerDrawing = (event) => {
    event.preventDefault();
    const { x, y } = getCoordinates(event, careWorkerCanvasRef.current);
    const context = careWorkerCanvasRef.current.getContext('2d');
    context.beginPath();
    context.moveTo(x, y);
    setIsCareWorkerDrawing(true);
  };

  const drawCareWorker = (event) => {
    event.preventDefault();
    if (!isCareWorkerDrawing) return;
    const { x, y } = getCoordinates(event, careWorkerCanvasRef.current);
    const context = careWorkerCanvasRef.current.getContext('2d');
    context.lineTo(x, y);
    context.stroke();
  };

  const stopCareWorkerDrawing = () => {
    if (isCareWorkerDrawing) {
      setIsCareWorkerDrawing(false);
      const canvas = careWorkerCanvasRef.current;
      if (canvas) {
        const dataURL = canvas.toDataURL('image/png');
        setFormData(prev => ({ ...prev, careWorkerSignature: dataURL }));
      }
    }
  };

  const clearCareWorkerSignature = () => {
    const canvas = careWorkerCanvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    setFormData(prev => ({ ...prev, careWorkerSignature: null }));
  };

  // Assessor Signature Functions
  const startAssessorDrawing = (event) => {
    event.preventDefault();
    const { x, y } = getCoordinates(event, assessorCanvasRef.current);
    const context = assessorCanvasRef.current.getContext('2d');
    context.beginPath();
    context.moveTo(x, y);
    setIsAssessorDrawing(true);
  };

  const drawAssessor = (event) => {
    event.preventDefault();
    if (!isAssessorDrawing) return;
    const { x, y } = getCoordinates(event, assessorCanvasRef.current);
    const context = assessorCanvasRef.current.getContext('2d');
    context.lineTo(x, y);
    context.stroke();
  };

  const stopAssessorDrawing = () => {
    if (isAssessorDrawing) {
      setIsAssessorDrawing(false);
      const canvas = assessorCanvasRef.current;
      if (canvas) {
        const dataURL = canvas.toDataURL('image/png');
        setFormData(prev => ({ ...prev, assessorSignature: dataURL }));
      }
    }
  };

  const clearAssessorSignature = () => {
    const canvas = assessorCanvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    setFormData(prev => ({ ...prev, assessorSignature: null }));
  };
  
  // Change Handlers
  const handleChange = (e, question) => {
    const value = e.target.value;
    
    if (question) {
      setFormData(prev => ({
        ...prev,
        discussion: {
          ...prev.discussion,
          [question]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [e.target.name]: value }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    // Validate digital signatures
    if (!formData.careWorkerSignature || !formData.assessorSignature) {
      alert("Please provide both digital signatures to save the form.");
      return;
    }
    
    console.log("Supervision Form Submitted:", formData);
    alert("Supervision Form saved successfully! Next supervision due on: " + formData.nextSupervisionDue);
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
    textAlign: "center"
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
        
        <img
          src="https://unitecare.org/content/images/logo.png"
          alt="Unite Care Ltd Logo"
          style={logoStyle}
        />
      </div>

      <h2 style={titleStyle}>
        Telephone / Face to Face Supervision Record
      </h2>

      {/* 6-MONTH REQUIREMENT ALERT */}
      <div style={formData.supervisionOverdue ? dangerStyle : infoStyle}>
        <span style={{ fontSize: "18px", marginRight: "5px" }}>
          {formData.supervisionOverdue ? "⚠️" : "ℹ️"}
        </span>
        <div>
          <strong>Supervision Requirement:</strong> A new supervision record must be completed every 6 months.
          {formData.lastSupervisionDate && (
            <div>
              Last supervision: {formData.lastSupervisionDate} | 
              Next supervision due: {formData.nextSupervisionDue}
              {formData.supervisionOverdue && (
                <span style={{ color: "#721c24", fontWeight: "bold" }}> (OVERDUE)</span>
              )}
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSave}>
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
            <label style={labelStyle}>Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="Telephone">Telephone</option>
              <option value="Face to Face">Face to Face</option>
            </select>
          </div>
        </div>

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

        {/* LAST SUPERVISION DATE */}
        <div style={sectionStyle}>Previous Supervision Information</div>
        <div style={rowStyle}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={labelStyle}>Date of Last Supervision</label>
            <input
              type="date"
              name="lastSupervisionDate"
              value={formData.lastSupervisionDate}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={labelStyle}>Next Supervision Due Date</label>
            <input
              type="date"
              name="nextSupervisionDue"
              value={formData.nextSupervisionDue}
              readOnly
              style={{
                ...inputStyle,
                backgroundColor: "#f5f5f5",
                cursor: "not-allowed"
              }}
            />
          </div>
        </div>

        {/* DISCUSSION SECTION */}
        <div style={sectionStyle}>Discussion</div>
        
        <div style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          marginBottom: "20px"
        }}>
          {discussionQuestions.map((q, index) => (
            <div key={index} style={{ marginBottom: "15px" }}>
              <b style={{ display: "block", marginBottom: "8px", fontSize: "16px" }}>{q}</b>
              <textarea
                rows="3"
                value={formData.discussion[q]}
                onChange={(e) => handleChange(e, q)}
                style={textareaStyle}
              />
            </div>
          ))}
        </div>

        {/* ACTIONS AGREED */}
        <div style={sectionStyle}>Actions / Follow-Up</div>
        
        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Were there any agreed actions? If yes, describe here.</label>
          <textarea
            rows="3"
            value={formData.actionsAgreed}
            onChange={handleChange}
            style={textareaStyle}
          />
        </div>

        <div style={rowStyle}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={labelStyle}>If applicable, when should this be completed?</label>
            <input
              type="date"
              name="followUpDate"
              value={formData.followUpDate}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={labelStyle}>Date of next support session</label>
            <input
              type="date"
              name="nextSupportDate"
              value={formData.nextSupportDate}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        {/* OFFICE SECTION */}
        <div style={sectionStyle}>Office Use</div>
        
        <div style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          marginBottom: "20px"
        }}>
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
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: "250px" }}>
              <label style={labelStyle}>Staff roster updated?</label>
              <select
                name="rosterUpdated"
                value={formData.rosterUpdated}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Select</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={labelStyle}>Additional Notes</label>
            <textarea
              name="additionalNotes"
              rows="3"
              value={formData.additionalNotes}
              onChange={handleChange}
              style={textareaStyle}
            />
          </div>
        </div>

        {/* SIGNATURES */}
        <div style={sectionStyle}>Digital Signatures</div>
        
        <div style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          marginBottom: "20px"
        }}>
          {/* Care Worker Signature */}
          <div style={rowStyle}>
            <div style={{ flex: 1, minWidth: "250px" }}>
              <label style={labelStyle}>Care Worker Signature</label>
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
                  ref={careWorkerCanvasRef}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "200px",
                    cursor: "crosshair",
                    touchAction: "none",
                  }}
                  onMouseDown={startCareWorkerDrawing}
                  onMouseMove={drawCareWorker}
                  onMouseUp={stopCareWorkerDrawing}
                  onMouseLeave={stopCareWorkerDrawing}
                  onTouchStart={startCareWorkerDrawing}
                  onTouchMove={drawCareWorker}
                  onTouchEnd={stopCareWorkerDrawing}
                />
                <button
                  type="button"
                  onClick={clearCareWorkerSignature}
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

          {/* Assessor Signature */}
          <div style={rowStyle}>
            <div style={{ flex: 1, minWidth: "250px" }}>
              <label style={labelStyle}>Assessor Signature</label>
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
                  ref={assessorCanvasRef}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "200px",
                    cursor: "crosshair",
                    touchAction: "none",
                  }}
                  onMouseDown={startAssessorDrawing}
                  onMouseMove={drawAssessor}
                  onMouseUp={stopAssessorDrawing}
                  onMouseLeave={stopAssessorDrawing}
                  onTouchStart={startAssessorDrawing}
                  onTouchMove={drawAssessor}
                  onTouchEnd={stopAssessorDrawing}
                />
                <button
                  type="button"
                  onClick={clearAssessorSignature}
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
            </div>
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
          <p style={{ fontSize: "14px", color: "#6c757d", textAlign: "center", marginTop: "10px" }}>
            Draw your signature in the box above with your finger or mouse.
          </p>
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
          div[style*="display: flex"] {
            flex-direction: column;
            gap: 0;
          }
          
          input[type="date"], input[type="time"] {
            font-size: 16px; /* Prevents zoom on iOS */
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