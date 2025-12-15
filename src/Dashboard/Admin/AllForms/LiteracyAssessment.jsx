import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaSave, FaPrint, FaEdit, FaTimes, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const LiteracyAssessment = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureData, setSignatureData] = useState(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  
  const [personalDetails, setPersonalDetails] = useState({
    forename: "",
    surname: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    assessmentDay: "",
    assessmentMonth: "",
    assessmentYear: ""
  });
  
  const [formData, setFormData] = useState({
    answers: {
      q1a: "",
      q1b: "",
      q1c: "",
      q1d: "",
      q1e: "",
      q1f: "",
      q1g: "",
      q1h: "",
      q1i: "",
      q1j: "",
      q2: [],
      q3a: "",
      q3b: "",
      q3c: "",
      q3d: "",
      q3e: "",
      q4a: "",
      q4b: "",
      q4c: "",
      q5a: "",
      q5b: "",
      q5c: "",
      q5: []
    },
    printName: "",
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

  const handlePersonalDetailsChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('q2_') || name.startsWith('q5_')) {
      const question = name.startsWith('q2_') ? 'q2' : 'q5';
      const item = name.split('_')[1];
      
      setFormData(prev => ({
        ...prev,
        answers: {
          ...prev.answers,
          [question]: checked 
            ? [...prev.answers[question], item]
            : prev.answers[question].filter(i => i !== item)
        }
      }));
    } else if (name === 'printName' || name === 'date') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        answers: {
          ...prev.answers,
          [name]: value
        }
      }));
    }
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
    // Combine personal details with form data for saving
    const fullFormData = {
      ...personalDetails,
      ...formData
    };
    // Save form data logic here
    alert("Literacy Assessment saved successfully!");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Shared input field style for consistent border
  const inputFieldStyle = {
    border: "1px solid #9e9e9e",
    borderRadius: "4px",
    outline: "none",
    boxShadow: "none"
  };

  // Style for selected spelling option
  const selectedOptionStyle = {
    backgroundColor: "#e3f2fd",
    border: "1px solid #3A8DFF"
  };

  // Style for unselected spelling option
  const unselectedOptionStyle = {
    backgroundColor: "#fff",
    border: "1px solid #ddd"
  };

  const styles = {
    container: {
      padding: isMobile ? "5px" : "10px",
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
      marginBottom: "10px",
      position: "relative",
      flexWrap: isMobile ? "wrap" : "nowrap",
      padding: isMobile ? "5px" : "10px"
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
    examPaper: {
      // border: "1px solid #ddd",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      // backgroundColor: "#fff",
      padding: isMobile ? "10px" : "20px",
      margin: "0 auto",
      maxWidth: "100%"
    },
    examHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "15px",
      borderBottom: "1px solid #333",
      paddingBottom: "10px"
    },
    examTitle: {
      fontSize: isMobile ? "16px" : "20px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "10px"
    },
    examInfo: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "15px",
      fontSize: isMobile ? "12px" : "14px"
    },
    examInstructions: {
      backgroundColor: "#f9f9f9",
      border: "1px solid #ddd",
      borderRadius: "4px",
      padding: isMobile ? "10px" : "15px",
      marginBottom: "15px"
    },
    sectionTitle: {
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: "bold",
      margin: "15px 0 10px",
      color: "#333",
      borderBottom: "1px solid #333",
      paddingBottom: "5px"
    },
    questionGroup: {
      marginBottom: isMobile ? "15px" : "20px",
      padding: isMobile ? "10px" : "15px",
      backgroundColor: "#fff",
      borderRadius: "4px",
      border: "1px solid #ddd"
    },
    questionText: {
      fontSize: isMobile ? "12px" : "14px",
      color: "#333",
      marginBottom: "10px",
      fontWeight: "500"
    },
    optionContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: isMobile ? "5px" : "10px",
      marginBottom: "10px"
    },
    option: {
      display: "flex",
      alignItems: "center",
      marginRight: isMobile ? "0" : "10px",
      marginBottom: "5px",
      width: isMobile ? "100%" : "auto"
    },
    checkbox: {
      marginRight: "8px",
      width: "16px",
      height: "16px"
    },
    optionText: {
      fontSize: isMobile ? "12px" : "14px",
      color: "#333"
    },
    marks: {
      fontSize: isMobile ? "10px" : "12px",
      color: "#666",
      fontStyle: "italic",
      marginLeft: "5px"
    },
    sentenceInput: {
      width: "100%",
      padding: isMobile ? "8px 10px" : "8px 12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: isMobile ? "12px" : "14px",
      marginTop: "10px",
      boxSizing: "border-box"
    },
    actionButtons: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      marginTop: "20px",
      flexWrap: "wrap"
    },
    button: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: isMobile ? "8px 12px" : "10px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: isMobile ? "12px" : "14px",
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
    signatureSection: {
      display: "flex",
      flexDirection: "column",
      marginTop: "20px",
      padding: isMobile ? "10px" : "15px",
      backgroundColor: "#f9f9f9",
      borderRadius: "4px",
      border: "1px solid #ddd"
    },
    signatureRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "15px",
      gap: isMobile ? "10px" : "15px",
      flexDirection: isMobile ? "column" : "row"
    },
    signatureGroup: {
      flex: 1
    },
    signatureButton: {
      backgroundColor: "#3A8DFF",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: isMobile ? "8px 12px" : "8px 15px",
      cursor: "pointer",
      fontSize: isMobile ? "12px" : "14px",
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
      padding: isMobile ? "15px" : "20px",
      borderRadius: "8px",
      width: isMobile ? "95%" : "500px",
      maxWidth: "95%",
      maxHeight: isMobile ? "90vh" : "auto",
      overflowY: "auto"
    },
    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "15px"
    },
    modalTitle: {
      fontSize: isMobile ? "14px" : "16px",
      fontWeight: "bold",
      color: "#333"
    },
    modalCloseButton: {
      background: "none",
      border: "none",
      fontSize: "18px",
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
      marginTop: "15px",
      gap: "10px"
    },
    clearButton: {
      backgroundColor: "#F44336",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: isMobile ? "8px 12px" : "8px 15px",
      cursor: "pointer",
      fontSize: isMobile ? "12px" : "14px",
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
      fontSize: isMobile ? "12px" : "14px",
      fontWeight: "500",
      flex: 1
    },
    // Spelling question specific styles
    spellingOption: {
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
      padding: "8px",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "all 0.2s ease"
    },
    spellingOptionText: {
      marginLeft: "10px",
      fontSize: isMobile ? "12px" : "14px"
    },
    // Bootstrap overrides for better mobile experience
    formControl: {
      fontSize: isMobile ? "14px" : "16px",
      padding: isMobile ? "8px 12px" : "10px 15px"
    },
    formLabel: {
      fontSize: isMobile ? "14px" : "16px",
      marginBottom: "5px",
      fontWeight: "500"
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
      
      <div style={styles.examPaper}>
        <div style={styles.examHeader}>
          <div style={{fontSize: isMobile ? "12px" : "14px"}}>UNITE CARE</div>
          <div style={{fontSize: isMobile ? "12px" : "14px"}}>LITERACY ASSESSMENT</div>
        </div>
        
        <div style={styles.examInfo}>
          <div>Time Allowed: 20 minutes</div>
          <div>Total Marks: 25</div>
        </div>
        
        <div style={styles.examInstructions}>
          <h3 style={{fontSize: isMobile ? "14px" : "16px", marginBottom: "10px"}}>Instructions</h3>
          <ol style={{paddingLeft: "20px", marginBottom: "5px"}}>
            <li style={{fontSize: isMobile ? "12px" : "14px", color: "#444", marginBottom: "5px", lineHeight: "1.4"}}>Read all questions carefully.</li>
            <li style={{fontSize: isMobile ? "12px" : "14px", color: "#444", marginBottom: "5px", lineHeight: "1.4"}}>Answer all questions.</li>
            <li style={{fontSize: isMobile ? "12px" : "14px", color: "#444", marginBottom: "5px", lineHeight: "1.4"}}>Use the marks at the right-hand side to determine how many answers are required for each question.</li>
            <li style={{fontSize: isMobile ? "12px" : "14px", color: "#444", marginBottom: "5px", lineHeight: "1.4"}}>Before leaving the room, you must give this question-answer booklet to a member of staff.</li>
            <li style={{fontSize: isMobile ? "12px" : "14px", color: "#444", marginBottom: "5px", lineHeight: "1.4"}}>Use a blue or black ink pen to answer all questions.</li>
            <li style={{fontSize: isMobile ? "12px" : "14px", color: "#444", marginBottom: "5px", lineHeight: "1.4"}}>RELAX AND GOOD LUCK!</li>
          </ol>
        </div>
        
        {/* Personal Details Section */}
        <div className="row mb-4">
          <div className="col-12">
            <h3 className="h4 mb-3">Personal Details</h3>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="forename" className="form-label">Forename(s)</label>
            <input
              type="text"
              className="form-control"
              id="forename"
              name="forename"
              value={personalDetails.forename}
              onChange={handlePersonalDetailsChange}
              required
              style={{...styles.formControl, ...inputFieldStyle}}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="surname" className="form-label">Surname</label>
            <input
              type="text"
              className="form-control"
              id="surname"
              name="surname"
              value={personalDetails.surname}
              onChange={handlePersonalDetailsChange}
              required
              style={{...styles.formControl, ...inputFieldStyle}}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Date of Birth</label>
            <div className="row g-2">
              <div className="col-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Day"
                  name="dobDay"
                  value={personalDetails.dobDay}
                  onChange={handlePersonalDetailsChange}
                  required
                  style={{...styles.formControl, ...inputFieldStyle}}
                />
              </div>
              <div className="col-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Month"
                  name="dobMonth"
                  value={personalDetails.dobMonth}
                  onChange={handlePersonalDetailsChange}
                  required
                  style={{...styles.formControl, ...inputFieldStyle}}
                />
              </div>
              <div className="col-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Year"
                  name="dobYear"
                  value={personalDetails.dobYear}
                  onChange={handlePersonalDetailsChange}
                  required
                  style={{...styles.formControl, ...inputFieldStyle}}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Date of Assessment</label>
            <div className="row g-2">
              <div className="col-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Day"
                  name="assessmentDay"
                  value={personalDetails.assessmentDay}
                  onChange={handlePersonalDetailsChange}
                  required
                  style={{...styles.formControl, ...inputFieldStyle}}
                />
              </div>
              <div className="col-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Month"
                  name="assessmentMonth"
                  value={personalDetails.assessmentMonth}
                  onChange={handlePersonalDetailsChange}
                  required
                  style={{...styles.formControl, ...inputFieldStyle}}
                />
              </div>
              <div className="col-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Year"
                  name="assessmentYear"
                  value={personalDetails.assessmentYear}
                  onChange={handlePersonalDetailsChange}
                  required
                  style={{...styles.formControl, ...inputFieldStyle}}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div style={styles.examSection}>
          <h2 style={styles.sectionTitle}>Part 1: Spelling, Punctuation and Grammar</h2>
          
          {/* Question 1 - Spelling */}
<div className="card mb-4">
                <div className="card-header bg-light">
                  <h5 className="mb-0">1. For each question, circle or underline the correct spelling: <span className="text-muted">(10)</span></h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    {[
                      { key: 'a', options: ['Accomodate', 'Accommodate'] },
                      { key: 'b', options: ['Business', 'Buisness'] },
                      { key: 'c', options: ['Collegue', 'Colleague'] },
                      { key: 'd', options: ['Definately', 'Definitely'] },
                      { key: 'e', options: ['Familiar', 'Familar'] },
                      { key: 'f', options: ['Friend', 'Freind'] },
                      { key: 'g', options: ['Independent', 'Independant'] },
                      { key: 'h', options: ['Occasion', 'Ocassion'] },
                      { key: 'i', options: ['Peice', 'Piece'] },
                      { key: 'j', options: ['Rember', 'Remember'] }
                    ].map(({ key, options }) => (
                      <div key={key} className="col-md-6 mb-2">
                        <div className="d-flex align-items-center">
                          <span className="me-2">{key})</span>
                          <div className="form-check me-2">
                            <input 
                              className="form-check-input" 
                              type="radio" 
                              name={`q1_${key}`} 
                              id={`q1_${key}_1`}
                              value={options[0]} 
                              onChange={handleChange} 
                            />
                            <label className="form-check-label" htmlFor={`q1_${key}_1`}>
                              {options[0]}
                            </label>
                          </div>
                          <div className="form-check">
                            <input 
                              className="form-check-input" 
                              type="radio" 
                              name={`q1_${key}`} 
                              id={`q1_${key}_2`}
                              value={options[1]} 
                              onChange={handleChange} 
                            />
                            <label className="form-check-label" htmlFor={`q1_${key}_2`}>
                              {options[1]}
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
          
          {/* Question 2 - Capital Letters */}
          <div style={styles.questionGroup}>
            <p style={styles.questionText}>
              <span style={{fontWeight: "bold", marginRight: "5px"}}>2.</span> There are nine words below which should start with capital letters. Identify these words in the passage below. Underline or circle the answer you think is correct.
              <span style={styles.marks}>(9)</span>
            </p>
            
            <div className="row">
              <div className="col-md-6 col-lg-4 mb-3">
                <div 
                  style={{
                    ...styles.spellingOption,
                    ...(formData.answers.q2.includes("twenty-four") ? styles.spellingOptionSelected : {})
                  }}
                  onClick={() => {
                    if (formData.answers.q2.includes("twenty-four")) {
                      setFormData(prev => ({
                        ...prev,
                        answers: {
                          ...prev.answers,
                          q2: prev.answers.q2.filter(item => item !== "twenty-four")
                        }
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        answers: {
                          ...prev.answers,
                          q2: [...prev.answers.q2, "twenty-four"]
                        }
                      }));
                    }
                  }}
                >
                  <input 
                    type="checkbox" 
                    name="q2_twenty-four" 
                    checked={formData.answers.q2.includes("twenty-four")}
                    onChange={handleChange} 
                    style={styles.checkbox} 
                  />
                  <span style={styles.spellingOptionText}>a) twenty-four</span>
                </div>
              </div>
              
              <div className="col-md-6 col-lg-4 mb-3">
                <div 
                  style={{
                    ...styles.spellingOption,
                    ...(formData.answers.q2.includes("monaco") ? styles.spellingOptionSelected : {})
                  }}
                  onClick={() => {
                    if (formData.answers.q2.includes("monaco")) {
                      setFormData(prev => ({
                        ...prev,
                        answers: {
                          ...prev.answers,
                          q2: prev.answers.q2.filter(item => item !== "monaco")
                        }
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        answers: {
                          ...prev.answers,
                          q2: [...prev.answers.q2, "monaco"]
                        }
                      }));
                    }
                  }}
                >
                  <input 
                    type="checkbox" 
                    name="q2_monaco" 
                    checked={formData.answers.q2.includes("monaco")}
                    onChange={handleChange} 
                    style={styles.checkbox} 
                  />
                  <span style={styles.spellingOptionText}>b) monaco</span>
                </div>
              </div>
              
              <div className="col-md-6 col-lg-4 mb-3">
                <div 
                  style={{
                    ...styles.spellingOption,
                    ...(formData.answers.q2.includes("saturday") ? styles.spellingOptionSelected : {})
                  }}
                  onClick={() => {
                    if (formData.answers.q2.includes("saturday")) {
                      setFormData(prev => ({
                        ...prev,
                        answers: {
                          ...prev.answers,
                          q2: prev.answers.q2.filter(item => item !== "saturday")
                        }
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        answers: {
                          ...prev.answers,
                          q2: [...prev.answers.q2, "saturday"]
                        }
                      }));
                    }
                  }}
                >
                  <input 
                    type="checkbox" 
                    name="q2_saturday" 
                    checked={formData.answers.q2.includes("saturday")}
                    onChange={handleChange} 
                    style={styles.checkbox} 
                  />
                  <span style={styles.spellingOptionText}>c) saturday</span>
                </div>
              </div>
              
              <div className="col-md-6 col-lg-4 mb-3">
                <div 
                  style={{
                    ...styles.spellingOption,
                    ...(formData.answers.q2.includes("they") ? styles.spellingOptionSelected : {})
                  }}
                  onClick={() => {
                    if (formData.answers.q2.includes("they")) {
                      setFormData(prev => ({
                        ...prev,
                        answers: {
                          ...prev.answers,
                          q2: prev.answers.q2.filter(item => item !== "they")
                        }
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        answers: {
                          ...prev.answers,
                          q2: [...prev.answers.q2, "they"]
                        }
                      }));
                    }
                  }}
                >
                  <input 
                    type="checkbox" 
                    name="q2_they" 
                    checked={formData.answers.q2.includes("they")}
                    onChange={handleChange} 
                    style={styles.checkbox} 
                  />
                  <span style={styles.spellingOptionText}>d) they</span>
                </div>
              </div>
              
              <div className="col-md-6 col-lg-4 mb-3">
                <div 
                  style={{
                    ...styles.spellingOption,
                    ...(formData.answers.q2.includes("europe") ? styles.spellingOptionSelected : {})
                  }}
                  onClick={() => {
                    if (formData.answers.q2.includes("europe")) {
                      setFormData(prev => ({
                        ...prev,
                        answers: {
                          ...prev.answers,
                          q2: prev.answers.q2.filter(item => item !== "europe")
                        }
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        answers: {
                          ...prev.answers,
                          q2: [...prev.answers.q2, "europe"]
                        }
                      }));
                    }
                  }}
                >
                  <input 
                    type="checkbox" 
                    name="q2_europe" 
                    checked={formData.answers.q2.includes("europe")}
                    onChange={handleChange} 
                    style={styles.checkbox} 
                  />
                  <span style={styles.spellingOptionText}>e) europe</span>
                </div>
              </div>
              
              <div className="col-md-6 col-lg-4 mb-3">
                <div 
                  style={{
                    ...styles.spellingOption,
                    ...(formData.answers.q2.includes("paisley") ? styles.spellingOptionSelected : {})
                  }}
                  onClick={() => {
                    if (formData.answers.q2.includes("paisley")) {
                      setFormData(prev => ({
                        ...prev,
                        answers: {
                          ...prev.answers,
                          q2: prev.answers.q2.filter(item => item !== "paisley")
                        }
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        answers: {
                          ...prev.answers,
                          q2: [...prev.answers.q2, "paisley"]
                        }
                      }));
                    }
                  }}
                >
                  <input 
                    type="checkbox" 
                    name="q2_paisley" 
                    checked={formData.answers.q2.includes("paisley")}
                    onChange={handleChange} 
                    style={styles.checkbox} 
                  />
                  <span style={styles.spellingOptionText}>f) paisley</span>
                </div>
              </div>
              
              <div className="col-md-6 col-lg-4 mb-3">
                <div 
                  style={{
                    ...styles.spellingOption,
                    ...(formData.answers.q2.includes("crowds") ? styles.spellingOptionSelected : {})
                  }}
                  onClick={() => {
                    if (formData.answers.q2.includes("crowds")) {
                      setFormData(prev => ({
                        ...prev,
                        answers: {
                          ...prev.answers,
                          q2: prev.answers.q2.filter(item => item !== "crowds")
                        }
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        answers: {
                          ...prev.answers,
                          q2: [...prev.answers.q2, "crowds"]
                        }
                      }));
                    }
                  }}
                >
                  <input 
                    type="checkbox" 
                    name="q2_crowds" 
                    checked={formData.answers.q2.includes("crowds")}
                    onChange={handleChange} 
                    style={styles.checkbox} 
                  />
                  <span style={styles.spellingOptionText}>g) crowds</span>
                </div>
              </div>
              
              <div className="col-md-6 col-lg-4 mb-3">
                <div 
                  style={{
                    ...styles.spellingOption,
                    ...(formData.answers.q2.includes("triumph") ? styles.spellingOptionSelected : {})
                  }}
                  onClick={() => {
                    if (formData.answers.q2.includes("triumph")) {
                      setFormData(prev => ({
                        ...prev,
                        answers: {
                          ...prev.answers,
                          q2: prev.answers.q2.filter(item => item !== "triumph")
                        }
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        answers: {
                          ...prev.answers,
                          q2: [...prev.answers.q2, "triumph"]
                        }
                      }));
                    }
                  }}
                >
                  <input 
                    type="checkbox" 
                    name="q2_triumph" 
                    checked={formData.answers.q2.includes("triumph")}
                    onChange={handleChange} 
                    style={styles.checkbox} 
                  />
                  <span style={styles.spellingOptionText}>h) triumph</span>
                </div>
              </div>
              
              <div className="col-md-6 col-lg-4 mb-3">
                <div 
                  style={{
                    ...styles.spellingOption,
                    ...(formData.answers.q2.includes("renfrewshire") ? styles.spellingOptionSelected : {})
                  }}
                  onClick={() => {
                    if (formData.answers.q2.includes("renfrewshire")) {
                      setFormData(prev => ({
                        ...prev,
                        answers: {
                          ...prev.answers,
                          q2: prev.answers.q2.filter(item => item !== "renfrewshire")
                        }
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        answers: {
                          ...prev.answers,
                          q2: [...prev.answers.q2, "renfrewshire"]
                        }
                      }));
                    }
                  }}
                >
                  <input 
                    type="checkbox" 
                    name="q2_renfrewshire" 
                    checked={formData.answers.q2.includes("renfrewshire")}
                    onChange={handleChange} 
                    style={styles.checkbox} 
                  />
                  <span style={styles.spellingOptionText}>i) renfrewshire</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Question 3 - Punctuation */}
          <div style={styles.questionGroup}>
            <p style={styles.questionText}>
              <span style={{fontWeight: "bold", marginRight: "5px"}}>3.</span> Read the sentences below and add correct punctuation:
              <span style={styles.marks}>(5)</span>
            </p>
            
            <div className="row">
              <div className="col-12 mb-3">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      <span style={{fontWeight: "bold"}}>a)</span> What do you want for breakfast
                    </p>
                    <input
                      type="text"
                      className="form-control"
                      name="q3a"
                      value={formData.answers.q3a}
                      onChange={handleChange}
                      placeholder="Add punctuation"
                      style={{...styles.formControl, ...inputFieldStyle}}
                    />
                  </div>
                </div>
              </div>
              
              <div className="col-12 mb-3">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      <span style={{fontWeight: "bold"}}>b)</span> The taxi will be here in 10 minutes
                    </p>
                    <input
                      type="text"
                      className="form-control"
                      name="q3b"
                      value={formData.answers.q3b}
                      onChange={handleChange}
                      placeholder="Add punctuation"
                      style={{...styles.formControl, ...inputFieldStyle}}
                    />
                  </div>
                </div>
              </div>
              
              <div className="col-12 mb-3">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      <span style={{fontWeight: "bold"}}>c)</span> My phones better than Megans
                    </p>
                    <input
                      type="text"
                      className="form-control"
                      name="q3c"
                      value={formData.answers.q3c}
                      onChange={handleChange}
                      placeholder="Add punctuation"
                      style={{...styles.formControl, ...inputFieldStyle}}
                    />
                  </div>
                </div>
              </div>
              
              <div className="col-12 mb-3">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      <span style={{fontWeight: "bold"}}>d)</span> The boys howled punched kicked and screamed in frustration
                    </p>
                    <input
                      type="text"
                      className="form-control"
                      name="q3d"
                      value={formData.answers.q3d}
                      onChange={handleChange}
                      placeholder="Add punctuation"
                      style={{...styles.formControl, ...inputFieldStyle}}
                    />
                  </div>
                </div>
              </div>
              
              <div className="col-12 mb-3">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      <span style={{fontWeight: "bold"}}>e)</span> Youre wrong theyve left
                    </p>
                    <input
                      type="text"
                      className="form-control"
                      name="q3e"
                      value={formData.answers.q3e}
                      onChange={handleChange}
                      placeholder="Add punctuation"
                      style={{...styles.formControl, ...inputFieldStyle}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Question 4 - There/Their/They're */}
          <div style={styles.questionGroup}>
            <p style={styles.questionText}>
              <span style={{fontWeight: "bold", marginRight: "5px"}}>4.</span> Read the sentences below. Underline or circle the right word to use so that the sentence makes sense:
              <span style={styles.marks}>(3)</span>
            </p>
            
            <div className="row">
              <div className="col-12 mb-3">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      <span style={{fontWeight: "bold"}}>a)</span> Joe already left for work. Lisa is meeting them
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                      <div 
                        style={{
                          ...styles.spellingOption,
                          ...(formData.answers.q4a === "there" ? selectedOptionStyle : unselectedOptionStyle),
                          flex: 1,
                          minWidth: "100px"
                        }}
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          answers: {
                            ...prev.answers,
                            q4a: "there"
                          }
                        }))}
                      >
                        <input 
                          type="radio" 
                          name="q4a" 
                          value="there" 
                          checked={formData.answers.q4a === "there"}
                          onChange={handleChange} 
                          style={styles.checkbox} 
                        />
                        <span style={styles.spellingOptionText}>there</span>
                      </div>
                      
                      <div 
                        style={{
                          ...styles.spellingOption,
                          ...(formData.answers.q4a === "their" ? selectedOptionStyle : unselectedOptionStyle),
                          flex: 1,
                          minWidth: "100px"
                        }}
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          answers: {
                            ...prev.answers,
                            q4a: "their"
                          }
                        }))}
                      >
                        <input 
                          type="radio" 
                          name="q4a" 
                          value="their" 
                          checked={formData.answers.q4a === "their"}
                          onChange={handleChange} 
                          style={styles.checkbox} 
                        />
                        <span style={styles.spellingOptionText}>their</span>
                      </div>
                      
                      <div 
                        style={{
                          ...styles.spellingOption,
                          ...(formData.answers.q4a === "they're" ? selectedOptionStyle : unselectedOptionStyle),
                          flex: 1,
                          minWidth: "100px"
                        }}
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          answers: {
                            ...prev.answers,
                            q4a: "they're"
                          }
                        }))}
                      >
                        <input 
                          type="radio" 
                          name="q4a" 
                          value="they're" 
                          checked={formData.answers.q4a === "they're"}
                          onChange={handleChange} 
                          style={styles.checkbox} 
                        />
                        <span style={styles.spellingOptionText}>they're</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-12 mb-3">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      <span style={{fontWeight: "bold"}}>b)</span> _______ going back to school tomorrow
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                      <div 
                        style={{
                          ...styles.spellingOption,
                          ...(formData.answers.q4b === "There" ? selectedOptionStyle : unselectedOptionStyle),
                          flex: 1,
                          minWidth: "100px"
                        }}
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          answers: {
                            ...prev.answers,
                            q4b: "There"
                          }
                        }))}
                      >
                        <input 
                          type="radio" 
                          name="q4b" 
                          value="There" 
                          checked={formData.answers.q4b === "There"}
                          onChange={handleChange} 
                          style={styles.checkbox} 
                        />
                        <span style={styles.spellingOptionText}>There</span>
                      </div>
                      
                      <div 
                        style={{
                          ...styles.spellingOption,
                          ...(formData.answers.q4b === "Their" ? selectedOptionStyle : unselectedOptionStyle),
                          flex: 1,
                          minWidth: "100px"
                        }}
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          answers: {
                            ...prev.answers,
                            q4b: "Their"
                          }
                        }))}
                      >
                        <input 
                          type="radio" 
                          name="q4b" 
                          value="Their" 
                          checked={formData.answers.q4b === "Their"}
                          onChange={handleChange} 
                          style={styles.checkbox} 
                        />
                        <span style={styles.spellingOptionText}>Their</span>
                      </div>
                      
                      <div 
                        style={{
                          ...styles.spellingOption,
                          ...(formData.answers.q4b === "They're" ? selectedOptionStyle : unselectedOptionStyle),
                          flex: 1,
                          minWidth: "100px"
                        }}
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          answers: {
                            ...prev.answers,
                            q4b: "They're"
                          }
                        }))}
                      >
                        <input 
                          type="radio" 
                          name="q4b" 
                          value="They're" 
                          checked={formData.answers.q4b === "They're"}
                          onChange={handleChange} 
                          style={styles.checkbox} 
                        />
                        <span style={styles.spellingOptionText}>They're</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-12 mb-3">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      <span style={{fontWeight: "bold"}}>c)</span> The pupils did really well building _______ bridge
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                      <div 
                        style={{
                          ...styles.spellingOption,
                          ...(formData.answers.q4c === "there" ? selectedOptionStyle : unselectedOptionStyle),
                          flex: 1,
                          minWidth: "100px"
                        }}
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          answers: {
                            ...prev.answers,
                            q4c: "there"
                          }
                        }))}
                      >
                        <input 
                          type="radio" 
                          name="q4c" 
                          value="there" 
                          checked={formData.answers.q4c === "there"}
                          onChange={handleChange} 
                          style={styles.checkbox} 
                        />
                        <span style={styles.spellingOptionText}>there</span>
                      </div>
                      
                      <div 
                        style={{
                          ...styles.spellingOption,
                          ...(formData.answers.q4c === "their" ? selectedOptionStyle : unselectedOptionStyle),
                          flex: 1,
                          minWidth: "100px"
                        }}
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          answers: {
                            ...prev.answers,
                            q4c: "their"
                          }
                        }))}
                      >
                        <input 
                          type="radio" 
                          name="q4c" 
                          value="their" 
                          checked={formData.answers.q4c === "their"}
                          onChange={handleChange} 
                          style={styles.checkbox} 
                        />
                        <span style={styles.spellingOptionText}>their</span>
                      </div>
                      
                      <div 
                        style={{
                          ...styles.spellingOption,
                          ...(formData.answers.q4c === "they're" ? selectedOptionStyle : unselectedOptionStyle),
                          flex: 1,
                          minWidth: "100px"
                        }}
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          answers: {
                            ...prev.answers,
                            q4c: "they're"
                          }
                        }))}
                      >
                        <input 
                          type="radio" 
                          name="q4c" 
                          value="they're" 
                          checked={formData.answers.q4c === "they're"}
                          onChange={handleChange} 
                          style={styles.checkbox} 
                        />
                        <span style={styles.spellingOptionText}>they're</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Question 5 - Fill in the blanks */}
          <div style={styles.questionGroup}>
            <p style={styles.questionText}>
              <span style={{fontWeight: "bold", marginRight: "5px"}}>5.</span> Read the passage below and write their, there, or they're in the spaces so that the sentences are correct:
              <span style={styles.marks}>(3)</span>
            </p>
            
            <div className="row">
              <div className="col-12 mb-3">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      <span style={{fontWeight: "bold"}}>a)</span> Please stand over _______ with the other participants who are waiting for _______ turn.
                    </p>
                    <input
                      type="text"
                      className="form-control"
                      name="q5a"
                      value={formData.answers.q5a}
                      onChange={handleChange}
                      placeholder="Fill in the blank"
                      style={{...styles.formControl, ...inputFieldStyle}}
                    />
                  </div>
                </div>
              </div>
              
              <div className="col-12 mb-3">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      <span style={{fontWeight: "bold"}}>b)</span> I hope _______ will be no further setbacks.
                    </p>
                    <input
                      type="text"
                      className="form-control"
                      name="q5b"
                      value={formData.answers.q5b}
                      onChange={handleChange}
                      placeholder="Fill in the blank"
                      style={{...styles.formControl, ...inputFieldStyle}}
                    />
                  </div>
                </div>
              </div>
              
              <div className="col-12 mb-3">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      <span style={{fontWeight: "bold"}}>c)</span> They look so organised with matching boots and jackets and equipment but _______ beginning to appear bored and frustrated.
                    </p>
                    <input
                      type="text"
                      className="form-control"
                      name="q5c"
                      value={formData.answers.q5c}
                      onChange={handleChange}
                      placeholder="Fill in the blank"
                      style={{...styles.formControl, ...inputFieldStyle}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div style={styles.signatureSection}>
          <div style={styles.signatureRow}>
            <div style={styles.signatureGroup}>
              <label htmlFor="printName" className="form-label">Print Name:</label>
              <input
                type="text"
                className="form-control"
                id="printName"
                name="printName"
                value={formData.printName}
                onChange={handleChange}
                placeholder="Enter your full name"
                style={{...styles.formControl, ...inputFieldStyle}}
              />
            </div>
            <div style={styles.signatureGroup}>
              <label htmlFor="date" className="form-label">Date:</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={{...styles.formControl, ...inputFieldStyle}}
              />
            </div>
          </div>
          
          <label className="form-label">Digital Signature:</label>
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
            <FaSave /> Save Assessment
          </button>
          <button style={{...styles.button, ...styles.printButton}} onClick={handlePrint}>
            <FaPrint /> Print Assessment
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

export default LiteracyAssessment;