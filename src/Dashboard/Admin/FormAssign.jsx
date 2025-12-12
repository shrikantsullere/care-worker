import React, { useState, useEffect } from "react";
import { FaEye, FaTimes } from "react-icons/fa";

const AdminViewAssignedForms = () => {
  const colors = {
    primary: "#3A8DFF",
    success: "#4CAF50",
    danger: "#F44336",
    warning: "#FF9800",
    textDark: "#212121",
    textLight: "#757575",
    white: "#FFFFFF",
    lightGray: "#E0E0E0",
    overlay: "rgba(0, 0, 0, 0.45)",
    cardBackground: "#F9F9F9"
  };

  const [carers] = useState([
    {
      id: 1,
      name: "John Doe",
      assignedForms: [
        { formName: "Employment Application", status: "Completed" },
        { formName: "Incident Report", status: "In Progress" },
        { formName: "Daily Visit Log", status: "Completed" }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      assignedForms: [
        { formName: "H&S Handbook", status: "Not Started" },
        { formName: "Medication Record", status: "In Progress" }
      ]
    },
    {
      id: 3,
      name: "Mike Johnson",
      assignedForms: [
        { formName: "Job Description", status: "Completed" },
        { formName: "Training Acknowledgement", status: "Completed" },
        { formName: "Payroll Form", status: "In Progress" }
      ]
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCarer, setSelectedCarer] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openDetailsModal = (carer) => {
    setSelectedCarer(carer);
    setIsModalOpen(true);
  };
  const closeDetailsModal = () => setIsModalOpen(false);

  const statusStyle = (status) => ({
    Completed: { backgroundColor: `${colors.success}20`, color: colors.success, border: `1px solid ${colors.success}` },
    "In Progress": { backgroundColor: `${colors.warning}20`, color: colors.warning, border: `1px solid ${colors.warning}` },
    "Not Started": { backgroundColor: `${colors.danger}20`, color: colors.danger, border: `1px solid ${colors.danger}` }
  }[status]);

  const styles = {
    container: { 
      padding: isMobile ? "10px" : "14px 18px", 
      fontFamily: "Segoe UI" 
    },
    header: { 
      margin: 0, 
      color: colors.textDark, 
      fontWeight: 600, 
      fontSize: isMobile ? 20 : 22 
    },
    subheader: { 
      color: colors.textLight, 
      margin: "2px 0 12px", 
      fontSize: isMobile ? 13 : 14 
    },

    // Table styles (for desktop)
    tableWrapper: {
      overflowX: "auto",
      borderRadius: 6,
      border: `1px solid ${colors.lightGray}`,
      boxShadow: "0 1px 6px rgba(0,0,0,0.07)"
    },
    table: { 
      width: "100%", 
      minWidth: 500, 
      borderCollapse: "collapse", 
      backgroundColor: colors.white 
    },
    th: { 
      padding: "10px 12px", 
      textAlign: "left", 
      borderBottom: `1px solid ${colors.lightGray}`, 
      fontSize: 14, 
      fontWeight: 600 
    },
    td: { 
      padding: "10px 12px", 
      borderBottom: `1px solid ${colors.lightGray}`, 
      fontSize: 14 
    },

    // Card styles (for mobile)
    cardsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "16px"
    },
    card: {
      backgroundColor: colors.white,
      borderRadius: "8px",
      padding: "16px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      border: `1px solid ${colors.lightGray}`
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px"
    },
    cardTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: colors.textDark,
      margin: 0
    },
    cardSection: {
      marginBottom: "12px"
    },
    cardSectionTitle: {
      fontSize: "14px",
      fontWeight: "600",
      color: colors.textLight,
      marginBottom: "8px"
    },

    tagsWrap: { 
      display: "flex", 
      flexWrap: "wrap", 
      gap: "6px" 
    },
    tag: {
      padding: "3px 9px",
      borderRadius: 10,
      fontSize: 11,
      fontWeight: 600,
      display: "inline-block",
      whiteSpace: "nowrap"
    },

    actionButton: {
      padding: isMobile ? "8px 12px" : "6px 10px",
      fontSize: isMobile ? 14 : 13,
      backgroundColor: colors.primary,
      color: colors.white,
      borderRadius: 4,
      border: "none",
      display: "flex",
      alignItems: "center",
      gap: 6,
      cursor: "pointer"
    },

    modalOverlay: {
      position: "fixed", 
      inset: 0, 
      background: colors.overlay,
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      padding: 12, 
      zIndex: 2000
    },
    modalBox: {
      background: colors.white, 
      borderRadius: 8, 
      padding: isMobile ? 16 : 18,
      width: "100%", 
      maxWidth: 480, 
      maxHeight: "78vh", 
      overflowY: "auto", 
      position: "relative"
    },
    modalHeader: { 
      margin: 0, 
      marginBottom: 12, 
      fontSize: isMobile ? 16 : 18, 
      fontWeight: 600 
    },
    modalList: { 
      listStyle: "none", 
      margin: 0, 
      padding: 0 
    },
    modalItem: {
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center",
      padding: "9px 0", 
      borderBottom: `1px solid ${colors.lightGray}`, 
      fontSize: 14
    },
    closeBtn: {
      background: "none", 
      border: "none", 
      fontSize: 20, 
      color: colors.textLight,
      cursor: "pointer", 
      position: "absolute", 
      top: 10, 
      right: 12
    }
  };

  // Mobile card view
  const renderMobileView = () => (
    <div style={styles.cardsContainer}>
      {carers.map(carer => (
        <div key={carer.id} style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>{carer.name}</h3>
            <button 
              style={styles.actionButton} 
              onClick={() => openDetailsModal(carer)}
            >
              <FaEye /> View
            </button>
          </div>
          
          <div style={styles.cardSection}>
            <div style={styles.cardSectionTitle}>Assigned Forms</div>
            <div style={styles.tagsWrap}>
              {carer.assignedForms.map((form, i) => (
                <span key={i} style={{ ...styles.tag, ...statusStyle(form.status) }}>
                  {form.formName}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Desktop table view
  const renderDesktopView = () => (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Carer</th>
            <th style={styles.th}>Assigned Forms</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {carers.map(carer => (
            <tr key={carer.id}>
              <td style={styles.td}>{carer.name}</td>
              <td style={styles.td}>
                <div style={styles.tagsWrap}>
                  {carer.assignedForms.map((form, i) => (
                    <span key={i} style={{ ...styles.tag, ...statusStyle(form.status) }}>
                      {form.formName}
                    </span>
                  ))}
                </div>
              </td>
              <td style={styles.td}>
                <button style={styles.actionButton} onClick={() => openDetailsModal(carer)}>
                  <FaEye /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={styles.container}>
      <h1 style={{ color: colors.textDark, fontSize: 26, marginBottom: 10 }}>Assigned Forms Overview</h1>
      <p style={styles.subheader}>Track progress of forms assigned to carers</p>

      {/* Render different views based on screen size */}
      {isMobile ? renderMobileView() : renderDesktopView()}

      {/* Modal - same for both views */}
      {isModalOpen && selectedCarer && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <button style={styles.closeBtn} onClick={closeDetailsModal}>
              <FaTimes />
            </button>
            <h2 style={styles.modalHeader}>Forms – {selectedCarer.name}</h2>
            <ul style={styles.modalList}>
              {selectedCarer.assignedForms.map((form, i) => (
                <li key={i} style={styles.modalItem}>
                  <span>{form.formName}</span>
                  <span style={{ ...styles.tag, ...statusStyle(form.status) }}>
                    {form.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminViewAssignedForms;