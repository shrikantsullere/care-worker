import React, { useState, useEffect } from "react";
import { 
  FaUserCheck, 
  FaSearch, 
  FaCheckCircle,
  FaExclamationTriangle
} from "react-icons/fa";

const Supervision = () => {
  const colors = {
    primary: "#3A8DFF",
    success: "#4CAF50",
    danger: "#F44336",
    warning: "#FF9800",
    textDark: "#212121",
    textLight: "#757575",
    lightGray: "#E0E0E0",
    white: "#FFFFFF",
    bgLight: "#F5F7FA",
  };

  // State for responsive design
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth > 768 && window.innerWidth <= 1024);
  const [selectedCarer, setSelectedCarer] = useState(null);
  const [supervisionSearchTerm, setSupervisionSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Update responsive state on window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const carers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Mike Johnson" },
  ];

  // Supervision Data
  const supervisionData = [
    { no: "Supervision 1", status: "complete", date: "28/01/2025", notes: "Initial supervision completed successfully" },
    { no: "Supervision 2", status: "complete", date: "25/07/2025", notes: "6-month review completed" },
    { no: "Supervision 3", status: "not_done", date: "--", notes: "Scheduled for January 2026" },
    { no: "Supervision 4", status: "not_done", date: "--", notes: "Scheduled for July 2026" },
    { no: "Supervision 5", status: "not_done", date: "--", notes: "Scheduled for January 2027" },
    { no: "Supervision 6", status: "not_done", date: "--", notes: "Scheduled for July 2027" },
    { no: "Supervision 7", status: "not_done", date: "--", notes: "Scheduled for January 2028" },
    { no: "Supervision 8", status: "not_done", date: "--", notes: "Scheduled for July 2028" }
  ];

  // Responsive styles
  const styles = {
    container: { 
      padding: isMobile ? "10px" : isTablet ? "12px 16px" : "14px 18px", 
      fontFamily: "Segoe UI",
      backgroundColor: colors.bgLight,
      minHeight: "100vh"
    },
    header: { 
      margin: 0, 
      color: colors.textDark, 
      fontWeight: 600, 
      fontSize: isMobile ? 22 : 26,
      marginBottom: isMobile ? 8 : 10
    },
    subheader: { 
      color: colors.textLight, 
      marginBottom: isMobile ? 12 : 14, 
      marginTop: 2, 
      fontSize: isMobile ? 13 : 14 
    },
    controlsBar: { 
      display: "flex", 
      justifyContent: "space-between", 
      gap: 10, 
      marginBottom: isMobile ? 10 : 12, 
      flexWrap: "wrap",
      alignItems: "center"
    },
    searchBox: { 
      display: "flex", 
      alignItems: "center", 
      border: `1px solid ${colors.lightGray}`, 
      borderRadius: 4, 
      padding: isMobile ? "8px 10px" : "6px 12px", 
      flex: 1, 
      minWidth: isMobile ? "100%" : 220,
      marginBottom: isMobile ? 10 : 0
    },
    searchInput: { 
      border: "none", 
      outline: "none", 
      marginLeft: 8, 
      width: "100%", 
      fontSize: isMobile ? 16 : 14
    },
    filterSelect: {
      padding: isMobile ? "8px 10px" : "6px 12px",
      borderRadius: 4,
      border: `1px solid ${colors.lightGray}`,
      fontSize: isMobile ? 14 : 13,
      minWidth: isMobile ? 120 : 140
    },
    sectionTitle: {
      fontSize: isMobile ? 18 : 20,
      fontWeight: 600,
      color: colors.textDark,
      marginBottom: 15,
      marginTop: 20,
      display: "flex",
      alignItems: "center",
      gap: 10
    },
    sectionCard: {
      background: colors.white,
      borderRadius: 8,
      padding: isMobile ? "15px" : "20px",
      marginBottom: 20,
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
    },
    tableWrapper: { 
      overflowX: "auto", 
      borderRadius: 6,
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
    },
    table: { 
      width: "100%", 
      borderCollapse: "collapse", 
      background: colors.white 
    },
    th: { 
      padding: isMobile ? "12px 8px" : "10px 8px", 
      borderBottom: `2px solid ${colors.lightGray}`, 
      color: colors.textDark, 
      fontWeight: 600, 
      fontSize: isMobile ? 13 : 13, 
      whiteSpace: "nowrap" 
    },
    td: { 
      padding: isMobile ? "12px 8px" : "9px 8px", 
      borderBottom: `1px solid ${colors.lightGray}`, 
      fontSize: isMobile ? 14 : 14 
    },
    statusIcon: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      fontSize: 14
    },
    carerSelector: {
      marginBottom: 20
    },
    carerSelectorLabel: {
      fontSize: 14,
      fontWeight: 500,
      marginBottom: 5,
      color: colors.textDark
    },
    select: { 
      width: "100%", 
      padding: isMobile ? "12px 10px" : "10px 12px", 
      borderRadius: 4, 
      border: `1px solid ${colors.lightGray}`, 
      fontSize: isMobile ? 16 : 14
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "complete":
        return <FaCheckCircle color={colors.success} />;
      case "not_done":
        return <FaExclamationTriangle color={colors.danger} />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case "complete":
        return "✔ Completed";
      case "not_done":
        return "✖ Not Done";
      default:
        return status;
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Supervision Dashboard</h1>
      <p style={styles.subheader}>Track and manage supervision sessions for carers.</p>

      <div style={styles.carerSelector}>
        <div style={styles.carerSelectorLabel}>Select Carer:</div>
        <select 
          style={styles.select}
          value={selectedCarer || ""}
          onChange={(e) => setSelectedCarer(e.target.value)}
        >
          <option value="">Choose a carer...</option>
          {carers.map(carer => (
            <option key={carer.id} value={carer.id}>{carer.name}</option>
          ))}
        </select>
      </div>

      {selectedCarer && (
        <>
          <div style={styles.controlsBar}>
            <div style={styles.searchBox}>
              <FaSearch size={isMobile ? 18 : 15} color={colors.textLight} />
              <input 
                style={styles.searchInput} 
                placeholder="Search supervisions..." 
                value={supervisionSearchTerm} 
                onChange={e => setSupervisionSearchTerm(e.target.value)} 
              />
            </div>
            <select 
              style={styles.filterSelect}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="complete">Completed</option>
              <option value="not_done">Not Done</option>
            </select>
          </div>

          <div style={styles.sectionTitle}>
            <FaUserCheck /> SUPERVISION DASHBOARD (Every 6 months)
          </div>
          
          <div style={styles.sectionCard}>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Supervision No</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {supervisionData.map((supervision, index) => (
                    <tr key={index}>
                      <td style={styles.td}>{supervision.no}</td>
                      <td style={styles.td}>
                        <span style={styles.statusIcon}>
                          {getStatusIcon(supervision.status)}
                          {getStatusText(supervision.status)}
                        </span>
                      </td>
                      <td style={styles.td}>{supervision.date}</td>
                      <td style={styles.td}>{supervision.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 15, padding: 10, backgroundColor: `${colors.primary}10`, borderRadius: 4 }}>
              <strong>Total:</strong> 8 supervisions per year
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Supervision;