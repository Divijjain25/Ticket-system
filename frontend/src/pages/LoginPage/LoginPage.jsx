import React from "react";
import styles from "./LoginPage.module.css";
import logo from "../../assets/Home/logo.svg";
import Login from "../../components/Login/Login";
import cover from "../../assets/Login/cover.svg";
export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.leftContent}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" />
          <h1>Hubly</h1>
        </div>
        <div className={styles.loginContainer}>
        <Login/>

        </div>
      </div>

      <div className={styles.rightContent}>
        <img src={cover} alt="" />
      </div>
    </div>
  );
}
