import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CharacterReferenceForm = () => {
  const navigate = useNavigate();
  const [isEditMode] = useState(true);

  const [formData, setFormData] = useState({
    forename: "",
    surname: "",
    title: "",
    refereeName: "",
    organisation: "",
    relationship: "",
    knownDuration: "",
    isHonest: "",
    honestDetails: "",
    additionalInfo: "",
    refereeFullName: "",
    signature: "",
    date: "",
    wordFile: null,
    manualForm: null,
    digitalSignature: null
  });

  const [errors, setErrors] = useState({
    digitalSignature: ""
  });

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // --- Digital Signature Logic ---

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
    event.preventDefault();
    const { x, y } = getCoordinates(event);
    const context = canvasRef.current.getContext('2d');
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (event) => {
    event.preventDefault();
    if (!isDrawing) return;

    const { x, y } = getCoordinates(event);
    const context = canvasRef.current.getContext('2d');
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      if (canvas) {
        const dataURL = canvas.toDataURL('image/png');
        setFormData(prev => ({ ...prev, digitalSignature: dataURL }));
        setErrors(prev => ({ ...prev, digitalSignature: "" }));
      }
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    setFormData(prev => ({ ...prev, digitalSignature: null }));
  };

  // --- End of Digital Signature Logic ---

  // Initialize canvas for digital signature
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    context.lineWidth = 2;
    context.lineCap = 'round';
    context.strokeStyle = '#000';
    
    // Set canvas size to match display size for better quality
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = 200;

    // Fill with white background
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Handle window resize
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const tempImage = context.getImageData(0, 0, canvas.width, canvas.height);
      
      canvas.width = rect.width;
      canvas.height = 200;
      
      context.putImageData(tempImage, 0, 0);
      context.lineWidth = 2;
      context.lineCap = 'round';
      context.strokeStyle = '#000';
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSave = () => {
    if (!formData.digitalSignature) {
      setErrors({ digitalSignature: "Digital signature is required." });
      alert("Please provide your digital signature to save the form.");
      return;
    }

    console.log("Form data saved:", formData);
    alert("Form saved successfully!");
    navigate("/admin/forms");
  };

  return (
    <div style={styles.container}>
      {/* Header with Logo and Back Button */}
      <div style={styles.header}>
        <button onClick={() => navigate("/admin/forms")} style={styles.backButton}>
          ← Back
        </button>
        <img src="https://unitecare.org/content/images/logo.png" alt="Unite Care Ltd Logo" style={styles.logo} />
      </div>

      <h2 style={styles.mainTitle}>Character Reference Form</h2>

      {/* Candidate Details */}
      <Section title="Candidate Details" />
      <div style={styles.row}>
        <Input label="Forename(s)" name="forename" value={formData.forename} onChange={handleChange} />
        <Input label="Surname(s)" name="surname" value={formData.surname} onChange={handleChange} />
      </div>
      <Input label="Title (e.g., Mr, Mrs)" name="title" value={formData.title} onChange={handleChange} />

      {/* Referee Details */}
      <Section title="Referee Details" />
      <Input label="Referee Name" name="refereeName" value={formData.refereeName} onChange={handleChange} />
      <Input label="Organisation" name="organisation" value={formData.organisation} onChange={handleChange} />

      {/* Character Details */}
      <Section title="Character Details" />
      <Textarea label="Relationship with Candidate" name="relationship" value={formData.relationship} onChange={handleChange} />
      <Input label="How long have you known the Candidate?" name="knownDuration" value={formData.knownDuration} onChange={handleChange} />
      
      <div style={styles.radioGroup}>
        <label style={styles.label}>Is the candidate honest & trustworthy?</label>
        <label style={styles.radioLabel}>
          <input type="radio" name="isHonest" value="yes" checked={formData.isHonest === "yes"} onChange={handleChange} /> Yes
        </label>
        <label style={styles.radioLabel}>
          <input type="radio" name="isHonest" value="no" checked={formData.isHonest === "no"} onChange={handleChange} /> No
        </label>
      </div>

      <Textarea label="If NO, provide additional details" name="honestDetails" value={formData.honestDetails} onChange={handleChange} />
      <Textarea label="Additional info (responsibilities, strengths, weaknesses etc.)" name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} />

      {/* Attachments Section - Optional */}
      <Section title="Attachments (Optional)" />
      <div style={styles.attachmentBox}>
        <p style={styles.optionalText}>Attachments are optional but recommended.</p>
        <div style={styles.grid}>
          <FileUpload label="Word Document" name="wordFile" file={formData.wordFile} onChange={handleFileChange} accept=".doc,.docx" />
          <FileUpload label="Manually Filled Form" name="manualForm" file={formData.manualForm} onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" />
        </div>
      </div>

      {/* Digital Signature Section */}
      <Section title="Referee Digital Signature" />
      <div style={styles.row}>
        <Input label="Referee Full Name" name="refereeFullName" value={formData.refereeFullName} onChange={handleChange} />
        <Input type="date" label="Date" name="date" value={formData.date} onChange={handleChange} />
      </div>

      <div style={styles.signatureContainer}>
        <label style={styles.label}>
          Digital Signature <span style={{ color: "red" }}>*</span>
        </label>
        <div style={styles.canvasWrapper}>
          <canvas
            ref={canvasRef}
            style={styles.signatureCanvas}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          <button type="button" onClick={clearSignature} style={styles.clearButton}>
            Clear
          </button>
        </div>
        {errors.digitalSignature && <p style={styles.errorText}>{errors.digitalSignature}</p>}
        <p style={styles.helperText}>Draw your signature in the box above with your finger or mouse.</p>
      </div>

      {/* Save Button */}
      <button onClick={handleSave} style={styles.saveButton}>
        Save Form
      </button>
    </div>
  );
};

