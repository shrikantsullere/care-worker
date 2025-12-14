import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const InterviewScoringForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    question1: "1",
    question2: "1",
    question3: "1",
    question4: "1",
    question5: "1",
    question6: "1",
    question7: "1",
    question8: "1",
    question9: "1",
    question10: "1",
    interviewerName: "",
    interviewerSignature: null // Changed from string to null for digital signature
  });

  // Calculate total score
  const [totalScore, setTotalScore] = useState(10); // Default minimum score (10 questions * 1 point each)

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

  useEffect(() => {
    // Calculate total score whenever form data changes
    let score = 0;
    for (let i = 1; i <= 10; i++) {
      score += parseInt(formData[`question${i}`]) || 1; // Default to 1 if value is invalid
    }
    setTotalScore(score);
  }, [formData]);

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
        setFormData(prev => ({ ...prev, interviewerSignature: dataURL }));
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
    
    setFormData(prev => ({ ...prev, interviewerSignature: null }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    // Validate digital signature
    if (!formData.interviewerSignature) {
      alert("Please provide your digital signature to save the form.");
      return;
    }
    
    console.log("Form saved:", { ...formData, totalScore });
    alert(`Interview scores saved successfully! Total score: ${totalScore}/40`);
    navigate("/admin/forms");
  };

  // ---- ALL 10 QUESTIONS FROM PDF ----
  const questions = [
    "What do you think a Care Worker does and what types of people might you work with?",
    "Describe a stressful or difficult situation and how you handled it.",
    "If you were providing personal support, how would you maintain dignity and respect?",
    "How would you know a person is safe & healthy at home? What would you do if concerned?",
    "What do you understand by person-centred care and how would you achieve this?",
    "What is your understanding of confidentiality in care sector?",
    "When would you reveal something told to you in confidence by a service user?",
    "What is the simplest task you can do to stop/prevent infection spread?",
    "What would you do if a client offered you gifts or money?",
    "What is your understanding of medication criteria in care sector?"
  ];

  // Calculate score percentage for progress bar
  const scorePercentage = (totalScore / 40) * 100; // Maximum possible score is 40 (10 questions * 4 points each)

  // Determine score color based on percentage
  const getScoreColor = () => {
    if (scorePercentage < 25) return "#f44336"; // Red for poor scores
    if (scorePercentage < 50) return "#ff9800"; // Orange for below average
    if (scorePercentage < 75) return "#ffeb3b"; // Yellow for average
    return "#4caf50"; // Green for good scores
  };

  return (
    <div
      style={{
        maxWidth: "900px",
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
          type="button"
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
        Interview Scoring – Competency
      </h2>

      <div
        style={{
          backgroundColor: "#f0f5ff",
          padding: "10px 15px",
          borderRadius: "4px",
          marginBottom: "20px",
          textAlign: "center"
        }}
      >
        <em style={{ fontSize: "16px" }}>
          Scoring: 1 = Very weak, 2 = Basic, 3 = Good, 4 = Excellent
        </em>
      </div>

      <form onSubmit={handleSave}>
        {/* ALL 10 QUESTIONS */}
        {questions.map((q, i) => (
          <div key={i} className="question-item" style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "8px",
                fontSize: "16px",
                lineHeight: "1.4"
              }}
            >
              {i + 1}. {q}
            </label>

            <select
              name={`question${i + 1}`}
              value={formData[`question${i + 1}`]}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "white",
                fontSize: "16px",
                boxSizing: "border-box"
              }}
            >
              <option value="1">1 - Very weak</option>
              <option value="2">2 - Basic</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Excellent</option>
            </select>
          </div>
        ))}

        {/* NAME & SIGNATURE */}
        <div style={{ marginTop: "30px" }}>
          <h3
            style={{
              color: "#00264D",
              marginBottom: "15px",
              fontSize: "18px"
            }}
          >
            Interviewer Details
          </h3>
          
          <div className="responsive-row" style={{ display: "flex", gap: "15px", marginBottom: "15px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "250px" }}>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "8px" }}>
                Interviewer Name
              </label>
              <input
                type="text"
                name="interviewerName"
                value={formData.interviewerName}
                onChange={handleChange}
                placeholder="Enter interviewer's full name"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "white",
                  fontSize: "16px",
                  boxSizing: "border-box"
                }}
              />
            </div>
          </div>
          
          {/* DIGITAL SIGNATURE */}
          <div style={{ marginTop: "20px" }}>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "8px" }}>
              Interviewer Digital Signature
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

        {/* TOTAL SCORE SECTION */}
        <div style={{ 
          marginTop: "30px", 
          padding: "20px", 
          backgroundColor: "#f0f5ff", 
          borderRadius: "8px",
          border: "1px solid #d0d9f5"
        }}>
          <h3 style={{ 
            color: "#00264D", 
            marginBottom: "15px", 
            textAlign: "center",
            fontSize: "20px"
          }}>
            Total Score
          </h3>
          
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            marginBottom: "15px" 
          }}>
            <div style={{ 
              fontSize: "36px", 
              fontWeight: "bold", 
              color: getScoreColor(),
              textAlign: "center"
            }}>
              {totalScore}/40
            </div>
          </div>
          
          <div style={{ 
            height: "20px", 
            backgroundColor: "#e0e0e0", 
            borderRadius: "10px", 
            overflow: "hidden",
            width: "100%",
            marginBottom: "15px"
          }}>
            <div style={{ 
              height: "100%", 
              width: `${scorePercentage}%`, 
              backgroundColor: getScoreColor(),
              transition: "width 0.3s ease"
            }}></div>
          </div>
          
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            fontSize: "14px",
            color: "#666"
          }}>
            <span>10 (Minimum)</span>
            <span>20</span>
            <span>30</span>
            <span>40 (Maximum)</span>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          type="submit"
          style={{
            padding: "14px 20px",
            backgroundColor: "#00264D",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "16px",
            width: "100%",
            marginTop: "20px"
          }}
        >
          Save Form
        </button>
      </form>

      <style jsx>{`
        @media (max-width: 768px) {
          .responsive-row {
            flex-direction: column;
            gap: 0;
          }
          
          .question-item label {
            font-size: 15px;
            line-height: 1.5;
          }
          
          .question-item select {
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
};

export default InterviewScoringForm;