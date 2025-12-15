import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaSave, FaPrint, FaEdit, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const InductionCertificate = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureData, setSignatureData] = useState(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  
  const [formData, setFormData] = useState({
    carerWorkerName: "",
    trainingCourses: [
      "Dementia Awareness (Careskills)",
      "Fire Safety (Careskills)",
      "First aid (Careskills)",
      "Infection control (Careskills)",
      "Mental capacity (Careskills)",
      "Safeguarding and protection of adults (Careskills)",
      "GDPR1 (Careskills)",
      "Health and Safety (Careskills)",
      "Medication Practice (Careskills)",
      "CYP Safeguarding Children and Young People (Careskills)",
      "Moving and Handling (Careskills)",
      "Nutrition and hydration (Careskills)",
      "Pressure Area Care (Careskills)",
      "Diabetes Awareness (Careskills)",
      "End of life Care (Careskills)",
      "Epilepsy Awareness (Careskills)",
      "Autism (Careskills)",
      "Basic Life Support (Careskills)",
      "Catheter Care (Careskills)",
      "Care Certificates (Careskills)",
      "Food hygiene (Careskills)",
      "The Oliver McGowan Mandatory training on Learning disability (Careskills)",
      "Communication (Careskills)",
      "Dignity in Care (Careskills)",
      "Equity, Diversity, inclusion (Careskills)",
      "Person Centred care (Careskills)",
      "Duty of care (Careskills)",
      "Risk assessment (Careskills)"
    ],
    trainingFrom: "",
    trainingTo: "",
    statement: "As a Care Worker, I understand and completed the above induction training and understood my caring responsibilities.",
    signatureName: "",
    date: ""
  });
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth > 768 && window.innerWidth <= 1024);
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      context.strokeStyle = '#000';
      context.lineWidth = 2;
      context.lineCap = 'round';
    }
  }, [showSignatureModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    const context = canvas.getContext('2d');
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    const context = canvas.getContext('2d');
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureData(null);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    setSignatureData(dataURL);
    setShowSignatureModal(false);
  };

  const handleSave = () => {
    // Save form data logic here
    alert("Form saved successfully!");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    navigate(-1);
  };

  const styles = {
    container: {
      padding: isMobile ? "10px" : "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#fff",
      minHeight: "100vh",
      maxWidth: "100%",
      overflowX: "hidden"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      position: "relative",
      flexWrap: isMobile ? "wrap" : "nowrap"
    },
    backButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "#3A8DFF",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: isMobile ? "6px 12px" : "8px 15px",
      cursor: "pointer",
      fontSize: isMobile ? "12px" : "16px",
      marginBottom: isMobile ? "10px" : "0"
    },
    logo: {
      height: isMobile ? "40px" : "70px",
      width: "auto"
    },
    certificateContainer: {
      backgroundColor: "white",
      padding: isMobile ? "15px" : "40px",
      borderRadius: "8px",
      maxWidth: "900px",
      margin: "0 auto",
      // boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    },
    certificateTitle: {
      textAlign: "center",
      fontSize: isMobile ? "20px" : "32px",
      fontWeight: "bold",
      margin: "20px 0",
      color: "#333"
    },
    sectionTitle: {
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: "bold",
      margin: "15px 0 10px",
      color: "#333"
    },
    formGroup: {
      marginBottom: "15px"
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontSize: isMobile ? "14px" : "16px",
      fontWeight: "500"
    },
    input: {
      width: "100%",
      padding: isMobile ? "8px 10px" : "8px 12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: isMobile ? "14px" : "16px",
      boxSizing: "border-box"
    },
    coursesContainer: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
      gap: "8px",
      marginBottom: "20px"
    },
    courseItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: "5px",
      wordBreak: "break-word"
    },
    checkbox: {
      marginRight: "8px",
      minWidth: "16px"
    },
    dateContainer: {
      display: "flex",
      gap: isMobile ? "10px" : "20px",
      marginBottom: "20px",
      flexDirection: isMobile ? "column" : "row"
    },
    dateGroup: {
      flex: 1
    },
    statementContainer: {
      margin: "20px 0",
      padding: "15px",
      backgroundColor: "#f9f9f9",
      borderRadius: "4px",
      fontStyle: "italic",
      fontSize: isMobile ? "14px" : "16px"
    },
    signatureContainer: {
      display: "flex",
      flexDirection: "column",
      marginTop: "30px"
    },
    signatureRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "15px" : "0"
    },
    signatureGroup: {
      flex: 1
    },
    actionButtons: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginTop: "30px",
      flexWrap: "wrap"
    },
    button: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: isMobile ? "8px 15px" : "10px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: isMobile ? "14px" : "16px",
      fontWeight: "500",
      flex: isMobile ? "1" : "auto",
      justifyContent: "center"
    },
    saveButton: {
      backgroundColor: "#4CAF50",
      color: "white"
    },
    printButton: {
      backgroundColor: "#FF9800",
      color: "white"
    },
    signatureButton: {
      backgroundColor: "#3A8DFF",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: isMobile ? "8px 12px" : "8px 15px",
      cursor: "pointer",
      fontSize: isMobile ? "14px" : "16px",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginTop: "10px",
      width: isMobile ? "100%" : "auto",
      justifyContent: "center"
    },
    signaturePreview: {
      width: "100%",
      height: "80px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      marginTop: "10px",
      backgroundColor: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden"
    },
    // Modal styles
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      padding: isMobile ? "10px" : "0"
    },
    modalContent: {
      backgroundColor: "white",
      padding: isMobile ? "20px" : "30px",
      borderRadius: "8px",
      width: isMobile ? "95%" : "600px",
      maxWidth: "95%",
      maxHeight: isMobile ? "90vh" : "auto",
      overflowY: "auto"
    },
    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px"
    },
    modalTitle: {
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: "bold",
      color: "#333"
    },
    modalCloseButton: {
      background: "none",
      border: "none",
      fontSize: "20px",
      cursor: "pointer",
      color: "#999"
    },
    signatureCanvas: {
      width: "100%",
      height: isMobile ? "150px" : "200px",
      border: "2px solid #3A8DFF",
      borderRadius: "4px",
      cursor: "crosshair",
      backgroundColor: "white",
      touchAction: "none"
    },
    modalButtons: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px",
      gap: "10px"
    },
    clearButton: {
      backgroundColor: "#F44336",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: isMobile ? "8px 12px" : "8px 15px",
      cursor: "pointer",
      fontSize: isMobile ? "14px" : "16px",
      fontWeight: "500",
      flex: 1
    },
    saveSignatureButton: {
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: isMobile ? "8px 12px" : "8px 15px",
      cursor: "pointer",
      fontSize: isMobile ? "14px" : "16px",
      fontWeight: "500",
      flex: 1
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={handleBack}>
          <FaArrowLeft /> Back
        </button>
        <img 
          src="https://unitecare.org/content/images/logo.png" 
          alt="Unite Care Logo" 
          style={styles.logo}
        />
      </div>
      
      <div style={styles.certificateContainer}>
        <h1 style={styles.certificateTitle}>CERTIFICATE</h1>
        <h2 style={{...styles.certificateTitle, fontSize: isMobile ? "18px" : "24px", marginTop: "-10px"}}>
          INDUCTION TRAINING
        </h2>
        
        <div style={{textAlign: "center", margin: "20px 0"}}>
          <p style={{fontSize: isMobile ? "14px" : "16px"}}>This is to certify that</p>
          <div style={styles.formGroup}>
            <input
              type="text"
              name="carerWorkerName"
              value={formData.carerWorkerName}
              onChange={handleChange}
              style={{...styles.input, textAlign: "center", fontWeight: "bold"}}
              placeholder="Carer Worker's Name"
            />
          </div>
        </div>
        
        <div style={styles.sectionTitle}>Training Courses Completed:</div>
        <div style={styles.coursesContainer}>
          {formData.trainingCourses.map((course, index) => (
            <div key={index} style={styles.courseItem}>
              <input type="checkbox" style={styles.checkbox} defaultChecked />
              <span style={{fontSize: isMobile ? "12px" : "14px"}}>{course}</span>
            </div>
          ))}
        </div>
        
        <div style={styles.sectionTitle}>Training Dates:</div>
        <div style={styles.dateContainer}>
          <div style={styles.dateGroup}>
            <label style={styles.label}>From:</label>
            <input
              type="date"
              name="trainingFrom"
              value={formData.trainingFrom}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.dateGroup}>
            <label style={styles.label}>To:</label>
            <input
              type="date"
              name="trainingTo"
              value={formData.trainingTo}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>
        
        <div style={styles.statementContainer}>
          <p>{formData.statement}</p>
        </div>
        
        <div style={styles.signatureContainer}>
          <div style={styles.signatureRow}>
            <div style={styles.signatureGroup}>
              <label style={styles.label}>Carer Worker's Name:</label>
              <input
                type="text"
                name="signatureName"
                value={formData.signatureName}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.signatureGroup}>
              <label style={styles.label}>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>
          
          <label style={styles.label}>Digital Signature:</label>
          <button 
            style={styles.signatureButton}
            onClick={() => setShowSignatureModal(true)}
          >
            <FaEdit /> Add Digital Signature
          </button>
          
          {signatureData && (
            <div style={styles.signaturePreview}>
              <img src={signatureData} alt="Signature" style={{maxHeight: "70px", maxWidth: "100%"}} />
            </div>
          )}
        </div>
        
        <div style={styles.actionButtons}>
          <button style={{...styles.button, ...styles.saveButton}} onClick={handleSave}>
            <FaSave /> Save Certificate
          </button>
          <button style={{...styles.button, ...styles.printButton}} onClick={handlePrint}>
            <FaPrint /> Print Certificate
          </button>
        </div>
      </div>
      
      {/* Signature Modal */}
      {showSignatureModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Draw Your Signature</h3>
              <button 
                style={styles.modalCloseButton}
                onClick={() => setShowSignatureModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            
            <canvas
              ref={canvasRef}
              style={styles.signatureCanvas}
              width={isMobile ? windowWidth * 0.9 : 500}
              height={isMobile ? 150 : 200}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
            
            <div style={styles.modalButtons}>
              <button style={styles.clearButton} onClick={clearSignature}>
                Clear
              </button>
              <button style={styles.saveSignatureButton} onClick={saveSignature}>
                Save Signature
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InductionCertificate;