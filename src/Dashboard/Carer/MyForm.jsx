
// update 3

import React, { useState, useEffect } from 'react';
import SignaturePad from "react-signature-canvas";


const MyFormsPage = () => {
  // State for forms data
  const sigPad = React.useRef(null);

  const [forms, setForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [phaseFilter, setPhaseFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [modalType, setModalType] = useState(''); // 'blank', 'draft', 'signature', 'readonly'

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockData = [
      { id: 1, name: 'Employee Onboarding Form', type: 'Input', phase: 1, status: 'Not Started', progress: 0 },
      { id: 2, name: 'Annual Performance Review', type: 'Document', phase: 2, status: 'In Progress', progress: 45 },
      { id: 3, name: 'Leave Request Form', type: 'Input', phase: 1, status: 'Completed', progress: 100 },
      { id: 4, name: 'IT Equipment Request', type: 'Document', phase: 2, status: 'Sign Required', progress: 90 },
      { id: 5, name: 'Project Proposal', type: 'Input', phase: 1, status: 'In Progress', progress: 60 },
      { id: 6, name: 'Travel Authorization', type: 'Document', phase: 2, status: 'Not Started', progress: 0 },
      { id: 7, name: 'Benefits Enrollment', type: 'Input', phase: 1, status: 'Completed', progress: 100 },
      { id: 8, name: 'Expense Report', type: 'Document', phase: 2, status: 'Sign Required', progress: 95 },
    ];
    setForms(mockData);
    setFilteredForms(mockData);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...forms];

    if (searchTerm) {
      filtered = filtered.filter(form =>
        form.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter) {
      filtered = filtered.filter(form => form.type === typeFilter);
    }

    if (phaseFilter) {
      filtered = filtered.filter(form => form.phase === parseInt(phaseFilter));
    }

    if (statusFilter) {
      filtered = filtered.filter(form => form.status === statusFilter);
    }

    setFilteredForms(filtered);
  }, [forms, searchTerm, typeFilter, phaseFilter, statusFilter]);

  // Handle action buttons
  const handleAction = (form, action) => {
    setSelectedForm(form);
    setModalType(action);
    setShowModal(true);
  };

  // Get action button based on status
  const getActionButton = (form) => {
    switch (form.status) {
      case 'Not Started':
        return (
          <button
            style={styles.actionButton}
            onClick={() => handleAction(form, 'blank')}
          >
            Start
          </button>
        );
      case 'In Progress':
        return (
          <button
            style={styles.actionButton}
            onClick={() => handleAction(form, 'draft')}
          >
            Resume
          </button>
        );
      case 'Sign Required':
        return (
          <button
            style={styles.actionButton}
            onClick={() => handleAction(form, 'signature')}
          >
            Sign
          </button>
        );
      case 'Completed':
        return (
          <button
            style={styles.actionButton}
            onClick={() => handleAction(form, 'formView')}
          >
            View
          </button>
        );
      default:
        return null;
    }
  };

  // Get status badge style
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Not Started':
        return { ...styles.statusBadge, backgroundColor: '#e0e0e0', color: '#333' };
      case 'In Progress':
        return { ...styles.statusBadge, backgroundColor: '#bbdefb', color: '#0d47a1' };
      case 'Completed':
        return { ...styles.statusBadge, backgroundColor: '#c8e6c9', color: '#1b5e20' };
      case 'Sign Required':
        return { ...styles.statusBadge, backgroundColor: '#ffecb3', color: '#ff6f00' };
      default:
        return styles.statusBadge;
    }
  };

  // Get type badge style
  const getTypeBadgeStyle = (type) => {
    switch (type) {
      case 'Input':
        return { ...styles.typeBadge, backgroundColor: '#e1f5fe', color: '#01579b' };
      case 'Document':
        return { ...styles.typeBadge, backgroundColor: '#f3e5f5', color: '#4a148c' };
      default:
        return styles.typeBadge;
    }
  };


