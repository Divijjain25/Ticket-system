import React from "react";
import logo from "../../assets/Home/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import dashboard from "../../assets/Sidebar/dashboard.svg";
import message from "../../assets/Sidebar/message.svg";
import analytics from "../../assets/Sidebar/analytics.svg";
import chatbot from "../../assets/Sidebar/chatbot.svg";
import settings from "../../assets/Sidebar/settings.svg";
import teams from "../../assets/Sidebar/teams.svg";
import online from "../../assets/Sidebar/online.svg";
import { toast } from "react-toastify";

export default function Sidebar() {
  const location = useLocation();
  const navigate =useNavigate()
  const links = [
    { path: "/admin/dashboard", icon: dashboard, label: "Dashboard" },
    { path: "/admin/contact-center", icon: message, label: "Contact Center" },
    { path: "/admin/analytics", icon: analytics, label: "Analytics" },
    { path: "/admin/chatbot", icon: chatbot, label: "Chatbot" },
    { path: "/admin/teams", icon: teams, label: "Teams" },
    { path: "/admin/settings", icon: settings, label: "Settings" },
  ];

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
    toast.success("User logout successful")
  };

  return (
    <aside className={styles.sidebar}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <div className={styles.nav}>
        {links.map(({ path, icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link to={path} key={path} className={styles.navItem}>
              <img src={icon} alt={label} />
              <span
                className={styles.label}
                style={{ visibility: isActive ? "visible" : "hidden" }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
      <img
        src={online}
        alt="Online"
        className={styles.online}
        onClick={handleLogout}
      />
    </aside>
  );
}
