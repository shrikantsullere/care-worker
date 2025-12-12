import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReviewForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serviceUserName: "",
    serviceUserId: "",
    reviewType: "planned",
    requestedBy: "",
    dateDue: "",
    dateCarriedOut: "",
    carePlanChanges: "",
    riskChanges: "",
    carriedOutWith: {
      localAuthority: false,
      serviceUser: false,
      relatives: false,
      observations: false,
      mhProfessional: false,
      healthProfessional: false,
      hospital: false,
      other: false,
      otherText: ""
    },
    reviewCarriedBy: "",
    reviewCarriedSignature: "",
    otherPresent1: "",
    otherPresent1Signature: "",
    otherPresent2: "",
    otherPresent2Signature: "",
    professionalsInformed: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxGroup = (field) => {
    setFormData(prev => ({
      ...prev,
      carriedOutWith: {
        ...prev.carriedOutWith,
        [field]: !prev.carriedOutWith[field]
      }
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saved Data:", formData);
    alert("Review form saved successfully!");
    navigate("/admin/forms");
  };

  return (
    <div
      style={{
        maxWidth: "900px",
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
        }}
      >
        ← Back
      </button>

      <h2 style={{ color: "#00264D", marginBottom: "20px", textAlign: "center" }}>
        Review Form (Care Plan / Risk)
      </h2>

      <form onSubmit={handleSave}>

        {/* USER NAME + ID */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600 }}>Service User Name</label>
          <input
            type="text"
            name="serviceUserName"
            value={formData.serviceUserName}
            onChange={handleChange}
            required
            style={{
              width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc"
            }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600 }}>Service User ID</label>
          <input
            type="text"
            name="serviceUserId"
            value={formData.serviceUserId}
            onChange={handleChange}
            style={{
              width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc"
            }}
          />
        </div>

        {/* REVIEW TYPE */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600 }}>Review Type</label>
          <div style={{ display: "flex", gap: "16px", marginTop: "6px" }}>
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

          {formData.reviewType === "requested" && (
            <input
              type="text"
              name="requestedBy"
              placeholder="Requested by whom?"
              value={formData.requestedBy}
              onChange={handleChange}
              style={{
                marginTop: "10px", width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc"
              }}
            />
          )}
        </div>

        {/* DATE DUE + DATE CARRIED OUT */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600 }}>Date Due</label>
          <input
            type="date"
            name="dateDue"
            value={formData.dateDue}
            onChange={handleChange}
            style={{
              width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc"
            }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600 }}>Date Carried Out</label>
          <input
            type="date"
            name="dateCarriedOut"
            value={formData.dateCarriedOut}
            onChange={handleChange}
            style={{
              width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc"
            }}
          />
        </div>

        {/* CARE PLAN CHANGES */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600 }}>Changes to Service (Care Plan)</label>
          <textarea
            name="carePlanChanges"
            value={formData.carePlanChanges}
            onChange={handleChange}
            rows="3"
            style={{
              width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc"
            }}
          ></textarea>
        </div>

        {/* RISK CHANGES */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600 }}>Changes to Risks</label>
          <textarea
            name="riskChanges"
            value={formData.riskChanges}
            onChange={handleChange}
            rows="3"
            style={{
              width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc"
            }}
          ></textarea>
        </div>

        {/* CARRIED OUT WITH */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: 600 }}>Carried Out With</label>

          {[
            ["localAuthority", "Local Authority"],
            ["serviceUser", "Service User"],
            ["relatives", "Relative(s)"],
            ["observations", "Our own Observations / Assessment"],
            ["mhProfessional", "MH Professional"],
            ["healthProfessional", "Health Professional (GP / DN)"],
            ["hospital", "Hospital (NHS)"],
            ["other", "Other"]
          ].map(([field, label]) => (
            <label key={field} style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
              <input
                type="checkbox"
                checked={formData.carriedOutWith[field]}
                onChange={() => handleCheckboxGroup(field)}
              />
              {label}
            </label>
          ))}

          {formData.carriedOutWith.other && (
            <input
              type="text"
              name="otherText"
              placeholder="Please specify"
              value={formData.carriedOutWith.otherText}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  carriedOutWith: { ...prev.carriedOutWith, otherText: e.target.value }
                }))
              }
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc"
              }}
            />
          )}
        </div>

        {/* REVIEW CARRIED OUT BY */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600 }}>Review Carried Out By</label>
          <input
            type="text"
            name="reviewCarriedBy"
            value={formData.reviewCarriedBy}
            onChange={handleChange}
            style={{
              width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc"
            }}
          />

          <input
            type="text"
            name="reviewCarriedSignature"
            value={formData.reviewCarriedSignature}
            onChange={handleChange}
            placeholder="Signature"
            style={{
              marginTop: "8px",
              width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc"
            }}
          />
        </div>

        {/* OTHER PRESENT #1 */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600 }}>Other Present (1)</label>
          <input
            type="text"
            name="otherPresent1"
            value={formData.otherPresent1}
            onChange={handleChange}
            style={{
              width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc"
            }}
          />

          <input
            type="text"
            name="otherPresent1Signature"
            value={formData.otherPresent1Signature}
            placeholder="Signature"
            onChange={handleChange}
            style={{
              marginTop: "8px",
              width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc"
            }}
          />
        </div>

        {/* OTHER PRESENT #2 */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontWeight: 600 }}>Other Present (2)</label>
          <input
            type="text"
            name="otherPresent2"
            value={formData.otherPresent2}
            onChange={handleChange}
            style={{
              width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc"
            }}
          />

          <input
            type="text"
            name="otherPresent2Signature"
            value={formData.otherPresent2Signature}
            placeholder="Signature"
            onChange={handleChange}
            style={{
              marginTop: "8px",
              width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc"
            }}
          />
        </div>

        {/* PROFESSIONALS INFORMED */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: 600 }}>Other Professionals Informed of Changes</label>
          <textarea
            name="professionalsInformed"
            value={formData.professionalsInformed}
            onChange={handleChange}
            rows="3"
            style={{
              width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc"
            }}
          ></textarea>
        </div>

        {/* SAVE BUTTON */}
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
