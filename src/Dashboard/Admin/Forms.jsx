// src/components/Forms.js
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaFile, FaEdit, FaTrash, FaEye, FaFilePdf, FaTh, FaTable, FaFilter, FaTimes } from "react-icons/fa";

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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("forms"); // "forms" or "submitted"
  const [viewMode, setViewMode] = useState("card"); // "card" or "table"
  
  // Filter states for submitted forms
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");
  const [submittedByFilter, setSubmittedByFilter] = useState("");

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
      version: "1.0"
    },
    { 
      id: 102, 
      name: "Character Reference", 
      formId: 2,
      submittedDate: "2023-06-18", 
      submittedBy: "Jane Smith",
      status: "Pending",
      type: "Input",
      version: "1.0"
    },
    { 
      id: 103, 
      name: "Health & Safety Handbook", 
      formId: 3,
      submittedDate: "2023-06-20", 
      submittedBy: "Robert Johnson",
      status: "Approved",
      type: "Document",
      version: "2.0"
    },
    { 
      id: 104, 
      name: "Interview Scoring", 
      formId: 5,
      submittedDate: "2023-06-22", 
      submittedBy: "Emily Davis",
      status: "Rejected",
      type: "Input",
      version: "1.0"
    },
    { 
      id: 105, 
      name: "Medication Competency", 
      formId: 9,
      submittedDate: "2023-06-25", 
      submittedBy: "Michael Wilson",
      status: "Pending",
      type: "Input",
      version: "1.0"
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
    navigate(form.route, { state: { editMode: true } });
  };

  // Delete submitted form
  const handleDeleteSubmitted = (id) => {
    if (window.confirm("Are you sure you want to delete this submitted form?")) {
      setSubmittedForms(submittedForms.filter((form) => form.id !== id));
    }
  };

  // Edit submitted form
  const handleEditSubmitted = (form) => {
    const originalForm = formsList.find(f => f.id === form.formId);
    if (originalForm) {
      console.log("Navigating to edit submitted form:", originalForm.route);
      navigate(originalForm.route, { 
        state: { 
          editMode: true, 
          submittedFormId: form.id 
        } 
      });
    }
  };

  // View submitted form
  const handleViewSubmitted = (form) => {
    const originalForm = formsList.find(f => f.id === form.formId);
    if (originalForm) {
      console.log("Navigating to view submitted form:", originalForm.route);
      navigate(originalForm.route, { 
        state: { 
          viewMode: true, 
          submittedFormId: form.id 
        } 
      });
    }
  };

  // Export to PDF
  const handleExportPDF = (form) => {
    // In a real application, this would generate and download a PDF
    // For now, we'll just show an alert
    alert(`Exporting ${form.name} (ID: ${form.id}) to PDF...`);
    console.log(`Exporting ${form.name} to PDF`);
    
    // In a real implementation, you might use a library like jsPDF or react-pdf
    // Example with jsPDF (would need to be installed):
    /*
    import jsPDF from 'jspdf';
    const doc = new jsPDF();
    doc.text(`Form: ${form.name}`, 10, 10);
    doc.text(`Submitted Date: ${form.submittedDate}`, 10, 20);
    doc.text(`Submitted By: ${form.submittedBy}`, 10, 30);
    doc.text(`Status: ${form.status}`, 10, 40);
    doc.save(`${form.name.replace(/\s+/g, '_')}.pdf`);
    */
  };

  const styles = {
    container: { 
      padding: "20px", 
      fontFamily: "Segoe UI",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh"
    },
    header: { 
      color: colors.textDark,
      marginBottom: "20px",
      fontSize: "28px",
      fontWeight: "600"
    },
    tabContainer: {
      display: "flex",
      marginBottom: "20px",
      borderBottom: `1px solid ${colors.lightGray}`,
    },
    tab: {
      padding: "10px 20px",
      cursor: "pointer",
      fontWeight: "500",
      fontSize: "16px",
      color: colors.textLight,
      borderBottom: "3px solid transparent",
      transition: "all 0.2s ease",
    },
    activeTab: {
      color: colors.tabActive,
      borderBottom: `3px solid ${colors.tabActive}`,
    },
    viewToggle: {
      display: "flex",
      marginLeft: "auto",
      marginBottom: "20px",
    },
    viewButton: {
      padding: "8px 12px",
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
      marginLeft: "10px",
      marginBottom: "20px",
    },
    filterButton: {
      padding: "8px 12px",
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
    filterContainer: {
      backgroundColor: colors.white,
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    },
    filterHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "15px",
    },
    filterTitle: {
      fontSize: "16px",
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
      gap: "15px",
    },
    filterGroup: {
      flex: "1 1 200px",
    },
    filterLabel: {
      display: "block",
      marginBottom: "5px",
      fontSize: "14px",
      fontWeight: "500",
      color: colors.textDark,
    },
    filterInput: {
      width: "100%",
      padding: "8px 10px",
      border: `1px solid ${colors.lightGray}`,
      borderRadius: "4px",
      fontSize: "14px",
    },
    filterSelect: {
      width: "100%",
      padding: "8px 10px",
      border: `1px solid ${colors.lightGray}`,
      borderRadius: "4px",
      fontSize: "14px",
      backgroundColor: colors.white,
    },
    filterActions: {
      display: "flex",
      gap: "10px",
      marginTop: "15px",
    },
    filterActionBtn: {
      padding: "8px 15px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
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
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "15px",
      marginTop: 20,
    },
    card: {
      background: "#fff",
      borderRadius: 8,
      padding: 20,
      boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      height: "100%"
    },
    cardText: { 
      color: colors.textLight, 
      fontSize: 14, 
      margin: "4px 0" 
    },
    btn: {
      padding: "6px 8px",
      borderRadius: 4,
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 4,
      color: "#fff",
      fontSize: 12,
      border: "none",
      transition: "background-color 0.2s ease",
      fontWeight: "500"
    },
    cardTitle: {
      marginBottom: 8,
      color: colors.textDark,
      fontSize: "16px",
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
      fontSize: "12px",
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
      marginTop: "20px",
      backgroundColor: colors.white,
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHeader: {
      backgroundColor: "#f5f5f5",
      borderBottom: `1px solid ${colors.lightGray}`,
    },
    tableHeaderCell: {
      padding: "12px 15px",
      textAlign: "left",
      fontWeight: "600",
      color: colors.textDark,
      fontSize: "14px",
    },
    tableRow: {
      borderBottom: `1px solid ${colors.lightGray}`,
      "&:hover": {
        backgroundColor: "#f9f9f9",
      },
    },
    tableCell: {
      padding: "12px 15px",
      color: colors.textDark,
      fontSize: "14px",
    },
    tableButtonContainer: {
      display: "flex",
      gap: "5px",
    },
    twoButtonTableContainer: {
      display: "flex",
      gap: "5px",
    },
    tableButton: {
      padding: "6px 8px",
      borderRadius: 4,
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 4,
      color: "#fff",
      fontSize: 12,
      border: "none",
      transition: "background-color 0.2s ease",
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
              onClick={() => navigate(form.route)}
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
                    onClick={() => navigate(form.route)}
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

  return (
    <div style={styles.container}>
      <h1 style={{ color: colors.textDark, fontSize: 26, marginBottom: 10 }}>Forms Management</h1>
      
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

      <div style={{ display: "flex", justifyContent: "space-between" }}>
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
      </div>

      {activeTab === "submitted" && showFilter && renderFilter()}

      {activeTab === "forms" && viewMode === "card" && renderFormsCardView()}
      {activeTab === "forms" && viewMode === "table" && renderFormsTableView()}
      {activeTab === "submitted" && viewMode === "card" && renderSubmittedCardView()}
      {activeTab === "submitted" && viewMode === "table" && renderSubmittedTableView()}
    </div>
  );
};

export default Forms;