import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaSave, FaPrint, FaEdit, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Hour48Agreement = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureData, setSignatureData] = useState(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  
  const [formData, setFormData] = useState({
    employeeName: "",
    agreementText: "I ___________________________ confirm that I volunteer to give my consent to work more than an average of 48 hours a week within the recommended rest periods.",
    noObligationText: "I am aware that I am under no obligation to sign this agreement and that it is illegal for me to be subjected to any detriment if I decline to sign.",
    durationText: "This agreement is to remain effective for an indefinite period but I understand that should I wish to terminate this agreement; I can do so at any time by providing Unite Care Ltd within 30 days' written notice of my intention to do so.",
    secondEmployerText: "I understand that I have a legal obligation to inform Unite Care Ltd if I currently work or subsequently plan to work for a second employer.",
    printedName: "",
    date: new Date().toISOString().split('T')[0]
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
    alert("48 Hour Agreement saved successfully!");
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
    agreementContainer: {
      backgroundColor: "white",
      padding: isMobile ? "15px" : "40px",
      borderRadius: "8px",
      maxWidth: "900px",
      margin: "0 auto",
      // boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    },
    agreementTitle: {
      textAlign: "center",
      fontSize: isMobile ? "20px" : "32px",
      fontWeight: "bold",
      margin: "20px 0",
      color: "#333"
    },
    subtitle: {
      textAlign: "center",
      fontSize: isMobile ? "14px" : "18px",
      fontWeight: "600",
      margin: "0 0 30px",
      color: "#555",
      fontStyle: "italic"
    },
    sectionTitle: {
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: "bold",
      margin: "15px 0 10px",
      color: "#333"
    },
    formGroup: {
      marginBottom: "20px"
    },
    paragraph: {
      fontSize: isMobile ? "14px" : "16px",
      color: "#444",
      lineHeight: "1.6",
      marginBottom: "15px"
    },
    agreementInputContainer: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      marginBottom: "15px"
    },
    agreementInputLabel: {
      fontSize: isMobile ? "14px" : "16px",
      marginRight: isMobile ? "0" : "10px",
      marginBottom: isMobile ? "5px" : "0"
    },
    agreementInput: {
      width: isMobile ? "100%" : "300px",
      padding: isMobile ? "10px 12px" : "8px 12px",
      border: "1px solid #3A8DFF",
      borderRadius: "4px",
      fontSize: isMobile ? "14px" : "16px",
      backgroundColor: "#f8f9ff",
      boxSizing: "border-box"
    },
    importantNote: {
      backgroundColor: "#fff8e1",
      borderLeft: "4px solid #FF9800",
      padding: "15px",
      margin: "20px 0",
      borderRadius: "4px"
    },
    importantText: {
      fontSize: isMobile ? "14px" : "16px",
      color: "#555",
      fontWeight: "500"
    },
    signatureSection: {
      display: "flex",
      flexDirection: "column",
      marginTop: "30px"
    },
    signatureRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
      gap: isMobile ? "15px" : "20px",
      flexDirection: isMobile ? "column" : "row"
    },
    signatureGroup: {
      flex: 1
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontSize: isMobile ? "14px" : "16px",
      fontWeight: "500"
    },
    input: {
      width: "100%",
      padding: isMobile ? "10px 12px" : "8px 12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: isMobile ? "14px" : "16px",
      boxSizing: "border-box"
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
      
      <div style={styles.agreementContainer}>
        <h1 style={styles.agreementTitle}>48 Hour Agreement</h1>
        <p style={styles.subtitle}>In completing this form, I am choosing to opt out of the 48-hour working limit.</p>
        
        <h3 style={styles.sectionTitle}>Agreement</h3>
        
        <div style={styles.formGroup}>
          <div style={styles.agreementInputContainer}>
            <label style={styles.agreementInputLabel}>I</label>
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              style={styles.agreementInput}
              placeholder="Employee Name"
            />
            <span style={styles.agreementInputLabel} style={{marginLeft: isMobile ? "0" : "10px", marginTop: isMobile ? "5px" : "0"}}>
              confirm that I volunteer to give my consent to work more than an average of 48 hours a week within the recommended rest periods.
            </span>
          </div>
        </div>
        
        <div style={styles.importantNote}>
          <p style={styles.importantText}>
            I am aware that I am under no obligation to sign this agreement and that it is illegal for me to be subjected to any detriment if I decline to sign.
          </p>
        </div>
        
        <div style={styles.formGroup}>
          <p style={styles.paragraph}>
            This agreement is to remain effective for an indefinite period but I understand that should I wish to terminate this agreement; I can do so at any time by providing Unite Care Ltd within 30 days' written notice of my intention to do so.
          </p>
        </div>
        
        <div style={styles.formGroup}>
          <p style={styles.paragraph}>
            I understand that I have a legal obligation to inform Unite Care Ltd if I currently work or subsequently plan to work for a second employer.
          </p>
        </div>
        
        <h3 style={styles.sectionTitle}>Signature</h3>
        <div style={styles.signatureSection}>
          <div style={styles.signatureRow}>
            <div style={styles.signatureGroup}>
              <label style={styles.label}>Print Name:</label>
              <input
                type="text"
                name="printedName"
                value={formData.printedName}
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
            <FaSave /> Save Agreement
          </button>
          <button style={{...styles.button, ...styles.printButton}} onClick={handlePrint}>
            <FaPrint /> Print Agreement
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

export default Hour48Agreement;