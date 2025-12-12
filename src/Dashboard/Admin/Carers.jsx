import React, { useState, useEffect } from "react";
import { FaUserPlus, FaEdit, FaTrash, FaFileAlt, FaSearch, FaTimes, FaBars, FaFilter } from "react-icons/fa";

const AdminCarersUI = () => {
  const colors = {
    primary: "#3A8DFF",
    success: "#4CAF50",
    danger: "#F44336",
    textDark: "#212121",
    textLight: "#757575",
    lightGray: "#E0E0E0",
    white: "#FFFFFF",
    overlay: "rgba(0, 0, 0, 0.45)",
    bgLight: "#F5F7FA",
  };

  // State for responsive design
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth > 768 && window.innerWidth <= 1024);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890", status: "Active", assignedForms: [] },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "0987654321", status: "Active", assignedForms: [] },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "1122334455", status: "Inactive", assignedForms: [] },
  ]);

  const formsList = Array.from({ length: 26 }, (_, i) => ({ id: i + 1, name: `Form ${i + 1}` }));

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [assignModal, setAssignModal] = useState({ open: false, carerId: null });

  const [newCarer, setNewCarer] = useState({ name: "", email: "", phone: "", status: "Active" });
  const [editingCarer, setEditingCarer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Add new carer
  const handleAddCarer = () => {
    if (!newCarer.name || !newCarer.email) return alert("Name & Email required");
    const newEntry = { ...newCarer, id: Date.now(), assignedForms: [] };
    setCarers(prev => [...prev, newEntry]);
    setNewCarer({ name: "", email: "", phone: "", status: "Active" });
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

  // Filter carers by search
  const filteredCarers = carers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

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
      fontSize: isMobile ? 16 : 14 // Larger font for mobile to prevent zoom
    },
    button: { 
      padding: isMobile ? "10px 14px" : "8px 12px", 
      borderRadius: 4, 
      cursor: "pointer", 
      border: "none", 
      fontSize: isMobile ? 16 : 14, // Larger font for mobile
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
      zIndex: 1000, 
      padding: isMobile ? 8 : 12 
    },
    modalContent: { 
      background: colors.white, 
      padding: isMobile ? 16 : 18, 
      borderRadius: 8, 
      width: "100%", 
      maxWidth: isMobile ? "100%" : 440, 
      maxHeight: isMobile ? "95vh" : "auto",
      overflowY: "auto",
      position: "relative" 
    },
    modalHeader: { 
      margin: 0, 
      marginBottom: isMobile ? 16 : 12, 
      fontSize: isMobile ? 20 : 18, 
      fontWeight: 600 
    },
    formGroup: { 
      marginBottom: isMobile ? 14 : 10 
    },
    label: { 
      fontSize: isMobile ? 15 : 14, 
      fontWeight: 500, 
      marginBottom: 4, 
      display: "block" 
    },
    input: { 
      width: "100%", 
      padding: isMobile ? "12px 10px" : "9px 10px", 
      borderRadius: 4, 
      border: `1px solid ${colors.lightGray}`, 
      fontSize: isMobile ? 16 : 14 // Larger font for mobile
    },
    select: { 
      width: "100%", 
      padding: isMobile ? "12px 10px" : "9px 10px", 
      borderRadius: 4, 
      border: `1px solid ${colors.lightGray}`, 
      fontSize: isMobile ? 16 : 14 // Larger font for mobile
    },
    footer: { 
      display: "flex", 
      justifyContent: "flex-end", 
      gap: 8, 
      marginTop: isMobile ? 16 : 10 
    },
    formGrid: { 
      display: "grid", 
      gridTemplateColumns: isMobile ? "repeat(auto-fill, minmax(100px, 1fr))" : "repeat(auto-fill, minmax(110px, 1fr))", 
      gap: isMobile ? 6 : 8 
    },
    formTile: { 
      padding: isMobile ? "10px 6px" : "12px", 
      borderRadius: 6, 
      border: `1px solid ${colors.lightGray}`, 
      fontSize: isMobile ? 12 : 13, 
      cursor: "pointer", 
      textAlign: "center", 
      userSelect: "none", 
      position: "relative",
      transition: "all 0.2s ease"
    },
    // Mobile-specific card view for carers
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
    // Mobile menu
    mobileMenu: {
      position: "fixed",
      top: 0,
      right: mobileMenuOpen ? 0 : "-80%",
      width: "80%",
      maxWidth: 300,
      height: "100vh",
      backgroundColor: colors.white,
      boxShadow: "-2px 0 10px rgba(0, 0, 0, 0.1)",
      transition: "right 0.3s ease",
      zIndex: 1001,
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
    // Filter menu for mobile
    filterMenu: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      backgroundColor: colors.white,
      borderRadius: 8,
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      padding: "10px",
      zIndex: 100,
      marginTop: "5px"
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: isMobile ? 10 : 0 }}>
        <h1 style={styles.header}>Carers Management</h1>
        {isMobile && (
          <button 
            onClick={() => setMobileMenuOpen(true)}
            style={{ 
              background: "none", 
              border: "none", 
              fontSize: 20, 
              color: colors.textDark, 
              cursor: "pointer" 
            }}
          >
            <FaBars />
          </button>
        )}
      </div>
      <p style={styles.subheader}>Add carers, update details & assign forms.</p>

      {/* Mobile Menu */}
      {isMobile && (
        <div style={styles.mobileMenu}>
          <button 
            style={styles.mobileMenuClose}
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaTimes />
          </button>
          <div style={styles.mobileMenuItem}>
            <FaUserPlus /> Add Carer
          </div>
          <div style={styles.mobileMenuItem}>
            <FaFileAlt /> Forms
          </div>
        </div>
      )}

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
        {!isMobile && (
          <button onClick={() => setAddModalOpen(true)} style={{ ...styles.button, ...styles.buttonPrimary }}>
            <FaUserPlus /> Add Carer
          </button>
        )}
        {isMobile && (
          <div style={{ position: "relative" }}>
            <button 
              onClick={() => setFilterMenuOpen(!filterMenuOpen)} 
              style={{ ...styles.button, backgroundColor: colors.lightGray, color: colors.textDark }}
            >
              <FaFilter /> Filter
            </button>
            {filterMenuOpen && (
              <div style={styles.filterMenu}>
                <button 
                  onClick={() => { setAddModalOpen(true); setFilterMenuOpen(false); }} 
                  style={{ ...styles.button, ...styles.buttonPrimary, width: "100%", justifyContent: "center" }}
                >
                  <FaUserPlus /> Add Carer
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Table for Desktop, Cards for Mobile */}
      {!isMobile && (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Forms</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCarers.map(c => (
                <tr key={c.id}>
                  <td style={styles.td}>{c.name}</td>
                  <td style={styles.td}>{c.email}</td>
                  <td style={styles.td}>{c.phone}</td>
                  <td style={styles.td}>
                    <b style={{ color: c.status === "Active" ? colors.success : colors.danger }}>{c.status}</b>
                  </td>
                  <td style={styles.td}>{c.assignedForms.length} forms</td>
                  <td style={{ ...styles.td, ...styles.actions }}>
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
                  <div style={styles.carerCardLabel}>Email</div>
                  <div style={styles.carerCardValue}>{c.email}</div>
                </div>
                <div style={styles.carerCardDetail}>
                  <div style={styles.carerCardLabel}>Phone</div>
                  <div style={styles.carerCardValue}>{c.phone}</div>
                </div>
              </div>
              <div style={styles.carerCardFooter}>
                <div style={styles.carerCardForms}>{c.assignedForms.length} forms</div>
                <div style={styles.carerCardActions}>
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
            <div style={styles.footer}>
              <button style={styles.button} onClick={() => setEditModalOpen(false)}>Cancel</button>
              <button style={{ ...styles.button, background: colors.success, color: colors.white }} onClick={handleEditCarer}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* ASSIGN FORMS MODAL */}
      {assignModal.open && carerToAssign && (
        <div style={styles.modalOverlay}>
          <div style={{ 
            ...styles.modalContent, 
            maxWidth: isMobile ? "100%" : 600,
            maxHeight: isMobile ? "90vh" : "auto"
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
              {formsList.map(f => {
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

export default AdminCarersUI;