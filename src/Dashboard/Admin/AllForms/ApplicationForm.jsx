// ApplicationForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Complete updated Application Form component
 * - All fields from the uploaded PDF included
 * - Generic handleChange supports nested keys using dot notation (e.g. "reference1.manager")
 * - Courses array, mandatory training booleans, references, extended availability, medical questions, declaration
 * - Keeps your original styling and small components (Section, Input, Radio)
 *
 * Replace your existing component with this file.
 */

const ApplicationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Position Applied For
    position: "",
    vacancySource: "",
    vacancySourceOther: "",

    // Personal Details
    firstName: "",
    surname: "",
    phone: "",
    email: "",
    address: "",
    postcode: "",
    confirm18Plus: "",
    niNumber: "",
    dob: "",
    // Address durations
    currentFrom: "",
    currentTo: "",
    // Previous address
    previousAddress: "",
    previousPostcode: "",
    previousFrom: "",
    previousTo: "",

    emergencyContactName: "",
    emergencyContactPhone: "",
    relationship: "",

    // Employment (present/most recent)
    employer: "",
    employerAddress: "",
    employerPostcode: "",
    employerPhone: "",
    dateFrom: "",
    dateTo: "",
    reasonForLeaving: "",
    currentSalary: "",
    noticePeriod: "",

    // Employment History (multiple rows)
    employmentHistory: [
      // { employer: "", jobTitle: "", dateFrom: "", dateTo: "", reasonForLeaving: "" }
    ],

    // Courses / Qualifications
    courses: [
      // { course: "", date: "", awardingBody: "" }
    ],

    // Mandatory Training
    mandatoryTraining: {
      infectionControl: false,
      movingHandling: false,
      safeguarding: false,
      healthSafety: false,
      firstAid: false,
      medication: false,
      mentalCapacity: false,
      foodHygiene: false,
      careCertificate: false,
    },

    // References
    reference1: {
      manager: "",
      position: "",
      company: "",
      address: "",
      phone: "",
      email: "",
      salary: "",
      fax: "",
      relationship: "",
    },
    reference2: {
      manager: "",
      position: "",
      company: "",
      address: "",
      phone: "",
      email: "",
      salary: "",
      fax: "",
      relationship: "",
    },

    // DBS / Right To Work
    hasDBS: "",
    dbsLevel: "",
    dbsExpiry: "",
    dbsUpdateService: "",
    requireWorkPermit: "",

    // Availability — extended: mornings, lunches, teas, beds, sleepIn, nights, liveIn
    availability: {
      mornings: { Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false },
      lunches: { Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false },
      teas: { Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false },
      beds: { Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false },
      sleepIn: { Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false },
      nights: { Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false },
      liveIn: { Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false },
    },
    hoursPerWeek: "",
    availabilityNotes: "",

    // Equality Monitoring
    gender: "",
    age: "",
    maritalStatus: "",
    sexualOrientation: "",
    ethnicity: "",

    // Medical & Convictions
    unspentConvictions: "",
    convictionsDetails: "",
    medicalCondition: "",
    medicalDetails: "",

    // Medical Declaration detailed questions
    medicalQuestions: {
      typhoid: "",
      salmonella: "",
      infections: "",
      chestConditions: "",
      circulatory: "",
      skinDisease: "",
      migraines: "",
      mentalHealth: "",
      disabilities: "",
      medicationUse: "",
      hospitalStay: "",
      backProblems: "",
      disabilityRegistration: "",
      licenseRefused: "",
      insuranceRefused: "",
      employmentRefused: "",
      gpConsent: "",
      otherInfo: "",
    },

    // Final Declaration / Signature
    signature: "",
    fullName: "",
    signatureDate: "",
    declarationDate: "",
  });

  // Generic setter for nested keys using dot notation
  const setNestedValue = (path, value) => {
    // path like "reference1.manager" or "availability.mornings.Mon"
    const keys = path.split(".");
    setFormData(prev => {
      const copy = JSON.parse(JSON.stringify(prev)); // deep copy
      let cur = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (!(k in cur)) cur[k] = {};
        cur = cur[k];
      }
      cur[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  // Updated handleChange that supports:
  // - checkbox with name like availability.mornings.Mon
  // - radio inputs for yes/no (value "yes" / "no")
  // - nested object fields (reference1.manager etc.)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // checkbox may be nested, e.g. availability.mornings.Mon or mandatoryTraining.infectionControl
      setNestedValue(name, checked);
      return;
    }

    // For other inputs: if name contains '.', handle as nested
    if (name.includes(".")) {
      setNestedValue(name, value);
      return;
    }

    // default flat field
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Helpers to manage dynamic arrays (employmentHistory, courses)
  const addEmploymentRow = () => {
    setFormData(prev => ({
      ...prev,
      employmentHistory: [...(prev.employmentHistory || []), { employer: "", jobTitle: "", dateFrom: "", dateTo: "", reasonForLeaving: "" }]
    }));
  };
  const removeEmploymentRow = (idx) => {
    setFormData(prev => {
      const arr = [...(prev.employmentHistory || [])];
      arr.splice(idx, 1);
      return { ...prev, employmentHistory: arr };
    });
  };
  const updateEmploymentRow = (idx, key, value) => {
    setFormData(prev => {
      const arr = [...(prev.employmentHistory || [])];
      arr[idx] = { ...arr[idx], [key]: value };
      return { ...prev, employmentHistory: arr };
    });
  };

  const addCourse = () => {
    setFormData(prev => ({ ...prev, courses: [...(prev.courses || []), { course: "", date: "", awardingBody: "" }] }));
  };
  const removeCourse = (idx) => {
    setFormData(prev => {
      const arr = [...(prev.courses || [])];
      arr.splice(idx, 1);
      return { ...prev, courses: arr };
    });
  };
  const updateCourse = (idx, key, value) => {
    setFormData(prev => {
      const arr = [...(prev.courses || [])];
      arr[idx] = { ...arr[idx], [key]: value };
      return { ...prev, courses: arr };
    });
  };

  // Handler for saving / submitting form
  const handleSave = () => {
    // For now just log (you will send to backend)
    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully! Check the console for data.");
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

      <h2 style={{ color: "#00264D", marginBottom: "12px", textAlign: "center" }}>
        APPLICATION FORM – UNITE CARE LTD
      </h2>

      {/* Photo Placeholder */}
      <div style={{ border: "1px dashed #ccc", padding: "20px", textAlign: "center", marginBottom: "20px" }}>
        INSERT PHOTO HERE
      </div>

      {/* Position Applied For */}
      <Section title="Position Applied For" />
      <div style={{ marginBottom: "10px" }}>
        {["Care Worker", "Coordinator", "Supervisor", "Administrator"].map((pos) => (
          <label key={pos} style={{ marginRight: "15px" }}>
            <input
              type="radio"
              name="position"
              value={pos}
              checked={formData.position === pos}
              onChange={handleChange}
            /> {pos}
          </label>
        ))}
      </div>

      {/* Vacancy Source */}
      <Section title="Where did you hear about this vacancy?" />
      <div style={{ marginBottom: "10px" }}>
        {["Word of Mouth", "Job Centre Plus", "Our website", "Social media", "Local Press"].map((source) => (
          <label key={source} style={{ marginRight: "15px" }}>
            <input
              type="radio"
              name="vacancySource"
              value={source}
              checked={formData.vacancySource === source}
              onChange={handleChange}
            /> {source}
          </label>
        ))}
        <div style={{ marginTop: "10px" }}>
          <label>
            <input
              type="radio"
              name="vacancySource"
              value="Other"
              checked={formData.vacancySource === "Other"}
              onChange={handleChange}
            /> Other:
          </label>
          <input
            type="text"
            name="vacancySourceOther"
            value={formData.vacancySourceOther}
            onChange={handleChange}
            style={{ marginLeft: "8px", ...inputStyle, width: "220px", display: "inline-block" }}
          />
        </div>
      </div>

      {/* Personal Details */}
      <Section title="Personal Details" />
      <div style={row}>
        <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} flex />
        <Input label="Surname" name="surname" value={formData.surname} onChange={handleChange} flex />
      </div>
      <div style={row}>
        <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} flex />
        <Input label="Email" name="email" value={formData.email} onChange={handleChange} flex />
      </div>
      <Input label="Current Address" name="address" value={formData.address} onChange={handleChange} />
      <div style={row}>
        <Input label="Postcode" name="postcode" value={formData.postcode} onChange={handleChange} flex />
        <Input label="Confirm 18+ (Initial)" name="confirm18Plus" value={formData.confirm18Plus} onChange={handleChange} flex />
      </div>
      <div style={row}>
        <Input label="NI Number" name="niNumber" value={formData.niNumber} onChange={handleChange} flex />
        <Input label="Date of Birth" type="date" name="dob" value={formData.dob} onChange={handleChange} flex />
      </div>

      {/* Current Address duration */}
      <Section title="Current Address Duration" />
      <div style={row}>
        <Input label="From" type="date" name="currentFrom" value={formData.currentFrom} onChange={handleChange} flex />
        <Input label="To" type="date" name="currentTo" value={formData.currentTo} onChange={handleChange} flex />
      </div>

      {/* Previous Address */}
      <Section title="Previous Address" />
      <Input label="Previous Address" name="previousAddress" value={formData.previousAddress} onChange={handleChange} />
      <div style={row}>
        <Input label="Postcode" name="previousPostcode" value={formData.previousPostcode} onChange={handleChange} flex />
        <Input label="From" type="date" name="previousFrom" value={formData.previousFrom} onChange={handleChange} flex />
        <Input label="To" type="date" name="previousTo" value={formData.previousTo} onChange={handleChange} flex />
      </div>

      <Section title="Emergency Contact" />
      <div style={row}>
        <Input label="Name" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} flex />
        <Input label="Phone" name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleChange} flex />
      </div>
      <Input label="Relationship" name="relationship" value={formData.relationship} onChange={handleChange} />

      {/* Present or Most Recent Employment */}
      <Section title="Present or Most Recent Employment" />
      <Input label="Employer" name="employer" value={formData.employer} onChange={handleChange} />
      <Input label="Employer Address" name="employerAddress" value={formData.employerAddress} onChange={handleChange} />
      <div style={row}>
        <Input label="Postcode" name="employerPostcode" value={formData.employerPostcode} onChange={handleChange} flex />
        <Input label="Employer Phone" name="employerPhone" value={formData.employerPhone} onChange={handleChange} flex />
      </div>
      <div style={row}>
        <Input label="Date Appointed" type="date" name="dateFrom" value={formData.dateFrom} onChange={handleChange} flex />
        <Input label="Date Left" type="date" name="dateTo" value={formData.dateTo} onChange={handleChange} flex />
      </div>
      <Input label="Reason for Leaving" name="reasonForLeaving" value={formData.reasonForLeaving} onChange={handleChange} />
      <div style={row}>
        <Input label="Current Salary & Payment Terms" name="currentSalary" value={formData.currentSalary} onChange={handleChange} flex />
        <Input label="Notice Period Required" name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} flex />
      </div>

      {/* Employment History (multiple) */}
      <Section title="Employment History (From leaving school - most recent first)" />
      {(formData.employmentHistory || []).map((rowData, idx) => (
        <div key={idx} style={{ border: "1px solid #eee", padding: "10px", marginBottom: "8px", borderRadius: 6 }}>
          <div style={row}>
            <Input label="Employer" value={rowData.employer} onChange={(e) => updateEmploymentRow(idx, "employer", e.target.value)} />
            <Input label="Position" value={rowData.jobTitle} onChange={(e) => updateEmploymentRow(idx, "jobTitle", e.target.value)} />
          </div>
          <div style={row}>
            <Input label="Date From" type="date" value={rowData.dateFrom} onChange={(e) => updateEmploymentRow(idx, "dateFrom", e.target.value)} flex />
            <Input label="Date To" type="date" value={rowData.dateTo} onChange={(e) => updateEmploymentRow(idx, "dateTo", e.target.value)} flex />
          </div>
          <Input label="Reason for Leaving" value={rowData.reasonForLeaving} onChange={(e) => updateEmploymentRow(idx, "reasonForLeaving", e.target.value)} />
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" onClick={() => removeEmploymentRow(idx)} style={smallButton}>Remove</button>
          </div>
        </div>
      ))}
      <button type="button" onClick={addEmploymentRow} style={{ ...smallButton, marginBottom: 12 }}>Add Employment</button>

      {/* Courses / Qualifications */}
      <Section title="Courses / Qualifications" />
      {(formData.courses || []).map((c, i) => (
        <div key={i} style={{ border: "1px solid #eee", padding: "8px", marginBottom: "8px", borderRadius: 6 }}>
          <div style={row}>
            <Input label="Course / Training" value={c.course} onChange={(e) => updateCourse(i, "course", e.target.value)} />
            <Input label="Date" type="date" value={c.date} onChange={(e) => updateCourse(i, "date", e.target.value)} />
            <Input label="Awarding Body / Qualification" value={c.awardingBody} onChange={(e) => updateCourse(i, "awardingBody", e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" onClick={() => removeCourse(i)} style={smallButton}>Remove</button>
          </div>
        </div>
      ))}
      <button type="button" onClick={addCourse} style={{ ...smallButton, marginBottom: 12 }}>Add Course</button>

      {/* Mandatory Training */}
      <Section title="Mandatory Training & Other Courses Undertaken" />
      <div style={{ marginBottom: 8 }}>
        <p>Tick courses already completed. If not in-date, candidate will be asked to attend.</p>
        {Object.keys(formData.mandatoryTraining).map(itemKey => (
          <label key={itemKey} style={{ display: "block", marginBottom: "6px" }}>
            <input
              type="checkbox"
              name={`mandatoryTraining.${itemKey}`}
              checked={formData.mandatoryTraining[itemKey]}
              onChange={(e) => {
                // toggle value
                setFormData(prev => ({
                  ...prev,
                  mandatoryTraining: {
                    ...prev.mandatoryTraining,
                    [itemKey]: e.target.checked
                  }
                }));
              }}
            />{" "}
            {formatLabel(itemKey)}
          </label>
        ))}
      </div>

      {/* References */}
      <Section title="REFEREE 1 – CURRENT OR MOST RECENT EMPLOYER" />
      <div style={row}>
        <Input label="Manager Name" name="reference1.manager" value={formData.reference1.manager} onChange={handleChange} flex />
        <Input label="Position worked" name="reference1.position" value={formData.reference1.position} onChange={handleChange} flex />
      </div>
      <Input label="Company name" name="reference1.company" value={formData.reference1.company} onChange={handleChange} />
      <Input label="Company Address" name="reference1.address" value={formData.reference1.address} onChange={handleChange} />
      <div style={row}>
        <Input label="Telephone" name="reference1.phone" value={formData.reference1.phone} onChange={handleChange} flex />
        <Input label="Email" name="reference1.email" value={formData.reference1.email} onChange={handleChange} flex />
      </div>
      <div style={row}>
        <Input label="Salary" name="reference1.salary" value={formData.reference1.salary} onChange={handleChange} flex />
        <Input label="Fax" name="reference1.fax" value={formData.reference1.fax} onChange={handleChange} flex />
      </div>
      <Input label="Relationship to you" name="reference1.relationship" value={formData.reference1.relationship} onChange={handleChange} />

      <Section title="REFEREE 2 – PREVIOUS EMPLOYER" />
      <div style={row}>
        <Input label="Manager Name" name="reference2.manager" value={formData.reference2.manager} onChange={handleChange} flex />
        <Input label="Position worked" name="reference2.position" value={formData.reference2.position} onChange={handleChange} flex />
      </div>
      <Input label="Company name" name="reference2.company" value={formData.reference2.company} onChange={handleChange} />
      <Input label="Company Address" name="reference2.address" value={formData.reference2.address} onChange={handleChange} />
      <div style={row}>
        <Input label="Telephone" name="reference2.phone" value={formData.reference2.phone} onChange={handleChange} flex />
        <Input label="Email" name="reference2.email" value={formData.reference2.email} onChange={handleChange} flex />
      </div>
      <div style={row}>
        <Input label="Salary" name="reference2.salary" value={formData.reference2.salary} onChange={handleChange} flex />
        <Input label="Fax" name="reference2.fax" value={formData.reference2.fax} onChange={handleChange} flex />
      </div>
      <Input label="Relationship to you" name="reference2.relationship" value={formData.reference2.relationship} onChange={handleChange} />

      {/* Criminal Convictions & DBS */}
      <Section title="Criminal Convictions" />
      <div style={{ marginBottom: 8 }}>
        <p>Have you ever been cautioned / reprimanded / bound over / convicted of a crime (spent or otherwise)?</p>
        <Radio name="unspentConvictions" value={formData.unspentConvictions} onChange={handleChange} />
        <Input label="If yes, give details" name="convictionsDetails" value={formData.convictionsDetails} onChange={handleChange} />
      </div>
      <div style={{ marginBottom: 8 }}>
        <p>Are you waiting for any caution / bound over / conviction? </p>
        <Radio name="waitingConviction" value={formData.waitingConviction} onChange={handleChange} />
      </div>
      <div style={{ marginBottom: 8 }}>
        <p>Do you have current DBS check?</p>
        <Radio name="hasDBS" value={formData.hasDBS} onChange={handleChange} />
      </div>
      <div style={row}>
        <Input label="If yes, what level" name="dbsLevel" value={formData.dbsLevel} onChange={handleChange} flex />
        <Input label="Expiry date" type="date" name="dbsExpiry" value={formData.dbsExpiry} onChange={handleChange} flex />
      </div>
      <div style={{ marginBottom: 8 }}>
        <p>Do you have access to online DBS update service?</p>
        <Radio name="dbsUpdateService" value={formData.dbsUpdateService} onChange={handleChange} />
      </div>

      {/* Entitlement to Work */}
      <Section title="Entitlement to Work in the UK" />
      <p>Are you required to have a UK work permit?</p>
      <Radio name="requireWorkPermit" value={formData.requireWorkPermit} onChange={handleChange} />

      {/* Availability */}
      <Section title="Your Availability for work" />
      <div style={{ marginBottom: 10 }}>
        <p>Place a tick against ALL that apply</p>

        {/* Mornings */}
        <div style={{ marginBottom: 8 }}>
          <p>Mornings:</p>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
            <label key={`mor-${day}`} style={{ marginRight: 12 }}>
              <input
                type="checkbox"
                name={`availability.mornings.${day}`}
                checked={formData.availability.mornings[day]}
                onChange={handleChange}
              /> {day}
            </label>
          ))}
        </div>

        {/* Lunches, Teas, Beds, Sleep-in, Nights, Live-in */}
        {["lunches", "teas", "beds", "sleepIn", "nights", "liveIn"].map(slot => (
          <div key={slot} style={{ marginBottom: 8 }}>
            <p style={{ textTransform: "capitalize" }}>{slot.replace(/([A-Z])/g, " $1")}:</p>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
              <label key={`${slot}-${day}`} style={{ marginRight: 12 }}>
                <input
                  type="checkbox"
                  name={`availability.${slot}.${day}`}
                  checked={formData.availability[slot][day]}
                  onChange={handleChange}
                /> {day}
              </label>
            ))}
          </div>
        ))}

        <div style={row}>
          <Input label="Number of hours you wish to work weekly" name="hoursPerWeek" value={formData.hoursPerWeek} onChange={handleChange} flex />
          <Input label="Additional notes on your availability" name="availabilityNotes" value={formData.availabilityNotes} onChange={handleChange} flex />
        </div>
      </div>

      {/* Equality Monitoring */}
      <Section title="Equality Monitoring (Optional)" />
      <div style={{ marginBottom: 8 }}>
        <p>Gender</p>
        {["Male", "Female", "Transgender", "Prefer not to say"].map(opt => (
          <label key={opt} style={{ marginRight: 12 }}>
            <input type="radio" name="gender" value={opt} checked={formData.gender === opt} onChange={handleChange} /> {opt}
          </label>
        ))}
      </div>
      <div style={{ marginBottom: 8 }}>
        <p>Age</p>
        {["18-24", "25-34", "35-44", "45-54", "55+"].map(opt => (
          <label key={opt} style={{ marginRight: 12 }}>
            <input type="radio" name="age" value={opt} checked={formData.age === opt} onChange={handleChange} /> {opt}
          </label>
        ))}
      </div>
      <div style={row}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Marital Status</label>
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} style={inputStyle}>
            <option value="">Select</option>
            <option>Single</option>
            <option>Married</option>
            <option>Partner</option>
            <option>Civil Partnership</option>
            <option>Same Sex Married</option>
            <option>Divorced</option>
            <option>Widowed</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Sexual Orientation</label>
          <select name="sexualOrientation" value={formData.sexualOrientation} onChange={handleChange} style={inputStyle}>
            <option value="">Select</option>
            <option>Heterosexual</option>
            <option>Bisexual</option>
            <option>Lesbian</option>
            <option>Gay</option>
            <option>Prefer not to say</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Ethnicity</label>
          <input name="ethnicity" value={formData.ethnicity} onChange={handleChange} style={inputStyle} placeholder="e.g. British / Indian / ..."/>
        </div>
      </div>

      {/* Medical & Convictions */}
      <Section title="Medical & Convictions" />
      <div style={{ marginBottom: 8 }}>
        <p>Any unspent convictions?</p>
        <Radio name="unspentConvictions" value={formData.unspentConvictions} onChange={handleChange} />
        <Input label="If yes, details" name="convictionsDetails" value={formData.convictionsDetails} onChange={handleChange} />
      </div>
      <div style={{ marginBottom: 8 }}>
        <p>Any medical condition affecting care work?</p>
        <Radio name="medicalCondition" value={formData.medicalCondition} onChange={handleChange} />
        <Input label="If yes, details" name="medicalDetails" value={formData.medicalDetails} onChange={handleChange} />
      </div>

      {/* Medical Declaration detailed */}
      <Section title="Confidential Medical Declaration" />
      <p style={{ marginBottom: 8 }}>Answer the following (Yes/No). If Yes, give dates & details in 'Other info' box.</p>
      {Object.keys(formData.medicalQuestions).map(key => (
        <div key={key} style={{ marginBottom: 8 }}>
          <p style={{ marginBottom: 6 }}>{formatLabel(key)}</p>
          <div>
            <label style={{ marginRight: 12 }}>
              <input type="radio" name={`medicalQuestions.${key}`} value="no" checked={formData.medicalQuestions[key] === "no"} onChange={(e) => {
                setNestedValue(`medicalQuestions.${key}`, e.target.value);
              }} /> No
            </label>
            <label>
              <input type="radio" name={`medicalQuestions.${key}`} value="yes" checked={formData.medicalQuestions[key] === "yes"} onChange={(e) => {
                setNestedValue(`medicalQuestions.${key}`, e.target.value);
              }} /> Yes
            </label>
          </div>
        </div>
      ))}
      <Input label="Any other relevant information" name="medicalQuestions.otherInfo" value={formData.medicalQuestions.otherInfo} onChange={(e)=> setNestedValue("medicalQuestions.otherInfo", e.target.value)} />

      {/* Final Declaration */}
      <Section title="Declaration" />
      <p>I declare that the information given on this form is correct to the best of my knowledge. I consent to Unite Care Ltd holding this information in a secure place.</p>
      <div style={row}>
        <Input label="Applicant signature" name="signature" value={formData.signature} onChange={handleChange} flex />
        <Input label="Full Name (PRINT)" name="fullName" value={formData.fullName} onChange={handleChange} flex />
      </div>
      <div style={row}>
        <Input label="Date" type="date" name="declarationDate" value={formData.declarationDate} onChange={handleChange} flex />
      </div>

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
};

