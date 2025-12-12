import React, { useState, useEffect } from "react";
import { FaDownload, FaSearch, FaEye, FaTrash, FaTimes, FaFileAlt } from "react-icons/fa";

const colors = {
  primary: "#3A8DFF",
  danger: "#F44336",
  textDark: "#1E1E1E",
  textLight: "#757575",
  border: "#E6E6E6",
  bg: "#FFFFFF",
  bgLight: "#F5F7FA",
};

const Download = () => {
  // State for responsive design
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth > 768 && window.innerWidth <= 1024);
  
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

  const [search, setSearch] = useState("");
  const [previewData, setPreviewData] = useState(null);

  const [downloads, setDownloads] = useState([
    { id: 1, name: "Employment Application - Sarah Johnson", date: "10/01/2026", size: "1.2 MB", type: "PDF", file: "/sample/employment_application.pdf", assigned: "Sarah Johnson" },
    { id: 2, name: "Incident Report - Emma Wilson", date: "09/01/2026", size: "850 KB", type: "PDF", file: "/sample/incident_report.pdf", assigned: "Emma Wilson" },
    { id: 3, name: "Monthly Payroll Report - Dec", date: "01/01/2026", size: "2.3 MB", type: "PDF", file: "/sample/payroll_report_dec.pdf", assigned: "Payroll Department" },
    { id: 4, name: "Training Handbook", date: "28/12/2025", size: "4.1 MB", type: "PDF", file: "/sample/training_handbook.pdf", assigned: "All Staff" }
  ]);

  const filtered = downloads.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));

  const deleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      setDownloads(downloads.filter((d) => d.id !== id));
      setPreviewData(null);
    }
  };

  const downloadFile = (file) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = file.split("/").pop();
    link.click();
  };

  // Responsive styles
  const styles = {
    container: { 
      padding: isMobile ? "10px" : isTablet ? "12px 16px" : "14px 18px", 
      fontFamily: "Segoe UI", 
      minHeight: "100vh",
      backgroundColor: colors.bgLight
    },
    header: { 
      color: colors.textDark, 
      fontSize: isMobile ? 22 : 26, 
      marginBottom: isMobile ? 8 : 10 
    },
    subheader: { 
      color: colors.textLight, 
      marginTop: 0, 
      marginBottom: isMobile ? 12 : 14,
      fontSize: isMobile ? 14 : 15
    },
    searchBox: { 
      display: "flex", 
      alignItems: "center", 
      border: `1px solid ${colors.border}`, 
      borderRadius: 6, 
      padding: isMobile ? "10px 12px" : "7px 10px", 
      width: "100%",
      maxWidth: isMobile ? "100%" : "400px",
      marginBottom: isMobile ? 15 : 18
    },
    searchInput: { 
      border: "none", 
      outline: "none", 
      flex: 1, 
      fontSize: isMobile ? 16 : 14, // Larger font for mobile to prevent zoom
      marginRight: 8
    },
    tableBox: { 
      marginTop: isMobile ? 15 : 18, 
      background: colors.bg, 
      borderRadius: 8, 
      padding: isMobile ? 10 : 14, 
      boxShadow: "0 1px 6px rgba(0,0,0,0.08)", 
      overflowX: "auto"
    },
    table: { 
      width: "100%", 
      borderCollapse: "collapse",
      display: isMobile ? "none" : "table" // Hide table on mobile
    },
    th: { 
      textAlign: "left", 
      padding: isMobile ? "10px 8px" : "9px 12px", 
      color: colors.textLight, 
      borderBottom: `1px solid ${colors.border}`, 
      fontSize: isMobile ? 13 : 14,
      whiteSpace: "nowrap"
    },
    td: { 
      padding: isMobile ? "10px 8px" : "9px 12px", 
      color: colors.textDark, 
      fontSize: isMobile ? 13 : 14, 
      borderBottom: `1px solid ${colors.border}`
    },
    actions: { 
      display: "flex", 
      gap: isMobile ? 6 : "10px", 
      alignItems: "center",
      justifyContent: isMobile ? "flex-end" : "flex-start"
    },
    modalBG: { 
      position: "fixed", 
      inset: 0, 
      background: "rgba(0,0,0,0.45)", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      zIndex: 2000,
      padding: isMobile ? 10 : 0
    },
    modalCard: { 
      background: "#fff", 
      padding: isMobile ? 16 : 18, 
      width: "90%", 
      maxWidth: isMobile ? "100%" : 420, 
      borderRadius: 8, 
      position: "relative", 
      boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
      maxHeight: isMobile ? "90vh" : "auto",
      overflowY: "auto"
    },
    closeBtn: { 
      background: "none", 
      border: "none", 
      cursor: "pointer", 
      fontSize: isMobile ? 22 : 20, 
      position: "absolute", 
      top: 8, 
      right: 10, 
      color: colors.textLight 
    },
    info: { 
      margin: "4px 0", 
      fontSize: isMobile ? 14 : 14 
    },
    primaryBtn: { 
      background: colors.primary, 
      color: "#fff", 
      border: "none", 
      borderRadius: 6, 
      padding: isMobile ? "10px 14px" : "8px 14px", 
      cursor: "pointer", 
      display: "flex", 
      alignItems: "center", 
      gap: 6,
      fontSize: isMobile ? 14 : 13
    },
    dangerBtn: { 
      background: colors.danger, 
      color: "#fff", 
      border: "none", 
      borderRadius: 6, 
      padding: isMobile ? "10px 14px" : "8px 14px", 
      cursor: "pointer", 
      display: "flex", 
      alignItems: "center", 
      gap: 6,
      fontSize: isMobile ? 14 : 13
    },
    // Mobile card styles
    cardContainer: {
      display: isMobile ? "flex" : "none", // Show cards on mobile
      flexDirection: "column",
      gap: 12
    },
    downloadCard: {
      background: colors.bg,
      borderRadius: 8,
      padding: 14,
      boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
      position: "relative"
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 10
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 600,
      color: colors.textDark,
      paddingRight: 10,
      flex: 1
    },
    cardIcon: {
      color: colors.primary,
      fontSize: 18
    },
    cardDetails: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 12
    },
    cardDetail: {
      display: "flex",
      flexDirection: "column"
    },
    cardLabel: {
      fontSize: 12,
      color: colors.textLight,
      marginBottom: 2
    },
    cardValue: {
      fontSize: 14,
      color: colors.textDark
    },
    cardActions: {
      display: "flex",
      justifyContent: "flex-end",
      borderTop: `1px solid ${colors.border}`,
      paddingTop: 10
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Downloads</h1>
      <p style={styles.subheader}>All downloadable documents & reports</p>

      {/* Search */}
      <div style={styles.searchBox}>
        <input
          placeholder="Search downloads..."
          style={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch style={{ color: colors.textLight }} />
      </div>

      {/* Downloads Table for Desktop */}
      <div style={styles.tableBox}>
        <table style={styles.table}>
          <thead>
            <tr>
              {["Name", "Date", "Size", "Action"].map((t) => (
                <th key={t} style={styles.th}>{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <tr key={d.id}>
                <td style={styles.td}>{d.name}</td>
                <td style={styles.td}>{d.date}</td>
                <td style={styles.td}>{d.size}</td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <ActionBtn icon={<FaEye />} onClick={() => setPreviewData(d)} />
                    <ActionBtn icon={<FaDownload />} onClick={() => downloadFile(d.file)} />
                    <ActionBtn icon={<FaTrash />} color={colors.danger} onClick={() => deleteItem(d.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Card View */}
        <div style={styles.cardContainer}>
          {filtered.map((d) => (
            <div key={d.id} style={styles.downloadCard}>
              <div style={styles.cardHeader}>
                <div style={styles.cardTitle}>{d.name}</div>
                <FaFileAlt style={styles.cardIcon} />
              </div>
              <div style={styles.cardDetails}>
                <div style={styles.cardDetail}>
                  <div style={styles.cardLabel}>Date</div>
                  <div style={styles.cardValue}>{d.date}</div>
                </div>
                <div style={styles.cardDetail}>
                  <div style={styles.cardLabel}>Size</div>
                  <div style={styles.cardValue}>{d.size}</div>
                </div>
              </div>
              <div style={styles.cardActions}>
                <div style={styles.actions}>
                  <ActionBtn icon={<FaEye />} onClick={() => setPreviewData(d)} />
                  <ActionBtn icon={<FaDownload />} onClick={() => downloadFile(d.file)} />
                  <ActionBtn icon={<FaTrash />} color={colors.danger} onClick={() => deleteItem(d.id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal — Preview */}
      {previewData && (
        <div style={styles.modalBG}>
          <div style={styles.modalCard}>
            <button style={styles.closeBtn} onClick={() => setPreviewData(null)}>
              <FaTimes />
            </button>

            <h2 style={{ marginBottom: 6, fontSize: isMobile ? 18 : 20 }}>{previewData.name}</h2>
            <p style={styles.info}><b>Date:</b> {previewData.date}</p>
            <p style={styles.info}><b>Size:</b> {previewData.size}</p>
            <p style={styles.info}><b>Format:</b> {previewData.type}</p>
            <p style={styles.info}><b>Assigned To:</b> {previewData.assigned}</p>

            <div style={{ marginTop: 18, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button style={styles.primaryBtn} onClick={() => downloadFile(previewData.file)}>
                <FaDownload /> Download
              </button>
              <button style={styles.dangerBtn} onClick={() => deleteItem(previewData.id)}>
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* Small Component */
const ActionBtn = ({ text, icon, color, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: "none",
      border: "none",
      cursor: "pointer",
      color: color || colors.primary,
      fontSize: 16,
      marginRight: 8,
      padding: 4,
      borderRadius: 4,
      transition: "background-color 0.2s"
    }}
    onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(0,0,0,0.05)"}
    onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
  >
    {icon} {text}
  </button>
);

export default Download;