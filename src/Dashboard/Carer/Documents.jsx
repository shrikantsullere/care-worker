import React, { useState, useEffect, useRef } from 'react';
import { 
  File, Eye, CheckCircle, X, User,
  Search, Filter, Download, Calendar, Menu,
  LogOut, Home, Clipboard
} from 'lucide-react';

const DocumentsPage = () => {
  const canvasRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  
  // Signature Pad States
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [documentToSign, setDocumentToSign] = useState(null);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    setDocuments([
      { 
        id: 1, 
        name: 'Employment Contract', 
        status: 'Signed', 
        date: '2023-09-10',
        url: '#',
        description: 'Standard employment agreement with terms and conditions'
      },
      { 
        id: 2, 
        name: 'Privacy Policy', 
        status: 'Pending', 
        date: '2023-09-15',
        url: '#',
        description: 'Company privacy policy and data handling procedures'
      },
      { 
        id: 3, 
        name: 'Code of Conduct', 
        status: 'Completed', 
        date: '2023-09-05',
        url: '#',
        description: 'Professional conduct guidelines and ethical standards'
      },
      { 
        id: 4, 
        name: 'Health & Safety Guidelines', 
        status: 'Pending', 
        date: '2023-09-20',
        url: '#',
        description: 'Workplace safety protocols and emergency procedures'
      },
      { 
        id: 5, 
        name: 'Data Protection Agreement', 
        status: 'Signed', 
        date: '2023-09-08',
        url: '#',
        description: 'GDPR compliance and data protection measures'
      }
    ]);
  }, []);
  
  // Initialize Canvas
  useEffect(() => {
    if (showSignaturePad && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
    }
  }, [showSignaturePad]);
  
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;
  
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || doc.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
  
  const handleViewDocument = (document) => {
    setSelectedDocument(document);
    setShowPdfViewer(true);
  };
  
  // Open Signature Pad
  const handleSignDocument = (document) => {
    setDocumentToSign(document);
    setShowSignaturePad(true);
  };
  
  // Signature Drawing Functions
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    const x = e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
    const y = e.clientY ? e.clientY - rect.top : e.touches[0].clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    const x = e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
    const y = e.clientY ? e.clientY - rect.top : e.touches[0].clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveSignature = () => {
    setDocuments(prevDocs => 
      prevDocs.map(doc => 
        doc.id === documentToSign.id 
          ? { ...doc, status: 'Signed' } 
          : doc
      )
    );
    setShowSignaturePad(false);
    clearCanvas();
  };
  
  const navigateToHome = () => alert('Navigate to Dashboard');
  const navigateToSignatures = () => alert('Navigate to Signatures');
  const handleLogout = () => alert('Logout');
  
  const getStatusBadgeStyle = (status) => {
    switch(status) {
      case 'Completed':
        return { backgroundColor: '#e8f5e9', color: '#2e7d32' };
      case 'Signed':
        return { backgroundColor: '#e3f2fd', color: '#1976d2' };
      case 'Pending':
        return { backgroundColor: '#fff8e1', color: '#f57f17' };
      default:
        return { backgroundColor: '#f3f4f6', color: '#6b7280' };
    }
  };
  
  const styles = {
    pageContainer: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#F4F7FB',
      color: '#333333',
      minHeight: '100vh',
      paddingTop: isMobile ? '60px' : '80px',
      padding: isMobile ? '15px' : '20px'
    },
    navBar: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      zIndex: '1000',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
      padding: isMobile ? '12px 20px' : '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      fontSize: isMobile ? '20px' : '24px',
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
      gap: isMobile ? '10px' : '20px'
    },
    navButton: {
      background: 'none',
      border: 'none',
      fontSize: isMobile ? '18px' : '20px',
      color: '#6B7280',
      cursor: 'pointer',
      padding: '8px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease'
    },
    mobileMenu: {
      position: 'fixed',
      top: '0',
      right: isMenuOpen ? '0' : '-100%',
      width: '280px',
      height: '100vh',
      backgroundColor: '#ffffff',
      boxShadow: '-2px 0 20px rgba(0, 0, 0, 0.15)',
      transition: 'right 0.3s ease',
      zIndex: '1001',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    },
    mobileMenuHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      paddingBottom: '15px',
      borderBottom: '1px solid #eaeaea'
    },
    mobileMenuTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1A1A1A'
    },
    mobileMenuItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      padding: '15px 0',
      cursor: 'pointer',
      color: '#1A1A1A',
      fontSize: '16px',
      transition: 'all 0.2s ease',
      borderRadius: '8px',
      paddingLeft: '10px'
    },
    mobileMenuClose: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#6B7280'
    },
    pageHeader: {
      marginBottom: isMobile ? '25px' : '35px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '15px'
    },
    pageTitle: {
      fontSize: isMobile ? '28px' : '32px',
      fontWeight: '600',
      color: '#2c3e50',
      margin: '0'
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    userAvatar: {
      width: isMobile ? '40px' : '45px',
      height: isMobile ? '40px' : '45px',
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
      color: '#2c3e50'
    },
    filterContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      padding: isMobile ? '20px' : '25px',
      marginBottom: isMobile ? '25px' : '35px',
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
      minWidth: isMobile ? '100%' : '250px'
    },
    searchInput: {
      padding: isMobile ? '12px 15px' : '14px 18px',
      border: '1px solid #eaeaea',
      borderRadius: '10px',
      fontSize: isMobile ? '14px' : '16px',
      width: '100%',
      boxSizing: 'border-box',
      transition: 'all 0.2s ease'
    },
    filterSelect: {
      padding: isMobile ? '12px 15px' : '14px 18px',
      border: '1px solid #eaeaea',
      borderRadius: '10px',
      fontSize: isMobile ? '14px' : '16px',
      backgroundColor: '#ffffff',
      minWidth: '160px',
      cursor: 'pointer'
    },
    documentsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      gap: isMobile ? '20px' : '25px'
    },
    documentCard: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      padding: isMobile ? '20px' : '25px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: '1px solid transparent'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '15px'
    },
    cardTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: isMobile ? '16px' : '18px',
      fontWeight: '600',
      color: '#2c3e50',
      flex: 1,
      lineHeight: '1.4'
    },
    documentIcon: {
      color: '#d32f2f',
      flexShrink: 0
    },
    statusBadge: {
      display: 'inline-block',
      padding: '6px 14px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      flexShrink: 0
    },
    cardDescription: {
      fontSize: isMobile ? '13px' : '14px',
      color: '#6c757d',
      marginBottom: '20px',
      lineHeight: '1.5'
    },
    cardFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '1px solid #f0f0f0',
      paddingTop: '15px'
    },
    cardDate: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '12px',
      color: '#6c757d'
    },
    cardActions: {
      display: 'flex',
      gap: '8px'
    },
    actionButton: {
      padding: isMobile ? '8px 14px' : '10px 16px',
      border: '1px solid',
      borderRadius: '8px',
      fontSize: isMobile ? '12px' : '13px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    viewButton: {
      color: '#1976d2',
      borderColor: '#1976d2',
      backgroundColor: '#ffffff'
    },
    signButton: {
      color: '#ffffff',
      backgroundColor: '#4CAF50',
      borderColor: '#4CAF50'
    },
    modalOverlay: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 3000,
      padding: isMobile ? '15px' : '20px'
    },
    modalContent: {
      backgroundColor: '#ffffff',
      borderRadius: isMobile ? '12px' : '16px',
      width: '100%',
      maxWidth: isMobile ? '500px' : '600px',
      maxHeight: '90vh',
      overflow: 'hidden',
      animation: 'slideUp 0.3s ease'
    },
    modalHeader: {
      padding: isMobile ? '20px' : '25px',
      borderBottom: '1px solid #f0f0f0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    modalTitle: {
      fontSize: isMobile ? '18px' : '20px',
      fontWeight: '600',
      color: '#2c3e50',
      margin: '0'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#6c757d',
      padding: '5px',
      borderRadius: '50%',
      transition: 'all 0.2s ease'
    },
    modalBody: {
      padding: isMobile ? '20px' : '25px'
    },
    pdfPreview: {
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      padding: '40px 20px',
      textAlign: 'center',
      border: '2px dashed #dee2e6'
    },
    pdfIcon: {
      marginBottom: '20px'
    },
    pdfTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '10px'
    },
    pdfDescription: {
      fontSize: '14px',
      color: '#6c757d',
      marginBottom: '25px',
      lineHeight: '1.5'
    },
    canvas: {
      border: '2px solid #eaeaea',
      borderRadius: '12px',
      cursor: 'crosshair',
      width: '100%',
      backgroundColor: '#ffffff',
      touchAction: 'none'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      marginTop: '20px'
    },
    primaryButton: {
      flex: '1',
      padding: '14px',
      border: 'none',
      borderRadius: '10px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      backgroundColor: '#4CAF50',
      color: '#ffffff',
      transition: 'all 0.2s ease'
    },
    secondaryButton: {
      flex: '1',
      padding: '14px',
      border: 'none',
      borderRadius: '10px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      backgroundColor: '#f44336',
      color: '#ffffff',
      transition: 'all 0.2s ease'
    },
    downloadButton: {
      width: '100%',
      padding: '14px',
      border: 'none',
      borderRadius: '10px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      backgroundColor: '#3182CE',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      transition: 'all 0.2s ease'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#6c757d'
    },
    emptyStateIcon: {
      fontSize: '64px',
      marginBottom: '20px',
      color: '#dee2e6'
    },
    emptyStateText: {
      fontSize: '18px',
      marginBottom: '10px'
    },
    overlay: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: '999',
      display: isMenuOpen ? 'block' : 'none'
    }
  };
  
  return (
    <>
      <div style={styles.overlay} onClick={() => setIsMenuOpen(false)} />
      <div style={styles.pageContainer}>
        <nav style={styles.navBar}>
          <h1 style={styles.logo}>
            <span style={styles.logoHighlight}>Care</span> Worker
          </h1>
          <div style={styles.navActions}>
            {isMobile ? (
              <button 
                style={styles.navButton}
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            ) : (
              <>
                <button style={styles.navButton} onClick={navigateToHome}>
                  <Home size={22} />
                </button>
                <button style={styles.navButton} onClick={navigateToSignatures}>
                  <Clipboard size={22} />
                </button>
                <button style={styles.navButton} onClick={handleLogout}>
                  <LogOut size={22} />
                </button>
              </>
            )}
          </div>
        </nav>
        
        {/* Mobile Menu */}
        <div style={styles.mobileMenu}>
          <div style={styles.mobileMenuHeader}>
            <span style={styles.mobileMenuTitle}>Menu</span>
            <button 
              style={styles.mobileMenuClose}
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          <div 
            style={styles.mobileMenuItem}
            onClick={() => {
              navigateToHome();
              setIsMenuOpen(false);
            }}
          >
            <Home size={20} /> Dashboard
          </div>
          <div 
            style={styles.mobileMenuItem}
            onClick={() => {
              navigateToSignatures();
              setIsMenuOpen(false);
            }}
          >
            <Clipboard size={20} /> Signatures
          </div>
          <div 
            style={styles.mobileMenuItem}
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
          >
            <LogOut size={20} /> Logout
          </div>
        </div>
        
        <header style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>Documents</h1>
          <div style={styles.userProfile}>
            <div style={styles.userAvatar}>
              <User size={isMobile ? 22 : 24} />
            </div>
            <span style={styles.userName}>John Doe</span>
          </div>
        </header>
        
        <section style={styles.filterContainer}>
          <div style={styles.searchContainer}>
            <Search size={20} style={{color: '#6c757d'}} />
            <input
              type="text"
              placeholder="Search documents..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
            <Filter size={20} style={{color: '#6c757d'}} />
            <select
              style={styles.filterSelect}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Signed">Signed</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </section>
        
        <section style={styles.documentsGrid}>
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((document) => (
              <div key={document.id} style={styles.documentCard}>
                <div style={styles.cardHeader}>
                  <div style={styles.cardTitle}>
                    <File size={24} style={styles.documentIcon} />
                    {document.name}
                  </div>
                  <span style={{...styles.statusBadge, ...getStatusBadgeStyle(document.status)}}>
                    {document.status}
                  </span>
                </div>
                <div style={styles.cardDescription}>
                  {document.description}
                </div>
                <div style={styles.cardFooter}>
                  <div style={styles.cardDate}>
                    <Calendar size={14} />
                    {document.date}
                  </div>
                  <div style={styles.cardActions}>
                    <button 
                      style={{...styles.actionButton, ...styles.viewButton}}
                      onClick={() => handleViewDocument(document)}
                    >
                      <Eye size={14} /> View
                    </button>
                    {document.status === 'Pending' && (
                      <button 
                        style={{...styles.actionButton, ...styles.signButton}}
                        onClick={() => handleSignDocument(document)}
                      >
                        <CheckCircle size={14} /> Sign
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.emptyState}>
              <File size={64} style={styles.emptyStateIcon} />
              <div style={styles.emptyStateText}>No documents found</div>
              <div style={{fontSize: '14px', color: '#999999'}}>
                Try adjusting your search or filter criteria
              </div>
            </div>
          )}
        </section>
        
        {/* Simplified PDF Viewer Modal */}
        {showPdfViewer && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>Document Preview</h2>
                <button 
                  style={styles.closeButton}
                  onClick={() => setShowPdfViewer(false)}
                >
                  <X size={20} />
                </button>
              </div>
              <div style={styles.modalBody}>
                <div style={styles.pdfPreview}>
                  <div style={styles.pdfIcon}>
                    <File size={64} color="#d32f2f" />
                  </div>
                  <div style={styles.pdfTitle}>{selectedDocument?.name}</div>
                  <div style={styles.pdfDescription}>
                    {selectedDocument?.description}
                  </div>
                  <button 
                    style={styles.downloadButton}
                    onClick={() => {
                      alert(`Downloading ${selectedDocument?.name}`);
                      setShowPdfViewer(false);
                    }}
                  >
                    <Download size={18} />
                    Download Document
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Signature Pad Modal */}
        {showSignaturePad && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>Sign Document: {documentToSign?.name}</h2>
                <button 
                  style={styles.closeButton}
                  onClick={() => setShowSignaturePad(false)}
                >
                  <X size={20} />
                </button>
              </div>
              <div style={styles.modalBody}>
                <p style={{marginBottom: '20px', color: '#6c757d', fontSize: '14px'}}>
                  Please sign below:
                </p>
                <canvas
                  ref={canvasRef}
                  width={isMobile ? 350 : 500}
                  height={isMobile ? 200 : 250}
                  style={styles.canvas}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
                <div style={styles.buttonGroup}>
                  <button style={styles.primaryButton} onClick={saveSignature}>
                    Save Signature
                  </button>
                  <button style={styles.secondaryButton} onClick={clearCanvas}>
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DocumentsPage;