/* ---------- Small helper components & styles ---------- */
const row = { display: "flex", gap: "10px", flexWrap: "wrap" };
const labelStyle = { fontWeight: 600, marginBottom: 4, display: "block" };
const inputStyle = {
  width: "100%",
  padding: "9px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  boxSizing: "border-box"
};
const smallButton = {
  background: "#eee",
  border: "1px solid #ccc",
  padding: "6px 10px",
  borderRadius: 6,
  cursor: "pointer"
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

const Input = ({ label, type = "text", flex, name, value, onChange }) => (
  <div style={{ marginBottom: "10px", flex: flex && 1 }}>
    <label style={labelStyle}>{label}</label>
    <input
      type={type}
      style={inputStyle}
      name={name}
      value={value || ""}
      onChange={onChange}
    />
  </div>
);

const Radio = ({ name, value, onChange }) => (
  <div style={{ marginBottom: "10px" }}>
    <label style={{ marginRight: "20px" }}>
      <input
        type="radio"
        name={name}
        value="yes"
        checked={value === "yes"}
        onChange={onChange}
      />{" "}
      Yes
    </label>
    <label>
      <input
        type="radio"
        name={name}
        value="no"
        checked={value === "no"}
        onChange={onChange}
      />{" "}
      No
    </label>
  </div>
);

// Utility to format camelCase or keys to human label
const formatLabel = (key) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^\w/, c => c.toUpperCase());
};

export default ApplicationForm;