// --- Styles Object for better organization ---
const styles = {
  container: {
    width: "100%",
    margin: "20px auto",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  backButton: {
    background: "#3A8DFF",
    border: "none",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  logo: {
    height: "60px",
    width: "auto",
    maxWidth: "150px",
    objectFit: "contain",
  },
  mainTitle: {
    color: "#00264D",
    marginBottom: "25px",
    marginTop: "0",
    textAlign: "center",
    borderBottom: "2px solid #f0f0f0",
    paddingBottom: "15px",
  },
  row: {
    display: "flex",
    gap: "20px",
    marginBottom: "15px",
    flexWrap: "wrap",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  attachmentBox: {
    marginBottom: "20px",
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "6px",
    border: "1px solid #e9ecef",
  },
  optionalText: {
    color: "#6c757d",
    marginBottom: "15px",
    textAlign: "center",
  },
  signatureContainer: {
    marginBottom: "20px",
    width: "100%",
  },
  canvasWrapper: {
    border: "2px dashed #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    position: "relative",
    width: "100%",
    overflow: "hidden",
  },
  signatureCanvas: {
    display: "block",
    width: "100%",
    height: "200px",
    cursor: "crosshair",
    touchAction: "none",
  },
  clearButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    fontSize: "14px",
    cursor: "pointer",
  },
  saveButton: {
    background: "#00264D",
    color: "#fff",
    border: "none",
    padding: "15px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    width: "100%",
    fontSize: "18px",
    marginTop: "20px",
    transition: "background-color 0.3s",
  },
  label: { 
    display: "block", 
    fontWeight: 600, 
    marginBottom: 8, 
    color: "#333" 
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    boxSizing: "border-box",
    fontSize: "16px",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    boxSizing: "border-box",
    fontSize: "16px",
    minHeight: "100px",
    resize: "vertical",
  },
  radioGroup: {
    marginBottom: "15px",
  },
  radioLabel: {
    marginRight: 20,
    display: "inline-block",
    marginBottom: "5px",
  },
  errorText: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
  },
  helperText: {
    fontSize: "14px",
    color: "#6c757d",
    marginTop: "5px",
  }
};

// --- Reusable Components (using the styles object) ---
const Input = ({ label, type = "text", name, value, onChange }) => (
  <div style={{ flex: 1, minWidth: "200px" }}>
    <label style={styles.label}>{label}</label>
    <input type={type} style={styles.input} name={name} value={value} onChange={onChange} />
  </div>
);

const Textarea = ({ label, name, value, onChange }) => (
  <div style={{ width: "100%" }}>
    <label style={styles.label}>{label}</label>
    <textarea style={styles.textarea} name={name} value={value} onChange={onChange} />
  </div>
);

const FileUpload = ({ label, name, file, onChange, accept }) => (
  <div>
    <label style={styles.label}>{label}</label>
    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
      <input type="file" id={name} name={name} onChange={onChange} accept={accept} style={{ display: "none" }} />
      <label htmlFor={name} style={styles.backButton}>
        Choose File
      </label>
      <span style={{ marginLeft: "10px", fontSize: "14px" }}>
        {file ? file.name : "No file chosen"}
      </span>
    </div>
  </div>
);

const Section = ({ title }) => (
  <div style={styles.sectionHeader}>
    {title}
  </div>
);
// Add sectionHeader to styles object
styles.sectionHeader = {
  fontWeight: 700,
  margin: "30px 0 15px",
  color: "#00264D",
  fontSize: "20px",
  borderBottom: "2px solid #e9ecef",
  paddingBottom: "8px",
};

export default CharacterReferenceForm;