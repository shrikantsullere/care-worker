import React, { useState, useEffect } from "react";
import { 
  FaFileAlt, 
  FaSearch, 
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle
} from "react-icons/fa";

const YearlyOverview = () => {
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
  const [yearlySearchTerm, setYearlySearchTerm] = useState("");
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

  // Documentation Grid Data
  const documentationGrid = {
    section1: [
      { name: "Application Form", status: "complete", date: "15/02/23" },
      { name: "2x Passport Size Photo", status: "pending", date: "--" },
      { name: "Interview Paperwork", status: "complete", date: "16/02/23" },
      { name: "Job Description", status: "complete", date: "16/02/23" },
      { name: "Bank Details Form", status: "complete", date: "17/02/23" },
      { name: "Receipt of Handbook", status: "complete", date: "18/02/23" },
      { name: "2 References", status: "pending", date: "--" },
      { name: "Character Reference", status: "complete", date: "20/02/23" }
    ],
    section2: [
      { name: "DBS/CRB", status: "complete", date: "10/03/23" },
      { name: "Proof of Address", status: "complete", date: "11/03/23" },
      { name: "NI Number", status: "complete", date: "11/03/23" },
      { name: "Passport", status: "complete", date: "12/03/23" },
      { name: "Visa", status: "pending", date: "--" },
      { name: "Right to Work", status: "complete", date: "13/03/23" }
    ],
    section3: [
      { name: "Induction", status: "complete", date: "16/05/23" },
      { name: "Job Offer", status: "complete", date: "15/05/23" },
      { name: "Contract", status: "complete", date: "16/05/23" },
      { name: "Staff Medical Declaration", status: "complete", date: "17/05/23" },
      { name: "Competency Assessment", status: "pending", date: "--" },
      { name: "48 hr Opt-out Agreement", status: "complete", date: "18/05/23" },
      { name: "Shadowing", status: "complete", date: "19/05/23" }
    ]
  };

  // Year Tasks Data
  const yearTasks = [
    { year: "2023", taskName: "DBS 1", status: "complete", date: "10/03/23", notes: "Standard DBS check completed" },
    { year: "2023", taskName: "Induction Training", status: "complete", date: "16/05/23", notes: "Full induction completed" },
    { year: "2024", taskName: "Appraisal 1", status: "complete", date: "10/01/24", notes: "First appraisal completed" },
    { year: "2024", taskName: "Refresher Training 1", status: "complete", date: "15/06/24", notes: "Annual refresher training" },
    { year: "2024", taskName: "Appraisal 3", status: "pending", date: "--", notes: "Scheduled for Q4 2024" },
    { year: "2024", taskName: "Refresher Training 3", status: "not_done", date: "--", notes: "Pending" }
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
      case "pending":
        return <FaClock color={colors.warning} />;
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
      case "pending":
        return "⏳ Pending";
      case "not_done":
        return "✖ Not Done";
      default:
        return status;
    }
  };

  const renderDocumentationTable = (title, documents) => (
    <div style={styles.sectionCard}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 15 }}>{title}</h3>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Document Name</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr key={index}>
                <td style={styles.td}>{doc.name}</td>
                <td style={styles.td}>
                  <span style={styles.statusIcon}>
                    {getStatusIcon(doc.status)}
                    {getStatusText(doc.status)}
                  </span>
                </td>
                <td style={styles.td}>{doc.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Yearly Overview</h1>
      <p style={styles.subheader}>Check all yearly compliance for a specific carer.</p>

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
                placeholder="Search documents..." 
                value={yearlySearchTerm} 
                onChange={e => setYearlySearchTerm(e.target.value)} 
              />
            </div>
            <select 
              style={styles.filterSelect}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="complete">Completed</option>
              <option value="pending">Pending</option>
              <option value="not_done">Not Done</option>
            </select>
          </div>

          <div style={styles.sectionTitle}>
            <FaFileAlt /> SECTION A — Documentation Grid
          </div>
          
          {renderDocumentationTable("Section 1 Items", documentationGrid.section1)}
          {renderDocumentationTable("Section 2 Items", documentationGrid.section2)}
          {renderDocumentationTable("Section 3 Items", documentationGrid.section3)}

          <div style={styles.sectionTitle}>
            <FaCalendarAlt /> SECTION B — YEAR TASKS TABLE
          </div>
          
          <div style={styles.sectionCard}>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Year</th>
                    <th style={styles.th}>Task Name</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {yearTasks.map((task, index) => (
                    <tr key={index}>
                      <td style={styles.td}>{task.year}</td>
                      <td style={styles.td}>{task.taskName}</td>
                      <td style={styles.td}>
                        <span style={styles.statusIcon}>
                          {getStatusIcon(task.status)}
                          {getStatusText(task.status)}
                        </span>
                      </td>
                      <td style={styles.td}>{task.date}</td>
                      <td style={styles.td}>{task.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default YearlyOverview;