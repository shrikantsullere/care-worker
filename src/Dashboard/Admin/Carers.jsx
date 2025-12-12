// import React, { useState } from "react";
// import { FaUserPlus, FaEdit, FaTrash, FaFileAlt, FaSearch, FaTimes } from "react-icons/fa";

// const AdminCarersUI = () => {
//   const colors = {
//     primary: "#3A8DFF",
//     success: "#4CAF50",
//     danger: "#F44336",
//     textDark: "#212121",
//     textLight: "#757575",
//     lightGray: "#E0E0E0",
//     white: "#FFFFFF",
//     overlay: "rgba(0, 0, 0, 0.45)",
//   };

//   const [carers, setCarers] = useState([
//     { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890", status: "Active", assignedForms: [] },
//     { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "0987654321", status: "Active", assignedForms: [] },
//     { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "1122334455", status: "Inactive", assignedForms: [] },
//   ]);

//   const formsList = Array.from({ length: 26 }, (_, i) => ({ id: i + 1, name: `Form ${i + 1}` }));

//   const [addModalOpen, setAddModalOpen] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [assignModal, setAssignModal] = useState({ open: false, carerId: null });

//   const [newCarer, setNewCarer] = useState({ name: "", email: "", phone: "", status: "Active" });
//   const [editingCarer, setEditingCarer] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleAddCarer = () => {
//     if (!newCarer.name || !newCarer.email) return alert("Name & Email required");
//     setCarers([...carers, { ...newCarer, id: Date.now() }]);
//     setNewCarer({ name: "", email: "", phone: "", status: "Active" });
//     setAddModalOpen(false);
//   };

//   const handleEditCarer = () => {
//     if (!editingCarer.name || !editingCarer.email) return alert("Name & Email required");
//     setCarers(carers.map(c => (c.id === editingCarer.id ? editingCarer : c)));
//     setEditModalOpen(false);
//   };

//   const handleDeleteCarer = id => {
//     if (window.confirm("Delete this carer?")) setCarers(carers.filter(c => c.id !== id));
//   };

//   const toggleFormAssignment = formId => {
//     setCarers(carers.map(carer =>
//       carer.id === assignModal.carerId
//         ? {
//             ...carer,
//             assignedForms: carer.assignedForms.includes(formId)
//               ? carer.assignedForms.filter(f => f !== formId)
//               : [...carer.assignedForms, formId],
//           }
//         : carer
//     ));
//   };

//   const filteredCarers = carers.filter(c =>
//     c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     c.phone.includes(searchTerm)
//   );

//   const carerToAssign = carers.find(c => c.id === assignModal.carerId);

//   const styles = {
//     container: { padding: "14px 18px", fontFamily: "Segoe UI" },
//     header: { margin: 0, color: colors.textDark, fontWeight: 600, fontSize: 22 },
//     subheader: { color: colors.textLight, marginBottom: 14, marginTop: 2, fontSize: 14 },

//     controlsBar: { display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 12, flexWrap: "wrap" },
//     searchBox: { display: "flex", alignItems: "center", border: `1px solid ${colors.lightGray}`, borderRadius: 4, padding: "6px 10px", flex: 1, minWidth: 220 },
//     searchInput: { border: "none", outline: "none", marginLeft: 8, width: "100%", fontSize: 14 },

//     button: { padding: "8px 12px", borderRadius: 4, cursor: "pointer", border: "none", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 7 },
//     buttonPrimary: { backgroundColor: colors.primary, color: colors.white },

//     tableWrapper: { overflowX: "auto", borderRadius: 6 },
//     table: { width: "100%", borderCollapse: "collapse", background: colors.white },
//     th: { padding: "10px 8px", borderBottom: `2px solid ${colors.lightGray}`, color: colors.textDark, fontWeight: 600, fontSize: 13, whiteSpace: "nowrap" },
//     td: { padding: "9px 8px", borderBottom: `1px solid ${colors.lightGray}`, fontSize: 14 },
//     actions: { display: "flex", gap: 8 },

//     iconBtn: { border: "none", background: "none", fontSize: 17, cursor: "pointer", padding: 2 },

