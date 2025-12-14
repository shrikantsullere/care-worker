import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StaffFileIndexForm() {
  const navigate = useNavigate();

  // Staff File Index sections and items from the document
  const staffFileSections = [
    {
      title: "Section 1: Recruitment Documents",
      items: [
        "Application Form",
        "X2 Passport size photo",
        "Interview paperwork",
        "Job description",
        "2 references"
      ]
    },
    {
      title: "Section 2: Pre-employment Checks",
      items: [
        "DBS/CRB",
        "2 Proof of address",
        "NI number",
        "Passport",
        "Any other paperwork"
      ]
    },
    {
      title: "Section 3: Employment Documentation",
      items: [
        "Induction",
        "Job Offer",
        "Contract",
        "Bank Details Form",
        "Receipt of staff handbook"
      ]
    },
    {
      title: "Section 4: Performance Management",
      items: [
        "Supervisions",
        "Spot Checks",
        "Shadowing",
        "Appraisals"
      ]
    },
    {
      title: "Section 5: Training",
      items: []
    },
    {
      title: "Section 6: Other",
      items: []
    }
  ];

  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    department: "",
    position: "",
    startDate: "",
    fileIndex: staffFileSections.reduce((acc, section) => {
      section.items.forEach(item => {
        acc[item] = {
          present: false,
          date: "",
          notes: ""
        };
      });
      return acc;
    }, {}),
    trainingRecords: [],
    otherDocuments: [],
    managerSignature: "",
    managerDate: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileItemChange = (itemName, field, value) => {
    setFormData(prev => ({
      ...prev,
      fileIndex: {
        ...prev.fileIndex,
        [itemName]: {
          ...prev.fileIndex[itemName],
          [field]: field === "present" ? value : value
        }
      }
    }));
  };

  const handleSave = () => {
    console.log("Staff File Index Submitted:", formData);
    alert("Staff File Index Saved Successfully!");
    navigate("/admin/forms");
  };

  // Styles
  const container = {
    maxWidth: "100%",
    padding: "15px",
    fontFamily: "Segoe UI",
    background: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    position: "relative"
  };

  const header = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap"
  };

  const logo = {
    height: "40px",
    width: "auto",
    maxWidth: "100px",
    objectFit: "contain"
  };

  const section = {
    fontWeight: 700,
    fontSize: "16px",
    margin: "18px 0 10px",
    borderBottom: "1px solid #ccc",
    color: "#00264D",
    paddingBottom: "4px",
  };

  const input = {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "12px",
    fontSize: "16px",
    boxSizing: "border-box",
    minHeight: "48px" // Ensures touch-friendly size on mobile
  };

  const tableContainer = {
    overflowX: "auto",
    marginBottom: "20px",
    WebkitOverflowScrolling: "touch" // Improves scrolling on iOS
  };

  const table = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
    minWidth: "600px" // Ensures table doesn't get too compressed
  };

  const th = {
    backgroundColor: "#00264D",
    color: "white",
    padding: "10px",
    textAlign: "left",
    border: "1px solid #ddd",
    fontSize: "14px"
  };

  const td = {
    padding: "10px",
    border: "1px solid #ddd",
    backgroundColor: "white",
    fontSize: "14px"
  };

  const checkbox = {
    marginRight: "10px",
    marginTop: "4px",
    width: "20px",
    height: "20px" // Larger for better touch interaction
  };

  const dateInput = {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    boxSizing: "border-box"
  };

  const textInput = {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    boxSizing: "border-box"
  };

  const btn = {
    padding: "14px",
    background: "#00264D",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
    width: "100%",
    marginTop: "20px",
    border: "none",
    fontSize: "16px",
    minHeight: "48px" // Ensures touch-friendly size on mobile
  };

  const backBtn = {
    padding: "8px 16px",
    background: "#3A8DFF",
    color: "#fff",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    marginBottom: "14px",
    fontSize: "14px",
    minHeight: "40px" // Ensures touch-friendly size on mobile
  };

  const signatureContainer = {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    marginTop: "20px"
  };

  const signatureBox = {
    flex: "1",
    minWidth: "200px"
  };

  const mobileCard = {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "15px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  };

  const mobileItem = {
    marginBottom: "15px",
    borderBottom: "1px solid #eee",
    paddingBottom: "15px"
  };

  const mobileItemTitle = {
    fontWeight: "bold",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center"
  };

  const mobileItemDetails = {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  };

  const mobileDetailRow = {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  };

  const mobileDetailLabel = {
    fontWeight: "bold",
    minWidth: "80px",
    fontSize: "14px"
  };

  const mobileDetailInput = {
    flex: 1
  };

  // Detect if we're on a mobile device
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={container}>
      {/* Header with Back Button and Logo */}
      <div style={header}>
        <button onClick={() => navigate("/admin/forms")} style={backBtn}>
          ← Back
        </button>
        <img
          src="https://unitecare.org/content/images/logo.png"
          alt="Unite Care Ltd Logo"
          style={logo  }
        />
      </div>

      <h2 style={{ textAlign: "center", color: "#00264D", fontSize: "20px" }}>
        Staff File Index
      </h2>

      {/* Employee Information */}
      <div style={section}>Employee Information</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        <div style={{ flex: "1", minWidth: "200px" }}>
          <label style={{ fontWeight: "600", display: "block", marginBottom: "5px" }}>
            Employee Name:
          </label>
          <input
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleInputChange}
            style={input}
          />
        </div>
        <div style={{ flex: "1", minWidth: "200px" }}>
          <label style={{ fontWeight: "600", display: "block", marginBottom: "5px" }}>
            Employee ID:
          </label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleInputChange}
            style={input}
          />
        </div>
        <div style={{ flex: "1", minWidth: "200px" }}>
          <label style={{ fontWeight: "600", display: "block", marginBottom: "5px" }}>
            Department:
          </label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            style={input}
          />
        </div>
        <div style={{ flex: "1", minWidth: "200px" }}>
          <label style={{ fontWeight: "600", display: "block", marginBottom: "5px" }}>
            Position:
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            style={input}
          />
        </div>
        <div style={{ flex: "1", minWidth: "200px" }}>
          <label style={{ fontWeight: "600", display: "block", marginBottom: "5px" }}>
            Start Date:
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            style={input}
          />
        </div>
      </div>

      {/* Staff File Index Sections */}
      {staffFileSections.map((section, index) => (
        <div key={index}>
          <div style={section}>{section.title}</div>
          {section.items.length > 0 ? (
            isMobile ? (
              // Mobile-friendly card layout
              <div style={mobileCard}>
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} style={mobileItem}>
                    <div style={mobileItemTitle}>
                      <input
                        type="checkbox"
                        checked={formData.fileIndex[item]?.present || false}
                        onChange={(e) => handleFileItemChange(item, "present", e.target.checked)}
                        style={checkbox}
                      />
                      <span>{item}</span>
                    </div>
                    <div style={mobileItemDetails}>
                      <div style={mobileDetailRow}>
                        <div style={mobileDetailLabel}>Date:</div>
                        <div style={mobileDetailInput}>
                          <input
                            type="date"
                            value={formData.fileIndex[item]?.date || ""}
                            onChange={(e) => handleFileItemChange(item, "date", e.target.value)}
                            style={dateInput}
                          />
                        </div>
                      </div>
                      <div style={mobileDetailRow}>
                        <div style={mobileDetailLabel}>Notes:</div>
                        <div style={mobileDetailInput}>
                          <input
                            type="text"
                            value={formData.fileIndex[item]?.notes || ""}
                            onChange={(e) => handleFileItemChange(item, "notes", e.target.value)}
                            style={textInput}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Desktop table layout
              <div style={tableContainer}>
                <table style={table}>
                  <thead>
                    <tr>
                      <th style={{ width: "40%" }}>Document</th>
                      <th style={{ width: "15%" }}>Present</th>
                      <th style={{ width: "25%" }}>Date</th>
                      <th style={{ width: "20%" }}>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map((item, itemIndex) => (
                      <tr key={itemIndex}>
                        <td style={td}>{item}</td>
                        <td style={td}>
                          <input
                            type="checkbox"
                            checked={formData.fileIndex[item]?.present || false}
                            onChange={(e) => handleFileItemChange(item, "present", e.target.checked)}
                            style={checkbox}
                          />
                        </td>
                        <td style={td}>
                          <input
                            type="date"
                            value={formData.fileIndex[item]?.date || ""}
                            onChange={(e) => handleFileItemChange(item, "date", e.target.value)}
                            style={dateInput}
                          />
                        </td>
                        <td style={td}>
                          <input
                            type="text"
                            value={formData.fileIndex[item]?.notes || ""}
                            onChange={(e) => handleFileItemChange(item, "notes", e.target.value)}
                            style={textInput}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            <p style={{ fontStyle: "italic", marginBottom: "20px" }}>
              No items in this section. Please add items as needed.
            </p>
          )}
        </div>
      ))}

      {/* Manager Signature */}
      <div style={section}>Manager Confirmation</div>
      <div style={signatureContainer}>
        <div style={signatureBox}>
          <label style={{ fontWeight: "600", display: "block", marginBottom: "5px" }}>
            Signed Manager:
          </label>
          <input
            type="text"
            name="managerSignature"
            value={formData.managerSignature}
            onChange={handleInputChange}
            style={input}
          />
        </div>
        <div style={signatureBox}>
          <label style={{ fontWeight: "600", display: "block", marginBottom: "5px" }}>
            Date:
          </label>
          <input
            type="date"
            name="managerDate"
            value={formData.managerDate}
            onChange={handleInputChange}
            style={input}
          />
        </div>
      </div>

      <button onClick={handleSave} style={btn}>
        Save Staff File Index
      </button>
    </div>
  );
}