import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Reusable Components (using the styles object) ---
const Input = ({ label, type = "text", name, value, onChange, disabled }) => (
  <div style={{ flex: 1, minWidth: "200px" }}>
    <label style={styles.label}>{label}</label>
    <input type={type} style={styles.input} name={name} value={value} onChange={onChange} disabled={disabled} />
  </div>
);

const Textarea = ({ label, name, value, onChange, disabled, rows = "3" }) => (
  <div style={{ width: "100%", gridColumn: '1 / -1' }}>
    <label style={styles.label}>{label}</label>
    <textarea style={styles.textarea} name={name} value={value} onChange={onChange} disabled={disabled} rows={rows} />
  </div>
);

const Select = ({ label, name, value, onChange, disabled, children }) => (
  <div style={{ flex: 1, minWidth: "200px" }}>
    <label style={styles.label}>{label}</label>
    <select style={styles.select} name={name} value={value} onChange={onChange} disabled={disabled}>
      {children}
    </select>
  </div>
);

const Section = ({ title }) => (
  <div style={styles.sectionHeader}>
    {title}
  </div>
);

const CareAssessmentForm = () => {
  const navigate = useNavigate();
  const [isEditMode] = useState(true); // Assuming edit mode is always true for this example

  // State for all form sections
  const [clientInfo, setClientInfo] = useState({
    title: '',
    firstName: '',
    lastName: '',
    preferredName: '',
    dateOfBirth: ''
  });

  const [contactDetails, setContactDetails] = useState({
    primaryPhone: '',
    phoneType: '',
    address: '',
    secureCheckInZone: '',
    accessDetails: ''
  });

  const [cultureReligion, setCultureReligion] = useState({
    ethnicity: '',
    religion: '',
    impactOnCare: ''
  });

  const [medicalInfo, setMedicalInfo] = useState({
    medicalConditions: '',
    allergiesIntolerances: '',
    nhsNumber: ''
  });

  const [medicationSupport, setMedicationSupport] = useState({
    medicationType: '',
    medicationTiming: '',
    supportLevel: '',
    prnMedication: ''
  });

  const [nutritionHydration, setNutritionHydration] = useState({
    appetite: '',
    canFeedThemselves: '',
    weight: '',
    dietaryLikes: '',
    dietaryRestrictions: ''
  });

  const [personalCare, setPersonalCare] = useState({
    washingAbility: '',
    dressingAbility: '',
    toiletingNeeds: ''
  });

  const [mobility, setMobility] = useState({
    mobilityLevel: '',
    mobilityAids: '',
    historyOfFalls: ''
  });

  const [dailyLiving, setDailyLiving] = useState({
    housekeepingSupport: '',
    shoppingSupport: '',
    laundrySupport: '',
    financialManagement: ''
  });

  const [risksMitigation, setRisksMitigation] = useState({
    identifiedRisks: '',
    mitigationPlan: ''
  });

  // Handler functions for each section
  const handleClientInfoChange = (e) => {
    const { name, value } = e.target;
    setClientInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleContactDetailsChange = (e) => {
    const { name, value } = e.target;
    setContactDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleCultureReligionChange = (e) => {
    const { name, value } = e.target;
    setCultureReligion(prev => ({ ...prev, [name]: value }));
  };

  const handleMedicalInfoChange = (e) => {
    const { name, value } = e.target;
    setMedicalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleMedicationSupportChange = (e) => {
    const { name, value } = e.target;
    setMedicationSupport(prev => ({ ...prev, [name]: value }));
  };

  const handleNutritionHydrationChange = (e) => {
    const { name, value } = e.target;
    setNutritionHydration(prev => ({ ...prev, [name]: value }));
  };

  const handlePersonalCareChange = (e) => {
    const { name, value } = e.target;
    setPersonalCare(prev => ({ ...prev, [name]: value }));
  };

  const handleMobilityChange = (e) => {
    const { name, value } = e.target;
    setMobility(prev => ({ ...prev, [name]: value }));
  };

  const handleDailyLivingChange = (e) => {
    const { name, value } = e.target;
    setDailyLiving(prev => ({ ...prev, [name]: value }));
  };

  const handleRisksMitigationChange = (e) => {
    const { name, value } = e.target;
    setRisksMitigation(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // In a real application, this would save form data
    const formData = {
      clientInfo,
      contactDetails,
      cultureReligion,
      medicalInfo,
      medicationSupport,
      nutritionHydration,
      personalCare,
      mobility,
      dailyLiving,
      risksMitigation
    };
    console.log('Form saved:', formData);
    alert('Care assessment form saved successfully!');
    navigate('/admin/forms');
  };

  return (
    <div style={styles.container}>
      {/* Header with Logo and Back Button */}
      <div style={styles.header}>
        <button onClick={() => navigate('/admin/forms')} style={styles.backButton}>
          ← Back
        </button>
        <img src="https://unitecare.org/content/images/logo.png" alt="Unite Care Ltd Logo" style={styles.logo} />
      </div>

      <h2 style={styles.mainTitle}>Care Assessment / Individual Care Plan</h2>

      {/* Form Content */}
      <div style={styles.formContent}>
        <form onSubmit={handleSave}>
          {/* SECTION 1: Client Information */}
          <Section title="Client Information" />
          <div style={styles.row}>
            <Input label="Title" name="title" value={clientInfo.title} onChange={handleClientInfoChange} disabled={!isEditMode} />
            <Input label="First Name" name="firstName" value={clientInfo.firstName} onChange={handleClientInfoChange} disabled={!isEditMode} />
          </div>
          <div style={styles.row}>
            <Input label="Last Name" name="lastName" value={clientInfo.lastName} onChange={handleClientInfoChange} disabled={!isEditMode} />
            <Input label="Preferred Name / Pronouns" name="preferredName" value={clientInfo.preferredName} onChange={handleClientInfoChange} disabled={!isEditMode} />
          </div>
          <Input type="date" label="Date of Birth" name="dateOfBirth" value={clientInfo.dateOfBirth} onChange={handleClientInfoChange} disabled={!isEditMode} />

          {/* SECTION 2: Contact Details */}
          <Section title="Contact Details" />
          <div style={styles.row}>
            <Input label="Primary Phone Number" name="primaryPhone" value={contactDetails.primaryPhone} onChange={handleContactDetailsChange} disabled={!isEditMode} />
            <Select label="Phone Number Type" name="phoneType" value={contactDetails.phoneType} onChange={handleContactDetailsChange} disabled={!isEditMode}>
              <option value="">Select phone type</option>
              <option value="mobile">Mobile</option>
              <option value="landline">Landline</option>
            </Select>
          </div>
          <Input label="Address" name="address" value={contactDetails.address} onChange={handleContactDetailsChange} disabled={!isEditMode} />
          <div style={styles.row}>
            <Input label="Secure Check-in Zone (meters)" name="secureCheckInZone" value={contactDetails.secureCheckInZone} onChange={handleContactDetailsChange} disabled={!isEditMode} />
            <Input label="Access Details" name="accessDetails" value={contactDetails.accessDetails} onChange={handleContactDetailsChange} disabled={!isEditMode} />
          </div>

          {/* SECTION 3: Culture & Religion */}
          <Section title="Culture & Religion" />
          <div style={styles.row}>
            <Input label="Ethnicity" name="ethnicity" value={cultureReligion.ethnicity} onChange={handleCultureReligionChange} disabled={!isEditMode} />
            <Input label="Religion" name="religion" value={cultureReligion.religion} onChange={handleCultureReligionChange} disabled={!isEditMode} />
          </div>
          <Textarea label="Impact of Culture or Religion on Care" name="impactOnCare" value={cultureReligion.impactOnCare} onChange={handleCultureReligionChange} disabled={!isEditMode} />

          {/* SECTION 4: Medical Information */}
          <Section title="Medical Information" />
          <Textarea label="Medical Conditions" name="medicalConditions" value={medicalInfo.medicalConditions} onChange={handleMedicalInfoChange} disabled={!isEditMode} />
          <Textarea label="Allergies & Intolerances" name="allergiesIntolerances" value={medicalInfo.allergiesIntolerances} onChange={handleMedicalInfoChange} disabled={!isEditMode} />
          <Input label="NHS Number" name="nhsNumber" value={medicalInfo.nhsNumber} onChange={handleMedicalInfoChange} disabled={!isEditMode} />

          {/* SECTION 5: Medication Support */}
          <Section title="Medication Support" />
          <div style={styles.row}>
            <Select label="Medication Type" name="medicationType" value={medicationSupport.medicationType} onChange={handleMedicationSupportChange} disabled={!isEditMode}>
              <option value="">Select medication type</option>
              <option value="blisterPack">Blister Pack</option>
              <option value="bottles">Bottles</option>
              <option value="inhalers">Inhalers</option>
              <option value="injections">Injections</option>
              <option value="patches">Patches</option>
              <option value="other">Other</option>
            </Select>
            <Select label="Medication Timing" name="medicationTiming" value={medicationSupport.medicationTiming} onChange={handleMedicationSupportChange} disabled={!isEditMode}>
              <option value="">Select timing</option>
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
              <option value="morningEvening">Morning & Evening</option>
              <option value="multipleTimes">Multiple Times Daily</option>
              <option value="asNeeded">As Needed</option>
            </Select>
          </div>
          <div style={styles.row}>
            <Select label="Level of Support Required" name="supportLevel" value={medicationSupport.supportLevel} onChange={handleMedicationSupportChange} disabled={!isEditMode}>
              <option value="">Select support level</option>
              <option value="independent">Independent</option>
              <option value="reminders">Reminders Only</option>
              <option value="supervision">Supervision</option>
              <option value="fullSupport">Full Support</option>
            </Select>
            <Input label="PRN Medication" name="prnMedication" value={medicationSupport.prnMedication} onChange={handleMedicationSupportChange} disabled={!isEditMode} />
          </div>

          {/* SECTION 6: Nutrition & Hydration */}
          <Section title="Nutrition & Hydration" />
          <div style={styles.row}>
            <Select label="Appetite" name="appetite" value={nutritionHydration.appetite} onChange={handleNutritionHydrationChange} disabled={!isEditMode}>
              <option value="">Select appetite level</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </Select>
            <Select label="Can Client Feed Themselves" name="canFeedThemselves" value={nutritionHydration.canFeedThemselves} onChange={handleNutritionHydrationChange} disabled={!isEditMode}>
              <option value="">Select option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="sometimes">Sometimes</option>
              <option value="withAssistance">With Assistance</option>
            </Select>
          </div>
          <Input type="number" label="Weight (kg)" name="weight" value={nutritionHydration.weight} onChange={handleNutritionHydrationChange} disabled={!isEditMode} />
          <Textarea label="Dietary Likes & Preferences" name="dietaryLikes" value={nutritionHydration.dietaryLikes} onChange={handleNutritionHydrationChange} disabled={!isEditMode} />
          <Textarea label="Dietary Dislikes / Restrictions" name="dietaryRestrictions" value={nutritionHydration.dietaryRestrictions} onChange={handleNutritionHydrationChange} disabled={!isEditMode} />

          {/* SECTION 7: Personal Care */}
          <Section title="Personal Care" />
          <div style={styles.row}>
            <Select label="Washing / Bathing Ability" name="washingAbility" value={personalCare.washingAbility} onChange={handlePersonalCareChange} disabled={!isEditMode}>
              <option value="">Select ability</option>
              <option value="independent">Independent</option>
              <option value="minimalAssistance">Minimal Assistance</option>
              <option value="moderateAssistance">Moderate Assistance</option>
              <option value="fullAssistance">Full Assistance</option>
              <option value="dependent">Fully Dependent</option>
            </Select>
            <Select label="Dressing Ability" name="dressingAbility" value={personalCare.dressingAbility} onChange={handlePersonalCareChange} disabled={!isEditMode}>
              <option value="">Select ability</option>
              <option value="independent">Independent</option>
              <option value="minimalAssistance">Minimal Assistance</option>
              <option value="moderateAssistance">Moderate Assistance</option>
              <option value="fullAssistance">Full Assistance</option>
              <option value="dependent">Fully Dependent</option>
            </Select>
          </div>
          <Textarea label="Toileting Needs" name="toiletingNeeds" value={personalCare.toiletingNeeds} onChange={handlePersonalCareChange} disabled={!isEditMode} />

          {/* SECTION 8: Mobility */}
          <Section title="Mobility" />
          <div style={styles.row}>
            <Select label="Mobility Level" name="mobilityLevel" value={mobility.mobilityLevel} onChange={handleMobilityChange} disabled={!isEditMode}>
              <option value="">Select mobility level</option>
              <option value="independent">Independent</option>
              <option value="mobileWithAid">Mobile with Aid</option>
              <option value="limitedMobility">Limited Mobility</option>
              <option value="immobile">Immobile</option>
              <option value="bedbound">Bedbound</option>
            </Select>
            <Input label="Mobility Aids Used" name="mobilityAids" value={mobility.mobilityAids} onChange={handleMobilityChange} disabled={!isEditMode} />
          </div>
          <Select label="History of Falls" name="historyOfFalls" value={mobility.historyOfFalls} onChange={handleMobilityChange} disabled={!isEditMode}>
            <option value="">Select option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>

          {/* SECTION 9: Daily Living */}
          <Section title="Daily Living" />
          <div style={styles.grid}>
            <Select label="Housekeeping Support" name="housekeepingSupport" value={dailyLiving.housekeepingSupport} onChange={handleDailyLivingChange} disabled={!isEditMode}>
              <option value="">Select support level</option>
              <option value="independent">Independent</option>
              <option value="minimalSupport">Minimal Support</option>
              <option value="moderateSupport">Moderate Support</option>
              <option value="fullSupport">Full Support</option>
            </Select>
            <Select label="Shopping Support" name="shoppingSupport" value={dailyLiving.shoppingSupport} onChange={handleDailyLivingChange} disabled={!isEditMode}>
              <option value="">Select support level</option>
              <option value="independent">Independent</option>
              <option value="minimalSupport">Minimal Support</option>
              <option value="moderateSupport">Moderate Support</option>
              <option value="fullSupport">Full Support</option>
            </Select>
            <Select label="Laundry Support" name="laundrySupport" value={dailyLiving.laundrySupport} onChange={handleDailyLivingChange} disabled={!isEditMode}>
              <option value="">Select support level</option>
              <option value="independent">Independent</option>
              <option value="minimalSupport">Minimal Support</option>
              <option value="moderateSupport">Moderate Support</option>
              <option value="fullSupport">Full Support</option>
            </Select>
            <Select label="Financial Management" name="financialManagement" value={dailyLiving.financialManagement} onChange={handleDailyLivingChange} disabled={!isEditMode}>
              <option value="">Select option</option>
              <option value="independent">Independent</option>
              <option value="minimalSupport">Minimal Support</option>
              <option value="moderateSupport">Moderate Support</option>
              <option value="fullSupport">Full Support</option>
              <option value="managedByThirdParty">Managed by Third Party</option>
            </Select>
          </div>

          {/* SECTION 10: Risks & Mitigation */}
          <Section title="Risks & Mitigation" />
          <Textarea label="Identified Risks" name="identifiedRisks" value={risksMitigation.identifiedRisks} onChange={handleRisksMitigationChange} disabled={!isEditMode} rows="4" />
          <Textarea label="Risk Mitigation Plan" name="mitigationPlan" value={risksMitigation.mitigationPlan} onChange={handleRisksMitigationChange} disabled={!isEditMode} rows="4" />

          {/* Save Button */}
          <button type="submit" style={styles.saveButton}>
            Save Form
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Styles Object for better organization ---
const styles = {
  container: {
    width: "100%",
    margin: "20px auto",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
    backgroundColor: "#fff", // Changed from #f5f7fa to #fff
    minHeight: "100vh",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    padding: "15px 20px",
    // backgroundColor: "#fff", // This line has been removed
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    flexWrap: "wrap",
  },
  backButton: {
    background: "#3A8DFF",
    border: "none",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  logo: {
    height: "60px",
    width: "auto",
    maxWidth: "150px",
    objectFit: "contain",
  },
  mainTitle: {
    color: "#00264D",
    marginBottom: "25px",
    marginTop: "0",
    textAlign: "center",
    borderBottom: "2px solid #f0f0f0",
    paddingBottom: "15px",
    backgroundColor: "#fff", // Added white background
  },
  formContent: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  row: {
    display: "flex",
    gap: "20px",
    marginBottom: "15px",
    flexWrap: "wrap",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  saveButton: {
    background: "#00264D",
    color: "#fff",
    border: "none",
    padding: "15px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    width: "100%",
    fontSize: "18px",
    marginTop: "20px",
    transition: "background-color 0.3s",
  },
  label: {
    display: "block",
    fontWeight: 600,
    marginBottom: 8,
    color: "#333",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    boxSizing: "border-box",
    fontSize: "16px",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    boxSizing: "border-box",
    fontSize: "16px",
    minHeight: "100px",
    resize: "vertical",
  },
  select: {
    width: "100%",
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    boxSizing: "border-box",
    fontSize: "16px",
  },
};

// Add sectionHeader to styles object
styles.sectionHeader = {
  fontWeight: 700,
  margin: "30px 0 15px",
  color: "#00264D",
  fontSize: "20px",
  borderBottom: "2px solid #e9ecef",
  paddingBottom: "8px",
};

export default CareAssessmentForm;