import React, { useState, useEffect } from 'react';
import { 
  FaUser, FaEnvelope, FaPhone, FaHome, FaIdCard, FaExclamationTriangle,
  FaEdit, FaSave, FaTimes, FaUpload, FaDownload, FaTrash, FaCheckCircle,
  FaCalendarAlt, FaFilePdf, FaImage, FaPlus, FaUserCircle, FaShieldAlt,
  FaLock, FaMapMarkerAlt, FaBell, FaMobileAlt
} from 'react-icons/fa';

const MyProfile = () => {
  // State for edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  
  // State for form data
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    niNumber: '',
    emergencyContact: ''
  });
  
  // State for original data (to revert on cancel)
  const [originalData, setOriginalData] = useState({});
  
  // State for certificates
  const [certificates, setCertificates] = useState([]);
  
  // State for window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // State for notifications
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  
  // Track window width for responsive design
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Fetch mock data on component mount
  useEffect(() => {
    // Mock profile data
    const mockProfileData = {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '9876543210',
      address: '123 Main Street, City, State 12345',
      niNumber: 'AB123456C',
      emergencyContact: 'Jane Doe (Spouse) - 9876543211'
    };
    
    setProfileData(mockProfileData);
    setOriginalData(mockProfileData);
    
    // Mock certificates data with actual downloadable URLs
    setCertificates([
      { 
        id: 1, 
        name: 'First Aid Certificate', 
        expiryDate: '2024-05-15', 
        type: 'pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        fileName: 'First_Aid_Certificate.pdf'
      },
      { 
        id: 2, 
        name: 'DBS Check', 
        expiryDate: '2023-12-20', 
        type: 'pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        fileName: 'DBS_Check.pdf'
      },
      { 
        id: 3, 
        name: 'Food Hygiene Certificate', 
        expiryDate: '2024-08-30', 
        type: 'image',
        url: 'https://picsum.photos/seed/certificate/800/600.jpg',
        fileName: 'Food_Hygiene_Certificate.jpg'
      }
    ]);
  }, []);
  
  // Show notification
  const showNotificationMessage = (message, type = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };
  
  // Handle edit mode
  const handleEdit = () => {
    setIsEditMode(true);
    setOriginalData({...profileData});
  };
  
  // Handle save
  const handleSave = () => {
    setIsEditMode(false);
    setOriginalData({...profileData});
    showNotificationMessage('Profile updated successfully!', 'success');
  };
  
  // Handle cancel
  const handleCancel = () => {
    setProfileData({...originalData});
    setIsEditMode(false);
    showNotificationMessage('Changes discarded', 'info');
  };
  
  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newCertificate = {
        id: Date.now(),
        name: file.name,
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        type: file.type.includes('pdf') ? 'pdf' : 'image',
        url: URL.createObjectURL(file),
        fileName: file.name
      };
      
      setCertificates(prev => [...prev, newCertificate]);
      showNotificationMessage('Certificate uploaded successfully!', 'success');
    }
  };
  
  // Handle certificate download - FIXED to download directly without opening
  const handleDownload = (id) => {
    const certificate = certificates.find(cert => cert.id === id);
    if (certificate) {
      // Create a temporary anchor element
      const link = document.createElement('a');
      
      // For blob URLs (uploaded files)
      if (certificate.url.startsWith('blob:')) {
        link.href = certificate.url;
        link.download = certificate.fileName || certificate.name;
      } else {
        // For external URLs, use fetch to get the file as a blob
        fetch(certificate.url)
          .then(response => response.blob())
          .then(blob => {
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = certificate.fileName || certificate.name;
            
            // Trigger the download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Clean up the object URL
            URL.revokeObjectURL(url);
            
            showNotificationMessage(`${certificate.name} downloaded successfully!`, 'success');
          })
          .catch(error => {
            console.error('Download error:', error);
            // Fallback to direct link if fetch fails
            link.href = certificate.url;
            link.download = certificate.fileName || certificate.name;
            link.target = '_blank'; // Open in new tab if download fails
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showNotificationMessage(`Opening ${certificate.name} in new tab`, 'info');
          });
        
        return; // Exit early for external URLs
      }
      
      // For blob URLs, trigger download immediately
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showNotificationMessage(`${certificate.name} downloaded successfully!`, 'success');
    }
  };
  
  // Handle certificate remove
  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to remove this certificate?')) {
      setCertificates(prev => prev.filter(cert => cert.id !== id));
      showNotificationMessage('Certificate removed successfully!', 'success');
    }
  };
  
  // Determine if mobile view
  const isMobile = windowWidth <= 768;
  
  // Check if certificate is expired or expiring soon
  const getCertificateStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { status: 'expired', text: 'Expired', style: { backgroundColor: '#ffebee', color: '#d32f2f' } };
    } else if (diffDays <= 30) {
      return { status: 'expiring', text: 'Expiring Soon', style: { backgroundColor: '#fff8e1', color: '#f57f17' } };
    } else {
      return { status: 'valid', text: 'Valid', style: { backgroundColor: '#e8f5e9', color: '#2e7d32' } };
    }
  };
  
  // Styles
  const styles = {
    profileContainer: { fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: '#333333', minHeight: '100vh', padding: '0' },
    profileHeader: { backgroundColor: '#ffffff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', padding: isMobile ? '15px' : '25px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '0', zIndex: '100' },
    headerLeft: { display: 'flex', alignItems: 'center' },
    profileAvatar: { width: isMobile ? '40px' : '60px', height: isMobile ? '40px' : '60px', borderRadius: '50%', backgroundColor: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px' },
    profileTitle: { fontSize: isMobile ? '20px' : '26px', fontWeight: '600', color: '#2c3e50', margin: '0' },
    headerRight: { display: 'flex', gap: isMobile ? '5px' : '10px' },
    editButton: { display: 'flex', alignItems: 'center', padding: isMobile ? '8px 12px' : '10px 20px', backgroundColor: '#4285F4', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: isMobile ? '12px' : '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 2px 5px rgba(66, 133, 244, 0.2)' },
    saveButton: { display: 'flex', alignItems: 'center', padding: isMobile ? '8px 12px' : '10px 20px', backgroundColor: '#4CAF50', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: isMobile ? '12px' : '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 2px 5px rgba(76, 175, 80, 0.2)' },
    cancelButton: { display: 'flex', alignItems: 'center', padding: isMobile ? '8px 12px' : '10px 20px', backgroundColor: '#f1f1f1', color: '#333333', border: 'none', borderRadius: '6px', fontSize: isMobile ? '12px' : '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s ease' },
    
    // Notification updated to center top
    notification: { position: 'fixed', top: '20px', left: '50%', transform: showNotification ? 'translate(-50%,0)' : 'translate(-50%, -100px)', padding: isMobile ? '10px 15px' : '15px 20px', borderRadius: '6px', color: '#ffffff', fontWeight: '500', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', zIndex: '1000', opacity: showNotification ? '1' : '0', transition: 'all 0.3s ease', maxWidth: isMobile ? '80%' : 'auto' },
    successNotification: { backgroundColor: '#4CAF50' },
    infoNotification: { backgroundColor: '#2196F3' },
    errorNotification: { backgroundColor: '#f44336' },
    
    mobileIndicator: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px', margin: '0 15px 15px', color: '#6c757d', fontSize: '14px' },
    
    profileContent: { maxWidth: '900px', margin: '0 auto', padding: isMobile ? '15px' : '30px' },
    
    sectionContainer: { backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)', padding: isMobile ? '15px' : '30px', marginBottom: isMobile ? '15px' : '30px', transition: 'all 0.3s ease' },
    sectionTitle: { fontSize: isMobile ? '18px' : '20px', fontWeight: '600', color: '#2c3e50', margin: '0 0 ' + (isMobile ? '15px' : '25px') + ' 0', paddingBottom: '10px', borderBottom: '2px solid #eaeaea', display: 'flex', alignItems: 'center' },
    sectionIcon: { marginRight: '10px', color: '#4285F4' },
    
    formGrid: { display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? '15px' : '30px' },
    formGroup: { marginBottom: isMobile ? '15px' : '25px' },
    formLabel: { display: 'flex', alignItems: 'center', fontSize: isMobile ? '13px' : '14px', fontWeight: '500', color: '#6c757d', marginBottom: '8px' },
    formIcon: { marginRight: '10px', color: '#6c757d', fontSize: '16px' },
    formInput: { width: '100%', padding: isMobile ? '10px 12px' : '12px 15px', border: '1px solid #eaeaea', borderRadius: '8px', fontSize: isMobile ? '14px' : '16px', backgroundColor: '#f9f9f9', color: '#6c757d', cursor: 'not-allowed', boxSizing: 'border-box' },
    
    certificateHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isMobile ? '15px' : '25px', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '10px' : '0' },
    uploadButton: { display: 'flex', alignItems: 'center', padding: isMobile ? '10px 15px' : '12px 20px', backgroundColor: '#4285F4', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: isMobile ? '13px' : '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 2px 5px rgba(66, 133, 244, 0.2)', width: isMobile ? '100%' : 'auto', justifyContent: 'center' },
    fileInput: { display: 'none' },
    
    certificateList: { marginTop: isMobile ? '15px' : '25px' },
    certificateItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? '15px' : '20px', border: '1px solid #eaeaea', borderRadius: '8px', marginBottom: isMobile ? '10px' : '15px', transition: 'all 0.2s ease', backgroundColor: '#ffffff', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '15px' : '0' },
    certificateInfo: { display: 'flex', alignItems: 'center', flex: '1', width: isMobile ? '100%' : 'auto' },
    certificateIcon: { marginRight: '15px', fontSize: '20px', color: '#6c757d' },
    certificateDetails: { flex: '1' },
    certificateName: { fontWeight: '500', color: '#2c3e50', fontSize: isMobile ? '15px' : '16px', marginBottom: '5px' },
    certificateExpiry: { display: 'flex', alignItems: 'center', fontSize: isMobile ? '13px' : '14px', color: '#6c757d' },
    certificateActions: { display: 'flex', gap: isMobile ? '8px' : '10px', width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'flex-end' : 'flex-start' },
    actionButton: { display: 'flex', alignItems: 'center', padding: isMobile ? '6px 10px' : '8px 15px', border: '1px solid', borderRadius: '6px', fontSize: isMobile ? '12px' : '13px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s ease', backgroundColor: '#ffffff' },
    downloadButton: { color: '#4285F4', border: '1px solid #4285F4' },
    removeButton: { color: '#f44336', border: '1px solid #f44336' },
    expiryBadge: { marginLeft: '10px', padding: '3px 8px', borderRadius: '12px', fontSize: isMobile ? '10px' : '11px', fontWeight: '600' },
    emptyState: { textAlign: 'center', padding: isMobile ? '30px' : '40px', color: '#6c757d', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px dashed #eaeaea' },
    emptyStateIcon: { fontSize: isMobile ? '40px' : '48px', marginBottom: '15px', color: '#cccccc' },
    emptyStateText: { fontSize: isMobile ? '15px' : '16px', marginBottom: '10px' },
    emptyStateSubtext: { fontSize: isMobile ? '13px' : '14px', color: '#999999' }
  };
  
  return (
    <div style={styles.profileContainer}>
      {/* Header with Edit Button */}
      <header style={styles.profileHeader}>
        <div style={styles.headerLeft}>
          <div style={styles.profileAvatar}>
            <FaUserCircle size={isMobile ? 24 : 36} color="#4285F4" />
          </div>
          <h1 style={styles.profileTitle}>My Profile</h1>
        </div>
        
        <div style={styles.headerRight}>
          {!isEditMode ? (
            <button
              style={styles.editButton}
              onClick={handleEdit}
            >
              <FaEdit style={{ marginRight: isMobile ? '5px' : '8px' }} />
              {isMobile ? 'Edit' : 'Edit Profile'}
            </button>
          ) : (
            <>
              <button
                style={styles.cancelButton}
                onClick={handleCancel}
              >
                <FaTimes style={{ marginRight: isMobile ? '5px' : '8px' }} />
                {isMobile ? 'Cancel' : 'Cancel'}
              </button>
              
              <button
                style={styles.saveButton}
                onClick={handleSave}
              >
                <FaSave style={{ marginRight: isMobile ? '5px' : '8px' }} />
                {isMobile ? 'Save' : 'Save Changes'}
              </button>
            </>
          )}
        </div>
      </header>
      
      {/* Mobile View Indicator */}
      {/* {isMobile && (
        <div style={styles.mobileIndicator}>
          <FaMobileAlt style={{marginRight: '5px'}} />
          Mobile View - Scroll to see more
        </div>
      )}
       */}
      {/* Notification */}
      <div 
        style={{
          ...styles.notification,
          ...(notificationType === 'success' ? styles.successNotification : 
           notificationType === 'info' ? styles.infoNotification : 
           styles.errorNotification),
          top: isMobile ? '70px' : '80px',   // below navbar height
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3000 // higher than navbar
        }}
      >
        {notificationMessage}
      </div>
      
      <div style={styles.profileContent}>
        {/* Personal Details Section */}
        <section style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>
            <FaUser style={styles.sectionIcon} />
            Personal Details
          </h2>
          
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                <FaUser style={styles.formIcon} />
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={profileData.fullName}
                onChange={handleInputChange}
                readOnly={!isEditMode}
                style={{...styles.formInput, border: isEditMode ? '1px solid #4285F4' : '1px solid #eaeaea', backgroundColor: isEditMode ? '#ffffff' : '#f9f9f9', cursor: isEditMode ? 'text' : 'not-allowed'}}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                <FaEnvelope style={styles.formIcon} />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                readOnly={!isEditMode}
                style={{...styles.formInput, border: isEditMode ? '1px solid #4285F4' : '1px solid #eaeaea', backgroundColor: isEditMode ? '#ffffff' : '#f9f9f9', cursor: isEditMode ? 'text' : 'not-allowed'}}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                <FaPhone style={styles.formIcon} />
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                readOnly={!isEditMode}
                style={{...styles.formInput, border: isEditMode ? '1px solid #4285F4' : '1px solid #eaeaea', backgroundColor: isEditMode ? '#ffffff' : '#f9f9f9', cursor: isEditMode ? 'text' : 'not-allowed'}}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                <FaHome style={styles.formIcon} />
                Address
              </label>
              <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                readOnly={!isEditMode}
                style={{...styles.formInput, border: isEditMode ? '1px solid #4285F4' : '1px solid #eaeaea', backgroundColor: isEditMode ? '#ffffff' : '#f9f9f9', cursor: isEditMode ? 'text' : 'not-allowed'}}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                <FaIdCard style={styles.formIcon} />
                NI Number
              </label>
              <input
                type="text"
                name="niNumber"
                value={profileData.niNumber}
                onChange={handleInputChange}
                readOnly={!isEditMode}
                style={{...styles.formInput, border: isEditMode ? '1px solid #4285F4' : '1px solid #eaeaea', backgroundColor: isEditMode ? '#ffffff' : '#f9f9f9', cursor: isEditMode ? 'text' : 'not-allowed'}}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                <FaExclamationTriangle style={styles.formIcon} />
                Emergency Contact
              </label>
              <input
                type="text"
                name="emergencyContact"
                value={profileData.emergencyContact}
                onChange={handleInputChange}
                readOnly={!isEditMode}
                style={{...styles.formInput, border: isEditMode ? '1px solid #4285F4' : '1px solid #eaeaea', backgroundColor: isEditMode ? '#ffffff' : '#f9f9f9', cursor: isEditMode ? 'text' : 'not-allowed'}}
              />
            </div>
          </div>
        </section>
        
        {/* Certificate Upload Section */}
        <section style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>
            <FaShieldAlt style={styles.sectionIcon} />
            Certificates
          </h2>
          
          <div style={styles.certificateHeader}>
            <input
              type="file"
              id="certificate-upload"
              style={styles.fileInput}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
            />
            <label 
              htmlFor="certificate-upload"
              style={styles.uploadButton}
            >
              <FaUpload style={{ marginRight: isMobile ? '5px' : '8px' }} />
              Upload Certificate
            </label>
          </div>
          
          <div style={styles.certificateList}>
            {certificates.length > 0 ? (
              certificates.map((certificate) => {
                const status = getCertificateStatus(certificate.expiryDate);
                return (
                  <div 
                    key={certificate.id}
                    style={styles.certificateItem}
                  >
                    <div style={styles.certificateInfo}>
                      {certificate.type === 'pdf' ? 
                        <FaFilePdf style={{...styles.certificateIcon, color: '#d32f2f'}} /> : 
                        <FaImage style={{...styles.certificateIcon, color: '#4285F4'}} />
                      }
                      <div style={styles.certificateDetails}>
                        <div style={styles.certificateName}>{certificate.name}</div>
                        <div style={styles.certificateExpiry}>
                          <FaCalendarAlt style={{ marginRight: '8px' }} />
                          {certificate.expiryDate}
                          <span style={{...styles.expiryBadge, ...status.style}}>
                            {status.text}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div style={styles.certificateActions}>
                      <button
                        style={{...styles.actionButton, ...styles.downloadButton}}
                        onClick={() => handleDownload(certificate.id)}
                      >
                        <FaDownload style={{ marginRight: '5px' }} />
                        Download
                      </button>
                      
                      <button
                        style={{...styles.actionButton, ...styles.removeButton}}
                        onClick={() => handleRemove(certificate.id)}
                      >
                        <FaTrash style={{ marginRight: '5px' }} />
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={styles.emptyState}>
                <FaFilePdf style={styles.emptyStateIcon} />
                <div style={styles.emptyStateText}>No certificates uploaded yet</div>
                <div style={styles.emptyStateSubtext}>Click "Upload Certificate" to add your first certificate</div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyProfile;