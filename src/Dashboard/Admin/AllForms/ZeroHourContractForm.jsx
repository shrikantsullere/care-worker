import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ZeroHourContractForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employeeName: "",
    address: "",
    jobTitle: "Care Worker",
    startDate: "",
    probationPeriod: "3 Months",
    normalHours: "06:00 – 22:00 (Mon–Sun incl. bank holidays)",
    annualLeave: "5.6 weeks (pro-rata)",
    holidayPayHourly: false,
    holidayPayPercent: "12.7",
    hourlyRate: "14.00",
    noticePeriod: "1 calendar month",
    acceptTerms: false,

    // Policy confirmations
    sickPay: true,
    grievancePolicy: true,
    dutiesAccepted: true,
    conductAccepted: true,
    staffHandbookAccepted: true,
    disciplinaryAccepted: true,
    criminalNotification: false,

    // Employee signature
    employeeSignatureName: "",
    employeeSignatureDate: "",
    employeeSignature: null, // Changed to null for digital signature

    // Employer side
    authorizedBy: "",
    authorizedDesignation: "",
    authorizedDate: "",
    employerSignature: null // Added for employer digital signature
  });

  // Digital signature state for employee
  const employeeCanvasRef = useRef(null);
  const [isEmployeeDrawing, setIsEmployeeDrawing] = useState(false);

  // Digital signature state for employer
  const employerCanvasRef = useRef(null);
  const [isEmployerDrawing, setIsEmployerDrawing] = useState(false);

  // Initialize canvas for employee digital signature
  useEffect(() => {
    const employeeCanvas = employeeCanvasRef.current;
    if (!employeeCanvas) return;
    
    const employeeContext = employeeCanvas.getContext('2d');
    employeeContext.lineWidth = 2;
    employeeContext.lineCap = 'round';
    employeeContext.strokeStyle = '#000';
    
    // Set canvas size
    employeeCanvas.width = 600; // Higher resolution for a smoother line
    employeeCanvas.height = 200;

    // Fill with white background
    employeeContext.fillStyle = '#fff';
    employeeContext.fillRect(0, 0, employeeCanvas.width, employeeCanvas.height);
  }, []);

  // Initialize canvas for employer digital signature
  useEffect(() => {
    const employerCanvas = employerCanvasRef.current;
    if (!employerCanvas) return;
    
    const employerContext = employerCanvas.getContext('2d');
    employerContext.lineWidth = 2;
    employerContext.lineCap = 'round';
    employerContext.strokeStyle = '#000';
    
    // Set canvas size
    employerCanvas.width = 600; // Higher resolution for a smoother line
    employerCanvas.height = 200;

    // Fill with white background
    employerContext.fillStyle = '#fff';
    employerContext.fillRect(0, 0, employerCanvas.width, employerCanvas.height);
  }, []);

  // Function to get correct coordinates, accounting for canvas scaling
  const getCoordinates = (event, canvas) => {
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

  // Employee signature functions
  const startEmployeeDrawing = (event) => {
    event.preventDefault(); // Prevent scrolling on touch devices
    const { x, y } = getCoordinates(event, employeeCanvasRef.current);
    const context = employeeCanvasRef.current.getContext('2d');
    context.beginPath();
    context.moveTo(x, y);
    setIsEmployeeDrawing(true);
  };

  const drawEmployee = (event) => {
    event.preventDefault(); // Prevent scrolling on touch devices
    if (!isEmployeeDrawing) return;

    const { x, y } = getCoordinates(event, employeeCanvasRef.current);
    const context = employeeCanvasRef.current.getContext('2d');
    context.lineTo(x, y);
    context.stroke();
  };

  const stopEmployeeDrawing = () => {
    if (isEmployeeDrawing) {
      setIsEmployeeDrawing(false);
      // Save the canvas content as a data URL when drawing stops
      const canvas = employeeCanvasRef.current;
      if (canvas) {
        const dataURL = canvas.toDataURL('image/png');
        setFormData(prev => ({ ...prev, employeeSignature: dataURL }));
      }
    }
  };

  const clearEmployeeSignature = () => {
    const canvas = employeeCanvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Re-fill with white background after clearing
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    setFormData(prev => ({ ...prev, employeeSignature: null }));
  };

  // Employer signature functions
  const startEmployerDrawing = (event) => {
    event.preventDefault(); // Prevent scrolling on touch devices
    const { x, y } = getCoordinates(event, employerCanvasRef.current);
    const context = employerCanvasRef.current.getContext('2d');
    context.beginPath();
    context.moveTo(x, y);
    setIsEmployerDrawing(true);
  };

  const drawEmployer = (event) => {
    event.preventDefault(); // Prevent scrolling on touch devices
    if (!isEmployerDrawing) return;

    const { x, y } = getCoordinates(event, employerCanvasRef.current);
    const context = employerCanvasRef.current.getContext('2d');
    context.lineTo(x, y);
    context.stroke();
  };

  const stopEmployerDrawing = () => {
    if (isEmployerDrawing) {
      setIsEmployerDrawing(false);
      // Save the canvas content as a data URL when drawing stops
      const canvas = employerCanvasRef.current;
      if (canvas) {
        const dataURL = canvas.toDataURL('image/png');
        setFormData(prev => ({ ...prev, employerSignature: dataURL }));
      }
    }
  };

  const clearEmployerSignature = () => {
    const canvas = employerCanvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Re-fill with white background after clearing
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    setFormData(prev => ({ ...prev, employerSignature: null }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert("Please accept the employment terms before saving.");
      return;
    }
    
    // Validate digital signatures
    if (!formData.employeeSignature) {
      alert("Please provide your digital signature before saving.");
      return;
    }
    
    console.log("Zero Hour Contract saved:", formData);
    alert("Zero Hour Contract saved successfully!");
    navigate("/admin/forms");
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "white",
    marginTop: "4px",
    fontSize: "16px" // Larger font size for better mobile experience
  };

  const labelStyle = {
    fontWeight: 600,
    marginBottom: "4px",
    display: "block",
    fontSize: "16px" // Larger font size for better mobile experience
  };

  const sectionTitle = {
    fontWeight: 700,
    margin: "20px 0 10px",
    color: "#00264D",
    fontSize: "18px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "4px"
  };

  return (
    <div
      style={{
        maxWidth: "100%",
        margin: "0 auto",
        fontFamily: "Segoe UI",
        padding: "20px",
        backgroundColor: "#ffffffff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        position: "relative"
      }}
    >
      {/* Header with Back Button and Logo */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <button
          type="button"
          onClick={() => navigate("/admin/forms")}
          style={{
            backgroundColor: "#3A8DFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "8px 16px",
            fontSize: "14px",
            cursor: "pointer"
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
            objectFit: "contain"
          }}
        />
      </div>

      <h2 style={{ 
        color: "#00264D", 
        marginBottom: "20px", 
        textAlign: "center",
        fontSize: "24px"
      }}>
        ZERO HOUR CONTRACT
      </h2>

      <form onSubmit={handleSave}>
        {/* EMPLOYEE DETAILS */}
        <div style={sectionTitle}>Employee Information</div>

        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Name of Employee</label>
          <input
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Address</label>
          <textarea
            name="address"
            rows="2"
            value={formData.address}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Job title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Your employment will begin on</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* CONTRACT DETAILS */}
        <div style={sectionTitle}>Contract Terms</div>

        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Probation Period</label>
          <p style={{ 
            padding: "10px", 
            backgroundColor: "#f5f5f5", 
            borderRadius: "4px",
            border: "1px solid #ddd"
          }}>
            Continued employment will be subject to satisfactory completion of a {formData.probationPeriod} probationary period.
          </p>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Normal hours of work</label>
          <p style={{ 
            padding: "10px", 
            backgroundColor: "#f5f5f5", 
            borderRadius: "4px",
            border: "1px solid #ddd"
          }}>
            {formData.normalHours}
          </p>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Annual Leave</label>
          <p style={{ 
            padding: "10px", 
            backgroundColor: "#f5f5f5", 
            borderRadius: "4px",
            border: "1px solid #ddd"
          }}>
            You are entitled to {formData.annualLeave} of annual leave paid at full pay pro-rata. The year for calculation of annual leave entitlement runs from 1 April to 31 March. Leave entitlement in first year will be pro-rated according to start date.
          </p>
        </div>

        {/* Holiday Pay */}
        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Holiday Pay Option</label>
          <p style={{ 
            padding: "10px", 
            backgroundColor: "#f5f5f5", 
            borderRadius: "4px",
            border: "1px solid #ddd"
          }}>
            If you and Unite Care Ltd agree we may pay your holiday pay on an hourly basis.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
            <input
              type="checkbox"
              name="holidayPayHourly"
              checked={formData.holidayPayHourly}
              onChange={handleChange}
            />
            <label style={{ fontWeight: "normal" }}>Pay holiday on hourly basis at</label>
            <input
              type="number"
              name="holidayPayPercent"
              value={formData.holidayPayPercent}
              onChange={handleChange}
              style={{ width: "70px", padding: "6px" }}
            />
            <label style={{ fontWeight: "normal" }}>% of hourly rate</label>
          </div>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Remuneration</label>
          <p style={{ 
            padding: "10px", 
            backgroundColor: "#f5f5f5", 
            borderRadius: "4px",
            border: "1px solid #ddd"
          }}>
            Remuneration paid to Employee for services rendered by Employee as required by this Agreement will include a wage at rate of
          </p>
          <div style={{ display: "flex", alignItems: "center", marginTop: "10px", flexWrap: "wrap" }}>
            <span style={{ marginRight: "10px" }}>£</span>
            <input
              type="number"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
              style={{ width: "100px", padding: "6px" }}
            />
            <span style={{ marginLeft: "10px" }}>per hour (GBP)</span>
          </div>
          <p style={{ marginTop: "10px", fontStyle: "italic" }}>
            Rate will be increased subject RLW.
          </p>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Notice Period</label>
          <p style={{ 
            padding: "10px", 
            backgroundColor: "#f5f5f5", 
            borderRadius: "4px",
            border: "1px solid #ddd"
          }}>
            The notice period for termination of employment will be {formData.noticePeriod} from either employer or employee, unless under gross misconduct rules or Safeguarding issues.
          </p>
        </div>

        {/* POLICY CONFIRMATIONS */}
        <div style={sectionTitle}>Policies & Procedures</div>

        <div style={{ marginBottom: "15px" }}>
          <p style={{ 
            padding: "10px", 
            backgroundColor: "#f5f5f5", 
            borderRadius: "4px",
            border: "1px solid #ddd"
          }}>
            Sick pay will be payable according to sick pay policy in Staff Handbook supplied to you upon commencement of employment.
          </p>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginTop: "10px" }}>
            <input
              type="checkbox"
              name="sickPay"
              checked={formData.sickPay}
              onChange={handleChange}
              style={{ marginTop: "4px" }}
            />
            <label style={{ fontWeight: "normal" }}>I have read and understood Sick Pay policy</label>
          </div>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <p style={{ 
            padding: "10px", 
            backgroundColor: "#f5f5f5", 
            borderRadius: "4px",
            border: "1px solid #ddd"
          }}>
            If you have a grievance, you should report this following the grievance procedure in Staff Handbook.
          </p>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginTop: "10px" }}>
            <input
              type="checkbox"
              name="grievancePolicy"
              checked={formData.grievancePolicy}
              onChange={handleChange}
              style={{ marginTop: "4px" }}
            />
            <label style={{ fontWeight: "normal" }}>I have read and understood Grievance Procedure</label>
          </div>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <p style={{ 
            padding: "10px", 
            backgroundColor: "#f5f5f5", 
            borderRadius: "4px",
            border: "1px solid #ddd"
          }}>
            You will be required to undertake job as described in Job Description and specified in service users' care plans, in locations stated.
          </p>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginTop: "10px" }}>
            <input
              type="checkbox"
              name="dutiesAccepted"
              checked={formData.dutiesAccepted}
              onChange={handleChange}
              style={{ marginTop: "4px" }}
            />
            <label style={{ fontWeight: "normal" }}>I accept duties described in Job Description</label>
          </div>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <p style={{ 
            padding: "10px", 
            backgroundColor: "#f5f5f5", 
            borderRadius: "4px",
            border: "1px solid #ddd"
          }}>
            You will be required to comply with code of conduct and practice of General Social Care Council, Unite care ltd standards, Contractual compliance rules and Unite care ltd requirements.
          </p>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginTop: "10px" }}>
            <input
              type="checkbox"
              name="conductAccepted"
              checked={formData.conductAccepted}
              onChange={handleChange}
              style={{ marginTop: "4px" }}
            />
            <label style={{ fontWeight: "normal" }}>I accept Code of Conduct and practice requirements</label>
          </div>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <p style={{ 
            padding: "10px", 
            backgroundColor: "#f5f5f5", 
            borderRadius: "4px",
            border: "1px solid #ddd"
          }}>
            You will be required to comply with Staff Handbook. Failure to do so will be considered a disciplinary matter.
          </p>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginTop: "10px" }}>
            <input
              type="checkbox"
              name="staffHandbookAccepted"
              checked={formData.staffHandbookAccepted}
              onChange={handleChange}
              style={{ marginTop: "4px" }}
            />
            <label style={{ fontWeight: "normal" }}>I agree to comply with Staff Handbook</label>
          </div>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <p style={{ 
            padding: "10px", 
            backgroundColor: "#f5f5f5", 
            borderRadius: "4px",
            border: "1px solid #ddd"
          }}>
            The disciplinary rules and procedure in Staff Handbook describe what action will be taken if your performance or conduct does not meet required standards.
          </p>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginTop: "10px" }}>
            <input
              type="checkbox"
              name="disciplinaryAccepted"
              checked={formData.disciplinaryAccepted}
              onChange={handleChange}
              style={{ marginTop: "4px" }}
            />
            <label style={{ fontWeight: "normal" }}>I understand the Disciplinary Procedure</label>
          </div>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <p style={{ 
            padding: "10px", 
            backgroundColor: "#f5f5f5", 
            borderRadius: "4px",
            border: "1px solid #ddd"
          }}>
            You will be required to notify the agency immediately if you commit or are charged with a criminal offence, including a motoring offence, during your employment.
          </p>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginTop: "10px" }}>
            <input
              type="checkbox"
              name="criminalNotification"
              checked={formData.criminalNotification}
              onChange={handleChange}
              style={{ marginTop: "4px" }}
            />
            <label style={{ fontWeight: "normal" }}>I will notify Unite Care Ltd of any criminal conviction/charge</label>
          </div>
        </div>

        {/* ACCEPT TERMS */}
        <div style={sectionTitle}>Contract Acceptance</div>

        <div style={{ marginBottom: "15px" }}>
          <p style={{ 
            padding: "10px", 
            backgroundColor: "#f5f5f5", 
            borderRadius: "4px",
            border: "1px solid #ddd"
          }}>
            Please sign below to indicate your acceptance of these conditions and return this form to the office.
          </p>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginTop: "10px" }}>
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              style={{ marginTop: "4px" }}
            />
            <label style={{ fontWeight: "normal" }}>I accept the terms and conditions of employment offered to me.</label>
          </div>
        </div>

        {/* SIGNATURE SECTION */}
        <div style={sectionTitle}>Employee Signature</div>

        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Name: Please Print - Capitals</label>
          <input
            type="text"
            name="employeeSignatureName"
            value={formData.employeeSignatureName}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Digital Signature</label>
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
              ref={employeeCanvasRef}
              style={{
                display: "block",
                width: "100%",
                height: "200px",
                cursor: "crosshair",
                touchAction: "none", // Prevents touch scroll on the canvas
              }}
              onMouseDown={startEmployeeDrawing}
              onMouseMove={drawEmployee}
              onMouseUp={stopEmployeeDrawing}
              onMouseLeave={stopEmployeeDrawing}
              onTouchStart={startEmployeeDrawing}
              onTouchMove={drawEmployee}
              onTouchEnd={stopEmployeeDrawing}
            />
            <button
              type="button"
              onClick={clearEmployeeSignature}
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

        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Date</label>
          <input
            type="date"
            name="employeeSignatureDate"
            value={formData.employeeSignatureDate}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* EMPLOYER SIGN AREA */}
        <div style={sectionTitle}>Authorized by Unite Care Ltd</div>

        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Name</label>
          <input
            type="text"
            name="authorizedBy"
            value={formData.authorizedBy}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Designation</label>
          <input
            type="text"
            name="authorizedDesignation"
            value={formData.authorizedDesignation}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Digital Signature</label>
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
              ref={employerCanvasRef}
              style={{
                display: "block",
                width: "100%",
                height: "200px",
                cursor: "crosshair",
                touchAction: "none", // Prevents touch scroll on the canvas
              }}
              onMouseDown={startEmployerDrawing}
              onMouseMove={drawEmployer}
              onMouseUp={stopEmployerDrawing}
              onMouseLeave={stopEmployerDrawing}
              onTouchStart={startEmployerDrawing}
              onTouchMove={drawEmployer}
              onTouchEnd={stopEmployerDrawing}
            />
            <button
              type="button"
              onClick={clearEmployerSignature}
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

        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>Date</label>
          <input
            type="date"
            name="authorizedDate"
            value={formData.authorizedDate}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          style={{
            padding: "12px",
            width: "100%",
            backgroundColor: "#00264D",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "20px"
          }}
        >
          Save Contract
        </button>
      </form>
    </div>
  );
};

export default ZeroHourContractForm;