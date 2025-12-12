import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";

// Layout
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import LendingPage from "./Website/LendingPage";

// Auth Pages
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import ForgotPassword from "./Auth/ForgotPassword";

// ---------------- ADMIN ----------------
import AdminDashboard from "./Dashboard/Admin/AdminDashboard";
import Forms from "./Dashboard/Admin/Forms";
import FormAssign from "./Dashboard/Admin/FormAssign";
import PayrollList from "./Dashboard/Admin/PayrollList";
import Download from "./Dashboard/Admin/Download";
import Settings from "./Dashboard/Admin/Settings";
import CarersList from "./Dashboard/Admin/Carers/CarersList";
import YearlyOverview from "./Dashboard/Admin/Carers/YearlyOverview";
import SpotCheck from "./Dashboard/Admin/Carers/SpotCheck";
import Supervision from "./Dashboard/Admin/Carers/Supervision";

// ---------------- CARE WORKER ----------------
import CareDashboard from "./Dashboard/Carer/CareDashboard";
import MyProfile from "./Dashboard/Carer/MyProfile";
import MyForm from "./Dashboard/Carer/MyForm";
import Documents from "./Dashboard/Carer/Documents";
import Signature from "./Dashboard/Carer/Signature";

// ---------------- ALL FORMS IMPORT ----------------
import CharacterReferenceForm from "./Dashboard/Admin/AllForms/CharacterReferenceForm";
import DeclarationOfHealthForm from "./Dashboard/Admin/AllForms/DeclarationOfHealthForm";
import EmploymentApplicationForm from "./Dashboard/Admin/AllForms/EmploymentApplicationForm";
import HealthAndSafetyHandbookForm from "./Dashboard/Admin/AllForms/HealthAndSafetyHandbookForm";
import InductionCertificate1Form from "./Dashboard/Admin/AllForms/InductionCertificate1Form";
import InductionCertificate2Form from "./Dashboard/Admin/AllForms/InductionCertificate2Form";
import InterviewScoringForm from "./Dashboard/Admin/AllForms/InterviewScoringForm";
import JobDescriptionForm from "./Dashboard/Admin/AllForms/JobDescriptionForm";
import MedicationCompetencyForm from "./Dashboard/Admin/AllForms/MedicationCompetencyForm";
import ReviewForm from "./Dashboard/Admin/AllForms/ReviewForm";
import ZeroHourContractForm from "./Dashboard/Admin/AllForms/ZeroHourContractForm";
import InformaionSheet from "./Dashboard/Admin/AllForms/InformaionSheet";
import SpotCheckForm from "./Dashboard/Admin/AllForms/SpotCheckForm";
import SupervisionForm from "./Dashboard/Admin/AllForms/SupervisionForm";
import TelephoneMonitoring from "./Dashboard/Admin/AllForms/TelephoneMonitoring";
import AppraisalForm from "./Dashboard/Admin/AllForms/AppraisalForm";
// import ApplicationForm from "./Dashboard/Admin/AllForms/ApplicationForm";
import MedicationManagementForm from "./Dashboard/Admin/AllForms/MedicationManagementForm";
import ApplicationForm from "./Dashboard/Admin/AllForms/ApplicationForm";
import CareWorkerShadowingForm from "./Dashboard/Admin/AllForms/CareWorkerShadowingForm";
import CarePlanForm from "./Dashboard/Admin/AllForms/CarePlanForm";
import TrainingMatrix from "./Dashboard/Admin/AllForms/TrainingMatrix";
import ClientProfileForm from "./Dashboard/Admin/AllForms/ClientProfileForm";
import UniteCareLtd from "./Dashboard/Admin/AllForms/UniteCareLtd";
import InductionChecklist from "./Dashboard/Admin/AllForms/InductionChecklist";



function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (window.innerWidth <= 768) setIsSidebarCollapsed(true);
  }, []);

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  const hideLayout = ["/", "/login", "/signup", "/forgot-password"].includes(
    location.pathname
  );

  return hideLayout ? (
    <Routes>
      <Route path="/" element={<LendingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  ) : (
    <>
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="main-content">
        <Sidebar collapsed={isSidebarCollapsed} setCollapsed={setIsSidebarCollapsed} />

        <div className={`right-side-content ${isSidebarCollapsed ? "collapsed" : ""}`}>
          <Routes>
            {/* ---------------- ADMIN ---------------- */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/forms" element={<Forms />} />
            <Route path="/admin/form-assign" element={<FormAssign />} />
            <Route path="/admin/payroll-list" element={<PayrollList />} />
            <Route path="/admin/downloads" element={<Download />} />
            <Route path="/admin/settings" element={<Settings />} />
            {/* carers  */}
            <Route path="/admin/carers" element={<CarersList />} />
            <Route path="/admin/carers/yearly-overview" element={<YearlyOverview />} />
            <Route path="/admin/carers/spot-check" element={<SpotCheck />} />
            <Route path="/admin/carers/supervision" element={<Supervision />} />

            {/* ---------------- CARE WORKER ---------------- */}
            <Route path="/carer/dashboard" element={<CareDashboard />} />
            <Route path="/carer/my-profile" element={<MyProfile />} />
            <Route path="/carer/my-form" element={<MyForm />} />
            <Route path="/carer/documents" element={<Documents />} />
            <Route path="/carer/signature" element={<Signature />} />

            {/* ---------------- ADMIN → INDIVIDUAL FORMS ROUTES ---------------- */}
            <Route path="/admin/forms/character-reference" element={<CharacterReferenceForm />} />
            <Route path="/admin/forms/declaration-of-health" element={<DeclarationOfHealthForm />} />
            <Route path="/admin/forms/employment-application" element={<EmploymentApplicationForm />} />
            <Route path="/admin/forms/health-and-safety-handbook" element={<HealthAndSafetyHandbookForm />} />
            <Route path="/admin/forms/induction-certificate-1" element={<InductionCertificate1Form />} />
            <Route path="/admin/forms/induction-certificate-2" element={<InductionCertificate2Form />} />
            <Route path="/admin/forms/interview-scoring" element={<InterviewScoringForm />} />
            <Route path="/admin/forms/job-description" element={<JobDescriptionForm />} />
            <Route path="/admin/forms/medication-competency" element={<MedicationCompetencyForm />} />
            <Route path="/admin/forms/review-form" element={<ReviewForm />} />
            <Route path="/admin/forms/zero-hour-contract" element={<ZeroHourContractForm />} />
            <Route path="/admin/forms/information-sheet" element={<InformaionSheet />} />
            <Route path="/admin/forms/spot-check-form" element={<SpotCheckForm />} />
            <Route path="/admin/forms/supervision-form" element={<SupervisionForm />} />
            <Route path="/admin/forms/telephone-monitoring" element={<TelephoneMonitoring />} />
            <Route path="/admin/forms/appraisal-form" element={<AppraisalForm />} />
            <Route path="/admin/forms/application" element={<ApplicationForm />} />
            <Route path="/admin/forms/medication-management-form" element={<MedicationManagementForm />} />
            <Route path="/admin/forms/care-worker-shadowing" element={<CareWorkerShadowingForm />} />
            <Route path="/admin/forms/care-plan" element={<CarePlanForm />} />
            <Route path="/admin/forms/training-matrix" element={<TrainingMatrix />} />
            <Route path="/admin/forms/client-profile-form" element={<ClientProfileForm />} />
            <Route path="/admin/forms/unite-care-ltd-form" element={<UniteCareLtd />} />
            <Route path="/admin/forms/induction-checklist-form" element={<InductionChecklist />} />


            {/* fallback */}
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