//     modalOverlay: { position: "fixed", inset: 0, background: colors.overlay, display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: 12 },
//     modalContent: { background: colors.white, padding: 18, borderRadius: 8, width: "100%", maxWidth: 440 },
//     modalHeader: { margin: 0, marginBottom: 12, fontSize: 18, fontWeight: 600 },

//     formGroup: { marginBottom: 10 },
//     label: { fontSize: 14, fontWeight: 500, marginBottom: 4, display: "block" },
//     input: { width: "100%", padding: "9px 10px", borderRadius: 4, border: `1px solid ${colors.lightGray}`, fontSize: 14 },
//     select: { width: "100%", padding: "9px 10px", borderRadius: 4, border: `1px solid ${colors.lightGray}`, fontSize: 14 },

//     footer: { display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 10 },

//     formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 8 },
//     formTile: { padding: "12px", borderRadius: 6, border: `1px solid ${colors.lightGray}`, fontSize: 13, cursor: "pointer", textAlign: "center", userSelect: "none", position: "relative" },
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.header}>Carers Management</h1>
//       <p style={styles.subheader}>Add carers, update details & assign forms.</p>

//       {/* Controls */}
//       <div style={styles.controlsBar}>
//         <div style={styles.searchBox}>
//           <FaSearch size={15} color={colors.textLight} />
//           <input style={styles.searchInput} placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
//         </div>
//         <button onClick={() => setAddModalOpen(true)} style={{ ...styles.button, ...styles.buttonPrimary }}>
//           <FaUserPlus /> Add Carer
//         </button>
//       </div>

//       {/* Table */}
//       <div style={styles.tableWrapper}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>Name</th>
//               <th style={styles.th}>Email</th>
//               <th style={styles.th}>Phone</th>
//               <th style={styles.th}>Status</th>
//               <th style={styles.th}>Forms</th>
//               <th style={styles.th}>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredCarers.map(c => (
//               <tr key={c.id}>
//                 <td style={styles.td}>{c.name}</td>
//                 <td style={styles.td}>{c.email}</td>
//                 <td style={styles.td}>{c.phone}</td>
//                 <td style={styles.td}>
//                   <b style={{ color: c.status === "Active" ? colors.success : colors.danger }}>{c.status}</b>
//                 </td>
//                 <td style={styles.td}>{c.assignedForms.length} forms</td>
//                 <td style={{ ...styles.td, ...styles.actions }}>
//                   <button style={{ ...styles.iconBtn, color: colors.primary }} onClick={() => setAssignModal({ open: true, carerId: c.id })}><FaFileAlt /></button>
//                   <button style={{ ...styles.iconBtn, color: colors.success }} onClick={() => { setEditingCarer(c); setEditModalOpen(true); }}><FaEdit /></button>
//                   <button style={{ ...styles.iconBtn, color: colors.danger }} onClick={() => handleDeleteCarer(c.id)}><FaTrash /></button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ADD MODAL */}
//       {addModalOpen && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <h3 style={styles.modalHeader}>Add Carer</h3>
//             {["name", "email", "phone"].map(key => (
//               <div key={key} style={styles.formGroup}>
//                 <label style={styles.label}>{key.toUpperCase()}</label>
//                 <input style={styles.input} value={newCarer[key]} onChange={e => setNewCarer({ ...newCarer, [key]: e.target.value })} />
//               </div>
//             ))}
//             <div style={styles.formGroup}>
//               <label style={styles.label}>STATUS</label>
//               <select style={styles.select} value={newCarer.status} onChange={e => setNewCarer({ ...newCarer, status: e.target.value })}>
//                 <option>Active</option><option>Inactive</option>
//               </select>
//             </div>
//             <div style={styles.footer}>
//               <button style={styles.button} onClick={() => setAddModalOpen(false)}>Cancel</button>
//               <button style={{ ...styles.button, ...styles.buttonPrimary }} onClick={handleAddCarer}>Add</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* EDIT MODAL */}
//       {editModalOpen && editingCarer && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <h3 style={styles.modalHeader}>Edit Carer</h3>
//             {["name", "email", "phone"].map(key => (
//               <div key={key} style={styles.formGroup}>
//                 <label style={styles.label}>{key.toUpperCase()}</label>
//                 <input style={styles.input} value={editingCarer[key]} onChange={e => setEditingCarer({ ...editingCarer, [key]: e.target.value })} />
//               </div>
//             ))}
//             <div style={styles.formGroup}>
//               <label style={styles.label}>STATUS</label>
//               <select style={styles.select} value={editingCarer.status} onChange={e => setEditingCarer({ ...editingCarer, status: e.target.value })}>
//                 <option>Active</option><option>Inactive</option>
//               </select>
//             </div>
//             <div style={styles.footer}>
//               <button style={styles.button} onClick={() => setEditModalOpen(false)}>Cancel</button>
//               <button style={{ ...styles.button, background: colors.success, color: colors.white }} onClick={handleEditCarer}>Save</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ASSIGN FORMS MODAL */}
//       {assignModal.open && carerToAssign && (
//         <div style={styles.modalOverlay}>
//           <div style={{ ...styles.modalContent, maxWidth: 600 }}>
//             <button onClick={() => setAssignModal({ open: false, carerId: null })} style={{ border: "none", background: "none", position: "absolute", right: 14, top: 14, fontSize: 20, cursor: "pointer" }}><FaTimes /></button>
//             <h3 style={styles.modalHeader}>Assign Forms — {carerToAssign.name}</h3>

