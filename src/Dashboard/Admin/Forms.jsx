import React, { useState, useMemo, useEffect } from "react";
import { FaFile, FaEdit, FaTrash, FaEye, FaFilePdf, FaTh, FaTable, FaFilter, FaTimes, FaBars, FaSave, FaWindowClose } from "react-icons/fa";
import jsPDF from 'jspdf';

const colors = {
  primary: "#3A8DFF",
  success: "#4CAF50",
  danger: "#F44336",
  white: "#FFFFFF",
  textDark: "#212121",
  textLight: "#757575",
  lightGray: "#E0E0E0",
  tabActive: "#1976D2",
  tabInactive: "#90CAF9",
};

const Forms = () => {
  const [activeTab, setActiveTab] = useState("forms"); // "forms" or "submitted"
  const [viewMode, setViewMode] = useState("card"); // "card" or "table"
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Filter states for submitted forms
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");
  const [submittedByFilter, setSubmittedByFilter] = useState("");

  // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  // Track window size for responsive design
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine device type
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;
  const isDesktop = windowWidth > 1024;

  const [formsList, setFormsList] = useState([
    { id: 1, name: "Employment Application", route: "/admin/forms/employment-application", type: "Input", version: "1.0" },
    { id: 2, name: "Character Reference", route: "/admin/forms/character-reference", type: "Input", version: "1.0" },
    { id: 3, name: "Health & Safety Handbook", route: "/admin/forms/health-and-safety-handbook", type: "Document", version: "2.0" },
    { id: 4, name: "Job Description", route: "/admin/forms/job-description", type: "Document", version: "1.0" },
    { id: 5, name: "Interview Scoring", route: "/admin/forms/interview-scoring", type: "Input", version: "1.0" },
    { id: 6, name: "Declaration of Health", route: "/admin/forms/declaration-of-health", type: "Input", version: "1.0" },
    { id: 7, name: "Induction Certificate 1", route: "/admin/forms/induction-certificate-1", type: "Document", version: "1.0" },
    { id: 8, name: "Induction Certificate 2", route: "/admin/forms/induction-certificate-2", type: "Document", version: "1.0" },
    { id: 9, name: "Medication Competency", route: "/admin/forms/medication-competency", type: "Input", version: "1.0" },
    { id: 10, name: "Review Form", route: "/admin/forms/review-form", type: "Input", version: "1.0" },
    { id: 11, name: "Zero Hour Contract", route: "/admin/forms/zero-hour-contract", type: "Document", version: "1.0" },
    { id: 12, name: "Information Sheet", route: "/admin/forms/information-sheet", type: "Document", version: "1.0" },
    { id: 13, name: "Spot Check Form", route: "/admin/forms/spot-check-form", type: "Input", version: "1.0" },
    { id: 14, name: "Supervision Form", route: "/admin/forms/supervision-form", type: "Input", version: "1.0" },
    { id: 15, name: "Telephone Monitoring", route: "/admin/forms/telephone-monitoring", type: "Input", version: "1.0" },
    { id: 16, name: "Appraisal Form", route: "/admin/forms/appraisal-form", type: "Input", version: "1.0" },
    { id: 17, name: "Application Form", route: "/admin/forms/application", type: "Input", version: "1.0" },
    { id: 18, name: "Medication Management", route: "/admin/forms/medication-management-form", type: "Input", version: "1.0" },
    { id: 19, name: "Care Worker Shadowing", route: "/admin/forms/care-worker-shadowing", type: "Input", version: "1.0" },
    { id: 20, name: "Care Plan", route: "/admin/forms/care-plan", type: "Input", version: "1.0" },
    { id: 21, name: "Training Matrix", route: "/admin/forms/training-matrix", type: "Input", version: "1.0" },
    { id: 22, name: "Client Profile", route: "/admin/forms/client-profile-form", type: "Input", version: "1.0" },
    { id: 23, name: "Unite Care Ltd", route: "/admin/forms/unite-care-ltd-form", type: "Input", version: "1.0" },
    { id: 24, name: "Induction Checklist", route: "/admin/forms/induction-checklist-form", type: "Input", version: "1.0" },
  ]);

  // Sample submitted forms data
  const [submittedForms, setSubmittedForms] = useState([
    { 
      id: 101, 
      name: "Employment Application", 
      formId: 1,
      submittedDate: "2023-06-15", 
      submittedBy: "John Doe",
      status: "Approved",
      type: "Input",
      version: "1.0",
      details: "This is a detailed description of employment application form. It includes personal information, employment history, and references.",
      formData: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        address: "123 Main St, Anytown, USA",
        previousEmployment: "ABC Company",
        references: "Jane Smith, Bob Johnson"
      }
    },
    { 
      id: 102, 
      name: "Character Reference", 
      formId: 2,
      submittedDate: "2023-06-18", 
      submittedBy: "Jane Smith",
      status: "Pending",
      type: "Input",
      version: "1.0",
      details: "This is a detailed description of character reference form. It includes personal information and character references.",
      formData: {
        applicantName: "Jane Smith",
        relationship: "Manager",
        yearsKnown: "5",
        characterTraits: "Reliable, hardworking, team player",
        recommendation: "Strongly recommend"
      }
    },
    { 
      id: 103, 
      name: "Health & Safety Handbook", 
      formId: 3,
      submittedDate: "2023-06-20", 
      submittedBy: "Robert Johnson",
      status: "Approved",
      type: "Document",
      version: "2.0",
      details: "This is a detailed description of health and safety handbook. It includes safety guidelines and procedures.",
      formData: {
        employeeName: "Robert Johnson",
        department: "Operations",
        handbookVersion: "2.0",
        acknowledgmentDate: "2023-06-20",
        emergencyContact: "Mary Johnson"
      }
    },
    { 
      id: 104, 
      name: "Interview Scoring", 
      formId: 5,
      submittedDate: "2023-06-22", 
      submittedBy: "Emily Davis",
      status: "Rejected",
      type: "Input",
      version: "1.0",
      details: "This is a detailed description of interview scoring form. It includes interview questions and scoring criteria.",
      formData: {
        candidateName: "Emily Davis",
        position: "Care Worker",
        interviewDate: "2023-06-22",
        interviewer: "John Smith",
        scores: {
          communication: 8,
          experience: 7,
          attitude: 9,
          skills: 6
        },
        totalScore: "30/40",
        recommendation: "Not suitable at this time"
      }
    },
    { 
      id: 105, 
      name: "Medication Competency", 
      formId: 9,
      submittedDate: "2023-06-25", 
      submittedBy: "Michael Wilson",
      status: "Pending",
      type: "Input",
      version: "1.0",
      details: "This is a detailed description of medication competency form. It includes medication knowledge and competency assessment.",
      formData: {
        employeeName: "Michael Wilson",
        trainingDate: "2023-06-10",
        assessor: "Dr. Sarah Johnson",
        competencyAreas: {
          medicationKnowledge: "Competent",
          dosageCalculation: "Competent",
          documentation: "Needs Improvement",
          sideEffects: "Competent"
        },
        overallAssessment: "Competent with minor areas for improvement"
      }
    },
  ]);

  // Filter submitted forms based on filter criteria
  const filteredSubmittedForms = useMemo(() => {
    return submittedForms.filter(form => {
      // Filter by status
      if (statusFilter !== "All" && form.status !== statusFilter) {
        return false;
      }
      
      // Filter by date range
      if (dateFromFilter && form.submittedDate < dateFromFilter) {
        return false;
      }
      if (dateToFilter && form.submittedDate > dateToFilter) {
        return false;
      }
      
      // Filter by submitted by
      if (submittedByFilter && !form.submittedBy.toLowerCase().includes(submittedByFilter.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [submittedForms, statusFilter, dateFromFilter, dateToFilter, submittedByFilter]);

  // Reset filters
  const resetFilters = () => {
    setStatusFilter("All");
    setDateFromFilter("");
    setDateToFilter("");
    setSubmittedByFilter("");
  };

  // Edit form 
  const handleEdit = (form) => {
    console.log("Navigating to edit:", form.route);
    // This still navigates to form editor for template forms
    window.location.href = form.route;
  };

  // Delete submitted form
  const handleDeleteSubmitted = (id) => {
    if (window.confirm("Are you sure you want to delete this submitted form?")) {
      setSubmittedForms(submittedForms.filter((form) => form.id !== id));
    }
  };

  // View submitted form - opens modal instead of navigating
  const handleViewSubmitted = (form) => {
    setSelectedForm(form);
    setShowViewModal(true);
  };

  // Edit submitted form - opens modal instead of navigating
  const handleEditSubmitted = (form) => {
    setSelectedForm(form);
    setEditFormData({...form.formData});
    setShowEditModal(true);
  };

  // Save edited form
  const handleSaveEdit = () => {
    // Update form data in submitted forms
    const updatedForms = submittedForms.map(form => 
      form.id === selectedForm.id 
        ? { ...form, formData: editFormData }
        : form
    );
    setSubmittedForms(updatedForms);
    setShowEditModal(false);
    setSelectedForm(null);
    
    // Show success message
    alert("Form updated successfully!");
  };

  // Export to PDF
  const handleExportPDF = (form) => {
    // Create a new PDF document
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text(form.name, 20, 20);
    
    // Add form details
    doc.setFontSize(12);
    doc.text(`Type: ${form.type}`, 20, 35);
    doc.text(`Version: ${form.version}`, 20, 45);
    doc.text(`Submitted Date: ${form.submittedDate}`, 20, 55);
    doc.text(`Submitted By: ${form.submittedBy}`, 20, 65);
    doc.text(`Status: ${form.status}`, 20, 75);
    
    // Add form data
    let yPos = 85;
    doc.text("Form Data:", 20, yPos);
    yPos += 10;
    
    Object.entries(form.formData).forEach(([key, value]) => {
      if (typeof value === 'object') {
        doc.text(`${key}:`, 20, yPos);
        yPos += 7;
        Object.entries(value).forEach(([subKey, subValue]) => {
          doc.text(`  ${subKey}: ${subValue}`, 25, yPos);
          yPos += 7;
        });
      } else {
        const text = `${key}: ${value}`;
        const splitText = doc.splitTextToSize(text, 170);
        doc.text(splitText, 20, yPos);
        yPos += splitText.length * 7;
      }
      
      // Add new page if needed
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
    });
    
    // Add footer
    doc.setFontSize(10);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 280);
    
    // Save the PDF
    doc.save(`${form.name.replace(/\s+/g, '_')}.pdf`);
  };

  // Responsive styles
  const styles = {
    container: { 
      padding: isMobile ? "10px" : isTablet ? "15px" : "20px", 
      fontFamily: "Segoe UI",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh"
    },
    header: { 
      color: colors.textDark,
      marginBottom: isMobile ? "10px" : "20px",
      fontSize: isMobile ? "22px" : isTablet ? "26px" : "28px",
      fontWeight: "600"
    },
    tabContainer: {
      display: "flex",
      marginBottom: isMobile ? "10px" : "20px",
      borderBottom: `1px solid ${colors.lightGray}`,
    },
    tab: {
      padding: isMobile ? "8px 12px" : "10px 20px",
      cursor: "pointer",
      fontWeight: "500",
      fontSize: isMobile ? "14px" : "16px",
      color: colors.textLight,
      borderBottom: "3px solid transparent",
      transition: "all 0.2s ease",
    },
    activeTab: {
      color: colors.tabActive,
      borderBottom: `3px solid ${colors.tabActive}`,
    },
    controlsContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: isMobile ? "10px" : "20px",
      flexWrap: "wrap",
      gap: "10px"
    },
    viewToggle: {
      display: "flex",
    },
    viewButton: {
      padding: isMobile ? "6px 10px" : "8px 12px",
      cursor: "pointer",
      border: `1px solid ${colors.lightGray}`,
      backgroundColor: colors.white,
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    activeViewButton: {
      backgroundColor: colors.primary,
      color: colors.white,
    },
    filterToggle: {
      display: "flex",
    },
    filterButton: {
      padding: isMobile ? "6px 10px" : "8px 12px",
      cursor: "pointer",
      border: `1px solid ${colors.lightGray}`,
      backgroundColor: colors.white,
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    activeFilterButton: {
      backgroundColor: colors.primary,
      color: colors.white,
    },
    mobileMenuButton: {
      display: isMobile ? "flex" : "none",
      padding: "8px 12px",
      cursor: "pointer",
      border: `1px solid ${colors.lightGray}`,
      backgroundColor: colors.white,
      alignItems: "center",
      gap: "5px",
    },
    mobileMenu: {
      display: isMobileMenuOpen ? "flex" : "none",
      flexDirection: "column",
      gap: "10px",
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: colors.white,
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    },
    filterContainer: {
      backgroundColor: colors.white,
      padding: isMobile ? "10px" : "15px",
      borderRadius: "8px",
      marginBottom: isMobile ? "10px" : "20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    },
    filterHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: isMobile ? "10px" : "15px",
    },
    filterTitle: {
      fontSize: isMobile ? "14px" : "16px",
      fontWeight: "600",
      color: colors.textDark,
    },
    filterClose: {
      cursor: "pointer",
      color: colors.textLight,
    },
    filterContent: {
      display: "flex",
      flexWrap: "wrap",
      gap: isMobile ? "10px" : "15px",
    },
    filterGroup: {
      flex: isMobile ? "1 1 100%" : "1 1 200px",
    },
    filterLabel: {
      display: "block",
      marginBottom: "5px",
      fontSize: isMobile ? "12px" : "14px",
      fontWeight: "500",
      color: colors.textDark,
    },
    filterInput: {
      width: "100%",
      padding: isMobile ? "6px 8px" : "8px 10px",
      border: `1px solid ${colors.lightGray}`,
      borderRadius: "4px",
      fontSize: isMobile ? "12px" : "14px",
    },
    filterSelect: {
      width: "100%",
      padding: isMobile ? "6px 8px" : "8px 10px",
      border: `1px solid ${colors.lightGray}`,
      borderRadius: "4px",
      fontSize: isMobile ? "12px" : "14px",
      backgroundColor: colors.white,
    },
    filterActions: {
      display: "flex",
      gap: "10px",
      marginTop: isMobile ? "10px" : "15px",
    },
    filterActionBtn: {
      padding: isMobile ? "6px 12px" : "8px 15px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: isMobile ? "12px" : "14px",
      fontWeight: "500",
      transition: "background-color 0.2s ease",
    },
    applyBtn: {
      backgroundColor: colors.primary,
      color: colors.white,
    },
    resetBtn: {
      backgroundColor: colors.lightGray,
      color: colors.textDark,
    },
    responsiveGrid: {
      display: "grid",
      gridTemplateColumns: isMobile 
        ? "1fr" 
        : isTablet 
          ? "repeat(2, 1fr)" 
          : "repeat(auto-fill, minmax(250px, 1fr))",
      gap: isMobile ? "10px" : "15px",
      marginTop: isMobile ? "10px" : "20px",
    },
    card: {
      background: "#fff",
      borderRadius: 8,
      padding: isMobile ? "15px" : "20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      height: "100%"
    },
    cardText: { 
      color: colors.textLight, 
      fontSize: isMobile ? "12px" : "14px", 
      margin: "4px 0" 
    },
    btn: {
      padding: isMobile ? "5px 6px" : "6px 8px",
      borderRadius: 4,
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 4,
      color: "#fff",
      fontSize: isMobile ? "10px" : "12px",
      border: "none",
      transition: "background-color 0.2s ease",
      fontWeight: "500"
    },
    cardTitle: {
      marginBottom: 8,
      color: colors.textDark,
      fontSize: isMobile ? "14px" : "16px",
      fontWeight: "600"
    },
    buttonContainer: {
      display: "flex", 
      gap: 6, 
      marginTop: 12,
      flexWrap: "wrap"
    },
    twoButtonContainer: {
      display: "flex", 
      gap: 6, 
      marginTop: 12,
    },
    statusBadge: {
      display: "inline-block",
      padding: "3px 8px",
      borderRadius: "4px",
      fontSize: isMobile ? "10px" : "12px",
      fontWeight: "500",
      marginTop: "4px",
    },
    approved: {
      backgroundColor: "#e8f5e9",
      color: "#2e7d32",
    },
    pending: {
      backgroundColor: "#fff8e1",
      color: "#f57f17",
    },
    rejected: {
      backgroundColor: "#ffebee",
      color: "#c62828",
    },
    tableContainer: {
      overflowX: "auto",
      marginTop: isMobile ? "10px" : "20px",
      backgroundColor: colors.white,
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: isMobile ? "600px" : "auto",
    },
    tableHeader: {
      backgroundColor: "#f5f5f5",
      borderBottom: `1px solid ${colors.lightGray}`,
    },
    tableHeaderCell: {
      padding: isMobile ? "8px 10px" : "12px 15px",
      textAlign: "left",
      fontWeight: "600",
      color: colors.textDark,
      fontSize: isMobile ? "12px" : "14px",
    },
    tableRow: {
      borderBottom: `1px solid ${colors.lightGray}`,
      "&:hover": {
        backgroundColor: "#f9f9f9",
      },
    },
    tableCell: {
      padding: isMobile ? "8px 10px" : "12px 15px",
      color: colors.textDark,
      fontSize: isMobile ? "12px" : "14px",
    },
    tableButtonContainer: {
      display: "flex",
      gap: "5px",
      flexWrap: "wrap",
    },
    twoButtonTableContainer: {
      display: "flex",
      gap: "5px",
    },
    tableButton: {
      padding: isMobile ? "5px 6px" : "6px 8px",
      borderRadius: 4,
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 4,
      color: "#fff",
      fontSize: isMobile ? "10px" : "12px",
      border: "none",
      transition: "background-color 0.2s ease",
    },
    // Fixed modal styles with higher z-index and smaller size
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
      zIndex: 99999,
    },
    modalContent: {
      backgroundColor: colors.white,
      borderRadius: "8px",
      width: isMobile ? "95%" : isTablet ? "70%" : "60%",
      maxWidth: isMobile ? "100%" : "700px",
      maxHeight: isMobile ? "80vh" : "75vh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    },
    modalHeader: {
      padding: isMobile ? "12px" : "15px",
      borderBottom: `1px solid ${colors.lightGray}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modalTitle: {
      margin: 0,
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: "600",
      color: colors.textDark,
    },
    modalCloseButton: {
      background: "none",
      border: "none",
      fontSize: isMobile ? "16px" : "18px",
      cursor: "pointer",
      color: colors.textLight,
      display: "flex",
      alignItems: "center",
    },
    modalBody: {
      padding: isMobile ? "12px" : "15px",
      overflowY: "auto",
      flex: 1,
    },
    modalFooter: {
      padding: isMobile ? "12px" : "15px",
      borderTop: `1px solid ${colors.lightGray}`,
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
    },
    modalButton: {
      padding: isMobile ? "6px 10px" : "8px 12px",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
      fontSize: isMobile ? "12px" : "14px",
      fontWeight: "500",
      transition: "background-color 0.2s ease",
    },
    primaryModalButton: {
      backgroundColor: colors.primary,
      color: colors.white,
    },
    secondaryModalButton: {
      backgroundColor: colors.lightGray,
      color: colors.textDark,
    },
    formGroup: {
      marginBottom: isMobile ? "12px" : "15px",
    },
    formLabel: {
      display: "block",
      marginBottom: "4px",
      fontSize: isMobile ? "12px" : "14px",
      fontWeight: "500",
      color: colors.textDark,
    },
    formInput: {
      width: "100%",
      padding: isMobile ? "6px 8px" : "8px 10px",
      border: `1px solid ${colors.lightGray}`,
      borderRadius: "4px",
      fontSize: isMobile ? "12px" : "14px",
    },
    formTextarea: {
      width: "100%",
      padding: isMobile ? "6px 8px" : "8px 10px",
      border: `1px solid ${colors.lightGray}`,
      borderRadius: "4px",
      fontSize: isMobile ? "12px" : "14px",
      minHeight: "80px",
      resize: "vertical",
    },
    // Fixed form data display styles
    formDataSection: {
      marginBottom: "20px",
    },
    formDataTitle: {
      fontSize: isMobile ? "14px" : "16px",
      fontWeight: "600",
      color: colors.textDark,
      marginBottom: "10px",
      borderBottom: `1px solid ${colors.lightGray}`,
      paddingBottom: "5px",
    },
    formDataItem: {
      marginBottom: isMobile ? "8px" : "10px",
    },
    formDataLabel: {
      fontWeight: "500",
      fontSize: isMobile ? "12px" : "14px",
      color: colors.textDark,
      marginBottom: "3px",
    },
    formDataValue: {
      fontSize: isMobile ? "12px" : "14px",
      color: colors.textLight,
      wordBreak: "break-word",
    },
    nestedDataContainer: {
      marginLeft: "15px",
      marginTop: "5px",
      backgroundColor: "#f9f9f9",
      padding: "8px",
      borderRadius: "4px",
    },
    nestedDataItem: {
      marginBottom: "5px",
    },
    nestedDataLabel: {
      fontWeight: "500",
      fontSize: isMobile ? "11px" : "13px",
      color: colors.textDark,
      display: "inline-block",
      width: "120px",
    },
    nestedDataValue: {
      fontSize: isMobile ? "11px" : "13px",
      color: colors.textLight,
      wordBreak: "break-word",
    },
    statusContainer: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
  };

  // Render card view for forms (without delete button)
  const renderFormsCardView = () => (
    <div style={styles.responsiveGrid}>
      {formsList.map((form) => (
        <div key={form.id} style={styles.card}>
          <h4 style={styles.cardTitle}>{form.name}</h4>
          <p style={styles.cardText}><b>Type:</b> {form.type}</p>
          <p style={styles.cardText}><b>Version:</b> {form.version}</p>

          <div style={styles.twoButtonContainer}>
            <button
              style={{ ...styles.btn, background: colors.primary, flex: 1 }}
              onClick={() => window.location.href = form.route}
              onMouseOver={(e) => e.target.style.backgroundColor = "#2979ff"}
              onMouseOut={(e) => e.target.style.backgroundColor = colors.primary}
            >
              <FaFile /> Open
            </button>

            <button
              style={{ ...styles.btn, background: colors.success, flex: 1 }}
              onClick={() => handleEdit(form)}
              onMouseOver={(e) => e.target.style.backgroundColor = "#43a047"}
              onMouseOut={(e) => e.target.style.backgroundColor = colors.success}
            >
              <FaEdit /> Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // Render table view for forms (without delete button)
  const renderFormsTableView = () => (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead style={styles.tableHeader}>
          <tr>
            <th style={styles.tableHeaderCell}>Form Name</th>
            <th style={styles.tableHeaderCell}>Type</th>
            <th style={styles.tableHeaderCell}>Version</th>
            <th style={styles.tableHeaderCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formsList.map((form) => (
            <tr key={form.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{form.name}</td>
              <td style={styles.tableCell}>{form.type}</td>
              <td style={styles.tableCell}>{form.version}</td>
              <td style={styles.tableCell}>
                <div style={styles.twoButtonTableContainer}>
                  <button
                    style={{ ...styles.tableButton, background: colors.primary }}
                    onClick={() => window.location.href = form.route}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#2979ff"}
                    onMouseOut={(e) => e.target.style.backgroundColor = colors.primary}
                  >
                    <FaFile />
                  </button>

                  <button
                    style={{ ...styles.tableButton, background: colors.success }}
                    onClick={() => handleEdit(form)}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#43a047"}
                    onMouseOut={(e) => e.target.style.backgroundColor = colors.success}
                  >
                    <FaEdit />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Render card view for submitted forms (with all buttons including delete)
  const renderSubmittedCardView = () => (
    <div style={styles.responsiveGrid}>
      {filteredSubmittedForms.map((form) => (
        <div key={form.id} style={styles.card}>
          <h4 style={styles.cardTitle}>{form.name}</h4>
          <p style={styles.cardText}><b>Type:</b> {form.type}</p>
          <p style={styles.cardText}><b>Version:</b> {form.version}</p>
          <p style={styles.cardText}><b>Submitted Date:</b> {form.submittedDate}</p>
          <p style={styles.cardText}><b>Submitted By:</b> {form.submittedBy}</p>
          <p style={styles.cardText}>
            <b>Status:</b> 
            <span style={{
              ...styles.statusBadge,
              ...(form.status === "Approved" ? styles.approved : 
                  form.status === "Pending" ? styles.pending : styles.rejected)
            }}>
              {form.status}
            </span>
          </p>

          <div style={styles.buttonContainer}>
            <button
              style={{ ...styles.btn, background: colors.primary }}
              onClick={() => handleViewSubmitted(form)}
              onMouseOver={(e) => e.target.style.backgroundColor = "#2979ff"}
              onMouseOut={(e) => e.target.style.backgroundColor = colors.primary}
            >
              <FaEye /> View
            </button>

            <button
              style={{ ...styles.btn, background: colors.success }}
              onClick={() => handleEditSubmitted(form)}
              onMouseOver={(e) => e.target.style.backgroundColor = "#43a047"}
              onMouseOut={(e) => e.target.style.backgroundColor = colors.success}
            >
              <FaEdit /> Edit
            </button>

            <button
              style={{ ...styles.btn, background: colors.danger }}
              onClick={() => handleDeleteSubmitted(form.id)}
              onMouseOver={(e) => e.target.style.backgroundColor = "#e53935"}
              onMouseOut={(e) => e.target.style.backgroundColor = colors.danger}
            >
              <FaTrash /> Delete
            </button>

            <button
              style={{ ...styles.btn, background: "#f44336" }}
              onClick={() => handleExportPDF(form)}
              onMouseOver={(e) => e.target.style.backgroundColor = "#d32f2f"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#f44336"}
            >
              <FaFilePdf /> PDF
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // Render table view for submitted forms (with all buttons including delete)
  const renderSubmittedTableView = () => (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead style={styles.tableHeader}>
          <tr>
            <th style={styles.tableHeaderCell}>Form Name</th>
            <th style={styles.tableHeaderCell}>Type</th>
            <th style={styles.tableHeaderCell}>Version</th>
            <th style={styles.tableHeaderCell}>Submitted Date</th>
            <th style={styles.tableHeaderCell}>Submitted By</th>
            <th style={styles.tableHeaderCell}>Status</th>
            <th style={styles.tableHeaderCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubmittedForms.map((form) => (
            <tr key={form.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{form.name}</td>
              <td style={styles.tableCell}>{form.type}</td>
              <td style={styles.tableCell}>{form.version}</td>
              <td style={styles.tableCell}>{form.submittedDate}</td>
              <td style={styles.tableCell}>{form.submittedBy}</td>
              <td style={styles.tableCell}>
                <span style={{
                  ...styles.statusBadge,
                  ...(form.status === "Approved" ? styles.approved : 
                      form.status === "Pending" ? styles.pending : styles.rejected)
                }}>
                  {form.status}
                </span>
              </td>
              <td style={styles.tableCell}>
                <div style={styles.tableButtonContainer}>
                  <button
                    style={{ ...styles.tableButton, background: colors.primary }}
                    onClick={() => handleViewSubmitted(form)}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#2979ff"}
                    onMouseOut={(e) => e.target.style.backgroundColor = colors.primary}
                  >
                    <FaEye />
                  </button>

                  <button
                    style={{ ...styles.tableButton, background: colors.success }}
                    onClick={() => handleEditSubmitted(form)}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#43a047"}
                    onMouseOut={(e) => e.target.style.backgroundColor = colors.success}
                  >
                    <FaEdit />
                  </button>

                  <button
                    style={{ ...styles.tableButton, background: colors.danger }}
                    onClick={() => handleDeleteSubmitted(form.id)}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#e53935"}
                    onMouseOut={(e) => e.target.style.backgroundColor = colors.danger}
                  >
                    <FaTrash />
                  </button>

                  <button
                    style={{ ...styles.tableButton, background: "#f44336" }}
                    onClick={() => handleExportPDF(form)}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#d32f2f"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#f44336"}
                  >
                    <FaFilePdf />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Render filter component
  const renderFilter = () => (
    <div style={styles.filterContainer}>
      <div style={styles.filterHeader}>
        <h3 style={styles.filterTitle}>Filter Submitted Forms</h3>
        <div style={styles.filterClose} onClick={() => setShowFilter(false)}>
          <FaTimes />
        </div>
      </div>
      <div style={styles.filterContent}>
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Status</label>
          <select 
            style={styles.filterSelect} 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>From Date</label>
          <input 
            type="date" 
            style={styles.filterInput} 
            value={dateFromFilter} 
            onChange={(e) => setDateFromFilter(e.target.value)}
          />
        </div>
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>To Date</label>
          <input 
            type="date" 
            style={styles.filterInput} 
            value={dateToFilter} 
            onChange={(e) => setDateToFilter(e.target.value)}
          />
        </div>
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Submitted By</label>
          <input 
            type="text" 
            style={styles.filterInput} 
            placeholder="Search by name"
            value={submittedByFilter} 
            onChange={(e) => setSubmittedByFilter(e.target.value)}
          />
        </div>
      </div>
      <div style={styles.filterActions}>
        <button 
          style={{ ...styles.filterActionBtn, ...styles.resetBtn }} 
          onClick={resetFilters}
        >
          Reset
        </button>
        <button 
          style={{ ...styles.filterActionBtn, ...styles.applyBtn }} 
          onClick={() => setShowFilter(false)}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );

  // Render view modal with fixed layout
  const renderViewModal = () => {
    if (!showViewModal || !selectedForm) return null;

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
          <div style={styles.modalHeader}>
            <h2 style={styles.modalTitle}>{selectedForm.name}</h2>
            <button 
              style={styles.modalCloseButton}
              onClick={() => {
                setShowViewModal(false);
                setSelectedForm(null);
              }}
            >
              <FaWindowClose />
            </button>
          </div>
          <div style={styles.modalBody}>
            {/* Form Information Section */}
            <div style={styles.formDataSection}>
              <h3 style={styles.formDataTitle}>Form Information</h3>
              
              <div style={styles.formDataItem}>
                <div style={styles.formDataLabel}>Form Type:</div>
                <div style={styles.formDataValue}>{selectedForm.type}</div>
              </div>
              
              <div style={styles.formDataItem}>
                <div style={styles.formDataLabel}>Version:</div>
                <div style={styles.formDataValue}>{selectedForm.version}</div>
              </div>
              
              <div style={styles.formDataItem}>
                <div style={styles.formDataLabel}>Submitted Date:</div>
                <div style={styles.formDataValue}>{selectedForm.submittedDate}</div>
              </div>
              
              <div style={styles.formDataItem}>
                <div style={styles.formDataLabel}>Submitted By:</div>
                <div style={styles.formDataValue}>{selectedForm.submittedBy}</div>
              </div>
              
              <div style={styles.formDataItem}>
                <div style={styles.formDataLabel}>Status:</div>
                <div style={styles.statusContainer}>
                  <span style={{
                    ...styles.statusBadge,
                    ...(selectedForm.status === "Approved" ? styles.approved : 
                        selectedForm.status === "Pending" ? styles.pending : styles.rejected)
                  }}>
                    {selectedForm.status}
                  </span>
                </div>
              </div>
              
              <div style={styles.formDataItem}>
                <div style={styles.formDataLabel}>Description:</div>
                <div style={styles.formDataValue}>{selectedForm.details}</div>
              </div>
            </div>
            
            {/* Form Data Section */}
            <div style={styles.formDataSection}>
              <h3 style={styles.formDataTitle}>Form Data</h3>
              
              {Object.entries(selectedForm.formData).map(([key, value]) => (
                <div key={key}>
                  {typeof value === 'object' ? (
                    <div style={styles.formDataItem}>
                      <div style={styles.formDataLabel}>{key}:</div>
                      <div style={styles.nestedDataContainer}>
                        {Object.entries(value).map(([subKey, subValue]) => (
                          <div key={subKey} style={styles.nestedDataItem}>
                            <div style={styles.nestedDataLabel}>{subKey}:</div>
                            <div style={styles.nestedDataValue}>{subValue}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div style={styles.formDataItem}>
                      <div style={styles.formDataLabel}>{key}:</div>
                      <div style={styles.formDataValue}>{value}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div style={styles.modalFooter}>
            <button 
              style={{...styles.modalButton, ...styles.primaryModalButton}}
              onClick={() => handleExportPDF(selectedForm)}
            >
              <FaFilePdf /> Export to PDF
            </button>
            <button 
              style={{...styles.modalButton, ...styles.secondaryModalButton}}
              onClick={() => {
                setShowViewModal(false);
                setSelectedForm(null);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render edit modal
  const renderEditModal = () => {
    if (!showEditModal || !selectedForm) return null;

    const handleInputChange = (key, value) => {
      setEditFormData(prev => ({
        ...prev,
        [key]: value
      }));
    };

    const handleNestedInputChange = (parentKey, childKey, value) => {
      setEditFormData(prev => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: value
        }
      }));
    };

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
          <div style={styles.modalHeader}>
            <h2 style={styles.modalTitle}>Edit {selectedForm.name}</h2>
            <button 
              style={styles.modalCloseButton}
              onClick={() => {
                setShowEditModal(false);
                setSelectedForm(null);
                setEditFormData({});
              }}
            >
              <FaWindowClose />
            </button>
          </div>
          <div style={styles.modalBody}>
            {Object.entries(editFormData).map(([key, value]) => (
              <div key={key} style={styles.formGroup}>
                {typeof value === 'object' ? (
                  <div>
                    <label style={styles.formLabel}>{key}:</label>
                    {Object.entries(value).map(([subKey, subValue]) => (
                      <div key={subKey} style={styles.formGroup}>
                        <label style={styles.formLabel}>{subKey}:</label>
                        <input 
                          type="text" 
                          style={styles.formInput}
                          value={subValue}
                          onChange={(e) => handleNestedInputChange(key, subKey, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <label style={styles.formLabel}>{key}:</label>
                    {typeof value === 'string' && value.length > 50 ? (
                      <textarea 
                        style={styles.formTextarea}
                        value={value}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                      />
                    ) : (
                      <input 
                        type="text" 
                        style={styles.formInput}
                        value={value}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={styles.modalFooter}>
            <button 
              style={{...styles.modalButton, ...styles.primaryModalButton}}
              onClick={handleSaveEdit}
            >
              <FaSave /> Save Changes
            </button>
            <button 
              style={{...styles.modalButton, ...styles.secondaryModalButton}}
              onClick={() => {
                setShowEditModal(false);
                setSelectedForm(null);
                setEditFormData({});
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Forms Management</h1>
      
      <div style={styles.tabContainer}>
        <div 
          style={{ 
            ...styles.tab, 
            ...(activeTab === "forms" ? styles.activeTab : {}) 
          }}
          onClick={() => setActiveTab("forms")}
        >
          Forms Dashboard
        </div>
        <div 
          style={{ 
            ...styles.tab, 
            ...(activeTab === "submitted" ? styles.activeTab : {}) 
          }}
          onClick={() => setActiveTab("submitted")}
        >
          Submitted Forms
        </div>
      </div>

      <div style={styles.controlsContainer}>
        <div style={styles.viewToggle}>
          <button 
            style={{
              ...styles.viewButton,
              ...(viewMode === "card" ? styles.activeViewButton : {})
            }}
            onClick={() => setViewMode("card")}
          >
            <FaTh /> Card View
          </button>
          <button 
            style={{
              ...styles.viewButton,
              ...(viewMode === "table" ? styles.activeViewButton : {})
            }}
            onClick={() => setViewMode("table")}
          >
            <FaTable /> Table View
          </button>
        </div>

        {activeTab === "submitted" && (
          <>
            {isMobile ? (
              <button 
                style={styles.mobileMenuButton}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <FaFilter /> Filters
              </button>
            ) : (
              <div style={styles.filterToggle}>
                <button 
                  style={{
                    ...styles.filterButton,
                    ...(showFilter ? styles.activeFilterButton : {})
                  }}
                  onClick={() => setShowFilter(!showFilter)}
                >
                  <FaFilter /> Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {isMobile && isMobileMenuOpen && (
        <div style={styles.mobileMenu}>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Status</label>
            <select 
              style={styles.filterSelect} 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>From Date</label>
            <input 
              type="date" 
              style={styles.filterInput} 
              value={dateFromFilter} 
              onChange={(e) => setDateFromFilter(e.target.value)}
            />
          </div>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>To Date</label>
            <input 
              type="date" 
              style={styles.filterInput} 
              value={dateToFilter} 
              onChange={(e) => setDateToFilter(e.target.value)}
            />
          </div>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Submitted By</label>
            <input 
              type="text" 
              style={styles.filterInput} 
              placeholder="Search by name"
              value={submittedByFilter} 
              onChange={(e) => setSubmittedByFilter(e.target.value)}
            />
          </div>
          <div style={styles.filterActions}>
            <button 
              style={{ ...styles.filterActionBtn, ...styles.resetBtn }} 
              onClick={resetFilters}
            >
              Reset
            </button>
            <button 
              style={{ ...styles.filterActionBtn, ...styles.applyBtn }} 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {!isMobile && activeTab === "submitted" && showFilter && renderFilter()}

      {activeTab === "forms" && viewMode === "card" && renderFormsCardView()}
      {activeTab === "forms" && viewMode === "table" && renderFormsTableView()}
      {activeTab === "submitted" && viewMode === "card" && renderSubmittedCardView()}
      {activeTab === "submitted" && viewMode === "table" && renderSubmittedTableView()}
      
      {/* Modals */}
      {renderViewModal()}
      {renderEditModal()}
    </div>
  );
};

export default Forms;