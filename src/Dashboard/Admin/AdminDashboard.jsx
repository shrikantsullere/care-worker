import React, { useState } from "react";
import { FaUsers, FaClipboardList, FaCheckCircle, FaFileSignature, FaDownload, FaEye, FaEdit, FaTrash, FaTimes, FaSave, FaBars, FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";

const colors = {
  primary: "#3A8DFF",
  success: "#4CAF50",
  warning: "#FF9800",
  danger: "#F44336",
  bg: "#FFFFFF",
  textDark: "#1E1E1E",
  textLight: "#757575",
  border: "#E6E6E6",
  bgLight: "#F4F7FB",
};

const AdminDashboard = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth > 768 && window.innerWidth <= 1024);
  
  const [carers, setCarers] = useState([
    { id: "CW001", name: "Sarah Johnson", status: "Active", progress: 85, pendingSignatures: 2, email: "sarah.johnson@example.com", phone: "+44 7700 900123" },
    { id: "CW002", name: "Michael Chen", status: "Pending", progress: 60, pendingSignatures: 4, email: "michael.chen@example.com", phone: "+44 7700 900456" },
    { id: "CW003", name: "Emma Wilson", status: "Active", progress: 92, pendingSignatures: 1, email: "emma.wilson@example.com", phone: "+44 7700 900789" }
  ]);

  const [forms, setForms] = useState([
    { id: 1, name: "Employment Application", version: "1.0", description: "Standard employment application form" },
    { id: 2, name: "Incident Report", version: "1.1", description: "Report for documenting workplace incidents" },
    { id: 3, name: "Interview Sheet", version: "1.2", description: "Template for recording interview results" },
  ]);

  const [profileModal, setProfileModal] = useState(null);
  const [formModal, setFormModal] = useState(null);
  const [editTemplate, setEditTemplate] = useState(null);
  const [editCarer, setEditCarer] = useState(null);

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Delete carer
  const deleteCarer = (id) => {
    if (window.confirm("Are you sure you want to delete this carer?")) {
      setCarers(carers.filter((c) => c.id !== id));
    }
  };

  // Delete template
  const deleteTemplate = (id) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      setForms(forms.filter((f) => f.id !== id));
    }
  };

  // Save template
  const saveTemplate = () => {
    setForms(forms.map(f => 
      f.id === editTemplate.id ? editTemplate : f
    ));
    setEditTemplate(null);
  };

  // Save carer
  const saveCarer = () => {
    setCarers(carers.map(c => 
      c.id === editCarer.id ? editCarer : c
    ));
    setEditCarer(null);
  };

  // Download report function
  const downloadReport = () => {
    // Create a simple text report
    const reportDate = new Date().toLocaleDateString();
    let reportContent = `CARE WORKERS REPORT - ${reportDate}\n\n`;
    reportContent += `Total Carers: ${carers.length}\n`;
    reportContent += `Total Forms: ${forms.length}\n\n`;
    reportContent += `CARER DETAILS:\n`;
    reportContent += `=================================\n\n`;
    
    carers.forEach(c => {
      reportContent += `Name: ${c.name}\n`;
      reportContent += `ID: ${c.id}\n`;
      reportContent += `Email: ${c.email}\n`;
      reportContent += `Phone: ${c.phone}\n`;
      reportContent += `Status: ${c.status}\n`;
      reportContent += `Progress: ${c.progress}%\n`;
      reportContent += `Pending Signatures: ${c.pendingSignatures}\n\n`;
    });
    
    reportContent += `FORMS:\n`;
    reportContent += `=================================\n\n`;
    
    forms.forEach(f => {
      reportContent += `Name: ${f.name}\n`;
      reportContent += `Version: ${f.version}\n`;
      reportContent += `Description: ${f.description}\n\n`;
    });
    
    // Create a blob and download
    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `care_workers_report_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert("Report downloaded successfully!");
  };

  // Handle navigation
  const navigateToHome = () => {
    // In a real app, this would navigate to home
    console.log("Navigate to home");
  };

  const handleLogout = () => {
    // In a real app, this would handle logout
    console.log("Logout");
  };

  // Responsive styles
  const styles = {
    container: {
      padding: isMobile ? "10px" : isTablet ? "12px" : "16px",
      fontFamily: "Segoe UI",
      minHeight: "100vh",
      backgroundColor: colors.bgLight,
      // paddingTop: isMobile ? "60px" : "70px" // Adjusted for mobile
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: isMobile ? "15px" : "20px",
      padding: isMobile ? "10px" : "0",
      position: "relative",
      zIndex: 900 // Lower than modal z-index
    },
    title: {
      color: colors.textDark,
      fontSize: isMobile ? 20 : isTablet ? 24 : 26,
      margin: 0
    },
    navButtons: {
      display: "flex",
      gap: "10px"
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(210px, 1fr))",
      gap: isMobile ? "8px" : "12px",
      marginTop: "10px"
    },
    tableContainer: {
      overflowX: "auto",
      marginTop: "10px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      borderRadius: "8px"
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: colors.bg,
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 1px 5px rgba(0,0,0,0.05)"
    },
    th: {
      padding: isMobile ? "10px 8px" : isTablet ? "8px 10px" : "6px 8px",
      color: colors.textLight,
      borderBottom: `1px solid ${colors.border}`,
      fontSize: isMobile ? 12 : 14,
      textAlign: "left",
      backgroundColor: "#f9f9f9",
      whiteSpace: "nowrap"
    },
    td: {
      padding: isMobile ? "10px 8px" : isTablet ? "8px 10px" : "6px 8px",
      color: colors.textDark,
      borderBottom: `1px solid ${colors.border}`,
      fontSize: isMobile ? 12 : 14
    },
    row: {
      height: isMobile ? "auto" : "38px"
    },
    actionButtons: {
      display: "flex",
      gap: "6px",
      flexWrap: "wrap"
    },
    formsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(250px,1fr))",
      gap: isMobile ? "10px" : "12px"
    },
    card: {
      background: colors.bg,
      padding: isMobile ? "12px" : "14px",
      borderRadius: "8px",
      boxShadow: "0 1px 5px rgba(0,0,0,0.05)",
      height: "100%"
    },
    modalBg: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999 // Higher than navbar z-index (2000)
    },
    modalBox: {
      background: colors.bg,
      padding: isMobile ? "15px" : "20px",
      borderRadius: "8px",
      width: isMobile ? "95%" : "90%",
      maxWidth: isMobile ? "none" : "440px",
      maxHeight: isMobile ? "90vh" : "none",
      overflowY: "auto",
      position: "relative",
      zIndex: 10000 // Higher than modal background
    },
    closeBtn: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "18px",
      color: colors.textLight
    },
    input: {
      width: "100%",
      padding: "8px",
      borderRadius: "6px",
      border: `1px solid ${colors.border}`,
      marginBottom: "10px",
      fontSize: "14px"
    },
    formActions: {
      display: "flex",
      gap: "10px",
      marginTop: "15px",
      justifyContent: "flex-end",
      flexWrap: "wrap"
    },
    mobileMenu: {
      position: "fixed",
      top: "0",
      right: isMenuOpen ? "0" : "-100%",
      width: isMobile ? "80%" : "300px",
      height: "100vh",
      backgroundColor: colors.bg,
      boxShadow: "-2px 0 10px rgba(0, 0, 0, 0.1)",
      transition: "right 0.3s ease",
      zIndex: 1000,
      display: "flex",
      flexDirection: "column",
      padding: "20px"
    },
    mobileMenuItem: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      padding: "15px 0",
      borderBottom: "1px solid #eaeaea",
      cursor: "pointer",
      color: colors.textDark,
      fontSize: "16px"
    },
    mobileMenuClose: {
      position: "absolute",
      top: "15px",
      right: "15px",
      background: "none",
      border: "none",
      fontSize: "20px",
      cursor: "pointer"
    },
    downloadButton: {
      marginTop: "18px",
      textAlign: "right",
      position: "relative",
      zIndex: 1
    },
    mobileTableCard: {
      background: colors.bg,
      borderRadius: "8px",
      padding: "12px",
      marginBottom: "10px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
    },
    mobileTableCardHeader: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "8px",
      borderBottom: `1px solid ${colors.border}`,
      paddingBottom: "8px"
    },
    mobileTableCardContent: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "8px"
    },
    mobileTableCardItem: {
      display: "flex",
      flexDirection: "column"
    },
    mobileTableCardLabel: {
      fontSize: "11px",
      color: colors.textLight,
      marginBottom: "2px"
    },
    mobileTableCardValue: {
      fontSize: "13px",
      color: colors.textDark
    },
    mobileTableCardActions: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "10px",
      paddingTop: "8px",
      borderTop: `1px solid ${colors.border}`
    }
  };

  return (
    <div style={styles.container}>
      {/* Header with Navigation */}
      <div style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <div style={styles.mobileMenu}>
          <button 
            style={styles.mobileMenuClose}
            onClick={() => setIsMenuOpen(false)}
          >
            <FaTimes />
          </button>
          <div 
            style={styles.mobileMenuItem}
            onClick={() => {
              navigateToHome();
              setIsMenuOpen(false);
            }}
          >
            <FaHome /> Dashboard
          </div>
          <div 
            style={styles.mobileMenuItem}
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
          >
            <FaSignOutAlt /> Logout
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <Card 
          title="Total Carers" 
          value={carers.length} 
          icon={<FaUsers />} 
          color={colors.primary} 
          isMobile={isMobile}
        />
        <Card 
          title="Pending Forms" 
          value={forms.length} 
          icon={<FaClipboardList />} 
          color={colors.warning} 
          isMobile={isMobile}
        />
        <Card 
          title="Completed Packs" 
          value={85} 
          icon={<FaCheckCircle />} 
          color={colors.success} 
          isMobile={isMobile}
        />
        <Card 
          title="Pending Signatures" 
          value={carers.reduce((a, b) => a + b.pendingSignatures, 0)} 
          icon={<FaFileSignature />} 
          color={colors.danger} 
          isMobile={isMobile}
        />
      </div>

      {/* Carers Table - Desktop View */}
      {!isMobile && (
        <Section title="Recent Carers" isMobile={isMobile}>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {["Name", "ID", "Progress", "Pending", "Action"].map(t => (
                    <th key={t} style={styles.th}>{t}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {carers.map((c) => (
                  <tr key={c.id} style={styles.row}>
                    <td style={styles.td}>{c.name}</td>
                    <td style={styles.td}>{c.id}</td>
                    <td style={styles.td}>{c.progress}%</td>
                    <td style={styles.td}>{c.pendingSignatures}</td>
                    <td style={styles.td}>
                      <div style={styles.actionButtons}>
                        <Btn 
                          onClick={() => setProfileModal(c)} 
                          icon={<FaEye />} 
                          title="View Profile"
                        />
                        <Btn 
                          onClick={() => setEditCarer(c)} 
                          icon={<FaEdit />} 
                          title="Edit Carer"
                        />
                        <Btn 
                          onClick={() => deleteCarer(c.id)} 
                          icon={<FaTrash />} 
                          color={colors.danger} 
                          title="Delete Carer"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* Carers Cards - Mobile View */}
      {isMobile && (
        <Section title="Recent Carers" isMobile={isMobile}>
          {carers.map((c) => (
            <div key={c.id} style={styles.mobileTableCard}>
              <div style={styles.mobileTableCardHeader}>
                <span style={{ fontWeight: "bold" }}>{c.name}</span>
                <span style={{ 
                  backgroundColor: c.status === "Active" ? colors.success : colors.warning,
                  color: "white",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "11px"
                }}>
                  {c.status}
                </span>
              </div>
              <div style={styles.mobileTableCardContent}>
                <div style={styles.mobileTableCardItem}>
                  <span style={styles.mobileTableCardLabel}>ID</span>
                  <span style={styles.mobileTableCardValue}>{c.id}</span>
                </div>
                <div style={styles.mobileTableCardItem}>
                  <span style={styles.mobileTableCardLabel}>Progress</span>
                  <span style={styles.mobileTableCardValue}>{c.progress}%</span>
                </div>
                <div style={styles.mobileTableCardItem}>
                  <span style={styles.mobileTableCardLabel}>Pending Signatures</span>
                  <span style={styles.mobileTableCardValue}>{c.pendingSignatures}</span>
                </div>
                <div style={styles.mobileTableCardItem}>
                  <span style={styles.mobileTableCardLabel}>Email</span>
                  <span style={styles.mobileTableCardValue}>{c.email.split('@')[0]}...</span>
                </div>
              </div>
              <div style={styles.mobileTableCardActions}>
                <Btn 
                  onClick={() => setProfileModal(c)} 
                  icon={<FaEye />} 
                  title="View Profile"
                />
                <Btn 
                  onClick={() => setEditCarer(c)} 
                  icon={<FaEdit />} 
                  title="Edit Carer"
                />
                <Btn 
                  onClick={() => deleteCarer(c.id)} 
                  icon={<FaTrash />} 
                  color={colors.danger} 
                  title="Delete Carer"
                />
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* Forms */}
      <Section title="Forms / Templates" isMobile={isMobile}>
        <div style={styles.formsGrid}>
          {forms.map((f) => (
            <div key={f.id} style={styles.card}>
              <h3 style={{ margin: 0, fontSize: isMobile ? 14 : 16 }}>{f.name}</h3>
              <p style={{ margin: "4px 0 10px", color: colors.textLight, fontSize: isMobile ? 12 : 13 }}>
                Version: {f.version}
              </p>
              <p style={{ margin: "4px 0 10px", color: colors.textLight, fontSize: isMobile ? 12 : 13 }}>
                {f.description}
              </p>
              <div style={styles.actionButtons}>
                <Button text="Open" onClick={() => setFormModal(f)} />
                <Button text="Edit" color={colors.success} onClick={() => setEditTemplate(f)} />
                <Button text="Delete" color={colors.danger} onClick={() => deleteTemplate(f.id)} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Bottom Button */}
      <div style={styles.downloadButton}>
        <Button 
          text="Download Monthly Report" 
          icon={<FaDownload />} 
          onClick={downloadReport} 
        />
      </div>

      {/* MODALS */}
      {profileModal && (
        <Modal title="Carer Profile" onClose={() => setProfileModal(null)} isMobile={isMobile}>
          <p><b>Name:</b> {profileModal.name}</p>
          <p><b>ID:</b> {profileModal.id}</p>
          <p><b>Email:</b> {profileModal.email}</p>
          <p><b>Phone:</b> {profileModal.phone}</p>
          <p><b>Status:</b> {profileModal.status}</p>
          <p><b>Progress:</b> {profileModal.progress}%</p>
          <p><b>Pending Signatures:</b> {profileModal.pendingSignatures}</p>
        </Modal>
      )}

      {formModal && (
        <Modal title={formModal.name} onClose={() => setFormModal(null)} isMobile={isMobile}>
          <p><b>Form Name:</b> {formModal.name}</p>
          <p><b>Version:</b> {formModal.version}</p>
          <p><b>Description:</b> {formModal.description}</p>
          <div style={styles.formActions}>
            <Button text="Submit" onClick={() => alert("Submitted")} />
          </div>
        </Modal>
      )}

      {editTemplate && (
        <Modal title="Edit Template" onClose={() => setEditTemplate(null)} isMobile={isMobile}>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Name:</label>
            <input 
              value={editTemplate.name} 
              style={styles.input} 
              onChange={(e) => setEditTemplate({ ...editTemplate, name: e.target.value })} 
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Version:</label>
            <input 
              value={editTemplate.version} 
              style={styles.input} 
              onChange={(e) => setEditTemplate({ ...editTemplate, version: e.target.value })} 
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Description:</label>
            <input 
              value={editTemplate.description} 
              style={styles.input} 
              onChange={(e) => setEditTemplate({ ...editTemplate, description: e.target.value })} 
            />
          </div>
          <div style={styles.formActions}>
            <Button text="Save" icon={<FaSave />} onClick={saveTemplate} />
            <Button text="Delete Template" icon={<FaTrash />} color={colors.danger} onClick={() => deleteTemplate(editTemplate.id)} />
          </div>
        </Modal>
      )}

      {editCarer && (
        <Modal title="Edit Carer" onClose={() => setEditCarer(null)} isMobile={isMobile} isSmall={true}>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Name:</label>
              <input 
                value={editCarer.name} 
                style={styles.input} 
                onChange={(e) => setEditCarer({ ...editCarer, name: e.target.value })} 
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Email:</label>
              <input 
                value={editCarer.email} 
                style={styles.input} 
                onChange={(e) => setEditCarer({ ...editCarer, email: e.target.value })} 
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Status:</label>
              <select 
                value={editCarer.status} 
                style={styles.input} 
                onChange={(e) => setEditCarer({ ...editCarer, status: e.target.value })} 
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div style={styles.formActions}>
            <Button text="Save" icon={<FaSave />} onClick={saveCarer} />
            <Button text="Delete Carer" icon={<FaTrash />} color={colors.danger} onClick={() => deleteCarer(editCarer.id)} />
          </div>
        </Modal>
      )}
    </div>
  );
};

/* ---- small components ---- */
const Card = ({ title, value, icon, color, isMobile }) => (
  <div style={{
    background: colors.bg,
    padding: isMobile ? "12px" : "14px",
    borderRadius: "8px",
    boxShadow: "0 1px 5px rgba(0,0,0,0.05)",
    height: "100%"
  }}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span style={{ fontSize: isMobile ? 12 : 14 }}>{title}</span>
      <span style={{ color }}>{icon}</span>
    </div>
    <h2 style={{ margin: "6px 0 0", fontSize: isMobile ? 20 : 24 }}>{value}</h2>
  </div>
);

const Section = ({ title, children, isMobile }) => (
  <div style={{ marginTop: isMobile ? 20 : 26 }}>
    <h2 style={{ marginBottom: 8, color: colors.textDark, fontSize: isMobile ? 18 : 20 }}>{title}</h2>
    {children}
  </div>
);

const Btn = ({ icon, onClick, color, title }) => (
  <button 
    onClick={onClick} 
    style={{ 
      background: "none", 
      border: "none", 
      color: color || colors.primary, 
      cursor: "pointer", 
      fontSize: 16, 
      marginRight: 6,
      padding: "4px",
      borderRadius: "4px",
      transition: "background-color 0.2s"
    }}
    title={title}
    onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(0,0,0,0.05)"}
    onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
  >
    {icon}
  </button>
);

const Button = ({ text, icon, onClick, color }) => (
  <button 
    onClick={onClick} 
    style={{ 
      backgroundColor: color || colors.primary, 
      color: "#fff", 
      border: "none", 
      borderRadius: 4, 
      padding: "7px 12px", 
      cursor: "pointer", 
      display: "flex", 
      alignItems: "center", 
      gap: 6, 
      fontSize: 14,
      transition: "background-color 0.2s"
    }}
    onMouseEnter={(e) => {
      if (color) {
        const rgb = hexToRgb(color);
        e.target.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`;
      } else {
        e.target.style.backgroundColor = "#2A7DFF";
      }
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = color || colors.primary;
    }}
  >
    {icon} {text}
  </button>
);

const Modal = ({ title, children, onClose, isMobile, isSmall }) => (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999 // Higher than navbar z-index (2000)
  }}>
    <div style={{
      background: colors.bg,
      padding: isSmall ? "15px" : isMobile ? "15px" : "20px",
      borderRadius: "8px",
      width: isSmall ? "80%" : isMobile ? "95%" : "90%",
      maxWidth: isSmall ? "400px" : isMobile ? "none" : "440px",
      maxHeight: isMobile ? "90vh" : "none",
      overflowY: "auto",
      position: "relative",
      zIndex: 10000 // Higher than modal background
    }}>
      <button 
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
          color: colors.textLight
        }} 
        onClick={onClose}
      >
        <FaTimes />
      </button>
      <h2 style={{ fontSize: isMobile ? 18 : 20, marginBottom: 14 }}>{title}</h2>
      {children}
    </div>
  </div>
);

// Helper function to convert hex to RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export default AdminDashboard;