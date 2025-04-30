import React from "react";
import styles from './SignupPage.module.css'
import logo from "../../assets/Home/logo.svg";
import Signup from "../../components/Signup/Signup";
import cover from "../../assets/Login/cover.svg";
export default function SignupPage() {
  return (
    <div className={styles.container}>
      <div className={styles.leftContent}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" />
          <h1>Hubly</h1>
        </div>
        <Signup/>
      </div>

      <div className={styles.rightContent}>
        <img src={cover} alt="" />
      </div>
    </div>
  );
}
