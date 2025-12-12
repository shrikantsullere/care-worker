import React, { useState, useEffect, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { 
  FaFileAlt, FaPen, FaCheckCircle, FaTimes, FaUser,
  FaSearch, FaFilter, FaCalendarAlt, FaMobileAlt, FaSignature,
  FaBars, FaSignOutAlt, FaHome, FaClipboardList
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SignaturesPage = () => {
  const navigate = useNavigate();
  const signaturePadRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State for window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // State for signatures data
  const [signatures, setSignatures] = useState([]);
  
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  
  // State for modal
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [selectedSignature, setSelectedSignature] = useState(null);
  
  // Track window width for responsive design
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Fetch mock data on component mount
  useEffect(() => {
    // Mock signatures data
    setSignatures([
      { 
        id: 1, 
        name: 'Employment Contract', 
        status: 'Pending', 
        dueDate: '2023-09-15',
        description: 'Standard employment agreement with terms and conditions'
      },
      { 
        id: 2, 
        name: 'Privacy Policy', 
        status: 'Pending', 
        dueDate: '2023-09-20',
        description: 'Company privacy policy and data handling procedures'
      },
      { 
        id: 3, 
        name: 'Code of Conduct', 
        status: 'Completed', 
        dueDate: '2023-09-05',
        description: 'Professional conduct guidelines and ethical standards'
      },
      { 
        id: 4, 
        name: 'Health & Safety Guidelines', 
        status: 'Pending', 
        dueDate: '2023-09-25',
        description: 'Workplace safety protocols and emergency procedures'
      },
      { 
        id: 5, 
        name: 'Data Protection Agreement', 
        status: 'Completed', 
        dueDate: '2023-09-08',
        description: 'GDPR compliance and data protection measures'
      }
    ]);
  }, []);
  
  // Determine device type based on width
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;
  const isDesktop = windowWidth > 1024;
  
  // Filter signatures based on search term and status
  const filteredSignatures = signatures.filter(sig => {
    const matchesSearch = sig.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         sig.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || sig.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
  
  // Handle sign document
  const handleSignDocument = (signature) => {
    setSelectedSignature(signature);
    setShowSignatureModal(true);
  };
  
  // Handle signature submission
  const handleSignatureSubmit = () => {
    // Check if signature is provided
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      // Update signature status to Completed
      setSignatures(prevSigs => 
        prevSigs.map(sig => 
          sig.id === selectedSignature.id 
            ? { ...sig, status: 'Completed' } 
            : sig
        )
      );
      setShowSignatureModal(false);
      setSelectedSignature(null);
    } else {
      alert('Please provide your signature');
    }
  };
  
  // Clear signature
  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };
  
  // Navigation handlers
  const navigateToHome = () => navigate('/user/dashboard');
  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    // Navigate to login page
    navigate('/login');
  };
  
  // Get status badge style
  const getStatusBadgeStyle = (status) => {
    switch(status) {
      case 'Completed':
        return {
          backgroundColor: '#e8f5e9',
          color: '#2e7d32'
        };
      case 'Pending':
        return {
          backgroundColor: '#fff8e1',
          color: '#f57f17'
        };
      default:
        return {
          backgroundColor: '#f3f4f6',
          color: '#6b7280'
        };
    }
  };
  
  // Get action button style based on status
  const getActionButtonStyle = (status) => {
    switch(status) {
      case 'Completed':
        return {
          backgroundColor: '#ffffff',
          color: '#9e9e9e',
          borderColor: '#e0e0e0',
          cursor: 'not-allowed'
        };
      case 'Pending':
        return {
          backgroundColor: '#ffffff',
          color: '#388e3c',
          borderColor: '#388e3c'
        };
      default:
        return {
          backgroundColor: '#ffffff',
          color: '#616161',
          borderColor: '#616161'
        };
    }
  };
  
  // Responsive styles
  const styles = {
    // Layout
    pageContainer: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#F4F7FB',
      color: '#333333',
      minHeight: '100vh',
      paddingTop: '80px', // Increased to account for navbar height
      padding: isMobile ? '10px' : isTablet ? '15px' : '20px'
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
    // Filter Section
    filterContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      padding: isMobile ? '15px' : '20px',
      marginBottom: isMobile ? '20px' : '30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '15px'
    },
    searchContainer: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      flex: '1',
      minWidth: isMobile ? '100%' : '200px'
    },
    searchInput: {
      padding: isMobile ? '10px 15px' : '12px 15px',
      border: '1px solid #eaeaea',
      borderRadius: '8px',
      fontSize: isMobile ? '14px' : '16px',
      width: '100%',
      boxSizing: 'border-box'
    },
    filterSelect: {
      padding: isMobile ? '10px 15px' : '12px 15px',
      border: '1px solid #eaeaea',
      borderRadius: '8px',
      fontSize: isMobile ? '14px' : '16px',
      backgroundColor: '#ffffff',
      minWidth: '150px'
    },
    // Signatures Table for Desktop
    signaturesTableContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      padding: isMobile ? '15px' : '20px',
      display: isMobile ? 'none' : 'block',
      overflowX: 'auto'
    },
    signaturesTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '10px'
    },
    tableHeader: {
      textAlign: 'left',
      padding: isMobile ? '12px 15px' : '15px',
      fontWeight: '600',
      color: '#6c757d',
      borderBottom: '2px solid #eaeaea',
      fontSize: isMobile ? '13px' : '14px'
    },
    tableCell: {
      padding: isMobile ? '12px 15px' : '15px',
      borderBottom: '1px solid #f1f1f1',
      fontSize: isMobile ? '13px' : '14px'
    },
    statusBadge: {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: isMobile ? '10px' : '12px',
      fontWeight: '600',
      textTransform: 'uppercase'
    },
    actionButton: {
      padding: isMobile ? '6px 12px' : '8px 15px',
      border: '1px solid',
      borderRadius: '8px',
      fontSize: isMobile ? '11px' : '12px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      width: 'fit-content',
      backgroundColor: '#ffffff'
    },
    // Signatures Cards for Mobile
    signaturesCardsContainer: {
      display: isMobile ? 'flex' : 'none',
      flexDirection: 'column',
      gap: '15px'
    },
    signatureCard: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      padding: '15px',
      transition: 'all 0.2s ease'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '10px'
    },
    cardTitle: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#2c3e50',
      margin: '0',
      flex: '1'
    },
    cardStatus: {
      flexShrink: 0
    },
    cardDescription: {
      fontSize: '14px',
      color: '#6c757d',
      marginBottom: '15px'
    },
    cardFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    cardDate: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: '12px',
      color: '#6c757d'
    },
    cardAction: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    // Modal Styles
    modalOverlay: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 3000, // Increased z-index to be higher than navbar
      padding: isMobile ? '10px' : '0'
    },
    modalContent: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      width: isMobile ? '100%' : '90%',
      maxWidth: isMobile ? '100%' : '600px',
      maxHeight: isMobile ? '95vh' : '90vh',
      overflow: 'auto',
      position: 'relative'
    },
    modalHeader: {
      padding: isMobile ? '15px' : '20px',
      borderBottom: '1px solid #eaeaea',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    modalTitle: {
      fontSize: isMobile ? '16px' : '20px',
      fontWeight: '600',
      color: '#2c3e50',
      margin: '0'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer',
      color: '#6c757d'
    },
    modalBody: {
      padding: isMobile ? '15px' : '20px'
    },
    signatureForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    formLabel: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#6c757d'
    },
    formInput: {
      padding: '10px 15px',
      border: '1px solid #eaeaea',
      borderRadius: '8px',
      fontSize: '14px'
    },
    signaturePadContainer: {
      position: 'relative',
      border: '1px dashed #eaeaea',
      borderRadius: '8px',
      backgroundColor: '#fafafa',
      overflow: 'hidden'
    },
    signaturePad: {
      width: '100%',
      height: isMobile ? '150px' : '200px',
      cursor: 'crosshair',
      touchAction: 'none' // Prevent scrolling while drawing
    },
    clearButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: '#ffffff',
      border: '1px solid #eaeaea',
      borderRadius: '4px',
      padding: '5px 10px',
      fontSize: '12px',
      cursor: 'pointer',
      zIndex: 1
    },
    modalFooter: {
      padding: isMobile ? '15px' : '20px',
      borderTop: '1px solid #eaeaea',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px'
    },
    cancelButton: {
      padding: '10px 20px',
      border: '1px solid #eaeaea',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      color: '#6c757d'
    },
    submitButton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      backgroundColor: '#3182CE',
      color: '#ffffff'
    },
    emptyState: {
      textAlign: 'center',
      padding: '40px',
      color: '#6c757d'
    },
    emptyStateIcon: {
      fontSize: '48px',
      marginBottom: '15px',
      color: '#cccccc'
    },
    emptyStateText: {
      fontSize: '16px',
      marginBottom: '10px'
    },
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
                onClick={() => navigate('/signatures')}
                title="Signatures"
              >
                <FaClipboardList />
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
              navigate('/signatures');
              setIsMenuOpen(false);
            }}
          >
            <FaClipboardList /> Signatures
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
        <h1 style={styles.pageTitle}>Signatures</h1>
        <div style={styles.userProfile}>
          <div style={styles.userAvatar}>
            <FaUser size={isMobile ? 18 : 20} />
          </div>
          <span style={styles.userName}>John Doe</span>
        </div>
      </header>
      
      {/* Filter Section */}
      <section style={styles.filterContainer}>
        <div style={styles.searchContainer}>
          <FaSearch style={{color: '#6c757d'}} />
          <input
            type="text"
            placeholder="Search signatures..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
          <FaFilter style={{color: '#6c757d'}} />
          <select
            style={styles.filterSelect}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </section>
      
      {/* Mobile View Indicator */}
      {/* {isMobile && (
        <div style={styles.mobileIndicator}>
          <FaMobileAlt style={{marginRight: '5px'}} />
          Mobile View - Scroll to see more
        </div>
      )} */}
      
      {/* Signatures Table for Desktop */}
      <section style={styles.signaturesTableContainer}>
        {filteredSignatures.length > 0 ? (
          <table style={styles.signaturesTable}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Form Name</th>
                <th style={styles.tableHeader}>Due Date</th>
                <th style={styles.tableHeader}>Status</th>
                <th style={styles.tableHeader}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSignatures.map((signature) => (
                <tr key={signature.id}>
                  <td style={styles.tableCell}>{signature.name}</td>
                  <td style={styles.tableCell}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                      <FaCalendarAlt style={{color: '#6c757d', fontSize: '14px'}} />
                      {signature.dueDate}
                    </div>
                  </td>
                  <td style={styles.tableCell}>
                    <span 
                      style={{
                        ...styles.statusBadge,
                        ...getStatusBadgeStyle(signature.status)
                      }}
                    >
                      {signature.status}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    <button 
                      style={{
                        ...styles.actionButton,
                        ...getActionButtonStyle(signature.status)
                      }}
                      onClick={() => signature.status === 'Pending' && handleSignDocument(signature)}
                      disabled={signature.status === 'Completed'}
                    >
                      <FaPen 
                        size={12} 
                        color={signature.status === 'Completed' ? '#9e9e9e' : '#388e3c'}
                      />
                      Sign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={styles.emptyState}>
            <FaFileAlt style={styles.emptyStateIcon} />
            <div style={styles.emptyStateText}>No signatures found</div>
            <div style={{fontSize: '14px', color: '#999999'}}>
              Try adjusting your search or filter criteria
            </div>
          </div>
        )}
      </section>
      
      {/* Signatures Cards for Mobile */}
      <section style={styles.signaturesCardsContainer}>
        {filteredSignatures.length > 0 ? (
          filteredSignatures.map((signature) => (
            <div key={signature.id} style={styles.signatureCard}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>{signature.name}</h3>
                <div style={styles.cardStatus}>
                  <span 
                    style={{
                      ...styles.statusBadge,
                      ...getStatusBadgeStyle(signature.status)
                    }}
                  >
                    {signature.status}
                  </span>
                </div>
              </div>
              <div style={styles.cardDescription}>
                {signature.description}
              </div>
              <div style={styles.cardFooter}>
                <div style={styles.cardDate}>
                  <FaCalendarAlt />
                  {signature.dueDate}
                </div>
                <div style={styles.cardAction}>
                  <button 
                    style={{
                      ...styles.actionButton,
                      ...getActionButtonStyle(signature.status)
                    }}
                    onClick={() => signature.status === 'Pending' && handleSignDocument(signature)}
                    disabled={signature.status === 'Completed'}
                  >
                    <FaPen 
                      size={12} 
                      color={signature.status === 'Completed' ? '#9e9e9e' : '#388e3c'}
                    />
                    Sign
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.emptyState}>
            <FaFileAlt style={styles.emptyStateIcon} />
            <div style={styles.emptyStateText}>No signatures found</div>
            <div style={{fontSize: '14px', color: '#999999'}}>
              Try adjusting your search or filter criteria
            </div>
          </div>
        )}
      </section>
      
      {/* Signature Modal */}
      {showSignatureModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Sign Document: {selectedSignature?.name}</h2>
              <button 
                style={styles.closeButton}
                onClick={() => setShowSignatureModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.signatureForm}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Full Name</label>
                  <input 
                    type="text" 
                    style={styles.formInput} 
                    defaultValue="John Doe"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Email</label>
                  <input 
                    type="email" 
                    style={styles.formInput} 
                    defaultValue="john.doe@example.com"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Signature</label>
                  <div style={styles.signaturePadContainer}>
                    <SignatureCanvas
                      ref={signaturePadRef}
                      canvasProps={{
                        style: styles.signaturePad,
                        touchAction: 'none' // Prevent scrolling while drawing
                      }}
                    />
                    <button 
                      style={styles.clearButton}
                      onClick={clearSignature}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button 
                style={styles.cancelButton}
                onClick={() => setShowSignatureModal(false)}
              >
                Cancel
              </button>
              <button 
                style={styles.submitButton}
                onClick={handleSignatureSubmit}
              >
                Submit Signature
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignaturesPage;