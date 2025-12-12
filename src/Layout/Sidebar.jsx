import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChartBar,
  faUsers,
  faUserNurse,
  faCalendarCheck,
  faClipboardList,
  faCalendarDay,
  faPills,
  faFileSignature,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role) setUserRole(role.toUpperCase());
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth <= 768) setCollapsed(true);
  };

  const allMenus = {
    ADMIN: [
      { name: "Dashboard", icon: faChartBar, path: "/admin/dashboard" },
      { name: "Carers", icon: faUserNurse, path: "/admin/carers" },
      { name: "Forms / Templates", icon: faUsers, path: "/admin/forms" },
      { name: "Form Assign", icon: faUsers, path: "/admin/form-assign" },
      { name: "Payroll List", icon: faCalendarDay, path: "/admin/payroll-list" },
      { name: "Downloads", icon: faCalendarCheck, path: "/admin/downloads" },
      { name: "Setting", icon: faClipboardList, path: "/admin/settings" },
    ],

    CARE_WORKER: [
      { name: "Dashboard", icon: faChartBar, path: "/carer/dashboard" },
      { name: "My Profile", icon: faCalendarDay, path: "/carer/my-profile" },
      { name: "My Forms", icon: faPills, path: "/carer/my-form" },
      { name: "Documents", icon: faFileSignature, path: "/carer/documents" },
      { name: "Signatures", icon: faExclamationTriangle, path: "/carer/signature" },
    ],
  };

  const userMenus = userRole ? allMenus[userRole] : allMenus.ADMIN;

  const mainMenus = userMenus.filter((item) => item.name !== "Settings");
  const settingsMenu = userMenus.find((item) => item.name === "Settings");

  return (
    <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar">
        <ul className="menu">
          {mainMenus.map((menu, index) => (
            <li key={index} className="menu-item">
              <div
                className={`menu-link ${isActive(menu.path) ? "active" : ""}`}
                onClick={() => handleNavigate(menu.path)}
              >
                <FontAwesomeIcon icon={menu.icon} className="menu-icon" />
                {!collapsed && <span className="menu-text">{menu.name}</span>}
              </div>
            </li>
          ))}
        </ul>

        {settingsMenu && (
          <div
            className={`menu-link settings-section ${isActive(settingsMenu.path) ? "active" : ""}`}
            onClick={() => handleNavigate(settingsMenu.path)}
          >
            <FontAwesomeIcon icon={settingsMenu.icon} className="menu-icon" />
            {!collapsed && <span className="menu-text">{settingsMenu.name}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
