import React, { useState, useEffect } from "react";
import { FaSave, FaTrash, FaCamera, FaKey, FaBars, FaTimes, FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPhotoHovered, setIsPhotoHovered] = useState(false); // State for hover effect
  
  const [profile, setProfile] = useState({
    photo: "",
    name: "Admin User",
    email: "admin@example.com",
    phone: "+91 0000000000",
  });

  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine device type based on width
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;
  const isDesktop = windowWidth > 1024;

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setProfile({ ...profile, photo: URL.createObjectURL(file) });
  };

  const handleSaveProfile = () => alert("Profile Updated ✔");
  const handlePasswordChange = () => {
    if (!newPass || !confirmPass) return alert("Please fill both fields");
    if (newPass !== confirmPass) return alert("Passwords do not match");
    alert("Password Updated ✔");
    setNewPass("");
    setConfirmPass("");
  };
  const handleDelete = () => window.confirm("Delete account permanently?") && alert("Account Deleted");

  // Navigation handlers
  const navigateToHome = () => navigate('/user/dashboard');
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  // Responsive styles
  const styles = {
    // Layout
    pageContainer: {
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: '#F4F7FB',
      color: '#333333',
      minHeight: '100vh',
      paddingTop: '80px', // Added padding to account for fixed navbar
      padding: isMobile ? '15px' : isTablet ? '20px' : '26px'
    },
    // Navigation
    navBar: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      zIndex: '1000',
      backgroundColor: '#ffffff',
      borderRadius: isMobile ? '0' : '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      padding: isMobile ? '10px 15px' : '15px 20px',
      marginBottom: isMobile ? '15px' : '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      fontSize: isMobile ? '18px' : '22px',
      fontWeight: '700',
      color: '#1A1A1A',
      margin: '0',
      display: 'flex',
      alignItems: 'center'
    },
    logoHighlight: {
      color: '#3182CE',
      fontWeight: '800'
    },
    navActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    navButton: {
      background: 'none',
      border: 'none',
      fontSize: isMobile ? '16px' : '18px',
      color: '#6B7280',
      cursor: 'pointer',
      padding: '8px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    mobileMenu: {
      position: 'fixed',
      top: '0',
      right: isMenuOpen ? '0' : '-100%',
      width: '80%',
      maxWidth: '300px',
      height: '100vh',
      backgroundColor: '#ffffff',
      boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.1)',
      transition: 'right 0.3s ease',
      zIndex: '1000',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    },
    mobileMenuItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      padding: '15px 0',
      borderBottom: '1px solid #eaeaea',
      cursor: 'pointer',
      color: '#1A1A1A',
      fontSize: '16px'
    },
    mobileMenuClose: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer'
    },
    // Page Header
    pageHeader: {
      marginBottom: isMobile ? '20px' : '30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    pageTitle: {
      fontSize: isMobile ? '24px' : '28px',
      fontWeight: '600',
      color: '#2c3e50',
      margin: '0'
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    userAvatar: {
      width: isMobile ? '35px' : '40px',
      height: isMobile ? '35px' : '40px',
      borderRadius: '50%',
      backgroundColor: '#e3f2fd',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#1976d2'
    },
    userName: {
      fontSize: isMobile ? '14px' : '16px',
      fontWeight: '500',
      color: '#2c3e50',
      display: isMobile ? 'none' : 'block'
    },
    // Section Styles
    heading: {
      fontSize: isMobile ? '24px' : '28px',
      marginBottom: isMobile ? '15px' : '20px',
      fontWeight: '600'
    },
    subHeading: {
      marginTop: isMobile ? '25px' : '30px',
      marginBottom: isMobile ? '15px' : '20px',
      fontSize: isMobile ? '18px' : '20px',
      fontWeight: '600'
    },
    section: {
      background: '#fff',
      borderRadius: isMobile ? '8px' : '8px',
      padding: isMobile ? '20px' : '25px',
      width: '100%',
      boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
      marginBottom: isMobile ? '20px' : '25px'
    },
    // Form Styles
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: isMobile ? '20px' : '20px',
      marginTop: isMobile ? '20px' : '20px'
    },
    field: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: isMobile ? '15px' : '20px'
    },
    label: {
      fontWeight: '600',
      fontSize: isMobile ? '14px' : '14px',
      marginBottom: '8px',
      color: '#4b5563'
    },
    input: {
      padding: isMobile ? '12px' : '12px',
      borderRadius: '6px',
      border: '1px solid #d1d1d1',
      fontSize: isMobile ? '14px' : '14px',
      width: '100%',
      boxSizing: 'border-box',
      height: isMobile ? '45px' : '45px' // Increased height for better touch experience
    },
    // Photo Styles - Fixed
    photoSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: isMobile ? '25px' : '30px'
    },
    photoBox: {
      width: isMobile ? '120px' : '150px',
      height: isMobile ? '120px' : '150px',
      borderRadius: '50%',
      overflow: 'hidden',
      background: '#eee',
      border: '3px solid #e0e0e0',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer'
    },
    photoImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    photoOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: isPhotoHovered ? 1 : 0, // Use state to control opacity
      transition: 'opacity 0.3s ease'
    },
    uploadIcon: {
      color: '#fff',
      fontSize: isMobile ? '24px' : '28px'
    },
    uploadText: {
      fontSize: isMobile ? '14px' : '16px',
      color: '#4b5563',
      textAlign: 'center',
      marginTop: '10px'
    },
    // Button Styles
    btnRow: {
      marginTop: isMobile ? '20px' : '25px',
      textAlign: 'right'
    },
    saveBtn: {
      background: '#3A8DFF',
      border: 'none',
      color: '#fff',
      padding: isMobile ? '10px 16px' : '12px 20px',
      borderRadius: '6px',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: isMobile ? '14px' : '16px',
      transition: 'all 0.2s ease',
      fontWeight: '500'
    },
    deleteWrapper: {
      textAlign: 'center',
      marginTop: isMobile ? '30px' : '40px'
    },
    deleteBtn: {
      background: '#D7263D',
      border: 'none',
      color: '#fff',
      padding: isMobile ? '10px 16px' : '12px 20px',
      borderRadius: '6px',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: isMobile ? '14px' : '16px',
      transition: 'all 0.2s ease',
      fontWeight: '500'
    },
    // Mobile indicator
    mobileIndicator: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      marginBottom: '20px',
      color: '#6c757d',
      fontSize: '14px'
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Navigation Bar */}
      <nav style={styles.navBar}>
        <h1 style={styles.logo}>
          <span style={styles.logoHighlight}>Care</span> Worker
        </h1>
        <div style={styles.navActions}>
          {isMobile && (
            <button 
              style={styles.navButton}
              onClick={() => setIsMenuOpen(true)}
            >
              <FaBars />
            </button>
          )}
          {!isMobile && (
            <>
              <button 
                style={styles.navButton}
                onClick={navigateToHome}
                title="Dashboard"
              >
                <FaHome />
              </button>
              <button 
                style={styles.navButton}
                onClick={handleLogout}
                title="Logout"
              >
                <FaSignOutAlt />
              </button>
            </>
          )}
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMobile && (
        <div style={styles.mobileMenu}>
          <button 
            style={styles.mobileMenuClose}
            onClick={() => setIsMenuOpen(false)}
          >
            <FaTimes />
          </button>
          <div 
            style={styles.mobileMenuItem}
            onClick={() => {
              navigateToHome();
              setIsMenuOpen(false);
            }}
          >
            <FaHome /> Dashboard
          </div>
          <div 
            style={styles.mobileMenuItem}
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
          >
            <FaSignOutAlt /> Logout
          </div>
        </div>
      )}
      
      {/* Page Header */}
      <header style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Profile Settings</h1>
        <div style={styles.userProfile}>
          <div style={styles.userAvatar}>
            <FaUser size={isMobile ? 18 : 20} />
          </div>
          <span style={styles.userName}>Admin User</span>
        </div>
      </header>

      {/* Mobile View Indicator */}
      {isMobile && (
        <div style={styles.mobileIndicator}>
          Mobile View - Scroll to see more
        </div>
      )}

      {/* Profile Section */}
      <div style={styles.section}>
        <h2 style={styles.heading}>Profile Information</h2>
        
        {/* Fixed Photo Upload Section */}
        <div style={styles.photoSection}>
          <label 
            htmlFor="photo-upload" 
            style={styles.photoBox}
            onMouseEnter={() => setIsPhotoHovered(true)}
            onMouseLeave={() => setIsPhotoHovered(false)}
          >
            {profile.photo ? (
              <img src={profile.photo} alt="Profile" style={styles.photoImg} />
            ) : (
              <span style={{ fontSize: isMobile ? 40 : 50 }}>👤</span>
            )}
            <div style={styles.photoOverlay}>
              <FaCamera style={styles.uploadIcon} />
            </div>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: "none" }}
            />
          </label>
          <p style={styles.uploadText}>Click to upload photo</p>
        </div>

        <div style={styles.grid}>
          <div style={styles.field}>
            <label style={styles.label}>FULL NAME</label>
            <input
              type="text"
              style={styles.input}
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          
          <div style={styles.field}>
            <label style={styles.label}>EMAIL ADDRESS</label>
            <input
              type="email"
              style={styles.input}
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>
          
          <div style={styles.field}>
            <label style={styles.label}>PHONE NUMBER</label>
            <input
              type="tel"
              style={styles.input}
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>
        </div>

        <div style={styles.btnRow}>
          <button style={styles.saveBtn} onClick={handleSaveProfile}>
            <FaSave /> Save Profile
          </button>
        </div>
      </div>

      {/* Change Password */}
      <div style={styles.section}>
        <h2 style={styles.subHeading}>Change Password</h2>
        <div style={styles.grid}>
          <div style={styles.field}>
            <label style={styles.label}>NEW PASSWORD</label>
            <input
              type="password"
              style={styles.input}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>CONFIRM PASSWORD</label>
            <input
              type="password"
              style={styles.input}
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>
        </div>

        <div style={styles.btnRow}>
          <button style={styles.saveBtn} onClick={handlePasswordChange}>
            <FaKey /> Update Password
          </button>
        </div>
      </div>

      {/* Delete Account */}
      <div style={styles.deleteWrapper}>
        <button style={styles.deleteBtn} onClick={handleDelete}>
          <FaTrash /> Delete My Account
        </button>
      </div>
    </div>
  );
};

export default Settings;