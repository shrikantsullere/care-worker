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
  faChevronDown,
  faChevronUp
} from "@fortawesome/free-solid-svg-icons";

import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userRole, setUserRole] = useState(null);
  const [openMenus, setOpenMenus] = useState({});

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role) setUserRole(role.toUpperCase());
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth <= 768) setCollapsed(true);
  };

  const toggleSubMenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const allMenus = {
    ADMIN: [
      { name: "Dashboard", icon: faChartBar, path: "/admin/dashboard" },

      {
        name: "Carers",
        icon: faUserNurse,
        path: "/admin/carers",
        children: [
          { name: "Carer List", path: "/admin/carers" },
          { name: "Yearly Overview", path: "/admin/carers/yearly-overview" },
          { name: "Supervisions", path: "/admin/carers/supervisions" },
          { name: "Spot Checks", path: "/admin/carers/spot-checks" },
        ],
      },

      { name: "Forms / Templates", icon: faUsers, path: "/admin/forms" },
      { name: "Form Assign", icon: faUsers, path: "/admin/form-assign" },
      { name: "Payroll List", icon: faCalendarDay, path: "/admin/payroll-list" },
      { name: "Downloads", icon: faCalendarCheck, path: "/admin/downloads" },
      { name: "Settings", icon: faClipboardList, path: "/admin/settings" },
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

  return (
    <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar">
        <ul className="menu">

          {userMenus.map((menu, index) => (
            <li key={index} className="menu-item">

              {menu.children ? (
                <>
                  <div
                    className={`menu-link ${openMenus[menu.name] ? "open" : ""}`}
                    onClick={() => toggleSubMenu(menu.name)}
                  >
                    <FontAwesomeIcon icon={menu.icon} className="menu-icon" />
                    {!collapsed && <span className="menu-text">{menu.name}</span>}
                    {!collapsed && (
                      <FontAwesomeIcon
                        icon={openMenus[menu.name] ? faChevronUp : faChevronDown}
                        className="submenu-arrow"
                      />
                    )}
                  </div>

                  {openMenus[menu.name] && !collapsed && (
                    <ul className="submenu">
                      {menu.children.map((sub, subIndex) => (
                        <li
                          key={subIndex}
                          className={`submenu-item ${
                            isActive(sub.path) ? "active-sub" : ""
                          }`}
                          onClick={() => handleNavigate(sub.path)}
                        >
                          {sub.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <div
                  className={`menu-link ${isActive(menu.path) ? "active" : ""}`}
                  onClick={() => handleNavigate(menu.path)}
                >
                  <FontAwesomeIcon icon={menu.icon} className="menu-icon" />
                  {!collapsed && <span className="menu-text">{menu.name}</span>}
                </div>
              )}

            </li>
          ))}

        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
