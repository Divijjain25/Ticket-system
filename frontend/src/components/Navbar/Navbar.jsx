import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/Home/logo.svg";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
        <h1>Hubly</h1>
      </div>
      <div className={styles.buttons}>
        <Link to='/login'><span>Login</span></Link>
        <Link to='/signup'><button>Sign up</button></Link>
      </div>
    </nav>
  );
}
