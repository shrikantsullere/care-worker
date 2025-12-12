import React, { useState } from "react";
import { FaDownload, FaSearch, FaEye, FaTrash, FaTimes } from "react-icons/fa";

const colors = {
  primary: "#3A8DFF",
  danger: "#F44336",
  textDark: "#1E1E1E",
  textLight: "#757575",
  border: "#E6E6E6",
  bg: "#FFFFFF",
};

const Download = () => {
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

  return (
    <div style={{ padding: "14px 18px", fontFamily: "Segoe UI", minHeight: "100vh" }}>
      <h1 style={{ color: colors.textDark, fontSize: 26, marginBottom: 10 }}>Downloads</h1>
      <p style={{ color: colors.textLight, marginTop: 0, marginBottom: 14 }}>All downloadable documents & reports</p>

      {/* Search */}
      <div style={searchBox}>
        <input
          placeholder="Search downloads..."
          style={searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch style={{ color: colors.textLight }} />
      </div>

      {/* Downloads Table */}
      <div style={tableBox}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Name", "Date", "Size", "Action"].map((t) => (
                <th key={t} style={th}>{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <tr key={d.id}>
                <td style={td}>{d.name}</td>
                <td style={td}>{d.date}</td>
                <td style={td}>{d.size}</td>
                <td style={td}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <ActionBtn icon={<FaEye />} onClick={() => setPreviewData(d)} />
                    <ActionBtn icon={<FaDownload />} onClick={() => downloadFile(d.file)} />
                    <ActionBtn icon={<FaTrash />} color={colors.danger} onClick={() => deleteItem(d.id)} />
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 Modal — Preview */}
      {previewData && (
        <div style={modalBG}>
          <div style={modalCard}>
            <button style={closeBtn} onClick={() => setPreviewData(null)}>
              <FaTimes />
            </button>

            <h2 style={{ marginBottom: 6 }}>{previewData.name}</h2>
            <p style={info}><b>Date:</b> {previewData.date}</p>
            <p style={info}><b>Size:</b> {previewData.size}</p>
            <p style={info}><b>Format:</b> {previewData.type}</p>
            <p style={info}><b>Assigned To:</b> {previewData.assigned}</p>

            <div style={{ marginTop: 18, display: "flex", gap: 8 }}>
              <button style={primaryBtn} onClick={() => downloadFile(previewData.file)}>
                <FaDownload /> Download
              </button>
              <button style={dangerBtn} onClick={() => deleteItem(previewData.id)}>
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
      fontSize: 14,
      marginRight: 8
    }}
  >
    {icon} {text}
  </button>
);

/* Styles */
const searchBox = { display: "flex", alignItems: "center", border: `1px solid ${colors.border}`, borderRadius: 6, padding: "7px 10px", width: 260 };
const searchInput = { border: "none", outline: "none", flex: 1, fontSize: 14 };
const tableBox = { marginTop: 18, background: colors.bg, borderRadius: 8, padding: 14, boxShadow: "0 1px 6px rgba(0,0,0,0.08)", overflowX: "auto" };
const th = { textAlign: "left", padding: "9px 12px", color: colors.textLight, borderBottom: `1px solid ${colors.border}`, fontSize: 14 };
const td = { padding: "9px 12px", color: colors.textDark, fontSize: 14, borderBottom: `1px solid ${colors.border}` };

const modalBG = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000 };
const modalCard = { background: "#fff", padding: 18, width: "90%", maxWidth: 420, borderRadius: 8, position: "relative", boxShadow: "0 2px 12px rgba(0,0,0,0.12)" };
const closeBtn = { background: "none", border: "none", cursor: "pointer", fontSize: 20, position: "absolute", top: 8, right: 10, color: colors.textLight };
const info = { margin: "4px 0", fontSize: 14 };

const primaryBtn = { background: colors.primary, color: "#fff", border: "none", borderRadius: 6, padding: "8px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 };
const dangerBtn = { background: colors.danger, color: "#fff", border: "none", borderRadius: 6, padding: "8px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 };

export default Download;
