// LandingPage.js
import React, { useState, useEffect } from 'react';
import { 
  FaUsers, FaFileAlt, FaCheckCircle, FaDownload, FaShieldAlt,
  FaCalendarAlt, FaArrowRight, FaBars, FaTimes, FaStar,
  FaLaptop, FaMobileAlt, FaUserCheck, FaClipboardList, FaUserFriends
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LendingPage.css';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [expandedTerms, setExpandedTerms] = useState({});

  // Toggle function for terms
  const toggleTerm = (index) => {
    setExpandedTerms(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Terms & Conditions Data
  const termsData = [
    {
      question: "What is CareOnboard and what services do you provide?",
      answer: "CareOnboard is a digital onboarding platform designed specifically for care providers. Our services include digital employment application forms, automated reference collection system, digital health and safety policy acknowledgments, document generation in multiple formats (PDF, Word, Excel), and compliance tracking with audit-ready reporting."
    },
    {
      question: "How do I create an account and get started?",
      answer: "Creating an account is simple: 1) Click 'Sign Up' on our homepage, 2) Fill in your organization details, 3) Choose your subscription plan, 4) Verify your email address, 5) Set up your care worker profiles, 6) Start onboarding your care workers digitally. Our team provides full setup support for all new customers."
    },
    {
      question: "What are the subscription plans and pricing?",
      answer: "We offer flexible subscription plans: 1) Starter Plan - £49/month for up to 10 care workers, 2) Professional Plan - £99/month for up to 50 care workers, 3) Enterprise Plan - Custom pricing for unlimited care workers. All plans include full access to all features, unlimited document downloads, and priority support. Annual plans receive 20% discount."
    },
    {
      question: "How is my data protected and secured?",
      answer: "We take data security seriously: 1) All data is encrypted using SSL/TLS protocols, 2) We comply with GDPR and UK data protection laws, 3) Regular security audits and penetration testing, 4) Secure data centers with 24/7 monitoring, 5) Role-based access control, 6) Automatic data backups, 7) We never share your data with third parties without explicit consent."
    },
    // {
    //   question: "What happens to my data if I cancel my subscription?",
    //   answer: "If you cancel: 1) You have 30 days to download all your data, 2) After 30 days, your account and data will be permanently deleted, 3) We retain only anonymized usage statistics for service improvement, 4) You can reactivate your account within 30 days to restore all data, 5) We provide data export in multiple formats for easy migration."
    // },
    // {
    //   question: "Can I customize the forms and policies?",
    //   answer: "Yes, customization is available: 1) Add your organization's branding and logo, 2) Customize form fields to match your requirements, 3) Upload your own policies and documents, 4) Create custom workflows for different roles, 5) Set up automated email templates, 6) Professional Plan and above includes full customization support."
    // },
    // {
    //   question: "How do you handle compliance and regulatory requirements?",
    //   answer: "We ensure compliance through: 1) Regular updates to reflect CQC and regulatory changes, 2) Timestamped records of all acknowledgments, 3) Audit trails for all activities, 4) Secure document storage for required retention periods, 5) Easy generation of compliance reports, 6) Integration with existing compliance systems available on Enterprise plans."
    // },
    // {
    //   question: "What kind of support do you provide?",
    //   answer: "We offer comprehensive support: 1) 24/7 email support for all plans, 2) Phone support for Professional and Enterprise plans, 3) Dedicated account manager for Enterprise customers, 4) Extensive knowledge base and video tutorials, 5) Regular training webinars, 6) Priority response times based on your plan level."
    // },
    // {
    //   question: "Can I integrate CareOnboard with other systems?",
    //   answer: "Integration capabilities include: 1) API access for custom integrations, 2) Integration with popular HR and payroll systems, 3) Single Sign-On (SSO) support, 4) Zapier integration for 3000+ apps, 5) Webhook support for real-time data sync, 6) Custom integration services available for Enterprise customers."
    // },
    // {
    //   question: "What is your refund and cancellation policy?",
    //   answer: "Our policy is transparent: 1) 30-day money-back guarantee for new customers, 2) Cancel anytime with no penalties, 3) Refunds for unused portion of annual plans, 4) No long-term contracts, 5) Prorated refunds available in special circumstances, 6) Clear communication of any policy changes 30 days in advance."
    // }
  ];

  // All 26 sections from your handbook
  const complianceSections = [
    "Accident Reporting Procedure",
    "Alcohol and Drugs",
    "Baths",
    "Biohazards",
    "Body Jewellery",
    "Cleaning and Disinfecting",
    "COSHH Assessments",
    "Disciplinary Rules",
    "Display Screen Equipment (DSE)",
    "Drugs and Medication",
    "Electricity",
    "Fire Safety",
    "First Aid Procedures",
    "Food Safety Procedures",
    "Gas Cylinders",
    "Hands and Skin",
    "Hazard Detection",
    "Hazards and Risks",
    "Infection Risks",
    "Jewellery and Perfume",
    "Ladders",
    "Manual Handling",
    "New and Expectant Mothers",
    "Personal Clothing",
    "Personal Hygiene",
    "Waste Disposal"
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    // Close mobile menu after clicking a link
    setMobileMenuOpen(false);
  };

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        {/* Navigation with inline CSS */}
        <nav 
          style={{
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: isScrolled ? '0 4px 6px rgba(0,0,0,0.1)' : '0 2px 6px rgba(0,0,0,0.08)',
            borderRadius: '50px',
            margin: '0 20px',
            padding: '10px 20px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            zIndex: '1000',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div className="container">
            <div className="nav-content">
              <div className="logo">
                <h1 className="logo-text">CareOnboard</h1>
                <span className="logo-subtitle">Digital Onboarding for Care Workers</span>
              </div>

              <div 
                className="nav-menu d-none d-lg-flex"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2rem'
                }}
              >
                <a 
                  href="#features" 
                  className="nav-item"
                  style={{
                    position: 'relative',
                    color: '#1A1A1A',
                    textDecoration: 'none',
                    fontWeight: '500',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onClick={() => scrollToSection('features')}
                >
                  Features
                </a>
                <a 
                  href="#terms" 
                  className="nav-item"
                  style={{
                    position: 'relative',
                    color: '#1A1A1A',
                    textDecoration: 'none',
                    fontWeight: '500',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onClick={() => scrollToSection('terms')}
                >
                  Terms & Conditions
                </a>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button 
                    className="login-btn"
                    style={{
                      background: 'transparent',
                      border: '2px solid #3182CE',
                      padding: '8px 18px',
                      borderRadius: '8px',
                      color: '#3182CE',
                      fontWeight: '600',
                      transition: '0.25s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#3182CE';
                      e.target.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#3182CE';
                    }}
                    onClick={() => window.location.href = "/login"}
                  >
                    Login
                  </button>
                  
                  <button 
                    className="signup-btn"
                    style={{
                      background: '#3182CE',
                      border: '2px solid #3182CE',
                      padding: '8px 18px',
                      borderRadius: '8px',
                      color: 'white',
                      fontWeight: '600',
                      transition: '0.25s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#2563EB';
                      e.target.style.borderColor = '#2563EB';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#3182CE';
                      e.target.style.borderColor = '#3182CE';
                    }}
                    onClick={() => window.location.href = "/signup"}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              <button 
                className="mobile-menu-btn d-lg-none"
                style={{
                  display: 'none',
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  color: '#1A1A1A',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <a href="#features" onClick={() => scrollToSection('features')}>Features</a>
          <a href="#terms" onClick={() => scrollToSection('terms')}>Terms & Conditions</a>

          <button 
            className="login-btn mobile-login-btn"
            onClick={() => window.location.href = "/login"}
          >
            Login
          </button>
          
          <button 
            className="signup-btn mobile-signup-btn"
            onClick={() => window.location.href = "/signup"}
          >
            Sign Up
          </button>

          <button 
            className="btn btn-primary mobile-demo-btn"
            onClick={() => scrollToSection('demo')}
          >
            Book a Demo
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content">
                <div className="trust-badge">
                  <FaStar className="text-warning" />
                  <span>100% Paperless Onboarding</span>
                </div>
                <h1 className="hero-title">
                  Digital Onboarding for Care Workers
                </h1>
                <p className="hero-subtitle">
                  Employment forms, references, and all  health & safety policies — completed digitally, downloadable in PDF, Word & Excel.
                </p>

                <div className="hero-buttons">
                  <button 
                    className="btn btn-primary btn-lg"
                    onClick={() => scrollToSection('demo')}
                  >
                    <FaCalendarAlt className="me-2" />
                    See Live Demo
                  </button>
                  <button 
                    className="btn btn-outline-secondary btn-lg"
                    onClick={() => scrollToSection('terms')}
                  >
                    View Terms & Conditions
                    <FaArrowRight className="ms-2" />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image">
                <div className="care-worker-image">
                  <img 
                    src="https://z-cdn-media.chatglm.cn/files/de3a1d1f-458f-4568-b16f-50ba6bd21877.png?auth_key=1865348696-fd9b8ea825014b6da8fa0e0b94581c4f-0-f1a4bfadf016c9c8db668dcb121ec35e" 
                    alt="Care Worker Digital Onboarding" 
                    className="care-worker-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Go Fully Digital</h2>
            <p className="section-subtitle">Replace paper forms with a simple, audit-ready digital workflow</p>
          </div>
          
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <FaFileAlt className="feature-icon text-primary" />
                <h3>Employment Application</h3>
                <p>Digital form for personal info, experience, emergency contact & e-signature</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <FaUserFriends className="feature-icon text-success" />
                <h3>Auto Reference Collection</h3>
                <p>Care Workers add referee emails → system auto-sends form → tracks completion</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <FaShieldAlt className="feature-icon text-orange" />
                <h3>Safety Policies</h3>
                <p>All sections from your handbook as digital acknowledgments with e-signature</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms & Conditions Section */}
      <section id="terms" className="terms-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Terms & Conditions</h2>
            <p className="section-subtitle">Frequently asked questions about our service</p>
          </div>
          
          <div className="terms-container">
            {termsData.map((term, index) => (
              <div key={index} className="term-item">
                <div 
                  className="term-question"
                  onClick={() => toggleTerm(index)}
                >
                  <span className="question-text">{term.question}</span>
                  <span className={`toggle-icon ${expandedTerms[index] ? 'expanded' : ''}`}>
                    {expandedTerms[index] ? '−' : '+'}
                  </span>
                </div>
                <div className={`term-answer ${expandedTerms[index] ? 'show' : ''}`}>
                  <p>{term.answer}</p>
                </div>
              </div>
            ))}
          </div>

       
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section py-5">
        <div className="container">
          <div className="cta-card text-center">
            <h2>Ready to Eliminate Paper Onboarding?</h2>
            <p>Get a fully digital portal for care worker onboarding — with all 26 compliance forms.</p>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => scrollToSection('demo')}
            >
              <FaCalendarAlt className="me-2" />
              Book Your Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="text-center py-4">
            <h4>CareOnboard</h4>
            <p>Digital Onboarding for Care Workers • Zero Paper • Full Compliance</p>
            <div className="footer-links">
              <a href="#terms" onClick={() => scrollToSection('terms')}>Terms & Conditions</a>
              <a href="mailto:support@careonboard.com">support@careonboard.com</a>
            </div>
            <div className="copyright mt-3">
              © 2025 CareOnboard. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;