//             <div style={styles.formGrid}>
//               {formsList.map(f => {
//                 const assigned = carerToAssign.assignedForms.includes(f.id);
//                 return (
//                   <div
//                     key={f.id}
//                     style={{
//                       ...styles.formTile,
//                       borderColor: assigned ? colors.success : colors.lightGray,
//                       backgroundColor: assigned ? `${colors.success}20` : colors.white,
//                       color: assigned ? colors.success : colors.textDark
//                     }}
//                     onClick={() => toggleFormAssignment(f.id)}
//                   >
//                     {f.name}
//                   </div>
//                 );
//               })}
//             </div>

//             <div style={styles.footer}>
//               <button style={{ ...styles.button, ...styles.buttonPrimary }} onClick={() => setAssignModal({ open: false, carerId: null })}>
//                 Done
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default AdminCarersUI;



// update

import React, { useState } from "react";
import { FaUserPlus, FaEdit, FaTrash, FaFileAlt, FaSearch, FaTimes } from "react-icons/fa";

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
  };

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

  // Styles
  const styles = {
    container: { padding: "14px 18px", fontFamily: "Segoe UI" },
    header: { margin: 0, color: colors.textDark, fontWeight: 600, fontSize: 22 },
    subheader: { color: colors.textLight, marginBottom: 14, marginTop: 2, fontSize: 14 },
    controlsBar: { display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 12, flexWrap: "wrap" },
    searchBox: { display: "flex", alignItems: "center", border: `1px solid ${colors.lightGray}`, borderRadius: 4, padding: "6px 12px", flex: 1, minWidth: 220 },
    searchInput: { border: "none", outline: "none", marginLeft: 8, width: "100%", fontSize: 14 },
    button: { padding: "8px 12px", borderRadius: 4, cursor: "pointer", border: "none", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 7 },
    buttonPrimary: { backgroundColor: colors.primary, color: colors.white },
    tableWrapper: { overflowX: "auto", borderRadius: 6 },
    table: { width: "100%", borderCollapse: "collapse", background: colors.white },
    th: { padding: "10px 8px", borderBottom: `2px solid ${colors.lightGray}`, color: colors.textDark, fontWeight: 600, fontSize: 13, whiteSpace: "nowrap" },
    td: { padding: "9px 8px", borderBottom: `1px solid ${colors.lightGray}`, fontSize: 14 },
    actions: { display: "flex", gap: 8 },
    iconBtn: { border: "none", background: "none", fontSize: 17, cursor: "pointer", padding: 2 },
    modalOverlay: { position: "fixed", inset: 0, background: colors.overlay, display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: 12 },
    modalContent: { background: colors.white, padding: 18, borderRadius: 8, width: "100%", maxWidth: 440, position: "relative" },
    modalHeader: { margin: 0, marginBottom: 12, fontSize: 18, fontWeight: 600 },
    formGroup: { marginBottom: 10 },
    label: { fontSize: 14, fontWeight: 500, marginBottom: 4, display: "block" },
    input: { width: "100%", padding: "9px 10px", borderRadius: 4, border: `1px solid ${colors.lightGray}`, fontSize: 14 },
    select: { width: "100%", padding: "9px 10px", borderRadius: 4, border: `1px solid ${colors.lightGray}`, fontSize: 14 },
    footer: { display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 10 },
    formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 8 },
    formTile: { padding: "12px", borderRadius: 6, border: `1px solid ${colors.lightGray}`, fontSize: 13, cursor: "pointer", textAlign: "center", userSelect: "none", position: "relative" },
  };

  return (
    <div style={styles.container}>
      <h1 style={{ color: colors.textDark, fontSize: 26, marginBottom: 10 }}>Carers Management</h1>
      <p style={styles.subheader}>Add carers, update details & assign forms.</p>

      {/* Controls */}
      <div style={styles.controlsBar}>
        <div style={styles.searchBox}>
          <FaSearch size={15} color={colors.textLight} />
          <input style={styles.searchInput} placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <button onClick={() => setAddModalOpen(true)} style={{ ...styles.button, ...styles.buttonPrimary }}>
          <FaUserPlus /> Add Carer
        </button>
      </div>

      {/* Table */}
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
                  <button style={{ ...styles.iconBtn, color: colors.primary }} onClick={() => setAssignModal({ open: true, carerId: c.id })}><FaFileAlt /></button>
                  <button style={{ ...styles.iconBtn, color: colors.success }} onClick={() => { setEditingCarer(c); setEditModalOpen(true); }}><FaEdit /></button>
                  <button style={{ ...styles.iconBtn, color: colors.danger }} onClick={() => handleDeleteCarer(c.id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD MODAL */}
      {addModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button onClick={() => setAddModalOpen(false)} style={{ position: "absolute", top: 12, right: 12, border: "none", background: "none", cursor: "pointer", fontSize: 20 }}><FaTimes /></button>
            <h3 style={styles.modalHeader}>Add Carer</h3>
            {["name", "email", "phone"].map(key => (
              <div key={key} style={styles.formGroup}>
                <label style={styles.label}>{key.toUpperCase()}</label>
                <input style={styles.input} value={newCarer[key]} onChange={e => setNewCarer({ ...newCarer, [key]: e.target.value })} />
              </div>
            ))}
            <div style={styles.formGroup}>
              <label style={styles.label}>STATUS</label>
              <select style={styles.select} value={newCarer.status} onChange={e => setNewCarer({ ...newCarer, status: e.target.value })}>
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
            <button onClick={() => setEditModalOpen(false)} style={{ position: "absolute", top: 12, right: 12, border: "none", background: "none", cursor: "pointer", fontSize: 20 }}><FaTimes /></button>
            <h3 style={styles.modalHeader}>Edit Carer</h3>
            {["name", "email", "phone"].map(key => (
              <div key={key} style={styles.formGroup}>
                <label style={styles.label}>{key.toUpperCase()}</label>
                <input style={styles.input} value={editingCarer[key]} onChange={e => setEditingCarer({ ...editingCarer, [key]: e.target.value })} />
              </div>
            ))}
            <div style={styles.formGroup}>
              <label style={styles.label}>STATUS</label>
              <select style={styles.select} value={editingCarer.status} onChange={e => setEditingCarer({ ...editingCarer, status: e.target.value })}>
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
          <div style={{ ...styles.modalContent, maxWidth: 600 }}>
            <button onClick={() => setAssignModal({ open: false, carerId: null })} style={{ border: "none", background: "none", position: "absolute", right: 14, top: 14, fontSize: 20, cursor: "pointer" }}><FaTimes /></button>
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
              <button style={{ ...styles.button, ...styles.buttonPrimary }} onClick={() => setAssignModal({ open: false, carerId: null })}>
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
