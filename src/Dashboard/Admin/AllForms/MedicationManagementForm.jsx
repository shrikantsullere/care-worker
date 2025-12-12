import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MedicationManagementForm() {
  const navigate = useNavigate();
  
  const yesNo = ["Yes", "No"];
  const yesNoNA = ["Yes", "No", "Not seen"];

  const [form, setForm] = useState({
    careWorkerName: "",
    date: "",
    administration: {},
    prompting: {},
    selection: {},
    consent: {},
    administrationProcess: {},
    medsTypes: [],
    recordKeeping: {},
    stockControl: {},
    ordering: {},
    advice: {},
    errors: {},
    outcome: "",
    actions: [{}, {}, {}, {}],
    signatures: {
      careWorker: {},
      supervisor: {},
      manager: {}
    }
  });

  const toggleMulti = (section, value) => {
    setForm((prev) => {
      const arr = prev[section];
      return {
        ...prev,
        [section]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const updateField = (section, field, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const updateSignature = (person, field, value) => {
    setForm((prev) => ({
      ...prev,
      signatures: {
        ...prev.signatures,
        [person]: { ...prev.signatures[person], [field]: value },
      },
    }));
  };

  const handleSave = () => {
    console.log("Medication Management Form Submitted:", form);
    alert("Form saved successfully!");
    navigate("/admin/forms");
  };

  const medsList = [
    "Tablets/capsules",
    "Liquids",
    "Sachets and powders",
    "Inhaler devices",
    "Eye Drops",
    "Eye ointment",
    "Ear Drops",
    "Nose Drops",
    "Nasal sprays",
    "Creams and Ointments",
    "Transdermal patches",
  ];

  return (
    <div style={{
      maxWidth: "100vw",
      margin: "0 auto",
      fontFamily: "Segoe UI",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      borderRadius: "8px"
    }}>
      {/* Back Button */}
      <button
        onClick={() => navigate("/admin/forms")}
        style={{
          background: "#3A8DFF",
          border: "1px solid #999",
          color: "#ffffff",
          padding: "6px 14px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          marginBottom: "12px"
        }}
      >
        ← Back
      </button>

      <h2 style={{ color: "#00264D", marginBottom: "15px" }}>Care Worker – Medication Management Form</h2>

      {/* BASIC INFO */}
      <Section title="Basic Information" />
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Care Worker Name</label>
          <input
            style={inputStyle}
            value={form.careWorkerName}
            onChange={(e) => setForm({ ...form, careWorkerName: e.target.value })}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Date</label>
          <input
            type="date"
            style={inputStyle}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
      </div>

      {/* ADMINISTRATION OF MEDICINE */}
      <Section title="Administration of Medicines" />
      {[
        "Check care plan for level of support",
        "Check care plan for medication location",
        "Prepared drink / items before giving medication",
        "Followed hygiene (washed hands, gloves)"
      ].map((q, i) => (
        <YesNoRow
          key={i}
          label={q}
          value={form.administration[q]}
          onChange={(v) => updateField("administration", q, v)}
          options={yesNo}
        />
      ))}

      {/* PROMPTING */}
      <Section title="Prompting of Medication" />
      {[
        "Read instructions on packaging",
        "Correct date / time before piercing seal",
        "Observed service user take medication"
      ].map((q, i) => (
        <YesNoRow
          key={i}
          label={q}
          value={form.prompting[q]}
          onChange={(v) => updateField("prompting", q, v)}
          options={yesNo}
        />
      ))}

      {/* SELECTION & PREPARATION */}
      <Section title="Selection & Preparation of Medication" />
      {[
        "Read MAR chart accurately",
        "Checked if dose already taken or cancelled",
        "Clarified unclear directions",
        "Medication matched MAR chart",
        "Correct dose at correct time",
        "Considered food/timing restrictions",
        "Prepared medication as per MAR"
      ].map((q, i) => (
        <YesNoRow
          key={i}
          label={q}
          value={form.selection[q]}
          onChange={(v) => updateField("selection", q, v)}
          options={yesNo}
        />
      ))}

      {/* CONSENT */}
      <Section title="Consent" />
      {[
        "Obtained service user consent",
        "If no consent, followed protocol"
      ].map((q, i) => (
        <YesNoRow
          key={i}
          label={q}
          value={form.consent[q]}
          onChange={(v) => updateField("consent", q, v)}
          options={yesNo}
        />
      ))}

      {/* ADMINISTRATION PROCESS */}
      <Section title="Administration Process" />
      {[
        "Followed user preference",
        "Provided support & reassurance"
      ].map((q, i) => (
        <YesNoRow
          key={i}
          label={q}
          value={form.administrationProcess[q]}
          onChange={(v) => updateField("administrationProcess", q, v)}
          options={yesNo}
        />
      ))}

      {/* MEDICATION TYPES */}
      <Section title="Medication Types Administered" />
      <div style={{ marginBottom: "16px", backgroundColor: "#fff", padding: "10px", borderRadius: "4px" }}>
        {medsList.map((m, i) => (
          <label key={i} style={{ display: "block", marginBottom: "5px" }}>
            <input
              type="checkbox"
              checked={form.medsTypes.includes(m)}
              onChange={() => toggleMulti("medsTypes", m)}
            />{" "}
            {m}
          </label>
        ))}
      </div>

      {/* RECORD KEEPING */}
      <Section title="Record Keeping" />
      {[
        "Signed MAR chart immediately",
        "Entered correct code if not given",
        "Returned MAR chart to file"
      ].map((q, i) => (
        <YesNoRow
          key={i}
          label={q}
          value={form.recordKeeping[q]}
          onChange={(v) => updateField("recordKeeping", q, v)}
          options={yesNo}
        />
      ))}

      {/* STOCK CONTROL */}
      <Section title="Stock Control" />
      {[
        "Stock available for 1 week",
        "Action taken if shortage",
        "Medication placed back properly",
        "Checked storage requirements"
      ].map((q, i) => (
        <YesNoRow
          key={i}
          label={q}
          value={form.stockControl[q]}
          onChange={(v) => updateField("stockControl", q, v)}
          options={yesNo}
        />
      ))}

      {/* ORDERING & DISPOSAL */}
      <Section title="Ordering, Receipt & Disposal" />
      {[
        "Recorded medication received",
        "Placed new meds correctly",
        "Ordered meds if required",
        "Disposed expired meds correctly"
      ].map((q, i) => (
        <YesNoRow
          key={i}
          label={q}
          value={form.ordering[q]}
          onChange={(v) => updateField("ordering", q, v)}
          options={yesNoNA}
        />
      ))}

      {/* ADVICE */}
      <Section title="Advice & Information" />
      {[
        "Knows who to contact for advice",
        "Referred user to leaflet or professional"
      ].map((q, i) => (
        <YesNoRow
          key={i}
          label={q}
          value={form.advice[q]}
          onChange={(v) => updateField("advice", q, v)}
          options={yesNoNA}
        />
      ))}

      {/* ERRORS */}
      <Section title="Dealing with Errors" />
      <YesNoRow
        label="Checked storage requirements"
        value={form.errors["Checked storage requirements"]}
        onChange={(v) => updateField("errors", "Checked storage requirements", v)}
        options={yesNo}
      />

      {/* OUTCOME */}
      <Section title="Outcome of Assessment" />
      <div style={{ marginBottom: "16px", backgroundColor: "#fff", padding: "10px", borderRadius: "4px" }}>
        {[
          "Competent unsupervised",
          "Competent with exceptions",
          "Needs further supervision"
        ].map((o, i) => (
          <label key={i} style={{ display: "block", marginBottom: "5px" }}>
            <input
              type="radio"
              name="outcome"
              checked={form.outcome === o}
              onChange={() => setForm({ ...form, outcome: o })}
            />{" "}
            {o}
          </label>
        ))}
      </div>

      {/* SIGNATURES */}
      <Section title="Signatures" />
      <SignatureBlock
        title="Care Worker"
        data={form.signatures.careWorker}
        onChange={(f, v) => updateSignature("careWorker", f, v)}
      />
      <SignatureBlock
        title="Field Care Supervisor"
        data={form.signatures.supervisor}
        onChange={(f, v) => updateSignature("supervisor", f, v)}
      />
      <SignatureBlock
        title="Registered Manager"
        data={form.signatures.manager}
        onChange={(f, v) => updateSignature("manager", f, v)}
      />

      {/* Save Button */}
      <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
        <button
          onClick={handleSave}
          style={{
            background: "#00264D",
            color: "#fff",
            border: "none",
            padding: "12px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
            width: "100%",
            fontSize: "16px"
          }}
        >
          Save Form
        </button>
      </div>
    </div>
  );
}

/* SMALL COMPONENTS */

const labelStyle = { fontWeight: 600, marginBottom: 4, display: "block" };
const inputStyle = {
  width: "100%",
  padding: "9px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  marginBottom: "10px"
};

const Section = ({ title }) => (
  <div
    style={{
      fontWeight: 700,
      margin: "16px 0 8px",
      color: "#00264D",
      fontSize: "16px",
      borderBottom: "1px solid #ccc",
      paddingBottom: "3px"
    }}
  >
    {title}
  </div>
);

function YesNoRow({ label, value, onChange, options }) {
  return (
    <div style={{ 
      marginBottom: "10px",
      backgroundColor: "#fff",
      padding: "10px",
      borderRadius: "4px"
    }}>
      <div style={{ fontWeight: 600, marginBottom: "5px" }}>{label}</div>
      {options.map((o, i) => (
        <label key={i} style={{ marginRight: 10 }}>
          <input
            type="radio"
            checked={value === o}
            onChange={() => onChange(o)}
          />{" "}
          {o}
        </label>
      ))}
    </div>
  );
}

function SignatureBlock({ title, data, onChange }) {
  return (
    <div style={{
      backgroundColor: "#fff",
      padding: "10px",
      borderRadius: "4px",
      marginBottom: "16px"
    }}>
      <strong>{title}</strong>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Name</label>
          <input
            style={inputStyle}
            value={data.name || ""}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Signature</label>
          <input
            style={inputStyle}
            value={data.sign || ""}
            onChange={(e) => onChange("sign", e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Date</label>
          <input
            type="date"
            style={inputStyle}
            value={data.date || ""}
            onChange={(e) => onChange("date", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}