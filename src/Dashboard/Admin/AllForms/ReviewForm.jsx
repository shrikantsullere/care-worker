import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReviewForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serviceUserName: "",
    serviceUserId: "",
    reviewType: "planned",
    carePlanChanges: "",
    riskChanges: "",
    reviewCarriedBy: "",
    signature: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Form data saved:", formData);
    alert("Review form saved successfully!");
    navigate("/admin/forms");
  };

  return (
    <div
      style={{
        maxWidth: "100vw",
        margin: "0 auto",
        fontFamily: "Segoe UI",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        borderRadius: "8px"
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/admin/forms")}
        style={{
          backgroundColor: "#3A8DFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          padding: "6px 12px",
          fontSize: "14px",
          cursor: "pointer",
          marginBottom: "15px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        ← Back
      </button>

      <h2 style={{ color: "#00264D", marginBottom: "20px", textAlign: "center" }}>
        Review Form (Care Plan / Risk)
      </h2>

      <form onSubmit={handleSave}>
        {/* Service User Name & ID */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600 }}>Service User Name</label>
          <input
            type="text"
            name="serviceUserName"
            value={formData.serviceUserName}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white",
            }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600 }}>Service User ID (Optional)</label>
          <input
            type="text"
            name="serviceUserId"
            value={formData.serviceUserId}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white",
            }}
          />
        </div>

        {/* Review Type */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600, display: "block", marginBottom: "6px" }}>Review Type</label>
          <div style={{ display: "flex", gap: "16px" }}>
            {["planned", "unplanned", "requested"].map(type => (
              <label key={type} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <input
                  type="radio"
                  name="reviewType"
                  value={type}
                  checked={formData.reviewType === type}
                  onChange={handleChange}
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Care Plan Changes */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600 }}>Changes to Care Plan</label>
          <textarea
            name="carePlanChanges"
            value={formData.carePlanChanges}
            onChange={handleChange}
            rows="2"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white",
            }}
          ></textarea>
        </div>

        {/* Risk Changes */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600 }}>Changes to Risks</label>
          <textarea
            name="riskChanges"
            value={formData.riskChanges}
            onChange={handleChange}
            rows="2"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white",
            }}
          ></textarea>
        </div>

        {/* Review Carried By / Signature */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600 }}>Review Carried Out By</label>
          <input
            type="text"
            name="reviewCarriedBy"
            value={formData.reviewCarriedBy}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white",
              marginBottom: "8px"
            }}
          />
          <input
            type="text"
            name="signature"
            value={formData.signature}
            onChange={handleChange}
            placeholder="Signature"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white",
            }}
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          style={{
            padding: "12px",
            width: "100%",
            backgroundColor: "#00264D",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Save Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
