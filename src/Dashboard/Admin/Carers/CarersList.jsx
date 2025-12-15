import React, { useState, useEffect } from "react";
import { 
  FaUserPlus, 
  FaEdit, 
  FaTrash, 
  FaFileAlt, 
  FaSearch, 
  FaTimes, 
  FaBars, 
  FaFilter, 
  FaEye,
  FaFolderOpen
} from "react-icons/fa";

const CarersList = () => {
  const colors = {
    primary: "#3A8DFF",
    success: "#4CAF50",
    danger: "#F44336",
    warning: "#FF9800",
    textDark: "#212121",
    textLight: "#757575",
    lightGray: "#E0E0E0",
    white: "#FFFFFF",
    overlay: "rgba(0, 0, 0, 0.6)",
    bgLight: "#F5F7FA",
  };

  // State for responsive design
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth > 768 && window.innerWidth <= 1024);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

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

  const [carers, setCarers] = useState([
    { 
      id: 1, 
      name: "John Doe", 
      email: "john@example.com", 
      phone: "1234567890", 
      status: "Active", 
      progress: 75,
      pendingSignoffs: 3,
      assignedForms: [1, 3, 5] 
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane@example.com", 
      phone: "0987654321", 
      status: "Active", 
      progress: 60,
      pendingSignoffs: 5,
      assignedForms: [2, 4, 6] 
    },
    { 
      id: 3, 
      name: "Mike Johnson", 
      email: "mike@example.com", 
      phone: "1122334455", 
      status: "Inactive", 
      progress: 30,
      pendingSignoffs: 2,
      assignedForms: [7, 8, 9] 
    },
  ]);

  // Forms data
  const formsData = [
    { id: 1, name: "Employment Application", type: "Input", version: "1.0" },
    { id: 2, name: "Character Reference", type: "Input", version: "1.0" },
    { id: 3, name: "Health & Safety Handbook", type: "Document", version: "2.0" },
    { id: 4, name: "Job Description", type: "Document", version: "1.0" },
    { id: 5, name: "Interview Scoring", type: "Input", version: "1.0" },
    { id: 6, name: "Declaration of Health", type: "Input", version: "1.0" },
    { id: 7, name: "Induction Certificate 1", type: "Document", version: "1.0" },
    { id: 8, name: "Induction Certificate 2", type: "Document", version: "1.0" },
    { id: 9, name: "Medication Competency", type: "Input", version: "1.0" },
    { id: 10, name: "Review Form", type: "Input", version: "1.0" },
    { id: 11, name: "Zero Hour Contract", type: "Document", version: "1.0" },
    { id: 12, name: "Information Sheet", type: "Document", version: "1.0" },
    { id: 13, name: "Spot Check Form", type: "Input", version: "1.0" },
    { id: 14, name: "Supervision Form", type: "Input", version: "1.0" },
    { id: 15, name: "Telephone Monitoring", type: "Input", version: "1.0" },
    { id: 16, name: "Appraisal Form", type: "Input", version: "1.0" },
    { id: 17, name: "Application Form", type: "Input", version: "1.0" },
    { id: 18, name: "Medication Management", type: "Input", version: "1.0" },
    { id: 19, name: "Care Worker Shadowing", type: "Input", version: "1.0" },
    { id: 20, name: "Care Plan", type: "Input", version: "1.0" },
    { id: 21, name: "Training Matrix", type: "Input", version: "1.0" },
    { id: 22, name: "Client Profile", type: "Input", version: "1.0" },
    { id: 23, name: "Unite Care Ltd", type: "Input", version: "1.0" },
    { id: 24, name: "Induction Checklist", type: "Input", version: "1.0" }
  ];

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [formsModalOpen, setFormsModalOpen] = useState(false);
  const [assignModal, setAssignModal] = useState({ open: false, carerId: null });

  const [newCarer, setNewCarer] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    status: "Active",
    progress: 0,
    pendingSignoffs: 0
  });
  const [editingCarer, setEditingCarer] = useState(null);
  const [viewingCarer, setViewingCarer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState("All");
  const [progressFilter, setProgressFilter] = useState("All");

  // Add new carer
  const handleAddCarer = () => {
    if (!newCarer.name || !newCarer.email) return alert("Name & Email required");
    const newEntry = { ...newCarer, id: Date.now(), assignedForms: [] };
    setCarers(prev => [...prev, newEntry]);
    setNewCarer({ name: "", email: "", phone: "", status: "Active", progress: 0, pendingSignoffs: 0 });
    setAddModalOpen(false);
  };

  // Edit existing carer
  const handleEditCarer = () => {
    if (!editingCarer.name || !editingCarer.email) return alert("Name & Email required");
    setCarers(prev => prev.map(c => (c.id === editingCarer.id ? editingCarer : c)));
    setEditModalOpen(false);
  };

  // Delete carer
  const handleDeleteCarer = id => {
    if (window.confirm("Are you sure you want to delete this carer?")) {
      setCarers(prev => prev.filter(c => c.id !== id));
    }
  };

  // Toggle assigned forms
  const toggleFormAssignment = formId => {
    setCarers(prev =>
      prev.map(carer =>
        carer.id === assignModal.carerId
          ? {
              ...carer,
              assignedForms: carer.assignedForms.includes(formId)
                ? carer.assignedForms.filter(f => f !== formId)
                : [...carer.assignedForms, formId],
            }
          : carer
      )
    );
  };

  // Filter carers by search and filters
  const filteredCarers = carers.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.id.toString().includes(searchTerm);
    
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    
    let matchesProgress = true;
    if (progressFilter === "0-25") matchesProgress = c.progress >= 0 && c.progress <= 25;
    else if (progressFilter === "26-50") matchesProgress = c.progress >= 26 && c.progress <= 50;
    else if (progressFilter === "51-75") matchesProgress = c.progress >= 51 && c.progress <= 75;
    else if (progressFilter === "76-100") matchesProgress = c.progress >= 76 && c.progress <= 100;
    
    return matchesSearch && matchesStatus && matchesProgress;
  });

  const carerToAssign = carers.find(c => c.id === assignModal.carerId);

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
    filterContainer: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      marginBottom: isMobile ? 10 : 0
    },
    filterSelect: {
      padding: isMobile ? "8px 10px" : "6px 12px",
      borderRadius: 4,
      border: `1px solid ${colors.lightGray}`,
      fontSize: isMobile ? 14 : 13,
      minWidth: isMobile ? 120 : 140
    },
    button: { 
      padding: isMobile ? "10px 14px" : "8px 12px", 
      borderRadius: 4, 
      cursor: "pointer", 
      border: "none", 
      fontSize: isMobile ? 16 : 14,
      fontWeight: 600, 
      display: "flex", 
      alignItems: "center", 
      gap: 7,
      transition: "all 0.2s ease"
    },
    buttonPrimary: { 
      backgroundColor: colors.primary, 
      color: colors.white 
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
    actions: { 
      display: "flex", 
      gap: isMobile ? 4 : 8,
      justifyContent: isMobile ? "flex-end" : "flex-start"
    },
    iconBtn: { 
      border: "none", 
      background: "none", 
      fontSize: isMobile ? 18 : 17, 
      cursor: "pointer", 
      padding: isMobile ? 6 : 2,
      borderRadius: 4,
      transition: "background-color 0.2s"
    },
    modalOverlay: { 
      position: "fixed", 
      inset: 0, 
      background: colors.overlay, 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      zIndex: 9999,
      padding: isMobile ? 8 : 12 
    },
    modalContent: { 
      background: colors.white, 
      padding: isMobile ? 16 : 24, 
      borderRadius: 8, 
      width: "100%", 
      maxWidth: isMobile ? "95%" : 800,
      maxHeight: isMobile ? "95vh" : "90vh",
      overflowY: "auto",
      position: "relative" 
    },
    modalHeader: { 
      margin: 0, 
      marginBottom: isMobile ? 16 : 20, 
      fontSize: isMobile ? 20 : 22, 
      fontWeight: 600 
    },
    formGroup: { 
      marginBottom: isMobile ? 16 : 14 
    },
    label: { 
      fontSize: isMobile ? 15 : 14, 
      fontWeight: 500, 
      marginBottom: 6, 
      display: "block" 
    },
    input: { 
      width: "100%", 
      padding: isMobile ? "12px 10px" : "10px 12px", 
      borderRadius: 4, 
      border: `1px solid ${colors.lightGray}`, 
      fontSize: isMobile ? 16 : 14
    },
    select: { 
      width: "100%", 
      padding: isMobile ? "12px 10px" : "10px 12px", 
      borderRadius: 4, 
      border: `1px solid ${colors.lightGray}`, 
      fontSize: isMobile ? 16 : 14
    },
    footer: { 
      display: "flex", 
      justifyContent: "flex-end", 
      gap: 10, 
      marginTop: isMobile ? 20 : 16 
    },
    formGrid: { 
      display: "grid", 
      gridTemplateColumns: isMobile ? "repeat(auto-fill, minmax(100px, 1fr))" : "repeat(auto-fill, minmax(110px, 1fr))", 
      gap: isMobile ? 8 : 10 
    },
    formTile: { 
      padding: isMobile ? "12px 8px" : "12px", 
      borderRadius: 6, 
      border: `1px solid ${colors.lightGray}`, 
      fontSize: isMobile ? 12 : 13, 
      cursor: "pointer", 
      textAlign: "center", 
      userSelect: "none", 
      position: "relative",
      transition: "all 0.2s ease"
    },
    carerCard: {
      background: colors.white,
      borderRadius: 8,
      padding: isMobile ? "12px" : "16px",
      marginBottom: isMobile ? "10px" : 0,
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      display: isMobile ? "block" : "none"
    },
    carerCardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    },
    carerCardName: {
      fontSize: 16,
      fontWeight: 600,
      color: colors.textDark
    },
    carerCardStatus: {
      padding: "4px 8px",
      borderRadius: 4,
      fontSize: 12,
      fontWeight: 600
    },
    carerCardDetails: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 10
    },
    carerCardDetail: {
      display: "flex",
      flexDirection: "column"
    },
    carerCardLabel: {
      fontSize: 11,
      color: colors.textLight,
      marginBottom: 2
    },
    carerCardValue: {
      fontSize: 13,
      color: colors.textDark
    },
    carerCardFooter: {
      display: "flex",
      justifyContent: "space-between",
      borderTop: `1px solid ${colors.lightGray}`,
      paddingTop: 8
    },
    carerCardForms: {
      fontSize: 13,
      color: colors.textLight
    },
    carerCardActions: {
      display: "flex",
      gap: 8
    },
    filterMenu: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      backgroundColor: colors.white,
      borderRadius: 8,
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      padding: "10px",
      zIndex: 9999,
      marginTop: "5px"
    },
    progressBar: {
      width: "100%",
      height: "8px",
      backgroundColor: colors.lightGray,
      borderRadius: "4px",
      overflow: "hidden"
    },
    progressFill: {
      height: "100%",
      backgroundColor: colors.success,
      borderRadius: "4px"
    },
    badge: {
      display: "inline-block",
      padding: "2px 6px",
      borderRadius: "10px",
      fontSize: "11px",
      fontWeight: "600",
      color: colors.white,
      backgroundColor: colors.danger
    },
    // Forms modal styles
    formsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))",
      gap: 15
    },
    formCard: {
      border: `1px solid ${colors.lightGray}`,
      borderRadius: 8,
      padding: 15,
      backgroundColor: colors.white,
      transition: "all 0.2s ease"
    },
    formCardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    },
    formCardTitle: {
      fontSize: 16,
      fontWeight: 600,
      color: colors.textDark
    },
    formCardType: {
      padding: "3px 8px",
      borderRadius: 4,
      fontSize: 12,
      fontWeight: 500,
      backgroundColor: colors.lightGray,
      color: colors.textDark
    },
    formCardDetails: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    formCardVersion: {
      fontSize: 13,
      color: colors.textLight
    },
    formCardActions: {
      display: "flex",
      gap: 8
    },
    formCardButton: {
      padding: "5px 10px",
      borderRadius: 4,
      border: "none",
      fontSize: 12,
      fontWeight: 500,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 5
    },
    formCardButtonOpen: {
      backgroundColor: `${colors.primary}20`,
      color: colors.primary
    },
    formCardButtonEdit: {
      backgroundColor: `${colors.success}20`,
      color: colors.success
    },
    // Enhanced view modal styles
    viewModalGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: 20,
      marginBottom: 20
    },
    viewModalSection: {
      marginBottom: 20
    },
    viewModalSectionTitle: {
      fontSize: 16,
      fontWeight: 600,
      color: colors.textDark,
      marginBottom: 10,
      borderBottom: `1px solid ${colors.lightGray}`,
      paddingBottom: 5
    },
    viewModalField: {
      display: "flex",
      marginBottom: 10
    },
    viewModalFieldLabel: {
      width: 120,
      fontSize: 14,
      fontWeight: 500,
      color: colors.textLight
    },
    viewModalFieldValue: {
      flex: 1,
      fontSize: 14,
      color: colors.textDark
    },
    viewModalFormsList: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(200px, 1fr))",
      gap: 10
    },
    viewModalFormItem: {
      display: "flex",
      alignItems: "center",
      padding: 8,
      border: `1px solid ${colors.lightGray}`,
      borderRadius: 4,
      fontSize: 13
    },
    // Mobile buttons container
    mobileButtonsContainer: {
      display: isMobile ? "flex" : "none",
      gap: 10,
      width: "100%",
      marginTop: 10,
      marginBottom: 10
    },
    // Floating add button for mobile
    floatingAddButton: {
      display: isMobile ? "flex" : "none",
      position: "fixed",
      bottom: 20,
      right: 20,
      width: 56,
      height: 56,
      borderRadius: "50%",
      backgroundColor: colors.primary,
      color: colors.white,
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      zIndex: 1000,
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Carers Management</h1>
      <p style={styles.subheader}>Manage carers, view reports & supervise staff.</p>

      {/* Controls */}
      <div style={styles.controlsBar}>
        <div style={styles.searchBox}>
          <FaSearch size={isMobile ? 18 : 15} color={colors.textLight} />
          <input 
            style={styles.searchInput} 
            placeholder="Search..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />
        </div>
        <div style={styles.filterContainer}>
          <select 
            style={styles.filterSelect}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select 
            style={styles.filterSelect}
            value={progressFilter}
            onChange={(e) => setProgressFilter(e.target.value)}
          >
            <option value="All">All Progress</option>
            <option value="0-25">0-25%</option>
            <option value="26-50">26-50%</option>
            <option value="51-75">51-75%</option>
            <option value="76-100">76-100%</option>
          </select>
        </div>
        {!isMobile && (
          <button onClick={() => setAddModalOpen(true)} style={{ ...styles.button, ...styles.buttonPrimary }}>
            <FaUserPlus /> Add Carer
          </button>
        )}
      </div>

      {/* Mobile buttons container */}
      {isMobile && (
        <div style={styles.mobileButtonsContainer}>
          <button 
            onClick={() => setAddModalOpen(true)} 
            style={{ 
              ...styles.button, 
              ...styles.buttonPrimary,
              flex: 1
            }}
          >
            <FaUserPlus /> Add Carer
          </button>
          <div style={{ position: "relative", flex: 1 }}>
            <button 
              onClick={() => setFilterMenuOpen(!filterMenuOpen)} 
              style={{ 
                ...styles.button, 
                backgroundColor: colors.lightGray, 
                color: colors.textDark,
                width: "100%"
              }}
            >
              <FaFilter /> Filter
            </button>
            {filterMenuOpen && (
              <div style={styles.filterMenu}>
                <p style={{ margin: '0 0 10px 0', fontSize: 14, fontWeight: 600 }}>Filter Options</p>
                <p style={{ margin: '0 0 5px 0', fontSize: 12, color: colors.textLight }}>
                  Use the filter dropdowns above to narrow down results
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Table for Desktop, Cards for Mobile */}
      {!isMobile && (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Progress %</th>
                <th style={styles.th}>Pending Sign-offs</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCarers.map(c => (
                <tr key={c.id}>
                  <td style={styles.td}>{c.name}</td>
                  <td style={styles.td}>{c.id}</td>
                  <td style={styles.td}>{c.email}</td>
                  <td style={styles.td}>{c.phone}</td>
                  <td style={styles.td}>
                    <b style={{ color: c.status === "Active" ? colors.success : colors.danger }}>{c.status}</b>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.progressBar}>
                      <div style={{ ...styles.progressFill, width: `${c.progress}%` }}></div>
                    </div>
                    <span>{c.progress}%</span>
                  </td>
                  <td style={styles.td}>
                    {c.pendingSignoffs > 0 ? (
                      <span style={styles.badge}>{c.pendingSignoffs}</span>
                    ) : (
                      <span>None</span>
                    )}
                  </td>
                  <td style={{ ...styles.td, ...styles.actions }}>
                    <button 
                      style={{ ...styles.iconBtn, color: colors.primary }} 
                      onClick={() => { setViewingCarer(c); setViewModalOpen(true); }}
                    >
                      <FaEye />
                    </button>

                    <button 
                      style={{ ...styles.iconBtn, color: colors.primary }} 
                      onClick={() => setAssignModal({ open: true, carerId: c.id })}
                    >
                      <FaFileAlt />
                    </button>
                    <button 
                      style={{ ...styles.iconBtn, color: colors.success }} 
                      onClick={() => { setEditingCarer(c); setEditModalOpen(true); }}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      style={{ ...styles.iconBtn, color: colors.danger }} 
                      onClick={() => handleDeleteCarer(c.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Card View */}
      {isMobile && (
        <div>
          {filteredCarers.map(c => (
            <div key={c.id} style={styles.carerCard}>
              <div style={styles.carerCardHeader}>
                <div style={styles.carerCardName}>{c.name}</div>
                <div 
                  style={{
                    ...styles.carerCardStatus,
                    backgroundColor: c.status === "Active" ? `${colors.success}20` : `${colors.danger}20`,
                    color: c.status === "Active" ? colors.success : colors.danger
                  }}
                >
                  {c.status}
                </div>
              </div>
              <div style={styles.carerCardDetails}>
                <div style={styles.carerCardDetail}>
                  <div style={styles.carerCardLabel}>ID</div>
                  <div style={styles.carerCardValue}>{c.id}</div>
                </div>
                <div style={styles.carerCardDetail}>
                  <div style={styles.carerCardLabel}>Email</div>
                  <div style={styles.carerCardValue}>{c.email}</div>
                </div>
                <div style={styles.carerCardDetail}>
                  <div style={styles.carerCardLabel}>Phone</div>
                  <div style={styles.carerCardValue}>{c.phone}</div>
                </div>
                <div style={styles.carerCardDetail}>
                  <div style={styles.carerCardLabel}>Progress</div>
                  <div style={styles.carerCardValue}>{c.progress}%</div>
                </div>
              </div>
              <div style={styles.carerCardFooter}>
                <div style={styles.carerCardForms}>
                  {c.pendingSignoffs > 0 ? (
                    <span style={{ ...styles.badge, marginRight: 5 }}>{c.pendingSignoffs} pending</span>
                  ) : (
                    <span>No pending sign-offs</span>
                  )}
                </div>
                <div style={styles.carerCardActions}>
                  <button 
                    style={{ ...styles.iconBtn, color: colors.primary }} 
                    onClick={() => { setViewingCarer(c); setViewModalOpen(true); }}
                  >
                    <FaEye />
                  </button>

                  <button 
                    style={{ ...styles.iconBtn, color: colors.primary }} 
                    onClick={() => setAssignModal({ open: true, carerId: c.id })}
                  >
                    <FaFileAlt />
                  </button>
                  <button 
                    style={{ ...styles.iconBtn, color: colors.success }} 
                    onClick={() => { setEditingCarer(c); setEditModalOpen(true); }}
                  >
                    <FaEdit />
                  </button>
                  <button 
                    style={{ ...styles.iconBtn, color: colors.danger }} 
                    onClick={() => handleDeleteCarer(c.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Add Button for Mobile */}
      {isMobile && (
        <div 
          style={styles.floatingAddButton}
          onClick={() => setAddModalOpen(true)}
        >
          <FaUserPlus size={24} />
        </div>
      )}

      {/* ADD MODAL */}
      {addModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button 
              onClick={() => setAddModalOpen(false)} 
              style={{ 
                position: "absolute", 
                top: 12, 
                right: 12, 
                border: "none", 
                background: "none", 
                cursor: "pointer", 
                fontSize: 20 
              }}
            >
              <FaTimes />
            </button>
            <h3 style={styles.modalHeader}>Add Carer</h3>
            {["name", "email", "phone"].map(key => (
              <div key={key} style={styles.formGroup}>
                <label style={styles.label}>{key.toUpperCase()}</label>
                <input 
                  style={styles.input} 
                  value={newCarer[key]} 
                  onChange={e => setNewCarer({ ...newCarer, [key]: e.target.value })} 
                />
              </div>
            ))}
            <div style={styles.formGroup}>
              <label style={styles.label}>STATUS</label>
              <select 
                style={styles.select} 
                value={newCarer.status} 
                onChange={e => setNewCarer({ ...newCarer, status: e.target.value })}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>PROGRESS (%)</label>
              <input 
                style={styles.input} 
                type="number"
                min="0"
                max="100"
                value={newCarer.progress} 
                onChange={e => setNewCarer({ ...newCarer, progress: parseInt(e.target.value) || 0 })} 
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>PENDING SIGN-OFFS</label>
              <input 
                style={styles.input} 
                type="number"
                min="0"
                value={newCarer.pendingSignoffs} 
                onChange={e => setNewCarer({ ...newCarer, pendingSignoffs: parseInt(e.target.value) || 0 })} 
              />
            </div>
            <div style={styles.footer}>
              <button style={styles.button} onClick={() => setAddModalOpen(false)}>Cancel</button>
              <button style={{ ...styles.button, ...styles.buttonPrimary }} onClick={handleAddCarer}>Add</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModalOpen && editingCarer && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button 
              onClick={() => setEditModalOpen(false)} 
              style={{ 
                position: "absolute", 
                top: 12, 
                right: 12, 
                border: "none", 
                background: "none", 
                cursor: "pointer", 
                fontSize: 20 
              }}
            >
              <FaTimes />
            </button>
            <h3 style={styles.modalHeader}>Edit Carer</h3>
            {["name", "email", "phone"].map(key => (
              <div key={key} style={styles.formGroup}>
                <label style={styles.label}>{key.toUpperCase()}</label>
                <input 
                  style={styles.input} 
                  value={editingCarer[key]} 
                  onChange={e => setEditingCarer({ ...editingCarer, [key]: e.target.value })} 
                />
              </div>
            ))}
            <div style={styles.formGroup}>
              <label style={styles.label}>STATUS</label>
              <select 
                style={styles.select} 
                value={editingCarer.status} 
                onChange={e => setEditingCarer({ ...editingCarer, status: e.target.value })}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>PROGRESS (%)</label>
              <input 
                style={styles.input} 
                type="number"
                min="0"
                max="100"
                value={editingCarer.progress} 
                onChange={e => setEditingCarer({ ...editingCarer, progress: parseInt(e.target.value) || 0 })} 
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>PENDING SIGN-OFFS</label>
              <input 
                style={styles.input} 
                type="number"
                min="0"
                value={editingCarer.pendingSignoffs} 
                onChange={e => setEditingCarer({ ...editingCarer, pendingSignoffs: parseInt(e.target.value) || 0 })} 
              />
            </div>
            <div style={styles.footer}>
              <button style={styles.button} onClick={() => setEditModalOpen(false)}>Cancel</button>
              <button style={{ ...styles.button, background: colors.success, color: colors.white }} onClick={handleEditCarer}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* ENHANCED VIEW MODAL */}
      {viewModalOpen && viewingCarer && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button 
              onClick={() => setViewModalOpen(false)} 
              style={{ 
                position: "absolute", 
                top: 12, 
                right: 12, 
                border: "none", 
                background: "none", 
                cursor: "pointer", 
                fontSize: 20 
              }}
            >
              <FaTimes />
            </button>
            <h3 style={styles.modalHeader}>Carer Details</h3>
            
            <div style={styles.viewModalGrid}>
              <div style={styles.viewModalSection}>
                <h4 style={styles.viewModalSectionTitle}>Personal Information</h4>
                <div style={styles.viewModalField}>
                  <div style={styles.viewModalFieldLabel}>ID:</div>
                  <div style={styles.viewModalFieldValue}>{viewingCarer.id}</div>
                </div>
                <div style={styles.viewModalField}>
                  <div style={styles.viewModalFieldLabel}>Name:</div>
                  <div style={styles.viewModalFieldValue}>{viewingCarer.name}</div>
                </div>
                <div style={styles.viewModalField}>
                  <div style={styles.viewModalFieldLabel}>Email:</div>
                  <div style={styles.viewModalFieldValue}>{viewingCarer.email}</div>
                </div>
                <div style={styles.viewModalField}>
                  <div style={styles.viewModalFieldLabel}>Phone:</div>
                  <div style={styles.viewModalFieldValue}>{viewingCarer.phone}</div>
                </div>
              </div>
              
              <div style={styles.viewModalSection}>
                <h4 style={styles.viewModalSectionTitle}>Work Status</h4>
                <div style={styles.viewModalField}>
                  <div style={styles.viewModalFieldLabel}>Status:</div>
                  <div style={{ 
                    ...styles.viewModalFieldValue,
                    color: viewingCarer.status === "Active" ? colors.success : colors.danger,
                    fontWeight: 'bold'
                  }}>
                    {viewingCarer.status}
                  </div>
                </div>
                <div style={styles.viewModalField}>
                  <div style={styles.viewModalFieldLabel}>Progress:</div>
                  <div style={styles.viewModalFieldValue}>
                    <div style={styles.progressBar}>
                      <div style={{ ...styles.progressFill, width: `${viewingCarer.progress}%` }}></div>
                    </div>
                    <span>{viewingCarer.progress}%</span>
                  </div>
                </div>
                <div style={styles.viewModalField}>
                  <div style={styles.viewModalFieldLabel}>Pending Sign-offs:</div>
                  <div style={styles.viewModalFieldValue}>
                    {viewingCarer.pendingSignoffs > 0 ? (
                      <span style={styles.badge}>{viewingCarer.pendingSignoffs}</span>
                    ) : (
                      <span>None</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div style={styles.viewModalSection}>
              <h4 style={styles.viewModalSectionTitle}>Assigned Forms ({viewingCarer.assignedForms.length})</h4>
              <div style={styles.viewModalFormsList}>
                {viewingCarer.assignedForms.length > 0 ? (
                  viewingCarer.assignedForms.map(formId => {
                    const form = formsData.find(f => f.id === formId);
                    return form ? (
                      <div key={formId} style={styles.viewModalFormItem}>
                        <FaFileAlt color={colors.primary} style={{ marginRight: 8 }} />
                        {form.name}
                      </div>
                    ) : null;
                  })
                ) : (
                  <div style={{ color: colors.textLight, fontStyle: 'italic' }}>No forms assigned</div>
                )}
              </div>
            </div>
            
            <div style={styles.footer}>
              <button style={{ ...styles.button, ...styles.buttonPrimary }} onClick={() => setViewModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* FORMS MODAL */}
      {formsModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={{ 
            ...styles.modalContent, 
            maxWidth: isMobile ? "95%" : 1000,
            maxHeight: isMobile ? "95vh" : "90vh"
          }}>
            <button 
              onClick={() => setFormsModalOpen(false)} 
              style={{ 
                position: "absolute", 
                top: 12, 
                right: 12, 
                border: "none", 
                background: "none", 
                cursor: "pointer", 
                fontSize: 20 
              }}
            >
              <FaTimes />
            </button>
            <h3 style={styles.modalHeader}>Available Forms</h3>
            
            <div style={styles.formsGrid}>
              {formsData.map(form => (
                <div key={form.id} style={styles.formCard}>
                  <div style={styles.formCardHeader}>
                    <div style={styles.formCardTitle}>{form.name}</div>
                    <div style={styles.formCardType}>{form.type}</div>
                  </div>
                  <div style={styles.formCardDetails}>
                    <div style={styles.formCardVersion}>Version: {form.version}</div>
                    <div style={styles.formCardActions}>
                      <button style={{ ...styles.formCardButton, ...styles.formCardButtonOpen }}>
                        <FaFolderOpen /> Open
                      </button>
                      <button style={{ ...styles.formCardButton, ...styles.formCardButtonEdit }}>
                        <FaEdit /> Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={styles.footer}>
              <button style={{ ...styles.button, ...styles.buttonPrimary }} onClick={() => setFormsModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ASSIGN FORMS MODAL */}
      {assignModal.open && carerToAssign && (
        <div style={styles.modalOverlay}>
          <div style={{ 
            ...styles.modalContent, 
            maxWidth: isMobile ? "95%" : 600,
            maxHeight: isMobile ? "95vh" : "90vh"
          }}>
            <button 
              onClick={() => setAssignModal({ open: false, carerId: null })} 
              style={{ 
                border: "none", 
                background: "none", 
                position: "absolute", 
                right: 14, 
                top: 14, 
                fontSize: 20, 
                cursor: "pointer" 
              }}
            >
              <FaTimes />
            </button>
            <h3 style={styles.modalHeader}>Assign Forms — {carerToAssign.name}</h3>

            <div style={styles.formGrid}>
              {formsData.map(f => {
                const assigned = carerToAssign.assignedForms.includes(f.id);
                return (
                  <div
                    key={f.id}
                    style={{
                      ...styles.formTile,
                      borderColor: assigned ? colors.success : colors.lightGray,
                      backgroundColor: assigned ? `${colors.success}20` : colors.white,
                      color: assigned ? colors.success : colors.textDark
                    }}
                    onClick={() => toggleFormAssignment(f.id)}
                  >
                    {f.name}
                  </div>
                );
              })}
            </div>

            <div style={styles.footer}>
              <button 
                style={{ 
                  ...styles.button, 
                  ...styles.buttonPrimary,
                  width: isMobile ? "100%" : "auto",
                  justifyContent: isMobile ? "center" : "flex-start"
                }} 
                onClick={() => setAssignModal({ open: false, carerId: null })}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarersList;