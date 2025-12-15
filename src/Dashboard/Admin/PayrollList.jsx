import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye, FaFilter, FaDownload, FaPrint, FaSearch, FaSort, FaTimes, FaSave, FaPlus, FaUser, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaMoneyBillWave, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PayrollList = () => {
  const navigate = useNavigate();  
  // State for managing payroll data
  const [payrollData, setPayrollData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedCarer, setSelectedCarer] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showEntry, setShowEntry] = useState(false);
  const [editCarer, setEditCarer] = useState(null);
  const [newCarer, setNewCarer] = useState({
    region: "",
    name: "",
    clientNo: "",
    date: "Oct",
    totalHours: 0,
    ratePerHour: 0,
    totalAmount: "£0.00",
    paid: 0,
    status: "Unpaid",
    balance: "£0.00"
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showNavbar, setShowNavbar] = useState(true);

  // Sample data based on Excel file provided
  useEffect(() => {
    const initialData = [
      // ... (Your initial data remains the same)
      { id: 1, region: "Acton 1", name: "Abdi", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 600, status: "Unpaid", balance: "-£600.00" },
      { id: 2, region: "Acton 1", name: "Dahabo", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 423.5, status: "Paid", balance: "£0.00" },
      { id: 3, region: "Acton 1", name: "Muna", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 209, status: "Paid", balance: "£0.00" },
      { id: 4, region: "Acton 1", name: "Sacdiya", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 574.8, status: "Paid", balance: "£0.00" },
      { id: 5, region: "Acton 1", name: "Amina", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 952.38, status: "Paid", balance: "£0.00" },
      { id: 6, region: "Acton 2", name: "Samsam", clientNo: "2", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Paid", balance: "£0.00" },
      { id: 7, region: "Acton 2", name: "Nuurto Bulkaas", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 8, region: "Acton 2", name: "Saado", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 9, region: "Acton 2", name: "Aziza", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 10, region: "Acton 2", name: "Ayan Mumin", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 11, region: "Acton 2", name: "Maryan Ali", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 12, region: "Ealing 1", name: "Maryama Kulan", clientNo: "1", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Paid", balance: "£0.00" },
      { id: 13, region: "Ealing 1", name: "Hodan", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 14, region: "Ealing 1", name: "Fadumo (Saynab)", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 15, region: "Ealing 1", name: "Asiya", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 16, region: "Ealing 1", name: "Qamar", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 17, region: "Ealing 1", name: "Seynab Ahmed", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 18, region: "Ealing 1", name: "Iman", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 19, region: "Ealing 1", name: "Ubah", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 20, region: "Ealing 1", name: "Farhiya", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 21, region: "Ealing 1", name: "Fartun", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 22, region: "Ealing 1", name: "Malika", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 23, region: "Richmond", name: "Qali", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 24, region: "Richmond", name: "Canab daughter", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 25, region: "Richmond", name: "Layla", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 26, region: "Richmond", name: "Maslax Ahmed", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 27, region: "Richmond", name: "Sabah Abdullahi", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 28, region: "Richmond", name: "Safia Hussein", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 29, region: "Richmond", name: "Qatar", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 30, region: "Richmond", name: "Anisa", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 31, region: "Richmond", name: "Deeqa Mohamed", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 32, region: "Tower Hamlet", name: "Wahida", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 33, region: "Tower Hamlet", name: "Omisha", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 34, region: "Tower Hamlet", name: "Hanaan galayr", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Paid", balance: "£0.00" },
      { id: 35, region: "Tower Hamlet", name: "Saciida", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Paid", balance: "£0.00" },
      { id: 36, region: "Tower Hamlet", name: "Asli", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Paid", balance: "£0.00" },
      { id: 37, region: "Tower Hamlet", name: "Omar Abed", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Paid", balance: "£0.00" },
      { id: 38, region: "Tower Hamlet", name: "Ubah Elmi", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Paid", balance: "£0.00" },
      { id: 39, region: "Tower Hamlet", name: "Ayan Elmi", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Paid", balance: "£0.00" },
      { id: 40, region: "Tower Hamlet", name: "Abdullah Al Huzayfa", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Paid", balance: "£0.00" },
      { id: 41, region: "Tower Hamlet", name: "Raaxo Nur", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Paid", balance: "£0.00" },
      { id: 42, region: "Tower Hamlet", name: "Md Monir", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Paid", balance: "£0.00" },
      { id: 43, region: "Newham", name: "Maryan Nur", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 44, region: "Newham", name: "Amina Mohamed", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 45, region: "Newham", name: "Maryam Omer", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 46, region: "Carers 5th", name: "Nilima", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 47, region: "Carers 5th", name: "Tanim Ahmed", clientNo: "6", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 48, region: "Carers 5th", name: "MD Abu Sufyan", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 49, region: "Carers 5th", name: "Jannatun", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 50, region: "Carers 5th", name: "Ikram", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 51, region: "Carers 5th", name: "Farhad", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 52, region: "Carers 5th", name: "Nusrat Jahan", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 53, region: "Carers 5th", name: "Nur", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
      { id: 54, region: "Carers 5th", name: "Nusrat Jahan", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0, totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00" },
    ];
    
    setPayrollData(initialData);
    setFilteredData(initialData);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get unique regions for filter dropdown
  const regions = ["All", ...new Set(payrollData.map(item => item.region))];

  // Handle search, filter, and sort
  useEffect(() => {
    let result = payrollData;
    
    if (selectedRegion !== "All") {
      result = result.filter(item => item.region === selectedRegion);
    }
    
    if (searchTerm) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.clientNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    result = [...result].sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });
    
    setFilteredData(result);
    setCurrentPage(1);
  }, [searchTerm, selectedRegion, sortField, sortDirection, payrollData]);

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Modal and action handlers
  const handleViewDetails = (carer) => {
    setSelectedCarer(carer);
    setShowDetails(true);
    setShowNavbar(false);
  };

  const handleEdit = (carer, event) => {
    if (event) event.stopPropagation();
    setEditCarer({...carer});
    setShowEdit(true);
    setShowNavbar(false);
  };

  const handleEntry = (event) => {
    if (event) event.stopPropagation();
    setNewCarer({
      region: "", name: "", clientNo: "", date: "Oct", totalHours: 0, ratePerHour: 0,
      totalAmount: "£0.00", paid: 0, status: "Unpaid", balance: "£0.00"
    });
    setShowEntry(true);
    setShowNavbar(false);
  };

  const handleSaveEdit = () => {
    const updatedPayrollData = payrollData.map(carer => 
      carer.id === editCarer.id ? editCarer : carer
    );
    setPayrollData(updatedPayrollData);
    setFilteredData(updatedPayrollData.filter(item => 
      selectedRegion === "All" || item.region === selectedRegion
    ));
    setShowEdit(false);
    setEditCarer(null);
    setShowNavbar(true);
    alert("Carer details updated successfully!");
  };

  const handleSaveEntry = () => {
    const newId = Math.max(...payrollData.map(c => c.id), 0) + 1;
    const carerToAdd = { ...newCarer, id: newId };
    const updatedPayrollData = [...payrollData, carerToAdd];
    setPayrollData(updatedPayrollData);
    setFilteredData(updatedPayrollData.filter(item => 
      selectedRegion === "All" || item.region === selectedRegion
    ));
    setShowEntry(false);
    setShowNavbar(true);
    alert("New carer added successfully!");
  };

  const handleDelete = (id, event) => {
    if (event) event.stopPropagation();
    if (window.confirm("Are you sure you want to delete this record?")) {
      setPayrollData(payrollData.filter(item => item.id !== id));
      setFilteredData(filteredData.filter(item => item.id !== id));
    }
  };

  const downloadCarerPDF = async (carer, event) => {
    if (event) event.stopPropagation();
    try {
      const pdf = new jsPDF();
      pdf.setFontSize(18);
      pdf.text("Carer Payroll Details", 105, 15, { align: "center" });
      pdf.setFontSize(12);
      let yPosition = 30;
      const details = [
        `Name: ${carer.name}`, `Region: ${carer.region}`, `Client Number: ${carer.clientNo || "N/A"}`,
        `Date: ${carer.date}`, `Total Hours: ${carer.totalHours}`, `Rate per Hour: £${carer.ratePerHour}`,
        `Total Amount: ${carer.totalAmount}`, `Paid Amount: £${carer.paid}`, `Balance: ${carer.balance}`, `Status: ${carer.status}`
      ];
      details.forEach(detail => {
        pdf.text(detail, 20, yPosition);
        yPosition += 10;
      });
      pdf.save(`${carer.name}_Payroll_${carer.date}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const downloadAllPayrollPDF = async () => {
    // ... (PDF generation logic remains the same)
    try {
      const pdf = new jsPDF();
      pdf.setFontSize(18);
      pdf.text("Payroll Summary - October 2025", 105, 15, { align: "center" });
      pdf.setFontSize(10);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 22, { align: "center" });
      pdf.setFontSize(11);
      let yPosition = 35;
      pdf.text("ID", 20, yPosition);
      pdf.text("Name", 40, yPosition);
      pdf.text("Region", 80, yPosition);
      pdf.text("Hours", 120, yPosition);
      pdf.text("Amount", 140, yPosition);
      pdf.text("Paid", 160, yPosition);
      pdf.text("Balance", 180, yPosition);
      pdf.line(20, yPosition + 2, 200, yPosition + 2);
      yPosition += 7;
      pdf.setFontSize(10);
      filteredData.forEach((carer) => {
        if (yPosition > 270) {
          pdf.addPage();
          yPosition = 20;
          pdf.setFontSize(11);
          pdf.text("ID", 20, yPosition);
          pdf.text("Name", 40, yPosition);
          pdf.text("Region", 80, yPosition);
          pdf.text("Hours", 120, yPosition);
          pdf.text("Amount", 140, yPosition);
          pdf.text("Paid", 160, yPosition);
          pdf.text("Balance", 180, yPosition);
          pdf.line(20, yPosition + 2, 200, yPosition + 2);
          yPosition += 7;
          pdf.setFontSize(10);
        }
        pdf.text(carer.id.toString(), 20, yPosition);
        pdf.text(carer.name.substring(0, 15), 40, yPosition);
        pdf.text(carer.region.substring(0, 15), 80, yPosition);
        pdf.text(carer.totalHours.toString(), 120, yPosition);
        pdf.text(carer.totalAmount, 140, yPosition);
        pdf.text(`£${carer.paid}`, 160, yPosition);
        pdf.text(carer.balance, 180, yPosition);
        yPosition += 6;
      });
      pdf.save(`Payroll_Summary_October_2025.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const handleExport = () => {
    downloadAllPayrollPDF();
  };

  const closeModal = () => {
    setShowDetails(false);
    setSelectedCarer(null);
    setShowNavbar(true);
  };
  const closeEditModal = () => {
    setShowEdit(false);
    setEditCarer(null);
    setShowNavbar(true);
  };
  const closeEntryModal = () => {
    setShowEntry(false);
    setShowNavbar(true);
  };

  const handleInputChange = (field, value) => {
    setEditCarer({ ...editCarer, [field]: value });
  };
  const handleNewInputChange = (field, value) => {
    setNewCarer({ ...newCarer, [field]: value });
  };

  // Responsive styles
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: isMobile ? "15px" : "20px",
      backgroundColor: "#f5f7fa",
      minHeight: "100vh",
      maxWidth: "100vw",
      overflowX: "hidden",
      boxSizing: "border-box"
    },
    header: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
      marginBottom: "20px",
      gap: "15px"
    },
    title: {
      fontSize: isMobile ? "22px" : "26px",
      fontWeight: "600",
      color: "#2c3e50",
      margin: "0",
      textAlign: isMobile ? "center" : "left",
      width: "100%"
    },
    actions: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      width: isMobile ? "100%" : "auto",
      justifyContent: isMobile ? "center" : "flex-end"
    },
    button: {
      padding: isMobile ? "12px 16px" : "10px 15px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      fontSize: isMobile ? "14px" : "14px",
      fontWeight: "500",
      transition: "all 0.2s ease",
      whiteSpace: "nowrap",
      minHeight: isMobile ? "44px" : "auto", // Larger touch target
    },
    primaryButton: { backgroundColor: "#3A8DFF", color: "white" },
    secondaryButton: { backgroundColor: "#f0f0f0", color: "#333" },
    successButton: { backgroundColor: "#4CAF50", color: "white" },
    warningButton: { backgroundColor: "#FF9800", color: "white" },
    filters: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "15px",
      marginBottom: "20px",
    },
    searchContainer: {
      position: "relative",
      flex: "1",
      width: "100%"
    },
    searchInput: {
      width: "100%",
      padding: "12px 15px 12px 45px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "16px", // Prevents zoom on iOS
      boxSizing: "border-box"
    },
    searchIcon: {
      position: "absolute",
      left: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#999",
      fontSize: "18px"
    },
    filterSelect: {
      padding: "12px 15px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "16px",
      backgroundColor: "white",
      minWidth: isMobile ? "100%" : "200px",
      boxSizing: "border-box"
    },
    tableContainer: {
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      overflow: "hidden",
      marginBottom: "20px"
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: isMobile ? "12px" : "14px"
    },
    tableHeader: { backgroundColor: "#f8f9fa" },
    tableHeaderCell: {
      padding: isMobile ? "10px 8px" : "12px 15px",
      textAlign: "left",
      fontWeight: "600",
      color: "#2c3e50",
      borderBottom: "1px solid #eee",
      cursor: "pointer",
      userSelect: "none",
      whiteSpace: "nowrap"
    },
    tableCell: {
      padding: isMobile ? "10px 8px" : "12px 15px",
      borderBottom: "1px solid #eee",
      whiteSpace: "nowrap"
    },
    statusBadge: {
      padding: "4px 10px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: "500",
      display: "inline-block"
    },
    paidStatus: { backgroundColor: "#e6f7ee", color: "#28a745" },
    unpaidStatus: { backgroundColor: "#ffeaea", color: "#dc3545" },
    actionButtons: {
      display: "flex",
      gap: "5px",
      justifyContent: "flex-end"
    },
    actionButton: {
      padding: "8px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "36px",
      minWidth: "36px"
    },
    viewButton: { backgroundColor: "#e3f2fd", color: "#1976d2" },
    editButton: { backgroundColor: "#e8f5e9", color: "#388e3c" },
    deleteButton: { backgroundColor: "#ffebee", color: "#d32f2f" },
    downloadButton: { backgroundColor: "#e8eaf6", color: "#3f51b5" },
    pagination: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "20px",
      gap: "15px"
    },
    paginationInfo: {
      fontSize: "14px",
      color: "#666",
      textAlign: "center"
    },
    paginationButtons: {
      display: "flex",
      gap: "8px",
      justifyContent: "center",
      flexWrap: "wrap"
    },
    paginationButton: {
      padding: "10px 15px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      backgroundColor: "white",
      cursor: "pointer",
      fontSize: "14px",
      minHeight: "44px", // Larger touch target
      minWidth: "44px",
      boxSizing: "border-box"
    },
    activePaginationButton: {
      backgroundColor: "#3A8DFF",
      color: "white",
      border: "1px solid #3A8DFF"
    },
    modal: {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10000,
      padding: "20px"
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: "12px",
      width: isMobile ? "100%" : isTablet ? "80%" : "60%",
      maxWidth: "800px",
      maxHeight: "90vh",
      overflow: "auto",
      padding: isMobile ? "15px" : "25px",
      position: "relative",
      boxSizing: "border-box"
    },
    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      paddingBottom: "10px",
      borderBottom: "1px solid #eee"
    },
    modalTitle: {
      fontSize: isMobile ? "18px" : "20px",
      fontWeight: "600",
      margin: "0"
    },
    closeButton: {
      background: "none",
      border: "none",
      fontSize: isMobile ? "20px" : "24px",
      cursor: "pointer",
      color: "#999",
      lineHeight: 1
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "15px",
      marginBottom: "20px"
    },
    formGroup: { display: "flex", flexDirection: "column" },
    formLabel: {
      marginBottom: "6px",
      fontWeight: "600",
      color: "#555",
      fontSize: "14px"
    },
    input: {
      width: "100%",
      padding: "12px 15px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "16px",
      boxSizing: "border-box"
    },
    select: {
      width: "100%",
      padding: "12px 15px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "16px",
      backgroundColor: "white",
      boxSizing: "border-box"
    },
    noData: {
      textAlign: "center",
      padding: "40px 20px",
      color: "#666",
      fontSize: "16px"
    },
    // Card view for mobile
    cardContainer: {
      display: isMobile ? "grid" : "none",
      gridTemplateColumns: "1fr",
      gap: "20px",
      marginBottom: "20px"
    },
    card: {
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      padding: "20px",
      position: "relative",
      border: "1px solid #f0f0f0"
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "15px"
    },
    cardName: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#2c3e50"
    },
    cardStatus: {
      padding: "6px 12px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: "500"
    },
    cardDetails: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginBottom: "15px"
    },
    cardDetail: {
      fontSize: "15px",
      color: "#555",
      display: "flex",
      justifyContent: "space-between"
    },
    cardActions: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "8px",
      borderTop: "1px solid #f0f0f0",
      paddingTop: "15px"
    },
    // Improved details modal
    detailsContainer: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "20px",
      marginBottom: "20px"
    },
    detailsSection: {
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      padding: "20px"
    },
    detailsSectionTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#2c3e50",
      marginBottom: "15px",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    },
    detailsRow: {
      display: "flex",
      marginBottom: "12px",
      alignItems: "center"
    },
    detailsLabel: {
      fontWeight: "500",
      width: "140px",
      color: "#555",
      flexShrink: 0
    },
    detailsValue: {
      flex: "1",
      color: "#333"
    }
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Payroll List - October 2025</h1>
        <div style={styles.actions}>
          <button style={{...styles.button, ...styles.warningButton}} onClick={handleEntry}>
            <FaPlus /> Entry
          </button>
          <button style={{...styles.button, ...styles.primaryButton}} onClick={handleExport}>
            <FaDownload /> Export All
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <div style={styles.searchContainer}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name, region, or client number..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          style={styles.filterSelect}
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      {/* Table for desktop, Card view for mobile */}
      {isMobile ? (
        <div style={styles.cardContainer}>
          {currentItems.map(carer => (
            <div key={carer.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.cardName}>{carer.name}</div>
                <div style={{
                  ...styles.cardStatus,
                  ...(carer.status === "Paid" ? styles.paidStatus : styles.unpaidStatus)
                }}>
                  {carer.status}
                </div>
              </div>
              <div style={styles.cardDetails}>
                <div style={styles.cardDetail}><span>Region:</span> <strong>{carer.region}</strong></div>
                <div style={styles.cardDetail}><span>Client No:</span> <strong>{carer.clientNo || "N/A"}</strong></div>
                <div style={styles.cardDetail}><span>Hours:</span> <strong>{carer.totalHours}</strong></div>
                <div style={styles.cardDetail}><span>Amount:</span> <strong>{carer.totalAmount}</strong></div>
                <div style={styles.cardDetail}><span>Paid:</span> <strong>£{carer.paid}</strong></div>
                <div style={styles.cardDetail}><span>Balance:</span> <strong>{carer.balance}</strong></div>
              </div>
              <div style={styles.cardActions}>
                <button style={{...styles.actionButton, ...styles.viewButton}} onClick={() => handleViewDetails(carer)} title="View Details"><FaEye /></button>
                <button style={{...styles.actionButton, ...styles.editButton}} onClick={(e) => handleEdit(carer, e)} title="Edit"><FaEdit /></button>
                <button style={{...styles.actionButton, ...styles.downloadButton}} onClick={(e) => downloadCarerPDF(carer, e)} title="Download PDF"><FaDownload /></button>
                <button style={{...styles.actionButton, ...styles.deleteButton}} onClick={(e) => handleDelete(carer.id, e)} title="Delete"><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.tableContainer}>
          {filteredData.length > 0 ? (
            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th style={styles.tableHeaderCell} onClick={() => handleSort("region")}>Region <FaSort /></th>
                  <th style={styles.tableHeaderCell} onClick={() => handleSort("name")}>Name <FaSort /></th>
                  <th style={styles.tableHeaderCell} onClick={() => handleSort("clientNo")}>Client No <FaSort /></th>
                  <th style={styles.tableHeaderCell} onClick={() => handleSort("date")}>Date <FaSort /></th>
                  <th style={styles.tableHeaderCell} onClick={() => handleSort("totalHours")}>Hours <FaSort /></th>
                  <th style={styles.tableHeaderCell} onClick={() => handleSort("ratePerHour")}>Rate/hr <FaSort /></th>
                  <th style={styles.tableHeaderCell} onClick={() => handleSort("totalAmount")}>Amount <FaSort /></th>
                  <th style={styles.tableHeaderCell} onClick={() => handleSort("paid")}>Paid <FaSort /></th>
                  <th style={styles.tableHeaderCell} onClick={() => handleSort("balance")}>Balance <FaSort /></th>
                  <th style={styles.tableHeaderCell}>Status</th>
                  <th style={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(carer => (
                  <tr key={carer.id}>
                    <td style={styles.tableCell}>{carer.region}</td>
                    <td style={styles.tableCell}>{carer.name}</td>
                    <td style={styles.tableCell}>{carer.clientNo}</td>
                    <td style={styles.tableCell}>{carer.date}</td>
                    <td style={styles.tableCell}>{carer.totalHours}</td>
                    <td style={styles.tableCell}>£{carer.ratePerHour}</td>
                    <td style={styles.tableCell}>{carer.totalAmount}</td>
                    <td style={styles.tableCell}>£{carer.paid}</td>
                    <td style={styles.tableCell}>{carer.balance}</td>
                    <td style={styles.tableCell}>
                      <span style={{...styles.statusBadge, ...(carer.status === "Paid" ? styles.paidStatus : styles.unpaidStatus)}}>
                        {carer.status}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.actionButtons}>
                        <button style={{...styles.actionButton, ...styles.viewButton}} onClick={() => handleViewDetails(carer)} title="View Details"><FaEye /></button>
                        <button style={{...styles.actionButton, ...styles.editButton}} onClick={(e) => handleEdit(carer, e)} title="Edit"><FaEdit /></button>
                        <button style={{...styles.actionButton, ...styles.downloadButton}} onClick={(e) => downloadCarerPDF(carer, e)} title="Download PDF"><FaDownload /></button>
                        <button style={{...styles.actionButton, ...styles.deleteButton}} onClick={(e) => handleDelete(carer.id, e)} title="Delete"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={styles.noData}>No payroll data found</div>
          )}
        </div>
      )}

      {/* Pagination */}
      <div style={styles.pagination}>
        <div style={styles.paginationInfo}>
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} records
        </div>
        <div style={styles.paginationButtons}>
          <button style={styles.paginationButton} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
          {isMobile ? (
            <span style={{padding: "10px 15px", alignSelf: "center", fontSize: "14px"}}>
              Page {currentPage} of {totalPages}
            </span>
          ) : (
            Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button key={pageNum} style={{...styles.paginationButton, ...(currentPage === pageNum ? styles.activePaginationButton : {})}} onClick={() => setCurrentPage(pageNum)}>{pageNum}</button>
              );
            })
          )}
          <button style={styles.paginationButton} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>

      {/* Modals */}
      {showDetails && selectedCarer && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Carer Details</h2>
              <button style={styles.closeButton} onClick={closeModal}><FaTimes /></button>
            </div>
            <div style={styles.detailsContainer}>
              <div style={styles.detailsSection}>
                <div style={styles.detailsSectionTitle}><FaUser /> Personal Information</div>
                <div style={styles.detailsRow}><div style={styles.detailsLabel}>Name:</div><div style={styles.detailsValue}>{selectedCarer.name}</div></div>
                <div style={styles.detailsRow}><div style={styles.detailsLabel}>Region:</div><div style={styles.detailsValue}>{selectedCarer.region}</div></div>
                <div style={styles.detailsRow}><div style={styles.detailsLabel}>Client Number:</div><div style={styles.detailsValue}>{selectedCarer.clientNo || "N/A"}</div></div>
              </div>
              <div style={styles.detailsSection}>
                <div style={styles.detailsSectionTitle}><FaCalendarAlt /> Payroll Period</div>
                <div style={styles.detailsRow}><div style={styles.detailsLabel}>Date:</div><div style={styles.detailsValue}>{selectedCarer.date}</div></div>
                <div style={styles.detailsRow}><div style={styles.detailsLabel}>Status:</div><div style={styles.detailsValue}><span style={{...styles.statusBadge, ...(selectedCarer.status === "Paid" ? styles.paidStatus : styles.unpaidStatus)}}>{selectedCarer.status}</span></div></div>
              </div>
              <div style={styles.detailsSection}>
                <div style={styles.detailsSectionTitle}><FaClock /> Work Details</div>
                <div style={styles.detailsRow}><div style={styles.detailsLabel}>Total Hours:</div><div style={styles.detailsValue}>{selectedCarer.totalHours}</div></div>
                <div style={styles.detailsRow}><div style={styles.detailsLabel}>Rate per Hour:</div><div style={styles.detailsValue}>£{selectedCarer.ratePerHour}</div></div>
              </div>
              <div style={styles.detailsSection}>
                <div style={styles.detailsSectionTitle}><FaMoneyBillWave /> Payment Details</div>
                <div style={styles.detailsRow}><div style={styles.detailsLabel}>Total Amount:</div><div style={styles.detailsValue}>{selectedCarer.totalAmount}</div></div>
                <div style={styles.detailsRow}><div style={styles.detailsLabel}>Paid Amount:</div><div style={styles.detailsValue}>£{selectedCarer.paid}</div></div>
                <div style={styles.detailsRow}><div style={styles.detailsLabel}>Balance:</div><div style={styles.detailsValue}>{selectedCarer.balance}</div></div>
              </div>
            </div>
            <div style={{display: "flex", justifyContent: "flex-end", marginTop: "20px", gap: "10px"}}>
              <button style={{...styles.button, ...styles.secondaryButton}} onClick={closeModal}>Close</button>
              <button style={{...styles.button, ...styles.primaryButton}} onClick={() => downloadCarerPDF(selectedCarer)}><FaDownload /> Download PDF</button>
            </div>
          </div>
        </div>
      )}

      {showEdit && editCarer && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Edit Carer Details</h2>
              <button style={styles.closeButton} onClick={closeEditModal}><FaTimes /></button>
            </div>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}><label style={styles.formLabel}>Name</label><input type="text" style={styles.input} value={editCarer.name} onChange={(e) => handleInputChange("name", e.target.value)} /></div>
              <div style={styles.formGroup}><label style={styles.formLabel}>Region</label><select style={styles.select} value={editCarer.region} onChange={(e) => handleInputChange("region", e.target.value)}>{regions.filter(r => r !== "All").map(region => <option key={region} value={region}>{region}</option>)}</select></div>
              <div style={styles.formGroup}><label style={styles.formLabel}>Client Number</label><input type="text" style={styles.input} value={editCarer.clientNo} onChange={(e) => handleInputChange("clientNo", e.target.value)} /></div>
              <div style={styles.formGroup}><label style={styles.formLabel}>Date</label><input type="text" style={styles.input} value={editCarer.date} onChange={(e) => handleInputChange("date", e.target.value)} /></div>
              <div style={styles.formGroup}><label style={styles.formLabel}>Total Hours</label><input type="number" style={styles.input} value={editCarer.totalHours} onChange={(e) => handleInputChange("totalHours", parseFloat(e.target.value) || 0)} /></div>
              <div style={styles.formGroup}><label style={styles.formLabel}>Rate per Hour</label><input type="number" style={styles.input} value={editCarer.ratePerHour} onChange={(e) => handleInputChange("ratePerHour", parseFloat(e.target.value) || 0)} /></div>
              <div style={styles.formGroup}><label style={styles.formLabel}>Total Amount</label><input type="text" style={styles.input} value={editCarer.totalAmount} onChange={(e) => handleInputChange("totalAmount", e.target.value)} /></div>
              <div style={styles.formGroup}><label style={styles.formLabel}>Paid Amount</label><input type="number" style={styles.input} value={editCarer.paid} onChange={(e) => handleInputChange("paid", parseFloat(e.target.value) || 0)} /></div>
              <div style={styles.formGroup}><label style={styles.formLabel}>Balance</label><input type="text" style={styles.input} value={editCarer.balance} onChange={(e) => handleInputChange("balance", e.target.value)} /></div>
              <div style={styles.formGroup}><label style={styles.formLabel}>Status</label><select style={styles.select} value={editCarer.status} onChange={(e) => handleInputChange("status", e.target.value)}><option value="Paid">Paid</option><option value="Unpaid">Unpaid</option></select></div>
            </div>
            <div style={{display: "flex", justifyContent: "flex-end", marginTop: "20px", gap: "10px"}}>
              <button style={{...styles.button, ...styles.secondaryButton}} onClick={closeEditModal}>Cancel</button>
              <button style={{...styles.button, ...styles.successButton}} onClick={handleSaveEdit}><FaSave /> Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {showEntry && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Add New Carer</h2>
              <button style={styles.closeButton} onClick={closeEntryModal}><FaTimes /></button>
            </div>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}><label style={styles.formLabel}>Name</label><input type="text" style={styles.input} value={newCarer.name} onChange={(e) => handleNewInputChange("name", e.target.value)} placeholder="Enter carer name" /></div>
              <div style={styles.formGroup}><label style={styles.formLabel}>Region</label><select style={styles.select} value={newCarer.region} onChange={(e) => handleNewInputChange("region", e.target.value)}><option value="">Select Region</option>{regions.filter(r => r !== "All").map(region => <option key={region} value={region}>{region}</option>)}</select></div>
              <div style={styles.formGroup}><label style={styles.formLabel}>Client Number</label><input type="text" style={styles.input} value={newCarer.clientNo} onChange={(e) => handleNewInputChange("clientNo", e.target.value)} placeholder="Enter client number" /></div>
              <div style={styles.formGroup}><label style={styles.formLabel}>Date</label><input type="text" style={styles.input} value={newCarer.date} onChange={(e) => handleNewInputChange("date", e.target.value)} /></div>
              <div style={styles.formGroup}><label style={styles.formLabel}>Total Hours</label><input type="number" style={styles.input} value={newCarer.totalHours} onChange={(e) => handleNewInputChange("totalHours", parseFloat(e.target.value) || 0)} placeholder="Enter total hours" /></div>
              <div style={styles.formGroup}><label style={styles.formLabel}>Rate per Hour</label><input type="number" style={styles.input} value={newCarer.ratePerHour} onChange={(e) => handleNewInputChange("ratePerHour", parseFloat(e.target.value) || 0)} placeholder="Enter rate per hour" /></div>
              <div style={styles.formGroup}><label style={styles.formLabel}>Total Amount</label><input type="text" style={styles.input} value={newCarer.totalAmount} onChange={(e) => handleNewInputChange("totalAmount", e.target.value)} placeholder="Enter total amount" /></div>
              <div style={styles.formGroup}><label style={styles.formLabel}>Paid Amount</label><input type="number" style={styles.input} value={newCarer.paid} onChange={(e) => handleNewInputChange("paid", parseFloat(e.target.value) || 0)} placeholder="Enter paid amount" /></div>
              <div style={styles.formGroup}><label style={styles.formLabel}>Balance</label><input type="text" style={styles.input} value={newCarer.balance} onChange={(e) => handleNewInputChange("balance", e.target.value)} placeholder="Enter balance" /></div>
              <div style={styles.formGroup}><label style={styles.formLabel}>Status</label><select style={styles.select} value={newCarer.status} onChange={(e) => handleNewInputChange("status", e.target.value)}><option value="Paid">Paid</option><option value="Unpaid">Unpaid</option></select></div>
            </div>
            <div style={{display: "flex", justifyContent: "flex-end", marginTop: "20px", gap: "10px"}}>
              <button style={{...styles.button, ...styles.secondaryButton}} onClick={closeEntryModal}>Cancel</button>
              <button style={{...styles.button, ...styles.successButton}} onClick={handleSaveEntry}><FaSave /> Save Carer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollList;