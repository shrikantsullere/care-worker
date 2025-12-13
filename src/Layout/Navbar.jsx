import React from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav
      className="navbar navbar-expand py-2 d-flex justify-content-between align-items-center fixed-top"
      style={{
        backgroundColor: "#F4F7FB",  // SaaS Ice Gray
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        color: "#1A1A1A",
        zIndex: 2000,
        width: "100%",
        padding: "0.5rem 1rem",
        marginLeft: "-5px",  // Adjust if sidebar width changes
        position: "fixed",
      }}
    >
      {/* Left */}
      <div className="d-flex align-items-center gap-3">
        {/* Sidebar Toggle */}
        <button
          className="btn p-2 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "transparent",
            border: "2px solid #3182CE",
            color: "#3182CE",
            borderRadius: "6px",
            transition: "0.25s ease",
            width: "40px",
            height: "40px"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#3182CE";
            e.target.style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#3182CE";
          }}
          onClick={toggleSidebar}
        >
          <FaBars color="currentColor" size={18} />
        </button>

        {/* Logo */}
        <span
          className="fw-bold"
          style={{
            fontSize: "clamp(1.2rem, 2.5vw, 1.45rem)",
            fontFamily: "'Poppins', sans-serif",
            color: "#1A1A1A",
          }}
        >
          <span style={{ color: "#3182CE", fontWeight: 800 }}>Care</span> Worker
        </span>
      </div>

      {/* Right */}
      <div className="d-flex align-items-center">
        {/* Logout */}
        <a
          href="/"
          className="btn d-flex align-items-center gap-2"
          style={{
            backgroundColor: "transparent",
            border: "2px solid #3182CE",
            borderRadius: "6px",
            color: "#3182CE",
            transition: "0.25s ease",
            fontWeight: 500,
            padding: "0.5rem 1rem"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#3182CE";
            e.target.style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#3182CE";
          }}
        >
          <FaSignOutAlt size={16} />
          <span className="d-none d-sm-inline">Logout</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;