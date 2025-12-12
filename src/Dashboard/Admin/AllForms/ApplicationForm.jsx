import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApplicationForm = () => {
  const navigate = useNavigate();

  // State to store all the form data
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
    emergencyContactName: "",
    emergencyContactPhone: "",
    relationship: "",
    // Employment History
    employer: "",
    jobTitle: "",
    dateFrom: "",
    dateTo: "",
    reasonForLeaving: "",
    // DBS / Right To Work
    hasDBS: "",
    dbsLevel: "",
    dbsExpiry: "",
    dbsUpdateService: "",
    requireWorkPermit: "",
    // Availability
    availability: {
      mornings: { Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false },
      nights: { Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false },
    },
    hoursPerWeek: "",
    availabilityNotes: "",
    // Equality Monitoring
    gender: "",
    age: "",
    // Medical & Convictions
    unspentConvictions: "",
    convictionsDetails: "",
    medicalCondition: "",
    medicalDetails: "",
    // Signature
    signature: "",
    fullName: "",
    signatureDate: "",
  });

  // Handler to update state when user types in an input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      // Handle nested availability checkboxes
      if (name.includes("availability")) {
        const [time, day] = name.split(".");
        setFormData(prevState => ({
          ...prevState,
          availability: {
            ...prevState.availability,
            [time]: {
              ...prevState.availability[time],
              [day]: checked,
            },
          },
        }));
      }
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handler for form submission
  const handleSave = () => {
    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully! Check the console for the data.");
    navigate("/admin/forms");
    // Here you would typically send the data to your server
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
        SMALL APPLICATION FORM – UNITE CARE LTD
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

      {/* Where did you hear about this vacancy? */}
      <Section title="Where did you hear about this vacancy?" />
      <div style={{ marginBottom: "10px" }}>
        {["Word of Mouth", "Job Centre", "Website", "Social Media"].map((source) => (
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
            style={{ marginLeft: "5px", ...inputStyle, width: "200px", display: "inline-block" }}
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
      
      <Section title="Emergency Contact" />
      <div style={row}>
        <Input label="Name" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} flex />
        <Input label="Phone" name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleChange} flex />
      </div>
      <Input label="Relationship" name="relationship" value={formData.relationship} onChange={handleChange} />

      {/* Present or Most Recent Employment */}
      <Section title="Present or Most Recent Employment" />
      <Input label="Employer" name="employer" value={formData.employer} onChange={handleChange} />
      <Input label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
      <div style={row}>
        <Input label="Date From" type="date" name="dateFrom" value={formData.dateFrom} onChange={handleChange} flex />
        <Input label="To" type="date" name="dateTo" value={formData.dateTo} onChange={handleChange} flex />
      </div>
      <Input label="Reason for Leaving" name="reasonForLeaving" value={formData.reasonForLeaving} onChange={handleChange} />

      {/* DBS / Right To Work */}
      <Section title="DBS / Right To Work" />
      <div style={{ marginBottom: "10px" }}>
        <p>Do you have a DBS Check?</p>
        <Radio name="hasDBS" value={formData.hasDBS} onChange={handleChange} />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <p>Level:</p>
        <div>
          {["Basic", "Standard", "Enhanced"].map((level) => (
            <label key={level} style={{ marginRight: "15px" }}>
              <input
                type="radio"
                name="dbsLevel"
                value={level}
                checked={formData.dbsLevel === level}
                onChange={handleChange}
              /> {level}
            </label>
          ))}
        </div>
      </div>
      <div style={row}>
        <Input label="Expiry Date" type="date" name="dbsExpiry" value={formData.dbsExpiry} onChange={handleChange} flex />
        <div style={{ flex: 1 }}>
          <p>DBS Update Service Access?</p>
          <Radio name="dbsUpdateService" value={formData.dbsUpdateService} onChange={handleChange} />
        </div>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <p>Require UK Work Permit?</p>
        <Radio name="requireWorkPermit" value={formData.requireWorkPermit} onChange={handleChange} />
      </div>

      {/* Availability */}
      <Section title="Availability" />
      <div style={{ marginBottom: "10px" }}>
        <p>Mornings:</p>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <label key={day} style={{ marginRight: "15px" }}>
            <input
              type="checkbox"
              name={`availability.mornings.${day}`}
              checked={formData.availability.mornings[day]}
              onChange={handleChange}
            /> {day}
          </label>
        ))}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <p>Nights:</p>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <label key={day} style={{ marginRight: "15px" }}>
            <input
              type="checkbox"
              name={`availability.nights.${day}`}
              checked={formData.availability.nights[day]}
              onChange={handleChange}
            /> {day}
          </label>
        ))}
      </div>
      <div style={row}>
        <Input label="Hours/week wanted" name="hoursPerWeek" value={formData.hoursPerWeek} onChange={handleChange} flex />
        <Input label="Notes on availability" name="availabilityNotes" value={formData.availabilityNotes} onChange={handleChange} flex />
      </div>

      {/* Equality Monitoring (Optional) */}
      <Section title="Equality Monitoring (Optional)" />
      <div style={{ marginBottom: "10px" }}>
        <p>Gender</p>
        {["Male", "Female", "Trans", "Prefer not to say"].map((gender) => (
          <label key={gender} style={{ marginRight: "15px" }}>
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={formData.gender === gender}
              onChange={handleChange}
            /> {gender}
          </label>
        ))}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <p>Age</p>
        {["18–24", "25–34", "35–44", "45–54", "55+"].map((age) => (
          <label key={age} style={{ marginRight: "15px" }}>
            <input
              type="radio"
              name="age"
              value={age}
              checked={formData.age === age}
              onChange={handleChange}
            /> {age}
          </label>
        ))}
      </div>

      {/* Medical & Convictions */}
      <Section title="Medical & Convictions" />
      <div style={{ marginBottom: "10px" }}>
        <p>Any unspent convictions?</p>
        <Radio name="unspentConvictions" value={formData.unspentConvictions} onChange={handleChange} />
        <Input 
          label="Details" 
          name="convictionsDetails" 
          value={formData.convictionsDetails} 
          onChange={handleChange} 
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <p>Any medical condition affecting care work?</p>
        <Radio name="medicalCondition" value={formData.medicalCondition} onChange={handleChange} />
        <Input 
          label="Details" 
          name="medicalDetails" 
          value={formData.medicalDetails} 
          onChange={handleChange} 
        />
      </div>

      {/* Signature */}
      <Section title="Signature" />
      <Input label="Signature" name="signature" value={formData.signature} onChange={handleChange} />
      <Input label="Full Name (Print)" name="fullName" value={formData.fullName} onChange={handleChange} />
      <Input label="Date" type="date" name="signatureDate" value={formData.signatureDate} onChange={handleChange} />

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

/* Reusable Components */
const row = { display: "flex", gap: "10px", flexWrap: "wrap" };
const labelStyle = { fontWeight: 600, marginBottom: 4, display: "block" };
const inputStyle = {
  width: "100%",
  padding: "9px",
  borderRadius: "4px",
  border: "1px solid #ccc"
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
      value={value}
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

export default ApplicationForm;