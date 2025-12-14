import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MedicationManagementForm() {
  const navigate = useNavigate();
  
  const yesNo = ["Yes", "No"];
  const yesNoNA = ["Yes", "No", "Not seen this time"];

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
    actions: [
      { action: "", byWhen: "", byWhom: "" },
      { action: "", byWhen: "", byWhom: "" },
      { action: "", byWhen: "", byWhom: "" },
      { action: "", byWhen: "", byWhom: "" },
    ],
    signatures: {
      careWorker: {},
      supervisor: {},
      manager: {}
    }
  });

  const updateField = (section, field, value) => {
    setForm(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const updateSignature = (person, field, value) => {
    setForm(prev => ({
      ...prev,
      signatures: {
        ...prev.signatures,
        [person]: { ...prev.signatures[person], [field]: value },
      },
    }));
  };

  const updateAction = (index, field, value) => {
    const newActions = [...form.actions];
    newActions[index][field] = value;
    setForm(prev => ({ ...prev, actions: newActions }));
  };

  const toggleMulti = (section, value) => {
    setForm(prev => ({
      ...prev,
      [section]: prev[section].includes(value)
        ? prev[section].filter(v => v !== value)
        : [...prev[section], value],
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
      maxWidth: "900px",
      margin: "0 auto",
      fontFamily: "Segoe UI",
      padding: "16px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      position: "relative"
    }}>
      
      {/* Header with Logo */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "14px",
        flexWrap: "wrap"
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={() => navigate("/admin/forms")}
            style={{
              background: "#3A8DFF",
              color: "#fff",
              padding: "6px 14px",
              borderRadius: "4px",
              cursor: "pointer",
              border: "none",
              marginRight: "15px"
            }}
          >
            ← Back
          </button>
          <h2 style={{ 
            color: "#00264D", 
            margin: 0,
            fontSize: window.innerWidth < 768 ? "20px" : "24px"
          }}>
            Care Worker – Medication Management Assessment
          </h2>
        </div>
        <img 
          src="https://unitecare.org/content/images/logo.png" 
          alt="Unite Care Logo" 
          style={{
            height: "60px",
            maxWidth: "150px",
            objectFit: "contain"
          }}
        />
      </div>

      {/* BASIC INFO */}
      <Section title="Basic Information" />
      <ResponsiveTwoCol>
        <Input label="Care Worker Name" value={form.careWorkerName} 
          onChange={(v) => setForm({ ...form, careWorkerName: v })} />
        <Input label="Date" type="date" value={form.date}
          onChange={(v) => setForm({ ...form, date: v })} />
      </ResponsiveTwoCol>

      {/* ADMINISTRATION OF MEDICINES */}
      <Section title="Administration of Medicines – Preparation & Hygiene" />
      {[
        "Checked care plan for level of support",
        "Checked where medication is kept",
        "Prepared drink / items before medication",
        "Washed hands & used hygiene / gloves"
      ].map(q => (
        <YesNoRow key={q} label={q} value={form.administration[q]}
          onChange={(v) => updateField("administration", q, v)} options={yesNo} />
      ))}

      {/* PROMPTING */}
      <Section title="Prompting of Medication" />
      {[
        "Read instructions on packaging",
        "Checked date/time before piercing seal",
        "Observed service user take medication"
      ].map(q => (
        <YesNoRow key={q} label={q} value={form.prompting[q]}
          onChange={(v) => updateField("prompting", q, v)} options={yesNo} />
      ))}

      {/* SELECTION & PREPARATION */}
      <Section title="Selection & Preparation of Medication" />
      {[
        "Read MAR chart accurately",
        "Checked if dose already taken / cancelled",
        "Clarified unclear directions on MAR",
        "Medication matched MAR chart",
        "MAR directions differed from label → took proper steps",
        "Correct dose at correct time (considered food/timing)",
        "Prepared medication as per MAR"
      ].map(q => (
        <YesNoRow key={q} label={q} value={form.selection[q]}
          onChange={(v) => updateField("selection", q, v)} options={yesNo} />
      ))}

      {/* CONSENT */}
      <Section title="Consent" />
      {[
        "Obtained service user consent",
        "If no consent → followed protocol (best interest)"
      ].map(q => (
        <YesNoRow key={q} label={q} value={form.consent[q]}
          onChange={(v) => updateField("consent", q, v)} options={yesNo} />
      ))}

      {/* ADMINISTRATION PROCESS */}
      <Section title="Administration Process" />
      {[
        "Followed service user preference",
        "Offered support & reassurance",
        "Offered water where appropriate",
        "Witnessed the service user take all medication",
        "Recorded immediately on MAR",
        "If left for later → followed plan correctly",
        "If not taken → advice sought & documented"
      ].map(q => (
        <YesNoRow key={q} label={q} value={form.administrationProcess[q]}
          onChange={(v) => updateField("administrationProcess", q, v)} 
          options={yesNoNA} />
      ))}

      {/* MEDICATION FORMS */}
      <Section title="Medication Forms Administered" />
      <div style={box}>
        {medsList.map(m => (
          <label key={m} style={{ display: "block", marginBottom: 4 }}>
            <input type="checkbox"
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
        "Returned MAR to file"
      ].map(q => (
        <YesNoRow key={q} label={q} value={form.recordKeeping[q]}
          onChange={(v) => updateField("recordKeeping", q, v)} options={yesNo} />
      ))}

      {/* STOCK CONTROL */}
      <Section title="Stock Control" />
      {[
        "Stock available for 1 week",
        "Appropriate action taken if shortage",
        "Medication returned properly",
        "Checked storage requirements"
      ].map(q => (
        <YesNoRow key={q} label={q} value={form.stockControl[q]}
          onChange={(v) => updateField("stockControl", q, v)} options={yesNo} />
      ))}

      {/* ORDERING */}
      <Section title="Ordering, Receipt & Disposal" />
      {[
        "Recorded medication received",
        "Placed new meds correctly",
        "Ordered meds if needed",
        "Disposed expired meds correctly"
      ].map(q => (
        <YesNoRow key={q} label={q} value={form.ordering[q]}
          onChange={(v) => updateField("ordering", q, v)} options={yesNoNA} />
      ))}

      {/* ADVICE */}
      <Section title="Advice & Information" />
      {[
        "Knows who to contact for advice",
        "Referred user to leaflet / professional"
      ].map(q => (
        <YesNoRow key={q} label={q} value={form.advice[q]}
          onChange={(v) => updateField("advice", q, v)} options={yesNoNA} />
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
      <div style={box}>
        {[
          "Competent unsupervised",
          "Competent with exceptions",
          "Needs further supervision"
        ].map(opt => (
          <label key={opt} style={{ display: "block", marginBottom: 4 }}>
            <input type="radio" name="outcome"
              checked={form.outcome === opt}
              onChange={() => setForm({ ...form, outcome: opt })}
            />{" "}
            {opt}
          </label>
        ))}
      </div>

      {/* ACTIONS */}
      <Section title="Actions / Exceptions Identified" />
      {form.actions.map((row, i) => (
        <div key={i} style={actionRow}>
          <InputCompact
            placeholder="Action"
            value={row.action}
            onChange={(v) => updateAction(i, "action", v)}
          />
          <InputCompact
            placeholder="By When"
            type="date"
            value={row.byWhen}
            onChange={(v) => updateAction(i, "byWhen", v)}
          />
          <InputCompact
            placeholder="By Whom"
            value={row.byWhom}
            onChange={(v) => updateAction(i, "byWhom", v)}
          />
        </div>
      ))}

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

      {/* SAVE BUTTON */}
      <button
        onClick={handleSave}
        style={{
          background: "#00264D",
          color: "#fff",
          padding: "12px",
          borderRadius: "5px",
          width: "100%",
          marginTop: "18px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Save Form
      </button>
    </div>
  );
}

/* ===== COMPONENTS ===== */

const box = {
  background: "#fff",
  padding: "10px",
  borderRadius: "6px",
  marginBottom: "16px"
};

const actionRow = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginBottom: "10px"
};

const Section = ({ title }) => (
  <div style={{
    fontWeight: 700,
    marginTop: "18px",
    marginBottom: "10px",
    color: "#00264D",
    fontSize: "17px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "3px"
  }}>
    {title}
  </div>
);

function YesNoRow({ label, value, onChange, options }) {
  return (
    <div style={box}>
      <div style={{ fontWeight: 600, marginBottom: "6px" }}>{label}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {options.map(opt => (
          <label key={opt} style={{ marginRight: "14px" }}>
            <input type="radio" checked={value === opt} onChange={() => onChange(opt)} /> {opt}
          </label>
        ))}
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type="text" }) {
  return (
    <div style={{ flex: 1, minWidth: "250px" }}>
      <label style={{ fontWeight: 600 }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "9px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginTop: "4px",
          background: "#fff",
          boxSizing: "border-box"
        }}
      />
    </div>
  );
}

function InputCompact({ placeholder, value, onChange, type="text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        flex: 1,
        padding: "9px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        minWidth: "120px",
        background: "#fff",
        boxSizing: "border-box"
      }}
    />
  );
}

function ResponsiveTwoCol({ children }) {
  return (
    <div style={{ 
      display: "flex", 
      gap: "14px", 
      flexWrap: "wrap" 
    }}>
      {children}
    </div>
  );
}

function SignatureBlock({ title, data, onChange }) {
  return (
    <div style={box}>
      <strong>{title}</strong>
      <ResponsiveTwoCol>
        <Input label="Name" value={data.name || ""} onChange={(v) => onChange("name", v)} />
        <Input label="Signature" value={data.sign || ""} onChange={(v) => onChange("sign", v)} />
        <Input label="Date" type="date" value={data.date || ""} onChange={(v) => onChange("date", v)} />
      </ResponsiveTwoCol>
    </div>
  );
}