import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaSave, FaPrint, FaEdit, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BankDetailForm = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureData, setSignatureData] = useState(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  
  const [formData, setFormData] = useState({
    accountHolderName: "",
    bankName: "",
    buildingSocietyName: "",
    sortCode: "",
    accountNumber: "",
    buildingSocietyRollNumber: "",
    paymentToAnotherAccount: false,
    anotherAccountName: "",
    taxDetails: "",
    authorization: false
  });
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
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
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    alert("Bank details saved successfully!");
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
      minHeight: "100vh"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      position: "relative"
    },
    backButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "#3A8DFF",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "8px 15px",
      cursor: "pointer",
      fontSize: isMobile ? "14px" : "16px"
    },
    logo: {
      height: isMobile ? "50px" : "70px",
      width: "auto"
    },
    formContainer: {
      backgroundColor: "white",
      padding: isMobile ? "20px" : "40px",
      borderRadius: "8px",
      maxWidth: "900px",
      margin: "0 auto"
    },
    formTitle: {
      textAlign: "center",
      fontSize: isMobile ? "24px" : "32px",
      fontWeight: "bold",
      margin: "20px 0",
      color: "#333"
    },
    sectionTitle: {
      fontSize: isMobile ? "18px" : "20px",
      fontWeight: "bold",
      margin: "25px 0 15px",
      color: "#333",
      borderBottom: "2px solid #3A8DFF",
      paddingBottom: "8px"
    },
    formGroup: {
      marginBottom: "20px"
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: isMobile ? "14px" : "16px",
      fontWeight: "500",
      color: "#555"
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: isMobile ? "14px" : "16px",
      transition: "border-color 0.3s ease"
    },
    inputFocus: {
      borderColor: "#3A8DFF"
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "15px"
    },
    checkbox: {
      marginRight: "10px",
      width: "18px",
      height: "18px"
    },
    checkboxLabel: {
      fontSize: isMobile ? "14px" : "16px",
      color: "#444"
    },
    note: {
      fontSize: isMobile ? "12px" : "14px",
      color: "#666",
      fontStyle: "italic",
      marginTop: "5px"
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
      gap: "20px"
    },
    signatureGroup: {
      flex: 1
    },
    actionButtons: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginTop: "30px"
    },
    button: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "500"
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
      padding: "8px 15px",
      cursor: "pointer",
      fontSize: isMobile ? "14px" : "16px",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginTop: "10px"
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
      alignItems: "center"
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
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "8px",
      width: isMobile ? "90%" : "600px",
      maxWidth: "90%"
    },
    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px"
    },
    modalTitle: {
      fontSize: "18px",
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
      height: "200px",
      border: "2px solid #3A8DFF",
      borderRadius: "4px",
      cursor: "crosshair",
      backgroundColor: "white",
      touchAction: "none"
    },
    modalButtons: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px"
    },
    clearButton: {
      backgroundColor: "#F44336",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "8px 15px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500"
    },
    saveSignatureButton: {
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "8px 15px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500"
    },
    // Print styles
    "@media print": {
      header: {
        display: "none"
      },
      actionButtons: {
        display: "none"
      },
      formContainer: {
        boxShadow: "none",
        padding: "20px"
      }
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
      
      <div style={styles.formContainer}>
        <h1 style={styles.formTitle}>BANK DETAILS FORM</h1>
        
        <div style={styles.importantNote}>
          <p style={styles.importantText}>
            Essential Information: The following information should be provided at your earliest possible convenience. It is essential to enable ourselves to setup your personal/pay files on our systems.
          </p>
        </div>
        
        <h3 style={styles.sectionTitle}>1. Bank Details</h3>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>ACCOUNT HOLDER'S NAME (IN CAPITALS)</label>
          <input
            type="text"
            name="accountHolderName"
            value={formData.accountHolderName}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter your full name in capitals"
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>BANK / BUILDING SOCIETY NAME</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter bank or building society name"
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>SORT CODE</label>
          <input
            type="text"
            name="sortCode"
            value={formData.sortCode}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter sort code (e.g., 12-34-56)"
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>ACCOUNT NUMBER</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter account number"
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>BUILDING SOCIETY ROLL NUMBER – FOR SAVINGS ACCOUNTS ONLY</label>
          <input
            type="text"
            name="buildingSocietyRollNumber"
            value={formData.buildingSocietyRollNumber}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter building society roll number (if applicable)"
          />
          <p style={styles.note}>This field is only required for building society savings accounts</p>
        </div>
        
        <h3 style={styles.sectionTitle}>2. Payment of wages into another person's account</h3>
        
        <div style={styles.checkboxContainer}>
          <input
            type="checkbox"
            name="paymentToAnotherAccount"
            checked={formData.paymentToAnotherAccount}
            onChange={handleChange}
            style={styles.checkbox}
          />
          <label style={styles.checkboxLabel}>
            Should you not have your own bank account and would like your wage paid into another person's account we need you to sign the declaration below stating you agree your wages can be paid into their account.
          </label>
        </div>
        
        {formData.paymentToAnotherAccount && (
          <div style={styles.formGroup}>
            <label style={styles.label}>Account Holder's Name:</label>
            <input
              type="text"
              name="anotherAccountName"
              value={formData.anotherAccountName}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter account holder's name"
            />
          </div>
        )}
        
        <h3 style={styles.sectionTitle}>3. Tax Details</h3>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Please provide parts 2 and 3 of any P45 supplied by your previous employer</label>
          <input
            type="text"
            name="taxDetails"
            value={formData.taxDetails}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter P45 details"
          />
          <p style={styles.note}>
            If you do not have a P45, please complete (on both sides) and return the enclosed P46 form. Students should complete and return the enclosed P38 form.
          </p>
        </div>
        
        <h3 style={styles.sectionTitle}>4. Authorization</h3>
        
        <div style={styles.checkboxContainer}>
          <input
            type="checkbox"
            name="authorization"
            checked={formData.authorization}
            onChange={handleChange}
            style={styles.checkbox}
          />
          <label style={styles.checkboxLabel}>
            I AUTHORISE MY WAGE TO BE PAID INTO THE ABOVE ACCOUNT
          </label>
        </div>
        
        <div style={styles.signatureSection}>
          <div style={styles.signatureRow}>
            <div style={styles.signatureGroup}>
              <label style={styles.label}>Print Name:</label>
              <input
                type="text"
                name="printName"
                value={formData.printName}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter your full name"
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
              <img src={signatureData} alt="Signature" style={{maxHeight: "70px"}} />
            </div>
          )}
        </div>
        
        <div style={styles.actionButtons}>
          <button style={{...styles.button, ...styles.saveButton}} onClick={handleSave}>
            <FaSave /> Save Bank Details
          </button>
          <button style={{...styles.button, ...styles.printButton}} onClick={handlePrint}>
            <FaPrint /> Print Form
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
              width={500}
              height={200}
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

export default BankDetailForm;