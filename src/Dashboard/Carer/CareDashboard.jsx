import React, { useState, useEffect, useRef } from 'react';
import { 
  FaFileAlt, FaClock, FaPen, FaCheckCircle, FaExclamationCircle, 
  FaBell, FaPlay, FaEdit, FaSignature, FaTimes, FaUser, FaCalendarAlt,
  FaFilter, FaSearch, FaAngleDown, FaAngleUp, FaMobileAlt, FaDownload, FaPrint,
  FaBars, FaSignOutAlt, FaHome, FaClipboardList
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CareDashboard = () => {
  const navigate = useNavigate();
  const signaturePadRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State for window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // State for summary data
  const [summaryData, setSummaryData] = useState({
    formsCompleted: 0,
    formsPending: 0,
    signaturesNeeded: 0,
    profileStatus: 'Active'
  });

  // State for notifications
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // State for forms data
  const [formsData, setFormsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // State for modals
  const [activeModal, setActiveModal] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);

  // Track window width for responsive design
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Fetch mock data on component mount
  useEffect(() => {
    // Mock summary data
    setSummaryData({
      formsCompleted: 8,
      formsPending: 3,
      signaturesNeeded: 2,
      profileStatus: 'Active'
    });

    // Mock notifications data
    setNotifications([
      { id: 1, type: 'form_assigned', message: 'New background check form has been assigned to you', time: '2 hours ago', read: false },
      { id: 2, type: 'signature_required', message: 'Signature required for training completion form', time: '5 hours ago', read: false },
      { id: 3, type: 'admin_reminder', message: 'Admin reminder: Please update your profile information', time: '1 day ago', read: true },
      { id: 4, type: 'deadline_alert', message: 'Medical declaration form due in 3 days', time: '2 days ago', read: true }
    ]);

    // Mock forms data
    setFormsData([
      { id: 1, name: 'Background Check Form', status: 'Completed', action: 'View', dueDate: '2023-09-15', submissionDate: '2023-09-10' },
      { id: 2, name: 'Training Assessment', status: 'In Progress', action: 'Resume', dueDate: '2023-09-20', lastSavedData: { step: 2, data: { name: 'John Doe' } } },
      { id: 3, name: 'Medical Declaration', status: 'Pending', action: 'Start', dueDate: '2023-09-25' },
      { id: 4, name: 'Emergency Contact Form', status: 'Completed', action: 'View', dueDate: '2023-09-10', submissionDate: '2023-09-08' },
      { id: 5, name: 'Code of Conduct', status: 'In Progress', action: 'Resume', dueDate: '2023-09-22', lastSavedData: { step: 1, data: { agreed: false } } },
      { id: 6, name: 'Privacy Agreement', status: 'Pending Signature', action: 'Sign', dueDate: '2023-09-18' }
    ]);
  }, []);
  
  // Determine device type based on width
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;
  const isDesktop = windowWidth > 1024;
  
  // Filter forms based on search term and status
  const filteredForms = formsData.filter(form => {
    const matchesSearch = form.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || form.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Handle form actions
  const handleFormAction = (formId, action) => {
    const form = formsData.find(f => f.id === formId);
    setSelectedForm(form);
    setActiveModal(action);
  };

  // Fixed signature pad handlers - Using approach from DocumentsPage
  const startDrawing = (e) => {
    if (!signaturePadRef.current) return;
    
    // Prevent default to avoid scrolling on touch devices
    e.preventDefault();
    
    setIsDrawing(true);
    const canvas = signaturePadRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    // Get coordinates properly for both mouse and touch events
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    // Set up drawing context
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
    
    // Begin drawing
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  
  const draw = (e) => {
    if (!isDrawing || !signaturePadRef.current) return;
    
    // Prevent default to avoid scrolling on touch devices
    e.preventDefault();
    
    const canvas = signaturePadRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    // Get coordinates properly for both mouse and touch events
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    // Draw line
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  
  const stopDrawing = (e) => {
    if (e) e.preventDefault();
    setIsDrawing(false);
  };
  
  const clearSignature = () => {
    if (!signaturePadRef.current) return;
    const canvas = signaturePadRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  
  // Navigation handlers
  const navigateToHome = () => navigate('/user/dashboard');
  const navigateToDocuments = () => navigate('/documents');
  const navigateToSignatures = () => navigate('/signatures');
  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    // Navigate to login page
    navigate('/login');
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'form_assigned':
        return <FaFileAlt style={{color: '#2196f3'}} />;
      case 'signature_required':
        return <FaPen style={{color: '#ff9800'}} />;
      case 'admin_reminder':
        return <FaBell style={{color: '#9c27b0'}} />;
      case 'deadline_alert':
        return <FaExclamationCircle style={{color: '#f44336'}} />;
      default:
        return <FaBell />;
    }
  };

  // Get action button style based on action type
  const getActionButtonStyle = (action) => {
    switch(action) {
      case 'Start':
        return {
          backgroundColor: '#ffffff',
          color: '#1976d2',
          borderColor: '#1976d2'
        };
      case 'Resume':
        return {
          backgroundColor: '#ffffff',
          color: '#f57c00',
          borderColor: '#f57c00'
        };
      case 'Sign':
        return {
          backgroundColor: '#ffffff',
          color: '#388e3c',
          borderColor: '#388e3c'
        };
      case 'View':
        return {
          backgroundColor: '#ffffff',
          color: '#7b1fa2',
          borderColor: '#7b1fa2'
        };
      default:
        return {
          backgroundColor: '#ffffff',
          color: '#616161',
          borderColor: '#616161'
        };
    }
  };

  // Get status badge style
  const getStatusBadgeStyle = (status) => {
    switch(status) {
      case 'Completed':
        return {
          backgroundColor: '#e8f5e9',
          color: '#2e7d32'
        };
      case 'In Progress':
        return {
          backgroundColor: '#fff8e1',
          color: '#f57f17'
        };
      case 'Pending':
        return {
          backgroundColor: '#f3f4f6',
          color: '#6b7280'
        };
      case 'Pending Signature':
        return {
          backgroundColor: '#e3f2fd',
          color: '#1976d2'
        };
      default:
        return {
          backgroundColor: '#f3f4f6',
          color: '#6b7280'
        };
    }
  };

  // Function to generate and download PDF
  const generatePDF = async (formId) => {
    try {
      // Create a temporary div to render form content
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '800px';
      tempDiv.style.padding = '20px';
      tempDiv.style.fontFamily = 'Arial, sans-serif';
      
      // Find form data
      const form = formsData.find(f => f.id === formId);
      
      // Create form content
      tempDiv.innerHTML = `
        <h2 style="color: #2c3e50; margin-bottom: 20px;">${form.name}</h2>
        <div style="margin-bottom: 20px;">
          <p style="font-weight: bold; margin-bottom: 5px;">Form Details</p>
          <p><strong>Status:</strong> ${form.status}</p>
          <p><strong>Due Date:</strong> ${form.dueDate}</p>
          ${form.submissionDate ? `<p><strong>Submission Date:</strong> ${form.submissionDate}</p>` : ''}
        </div>
        <div style="margin-bottom: 20px;">
          <p style="font-weight: bold; margin-bottom: 5px;">Form Content</p>
          <p>This is a sample form content for ${form.name}.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
        </div>
        <div style="margin-top: 30px; text-align: right;">
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
        </div>
      `;
      
      // Add temporary div to body
      document.body.appendChild(tempDiv);
      
      // Convert div to canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      // Remove the temporary div
      document.body.removeChild(tempDiv);
      
      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add new pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Save the PDF
      pdf.save(`${form.name.replace(/\s+/g, '_')}.pdf`);
      
      // Show success message
      alert('PDF downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
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
      paddingTop: '80px', // Added padding to account for fixed navbar
      padding: isMobile ? '10px' : isTablet ? '15px' : '20px',
      maxWidth: '100%',
      overflowX: 'hidden',
      boxSizing: 'border-box'
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
      alignItems: 'center',
      boxSizing: 'border-box'
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
    // Mobile View Indicator
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
    },
    // Summary Cards Section - Fixed responsive layout
    summaryCardsContainer: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: isMobile ? '15px' : isTablet ? '20px' : '25px',
      marginBottom: isMobile ? '25px' : isTablet ? '30px' : '35px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box'
    },
    summaryCard: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      padding: isMobile ? '15px' : isTablet ? '18px' : '20px',
      display: 'flex',
      alignItems: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      height: '100%',
      minHeight: isMobile ? '100px' : isTablet ? '110px' : '120px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden'
    },
    summaryIcon: {
      width: isMobile ? '50px' : isTablet ? '55px' : '60px',
      height: isMobile ? '50px' : isTablet ? '55px' : '60px',
      borderRadius: '50%',
      marginRight: isMobile ? '12px' : isTablet ? '14px' : '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    formsCompletedIcon: {
      backgroundColor: '#e8f5e9',
      color: '#4caf50'
    },
    formsPendingIcon: {
      backgroundColor: '#fff8e1',
      color: '#ffc107'
    },
    signaturesNeededIcon: {
      backgroundColor: '#e3f2fd',
      color: '#2196f3'
    },
    profileStatusIcon: {
      backgroundColor: '#e8f5e9',
      color: '#4caf50'
    },
    summaryInfo: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minWidth: 0,
      overflow: 'hidden'
    },
    summaryTitle: {
      fontSize: isMobile ? '14px' : isTablet ? '15px' : '16px',
      fontWeight: '500',
      margin: '0 0 5px 0',
      color: '#6c757d',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    summaryValue: {
      fontSize: isMobile ? '22px' : isTablet ? '25px' : '28px',
      fontWeight: '700',
      margin: '0',
      color: '#2c3e50',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    // Notifications Section
    notificationsContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      padding: isMobile ? '15px' : isTablet ? '18px' : '20px',
      marginBottom: isMobile ? '25px' : isTablet ? '30px' : '35px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box'
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: isMobile ? '15px' : isTablet ? '18px' : '20px'
    },
    sectionTitle: {
      fontSize: isMobile ? '18px' : isTablet ? '19px' : '20px',
      fontWeight: '600',
      color: '#2c3e50',
      margin: '0'
    },
    toggleButton: {
      background: 'none',
      border: '1px solid #eaeaea',
      fontSize: isMobile ? '12px' : isTablet ? '13px' : '14px',
      cursor: 'pointer',
      color: '#6c757d',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      padding: isMobile ? '6px 10px' : isTablet ? '7px 11px' : '8px 12px',
      borderRadius: '4px',
      transition: 'all 0.2s ease'
    },
    notificationsList: {
      maxHeight: showNotifications ? '500px' : '0',
      overflow: 'hidden',
      transition: 'max-height 0.3s ease'
    },
    notificationItem: {
      display: 'flex',
      alignItems: 'flex-start',
      padding: isMobile ? '12px 0' : isTablet ? '13px 0' : '15px 0',
      borderBottom: '1px solid #f1f1f1'
    },
    notificationIcon: {
      marginRight: '15px',
      fontSize: '18px'
    },
    notificationContent: {
      flex: '1'
    },
    notificationMessage: {
      fontSize: isMobile ? '13px' : isTablet ? '13px' : '14px',
      color: '#333333',
      marginBottom: '5px'
    },
    notificationTime: {
      fontSize: isMobile ? '11px' : isTablet ? '11px' : '12px',
      color: '#6c757d'
    },
    unreadNotification: {
      backgroundColor: '#f9f9f9',
      borderRadius: '4px',
      padding: isMobile ? '12px' : isTablet ? '13px' : '15px',
      borderLeft: '3px solid #2196f3'
    },
    // Forms Table Section
    formsTableContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      padding: isMobile ? '15px' : isTablet ? '18px' : '20px',
      display: isMobile ? 'none' : 'block',
      overflowX: 'auto',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box'
    },
    filterContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: isMobile ? '15px' : isTablet ? '18px' : '20px',
      flexWrap: 'wrap',
      gap: '15px'
    },
    searchInput: {
      padding: isMobile ? '8px 12px' : isTablet ? '9px 13px' : '10px 15px',
      border: '1px solid #eaeaea',
      borderRadius: '8px',
      fontSize: isMobile ? '13px' : isTablet ? '13px' : '14px',
      width: isMobile ? '100%' : '300px',
      maxWidth: '100%',
      boxSizing: 'border-box'
    },
    filterSelect: {
      padding: isMobile ? '8px 12px' : isTablet ? '9px 13px' : '10px 15px',
      border: '1px solid #eaeaea',
      borderRadius: '8px',
      fontSize: isMobile ? '13px' : isTablet ? '13px' : '14px',
      backgroundColor: '#ffffff',
      boxSizing: 'border-box'
    },
    formsTable: {
      width: '100%',
      borderCollapse: 'collapse',
      tableLayout: 'fixed'
    },
    tableHeader: {
      textAlign: 'left',
      padding: isMobile ? '10px 12px' : isTablet ? '11px 13px' : '12px 15px',
      fontWeight: '600',
      color: '#6c757d',
      borderBottom: '2px solid #eaeaea',
      fontSize: isMobile ? '13px' : isTablet ? '13px' : '14px'
    },
    tableCell: {
      padding: isMobile ? '10px 12px' : isTablet ? '11px 13px' : '12px 15px',
      borderBottom: '1px solid #f1f1f1',
      fontSize: isMobile ? '13px' : isTablet ? '13px' : '14px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    statusBadge: {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: isMobile ? '10px' : isTablet ? '11px' : '12px',
      fontWeight: '600',
      textTransform: 'uppercase'
    },
    actionButton: {
      padding: isMobile ? '5px 10px' : isTablet ? '5px 11px' : '6px 12px',
      border: '1px solid',
      borderRadius: '8px',
      fontSize: isMobile ? '11px' : isTablet ? '11px' : '12px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      width: 'fit-content',
      backgroundColor: '#ffffff'
    },
    // Forms Cards for Mobile
    formsCardsContainer: {
      display: isMobile ? 'flex' : 'none',
      flexDirection: 'column',
      gap: '15px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box'
    },
    formCard: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      padding: '15px',
      transition: 'all 0.2s ease',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box'
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
      flex: '1',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    cardStatus: {
      flexShrink: 0
    },
    cardDetails: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px'
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
    // Modal Styles - Updated z-index to be higher than navbar
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
      borderRadius: '12px',
      width: isMobile ? '100%' : '90%',
      maxWidth: isMobile ? '100%' : '600px',
      maxHeight: isMobile ? '95vh' : '90vh',
      overflow: 'auto',
      position: 'relative',
      boxSizing: 'border-box'
    },
    modalHeader: {
      padding: isMobile ? '15px' : isTablet ? '18px' : '20px',
      borderBottom: '1px solid #eaeaea',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    modalTitle: {
      fontSize: isMobile ? '16px' : isTablet ? '18px' : '20px',
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
      padding: isMobile ? '15px' : isTablet ? '18px' : '20px'
    },
    modalFooter: {
      padding: isMobile ? '15px' : isTablet ? '18px' : '20px',
      borderTop: '1px solid #eaeaea',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      flexWrap: 'wrap'
    },
    button: {
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    primaryButton: {
      backgroundColor: '#3182CE',
      color: '#ffffff'
    },
    secondaryButton: {
      backgroundColor: '#f5f5f5',
      color: '#333333'
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
    // Signature canvas styles - Fixed for better touch support
    signatureCanvasContainer: {
      position: 'relative',
      border: '2px dashed #ccc',
      borderRadius: '4px',
      overflow: 'hidden',
      backgroundColor: '#fff',
      cursor: 'crosshair',
      touchAction: 'none' // Prevents scrolling when drawing on touch devices
    },
    signatureCanvas: {
      display: 'block',
      backgroundColor: '#fff',
      cursor: 'crosshair',
      touchAction: 'none' // Prevents scrolling when drawing on touch devices
    }
  };

  // Start Form Modal Component
  const StartFormModal = ({ form, onClose, onSave }) => {
    const [formData, setFormData] = useState({});
    const [currentStep, setCurrentStep] = useState(0);
    const [autoSave, setAutoSave] = useState(true);

    const handleSave = () => {
      // Simulate saving
      onSave(form.id, formData);
      onClose();
    };

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
          <div style={styles.modalHeader}>
            <h3 style={styles.modalTitle}>{form.name}</h3>
            <button 
              style={styles.closeButton}
              onClick={onClose}
            >
              <FaTimes size={20} />
            </button>
          </div>
          
          <div style={styles.modalBody}>
            <div style={{marginBottom: '20px'}}>
              <h4>Form Introduction</h4>
              <p>This form contains following sections:</p>
              <ul style={{paddingLeft: '20px'}}>
                <li>Personal Information</li>
                <li>Medical History</li>
                <li>Emergency Contacts</li>
                <li>Declaration & Signature</li>
              </ul>
              <p>Estimated time to complete: 15-20 minutes</p>
            </div>
            
            <div style={{marginBottom: '20px'}}>
              <label style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <input 
                  type="checkbox" 
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.target.checked)}
                />
                Enable auto-save progress
              </label>
            </div>

            <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px'}}>
              <h5>Important Notes:</h5>
              <ul style={{paddingLeft: '20px', fontSize: '14px'}}>
                <li>All fields marked with * are required</li>
                <li>Your progress will be saved automatically</li>
                <li>You can return to complete form later</li>
              </ul>
            </div>
          </div>
          
          <div style={styles.modalFooter}>
            <button 
              style={{...styles.button, ...styles.secondaryButton}} 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              style={{...styles.button, ...styles.primaryButton}} 
              onClick={handleSave}
            >
              Start Form
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Resume Form Modal Component
  const ResumeFormModal = ({ form, onClose, onSave, onRestart }) => {
    const progress = 65; // Mock progress percentage
    const existingData = form.lastSavedData || {};

    const handleResume = () => {
      onSave(form.id, existingData);
      onClose();
    };

    const handleRestart = () => {
      onRestart(form.id);
      onClose();
    };

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
          <div style={styles.modalHeader}>
            <h3 style={styles.modalTitle}>{form.name}</h3>
            <button 
              style={styles.closeButton}
              onClick={onClose}
            >
              <FaTimes size={20} />
            </button>
          </div>
          
          <div style={styles.modalBody}>
            <div style={{marginBottom: '20px'}}>
              <h4>Form Progress</h4>
              <div style={{backgroundColor: '#eaeaea', height: '10px', borderRadius: '5px', marginBottom: '10px'}}>
                <div style={{backgroundColor: '#4caf50', height: '100%', width: `${progress}%`, borderRadius: '5px'}}></div>
              </div>
              <p>Completed: {progress}%</p>
              <p>Last edited: 2 days ago</p>
              <p>Current section: Medical History</p>
            </div>

            <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px'}}>
              <h5>Saved Information:</h5>
              <ul style={{paddingLeft: '20px', fontSize: '14px'}}>
                <li>Personal Information: Completed</li>
                <li>Medical History: In Progress</li>
                <li>Emergency Contacts: Not Started</li>
                <li>Declaration: Not Started</li>
              </ul>
            </div>
          </div>
          
          <div style={styles.modalFooter}>
            <button 
              style={{...styles.button, ...styles.secondaryButton}} 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              style={{...styles.button, backgroundColor: '#ff9800', color: '#ffffff'}} 
              onClick={handleRestart}
            >
              Restart Form
            </button>
            <button 
              style={{...styles.button, ...styles.primaryButton}} 
              onClick={handleResume}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Sign Form Modal Component - Fixed signature functionality
  const SignFormModal = ({ form, onClose, onSign }) => {
    const [signatureType, setSignatureType] = useState('draw');
    const [typedSignature, setTypedSignature] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [canvasSize, setCanvasSize] = useState({ width: 400, height: 150 });
    
    // Update canvas size based on window width
    useEffect(() => {
      if (isMobile) {
        setCanvasSize({ width: windowWidth - 60, height: 150 });
      } else {
        setCanvasSize({ width: 400, height: 150 });
      }
    }, [windowWidth, isMobile]);

    const handleSign = () => {
      const signature = signatureType === 'type' ? typedSignature : 'drawn_signature';
      onSign(form.id, signature);
      onClose();
    };

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
          <div style={styles.modalHeader}>
            <h3 style={styles.modalTitle}>Signature Required: {form.name}</h3>
            <button 
              style={styles.closeButton}
              onClick={onClose}
            >
              <FaTimes size={20} />
            </button>
          </div>
          
          <div style={styles.modalBody}>
            <div style={{marginBottom: '20px'}}>
              <h4>Document Preview</h4>
              <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px', height: '200px', overflow: 'auto'}}>
                <p>This is a preview of Privacy Agreement document...</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                <p>By signing this document, you agree to our terms and conditions...</p>
              </div>
            </div>

            <div style={{marginBottom: '20px'}}>
              <label style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <input 
                  type="checkbox" 
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                I have read and agree to terms and conditions
              </label>
            </div>

            <div style={{marginBottom: '20px'}}>
              <h4>Signature Type</h4>
              <div style={{display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap'}}>
                <button 
                  style={{
                    ...styles.button,
                    backgroundColor: signatureType === 'draw' ? '#1976d2' : '#f5f5f5',
                    color: signatureType === 'draw' ? '#ffffff' : '#333333',
                    padding: isMobile ? '8px 15px' : '10px 20px'
                  }}
                  onClick={() => setSignatureType('draw')}
                >
                  Draw Signature
                </button>
                <button 
                  style={{
                    ...styles.button,
                    backgroundColor: signatureType === 'type' ? '#1976d2' : '#f5f5f5',
                    color: signatureType === 'type' ? '#ffffff' : '#333333',
                    padding: isMobile ? '8px 15px' : '10px 20px'
                  }}
                  onClick={() => setSignatureType('type')}
                >
                  Type Signature
                </button>
              </div>

              {signatureType === 'draw' ? (
                <div style={styles.signatureCanvasContainer}>
                  <canvas 
                    ref={signaturePadRef}
                    width={canvasSize.width}
                    height={canvasSize.height}
                    style={styles.signatureCanvas}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                  <button 
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: '#ffffff',
                      border: '1px solid #eaeaea',
                      borderRadius: '4px',
                      padding: '5px 10px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                    onClick={clearSignature}
                  >
                    Clear
                  </button>
                </div>
              ) : (
                <input 
                  type="text" 
                  value={typedSignature}
                  onChange={(e) => setTypedSignature(e.target.value)}
                  placeholder="Type your full name"
                  style={{
                    width: '100%', 
                    padding: '10px', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px',
                    fontSize: '16px' // Larger font size for better mobile experience
                  }}
                />
              )}
            </div>

            <div style={{fontSize: '12px', color: '#666'}}>
              Signature Date: {new Date().toLocaleDateString()}
            </div>
          </div>
          
          <div style={styles.modalFooter}>
            <button 
              style={{...styles.button, ...styles.secondaryButton}} 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              style={{...styles.button, ...styles.primaryButton}} 
              onClick={handleSign}
              disabled={!agreed || (signatureType === 'type' && !typedSignature)}
            >
              Submit Signature
            </button>
          </div>
        </div>
      </div>
    );
  };

  // View Form Modal Component
  const ViewFormModal = ({ form, onClose, onPrint, onDownload }) => {
    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
          <div style={styles.modalHeader}>
            <h3 style={styles.modalTitle}>{form.name}</h3>
            <button 
              style={styles.closeButton}
              onClick={onClose}
            >
              <FaTimes size={20} />
            </button>
          </div>
          
          <div style={styles.modalBody}>
            <div style={{marginBottom: '20px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
                <h4>Form Details</h4>
                <span style={{...styles.statusBadge, ...getStatusBadgeStyle(form.status)}}>
                  {form.status}
                </span>
              </div>
              
              <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px', height: '300px', overflow: 'auto'}}>
                <h5>Background Check Form</h5>
                <p><strong>Name:</strong> John Doe</p>
                <p><strong>Date of Birth:</strong> 01/01/1980</p>
                <p><strong>Address:</strong> 123 Main St, City, State</p>
                <p><strong>Phone:</strong> (555) 123-4567</p>
                <p><strong>Email:</strong> john.doe@example.com</p>
                <hr style={{margin: '15px 0'}} />
                <h5>Background Check Results</h5>
                <p><strong>Criminal Record:</strong> Clear</p>
                <p><strong>Reference Check:</strong> Passed</p>
                <p><strong>Employment Verification:</strong> Verified</p>
                <hr style={{margin: '15px 0'}} />
                <p><strong>Submitted on:</strong> {form.submissionDate}</p>
                <p><strong>Approved by:</strong> Admin User</p>
              </div>
            </div>
          </div>
          
          <div style={styles.modalFooter}>
            <button 
              style={{...styles.button, ...styles.secondaryButton}} 
              onClick={onClose}
            >
              Close
            </button>
            <button 
              style={{...styles.button, ...styles.secondaryButton}} 
              onClick={() => onPrint(form.id)}
            >
              <FaPrint style={{marginRight: '5px'}} />
              Print
            </button>
            <button 
              style={{...styles.button, ...styles.primaryButton}} 
              onClick={() => onDownload(form.id)}
            >
              <FaDownload style={{marginRight: '5px'}} />
              Download
            </button>
          </div>
        </div>
      </div>
    );
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
                onClick={navigateToDocuments}
                title="Documents"
              >
                <FaFileAlt />
              </button>
              <button 
                style={styles.navButton}
                onClick={navigateToSignatures}
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
              navigateToDocuments();
              setIsMenuOpen(false);
            }}
          >
            <FaFileAlt /> Documents
          </div>
          <div 
            style={styles.mobileMenuItem}
            onClick={() => {
              navigateToSignatures();
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
        <h1 style={styles.pageTitle}>Care Worker Dashboard</h1>
        <div style={styles.userProfile}>
          <div style={styles.userAvatar}>
            <FaUser size={isMobile ? 18 : 20} />
          </div>
          <span style={styles.userName}>John Doe</span>
        </div>
      </header>

      {/* Mobile View Indicator */}
      {/* {isMobile && (
        <div style={styles.mobileIndicator}>
          <FaMobileAlt style={{marginRight: '5px'}} />
          Mobile View - Scroll to see more
        </div>
      )} */}

      <main>
        {/* Summary Cards Section */}
        <section style={styles.summaryCardsContainer}>
          <div 
            style={styles.summaryCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
            }}
          >
            <div style={{...styles.summaryIcon, ...styles.formsCompletedIcon}}>
              <FaCheckCircle size={isMobile ? 24 : 28} />
            </div>
            <div style={styles.summaryInfo}>
              <h3 style={styles.summaryTitle}>Forms Completed</h3>
              <p style={styles.summaryValue}>{summaryData.formsCompleted}</p>
            </div>
          </div>

          <div 
            style={styles.summaryCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
            }}
          >
            <div style={{...styles.summaryIcon, ...styles.formsPendingIcon}}>
              <FaClock size={isMobile ? 24 : 28} />
            </div>
            <div style={styles.summaryInfo}>
              <h3 style={styles.summaryTitle}>Forms Pending</h3>
              <p style={styles.summaryValue}>{summaryData.formsPending}</p>
            </div>
          </div>

          <div 
            style={styles.summaryCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
            }}
          >
            <div style={{...styles.summaryIcon, ...styles.signaturesNeededIcon}}>
              <FaPen size={isMobile ? 24 : 28} />
            </div>
            <div style={styles.summaryInfo}>
              <h3 style={styles.summaryTitle}>Signatures Needed</h3>
              <p style={styles.summaryValue}>{summaryData.signaturesNeeded}</p>
            </div>
          </div>

          <div 
            style={styles.summaryCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
            }}
          >
            <div style={{...styles.summaryIcon, ...styles.profileStatusIcon}}>
              <FaUser size={isMobile ? 24 : 28} />
            </div>
            <div style={styles.summaryInfo}>
              <h3 style={styles.summaryTitle}>Profile Status</h3>
              <p style={styles.summaryValue}>{summaryData.profileStatus}</p>
            </div>
          </div>
        </section>

        {/* Notifications Section */}
        <section style={styles.notificationsContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Notifications</h2>
            <button 
              style={styles.toggleButton}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              {showNotifications ? <FaAngleUp /> : <FaAngleDown />}
              {showNotifications ? 'Hide' : 'Show'}
            </button>
          </div>
          
          <div style={styles.notificationsList}>
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                style={{
                  ...styles.notificationItem,
                  ...(notification.read === false ? styles.unreadNotification : {})
                }}
              >
                <div style={styles.notificationIcon}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div style={styles.notificationContent}>
                  <div style={styles.notificationMessage}>{notification.message}</div>
                  <div style={styles.notificationTime}>{notification.time}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Forms Table Section - Desktop View */}
        <section style={styles.formsTableContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>My Forms</h2>
          </div>
          
          {/* Search and Filter Controls */}
          <div style={styles.filterContainer}>
            <div style={{display: 'flex', gap: '10px', alignItems: 'center', flex: 1}}>
              <FaSearch style={{color: '#6c757d'}} />
              <input
                type="text"
                placeholder="Search forms..."
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
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
                <option value="Pending Signature">Pending Signature</option>
              </select>
            </div>
          </div>

          {/* Forms Table */}
          <table style={styles.formsTable}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Form Name</th>
                <th style={styles.tableHeader}>Status</th>
                <th style={styles.tableHeader}>Due Date</th>
                <th style={styles.tableHeader}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredForms.map((form) => (
                <tr key={form.id}>
                  <td style={styles.tableCell}>{form.name}</td>
                  <td style={styles.tableCell}>
                    <span 
                      style={{
                        ...styles.statusBadge,
                        ...getStatusBadgeStyle(form.status)
                      }}
                    >
                      {form.status}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                      <FaCalendarAlt style={{color: '#6c757d', fontSize: '14px'}} />
                      {form.dueDate}
                    </div>
                  </td>
                  <td style={styles.tableCell}>
                    <button 
                      style={{
                        ...styles.actionButton,
                        ...getActionButtonStyle(form.action)
                      }}
                      onClick={() => handleFormAction(form.id, form.action)}
                    >
                      {form.action === 'Start' && <FaPlay size={12} />}
                      {form.action === 'Resume' && <FaEdit size={12} />}
                      {form.action === 'Sign' && <FaSignature size={12} />}
                      {form.action === 'View' && <FaFileAlt size={12} />}
                      {form.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Forms Cards Section - Mobile View */}
        <section style={styles.formsCardsContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>My Forms</h2>
          </div>
          
          {/* Search and Filter Controls */}
          <div style={styles.filterContainer}>
            <div style={{display: 'flex', gap: '10px', alignItems: 'center', flex: 1}}>
              <FaSearch style={{color: '#6c757d'}} />
              <input
                type="text"
                placeholder="Search forms..."
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
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
                <option value="Pending Signature">Pending Signature</option>
              </select>
            </div>
          </div>

          {/* Forms Cards */}
          {filteredForms.map((form) => (
            <div key={form.id} style={styles.formCard}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>{form.name}</h3>
                <div style={styles.cardStatus}>
                  <span 
                    style={{
                      ...styles.statusBadge,
                      ...getStatusBadgeStyle(form.status)
                    }}
                  >
                    {form.status}
                  </span>
                </div>
              </div>
              <div style={styles.cardDetails}>
                <div style={styles.cardDate}>
                  <FaCalendarAlt />
                  {form.dueDate}
                </div>
              </div>
              <div style={styles.cardAction}>
                <button 
                  style={{
                    ...styles.actionButton,
                    ...getActionButtonStyle(form.action)
                  }}
                  onClick={() => handleFormAction(form.id, form.action)}
                >
                  {form.action === 'Start' && <FaPlay size={12} />}
                  {form.action === 'Resume' && <FaEdit size={12} />}
                  {form.action === 'Sign' && <FaSignature size={12} />}
                  {form.action === 'View' && <FaFileAlt size={12} />}
                  {form.action}
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Modals */}
      {activeModal === 'Start' && selectedForm && (
        <StartFormModal 
          form={selectedForm}
          onClose={() => setActiveModal(null)}
          onSave={(formId, data) => {
            console.log('Starting form:', formId, data);
            // Update form status in formsData
            setFormsData(prev => prev.map(f => 
              f.id === formId ? {...f, status: 'In Progress', action: 'Resume'} : f
            ));
          }}
        />
      )}

      {activeModal === 'Resume' && selectedForm && (
        <ResumeFormModal 
          form={selectedForm}
          onClose={() => setActiveModal(null)}
          onSave={(formId, data) => {
            console.log('Resuming form:', formId, data);
          }}
          onRestart={(formId) => {
            console.log('Restarting form:', formId);
            // Update form status in formsData
            setFormsData(prev => prev.map(f => 
              f.id === formId ? {...f, status: 'In Progress', action: 'Resume'} : f
            ));
          }}
        />
      )}

      {activeModal === 'Sign' && selectedForm && (
        <SignFormModal 
          form={selectedForm}
          onClose={() => setActiveModal(null)}
          onSign={(formId, signature) => {
            console.log('Signing form:', formId, signature);
            // Update form status in formsData
            setFormsData(prev => prev.map(f => 
              f.id === formId ? {...f, status: 'Completed', action: 'View'} : f
            ));
          }}
        />
      )}

      {activeModal === 'View' && selectedForm && (
        <ViewFormModal 
          form={selectedForm}
          onClose={() => setActiveModal(null)}
          onPrint={(formId) => {
            console.log('Printing form:', formId);
            window.print();
          }}
          onDownload={(formId) => {
            console.log('Downloading form:', formId);
            // Generate and download PDF
            generatePDF(formId);
          }}
        />
      )}
    </div>
  );
};

export default CareDashboard;