const renderModalContent = () => {
  if (!selectedForm) return null;

  const closeModal = () => {
    setShowModal(false);
    setModalType(''); // reset modal
  };

  // Full form view
  if (modalType === 'formView') {
    return (
      <div style={styles.modalContent}>
        <h3 style={styles.modalTitle}>Form: {selectedForm.name}</h3>
        <p><strong>Type:</strong> {selectedForm.type}</p>
        <p><strong>Phase:</strong> {selectedForm.phase}</p>
        <p><strong>Status:</strong> {selectedForm.status}</p>
        <p><strong>Progress:</strong> {selectedForm.progress}%</p>

        <div style={styles.modalActions}>
          <button style={styles.primaryButton} onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    );
  }


  // modal types
  switch (modalType) {
    case 'blank':
      return (
        <div style={styles.modalContent}>
          <h3 style={styles.modalTitle}>Start New Form</h3>
          <p>You are about to start a new form: <strong>{selectedForm.name}</strong></p>

          <div style={styles.modalActions}>
            <button
              style={styles.primaryButton}
              onClick={() => setModalType('formView')}
            >
              Open Blank Form
            </button>

            <button style={styles.secondaryButton} onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      );

    case 'draft':
      return (
        <div style={styles.modalContent}>
          <h3 style={styles.modalTitle}>Resume Draft</h3>
          <p>You are about to resume draft for: <strong>{selectedForm.name}</strong></p>
          <p>Your progress: {selectedForm.progress}%</p>

          <div style={styles.modalActions}>
            <button
              style={styles.primaryButton}
              onClick={() => setModalType('formView')}
            >
              Resume Draft
            </button>

            <button style={styles.secondaryButton} onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      );


    // -----------------------------------------------
    // 🔥 FIXED SIGNATURE CASE
    // -----------------------------------------------
    case 'signature':
      return (
        <div style={styles.modalContent}>
          <h3 style={styles.modalTitle}>Signature Required</h3>
          <p>Please sign: <strong>{selectedForm.name}</strong></p>

          <SignaturePad
            ref={sigPad}
            canvasProps={{
              style: {
                width: "100%",
                height: "200px",
                border: "1px solid #ddd",
                borderRadius: "4px"
              }
            }}
          />

          <div style={{ marginTop: "10px", textAlign: "right" }}>
            <button
              style={{
                background: "#f44336",
                border: "none",
                padding: "8px 12px",
                borderRadius: "4px",
                color: "white",
                marginRight: "10px"
              }}
              onClick={() => sigPad.current?.clear()}
            >
              Clear
            </button>

            <button
              style={styles.primaryButton}
              onClick={() => {
                if (sigPad.current.isEmpty()) {
                  alert("Please provide signature");
                  return;
                }

                const updated = forms.map(f =>
                  f.id === selectedForm.id
                    ? { ...f, status: "Completed", progress: 100 }
                    : f
                );

                setForms(updated);
                closeModal();
              }}
            >
              Submit Signature
            </button>
          </div>
        </div>
      );


    case 'readonly':
      return (
        <div style={styles.modalContent}>
          <h3 style={styles.modalTitle}>View Form</h3>
          <p>You are viewing: <strong>{selectedForm.name}</strong></p>
          <p>Read only form.</p>

          <div style={styles.modalActions}>
            <button style={styles.primaryButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      );

    default:
      return null;
  }
};


  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>My Forms</h1>

      {/* Filters Section */}
      <div style={styles.filtersContainer}>
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Search</label>
          <input
            type="text"
            placeholder="Search forms..."
            style={styles.filterInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Type</label>
          <select
            style={styles.filterSelect}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Input">Input</option>
            <option value="Document">Document</option>
          </select>
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Phase</label>
          <select
            style={styles.filterSelect}
            value={phaseFilter}
            onChange={(e) => setPhaseFilter(e.target.value)}
          >
            <option value="">All Phases</option>
            <option value="1">Phase 1</option>
            <option value="2">Phase 2</option>
          </select>
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Status</label>
          <select
            style={styles.filterSelect}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Sign Required">Sign Required</option>
          </select>
        </div>
      </div>

      {/* Forms Cards Grid */}
      <div style={styles.cardsGrid}>
        {filteredForms.map(form => (
          <div key={form.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>{form.name}</h3>
              <div style={styles.cardBadges}>
                <span style={getTypeBadgeStyle(form.type)}>{form.type}</span>
                <span style={styles.phaseBadge}>Phase {form.phase}</span>
              </div>
            </div>

            <div style={styles.cardBody}>
              <div style={styles.cardRow}>
                <span style={styles.cardLabel}>Status:</span>
                <span style={getStatusBadgeStyle(form.status)}>{form.status}</span>
              </div>

              <div style={styles.cardRow}>
                <span style={styles.cardLabel}>Progress:</span>
                <div style={styles.progressContainer}>
                  <div style={styles.progressBar}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${form.progress}%`,
                        backgroundColor: form.progress === 100 ? '#4caf50' : '#2196f3'
                      }}
                    ></div>
                  </div>
                  <span style={styles.progressText}>{form.progress}%</span>
                </div>
              </div>
            </div>

            <div style={styles.cardFooter}>
              {getActionButton(form)}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          {renderModalContent()}
        </div>
      )}
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0 0 20px 0',
    color: '#333',
  },
  filtersContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: '20px',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '150px',
    flex: '1',
  },
  filterLabel: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#555',
  },
  filterInput: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  filterSelect: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    backgroundColor: '#fff',
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  cardHeader: {
    padding: '15px',
    borderBottom: '1px solid #eee',
  },
  cardTitle: {
    margin: '0 0 10px 0',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  cardBadges: {
    display: 'flex',
    gap: '8px',
  },
  cardBody: {
    padding: '15px',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  cardRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#555',
  },
  cardFooter: {
    padding: '15px',
    borderTop: '1px solid #eee',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  typeBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  phaseBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0',
    color: '#333',
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: '1',
    maxWidth: '150px',
  },
  progressBar: {
    flex: '1',
    height: '10px',
    backgroundColor: '#eee',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196f3',
  },
  progressText: {
    fontSize: '12px',
    color: '#555',
    minWidth: '35px',
    textAlign: 'right',
  },
  actionButton: {
    padding: '6px 12px',
    border: '1px solid #2196f3',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#2196f3',
    backgroundColor: 'transparent',
    transition: 'all 0.3s',
  },
  modalOverlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1000',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  modalTitle: {
    marginTop: '0',
    marginBottom: '15px',
    color: '#333',
  },
  signaturePad: {
    height: '150px',
    border: '1px dashed #ccc',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '15px 0',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px',
  },
  primaryButton: {
    padding: '8px 16px',
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  secondaryButton: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: '#2196f3',
    border: '1px solid #2196f3',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
};

export default MyFormsPage;