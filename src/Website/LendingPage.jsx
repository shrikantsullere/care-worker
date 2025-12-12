// LandingPage.js
import React, { useState, useEffect } from 'react';
import { 
  FaUsers, FaFileAlt, FaCheckCircle, FaDownload, FaShieldAlt,
  FaCalendarAlt, FaArrowRight, FaBars, FaTimes, FaStar,
  FaLaptop, FaMobileAlt, FaUserCheck, FaClipboardList, FaUserFriends,
  FaClock, FaLock, FaChartLine, FaHandshake, FaRegSmile, FaRegPaperPlane,
  FaCloudDownloadAlt, FaFileSignature, FaBell, FaSearch, FaCogs,
  FaRegLightbulb, FaRegIdCard, FaRegFileAlt, FaRegCheckCircle,
  FaFacebook, FaTwitter, FaLinkedin
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LendingPage.css';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [expandedTerms, setExpandedTerms] = useState({});
  const [activeTab, setActiveTab] = useState('application');

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
    {
      question: "What happens to my data if I cancel my subscription?",
      answer: "If you cancel: 1) You have 30 days to download all your data, 2) After 30 days, your account and data will be permanently deleted, 3) We retain only anonymized usage statistics for service improvement, 4) You can reactivate your account within 30 days to restore all data, 5) We provide data export in multiple formats for easy migration."
    },
    {
      question: "Can I customize the forms and policies?",
      answer: "Yes, customization is available: 1) Add your organization's branding and logo, 2) Customize form fields to match your requirements, 3) Upload your own policies and documents, 4) Create custom workflows for different roles, 5) Set up automated email templates, 6) Professional Plan and above includes full customization support."
    }
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

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Director of Care",
      organization: "Sunrise Care Homes",
      image: "https://picsum.photos/seed/sarah/100/100.jpg",
      text: "CareOnboard has transformed our onboarding process. What used to take weeks now takes days, and our compliance tracking is flawless."
    },
    {
      name: "Michael Chen",
      position: "Operations Manager",
      organization: "Comfort Living Care",
      image: "https://picsum.photos/seed/michael/100/100.jpg",
      text: "The automated reference collection feature alone saved us hours of administrative work. The platform is intuitive and our staff love using it."
    },
    {
      name: "Emma Williams",
      position: "HR Manager",
      organization: "ElderCare Solutions",
      image: "https://picsum.photos/seed/emma/100/100.jpg",
      text: "We've reduced our paper usage by 100% since implementing CareOnboard. The compliance reporting has made our inspections stress-free."
    }
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

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Handle email submission
    console.log('Email submitted:', email);
    setEmail('');
    // Show success message or redirect
    alert('Thank you for your interest! We will contact you soon.');
  };

  return (
    <div className="app">
      {/* Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="navbar">
          <div className="container">
            <div className="nav-content">
              <div className="logo">
                <h1 className="logo-text">CareOnboard</h1>
                <span className="logo-subtitle">Digital Onboarding for Care Workers</span>
              </div>

              <div className="nav-menu d-none d-lg-flex">
                <a 
                  href="#features" 
                  className="nav-item"
                  onClick={() => scrollToSection('features')}
                >
                  Features
                </a>
                <a 
                  href="#testimonials" 
                  className="nav-item"
                  onClick={() => scrollToSection('testimonials')}
                >
                  Testimonials
                </a>
                <a 
                  href="#terms" 
                  className="nav-item"
                  onClick={() => scrollToSection('terms')}
                >
                  FAQ
                </a>

                <div className="nav-buttons">
                  <button 
                    className="login-btn"
                    onClick={() => window.location.href = "/login"}
                  >
                    Login
                  </button>
                  
                  <button 
                    className="signup-btn"
                    onClick={() => window.location.href = "/signup"}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              <button 
                className="mobile-menu-btn d-lg-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </nav>
      </header>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <a href="#features" onClick={() => scrollToSection('features')}>Features</a>
          <a href="#testimonials" onClick={() => scrollToSection('testimonials')}>Testimonials</a>
          <a href="#terms" onClick={() => scrollToSection('terms')}>FAQ</a>

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
                  Employment forms, references, and all health & safety policies — completed digitally, downloadable in PDF, Word & Excel.
                </p>

                <div className="hero-buttons">
                  <button 
                    className="btn btn-primary btn-lg"
                    onClick={() => scrollToSection('demo')}
                  >
                    <FaCalendarAlt className="me-2" />
                    Request a Demo
                  </button>
                  <button 
                    className="btn btn-outline-secondary btn-lg"
                    onClick={() => scrollToSection('how-it-works')}
                  >
                    <FaArrowRight className="ms-2" />
                  </button>
                </div>

                <div className="hero-stats">
                  <div className="stat-item">
                    <h3>500+</h3>
                    <p>Care Organizations</p>
                  </div>
                  <div className="stat-item">
                    <h3>10,000+</h3>
                    <p>Care Workers Onboarded</p>
                  </div>
                  <div className="stat-item">
                    <h3>98%</h3>
                    <p>Customer Satisfaction</p>
                  </div>
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
                <div className="feature-icon-wrapper">
                  <FaFileAlt className="feature-icon text-primary" />
                </div>
                <h3>Employment Application</h3>
                <p>Digital form for personal info, experience, emergency contact & e-signature</p>
                <ul className="feature-list">
                  <li>Customizable form fields</li>
                  <li>Auto-save functionality</li>
                  <li>Document upload capability</li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <FaUserFriends className="feature-icon text-success" />
                </div>
                <h3>Auto Reference Collection</h3>
                <p>Care Workers add referee emails → system auto-sends form → tracks completion</p>
                <ul className="feature-list">
                  <li>Automated reminders</li>
                  <li>Reference verification</li>
                  <li>Status tracking dashboard</li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <FaShieldAlt className="feature-icon text-orange" />
                </div>
                <h3>Safety Policies</h3>
                <p>All sections from your handbook as digital acknowledgments with e-signature</p>
                <ul className="feature-list">
                  <li>26 compliance sections</li>
                  <li>Timestamped records</li>
                  <li>Audit-ready reports</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <FaCloudDownloadAlt className="feature-icon text-info" />
                </div>
                <h3>Document Generation</h3>
                <p>Generate and download documents in multiple formats</p>
                <ul className="feature-list">
                  <li>PDF, Word & Excel formats</li>
                  <li>Custom templates</li>
                  <li>Bulk download option</li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <FaBell className="feature-icon text-warning" />
                </div>
                <h3>Automated Reminders</h3>
                <p>Automatic notifications for incomplete tasks</p>
                <ul className="feature-list">
                  <li>Email notifications</li>
                  <li>Customizable schedule</li>
                  <li>Escalation alerts</li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <FaLock className="feature-icon text-danger" />
                </div>
                <h3>Data Security</h3>
                <p>Enterprise-grade security for all your data</p>
                <ul className="feature-list">
                  <li>SSL/TLS encryption</li>
                  <li>GDPR compliant</li>
                  <li>Regular security audits</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Sections */}
      <section id="compliance" className="compliance-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Complete Compliance Coverage</h2>
            <p className="section-subtitle">All 26 sections from your health and safety handbook included</p>
          </div>

          <div className="compliance-grid">
            {complianceSections.map((section, index) => (
              <div key={index} className="compliance-item">
                <div className="compliance-icon">
                  <FaRegCheckCircle />
                </div>
                <div className="compliance-text">{section}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="testimonials-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Trusted by care organizations across UK</p>
          </div>

          <div className="row testimonials-slider">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <div className="testimonial-stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-warning" />
                      ))}
                    </div>
                    <p className="testimonial-text">"{testimonial.text}"</p>
                  </div>
                  <div className="testimonial-author">
                    <img src={testimonial.image} alt={testimonial.name} className="author-image" />
                    <div className="author-info">
                      <h5>{testimonial.name}</h5>
                      <p>{testimonial.position}, {testimonial.organization}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms & Conditions Section */}
      <section id="terms" className="terms-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Everything you need to know about CareOnboard</p>
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
      <section id="demo" className="cta-section py-5">
        <div className="container">
          <div className="cta-card text-center">
            <h2>Ready to Eliminate Paper Onboarding?</h2>
            <p>Get a fully digital portal for care worker onboarding — with all compliance forms.</p>
            <form className="cta-form" onSubmit={handleEmailSubmit}>
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button className="btn btn-primary" type="submit">
                  <FaRegPaperPlane className="me-2" />
                  Request Demo
                </button>
              </div>
            </form>
            <p className="form-note">No credit card required. 30-day free trial.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h4>CareOnboard</h4>
              <p>Digital Onboarding for Care Workers • Zero Paper • Full Compliance</p>
              <div className="social-links">
                <a href="#" className="social-link"><FaFacebook /></a>
                <a href="#" className="social-link"><FaTwitter /></a>
                <a href="#" className="social-link"><FaLinkedin /></a>
              </div>
            </div>
            <div className="col-md-2 mb-4">
              <h5>Product</h5>
              <ul className="footer-links">
                <li><a href="#features" onClick={() => scrollToSection('features')}>Features</a></li>
              </ul>
            </div>
            <div className="col-md-2 mb-4">
              <h5>Company</h5>
              <ul className="footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="col-md-2 mb-4">
              <h5>Resources</h5>
              <ul className="footer-links">
                <li><a href="#blog">Blog</a></li>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#terms" onClick={() => scrollToSection('terms')}>FAQ</a></li>
              </ul>
            </div>
            <div className="col-md-2 mb-4">
              <h5>Legal</h5>
              <ul className="footer-links">
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#cookies">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="copyright mt-4 text-center">
            © 2025 CareOnboard. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;