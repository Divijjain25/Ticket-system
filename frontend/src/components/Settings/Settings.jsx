import React, { useEffect, useState } from "react";
import styles from "./Settings.module.css";
import info from "../../assets/Settings/info.svg";
import { getProfile, editProfile } from "../../services/index";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [originalData, setOriginalData] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate=useNavigate()

  useEffect(() => {
    getProfile()
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setOriginalData({
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
          });
          setFormData({
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            password: "",
          });
        }
      })
      .catch((error) => {
        console.error("Failed to fetch profile data:", error);
        toast.error("Failed to load profile data");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    
    const updatedFields = {};

    if (formData.firstName !== originalData.firstName) {
      updatedFields.firstName = formData.firstName;
    }

    if (formData.lastName !== originalData.lastName) {
      updatedFields.lastName = formData.lastName;
    }

    if (formData.email !== originalData.email) {
      updatedFields.email = formData.email;
    }

    if (formData.password) {
      updatedFields.password = formData.password;
    }

    if (Object.keys(updatedFields).length === 0) {
      toast.info("No changes made");
      return;
    }

    try {
      const response = await editProfile(updatedFields);
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Profile updated successfully");

        
        if (updatedFields.password || updatedFields.email) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("user")
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Settings</h2>
      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <h3>Edit Profile</h3>
        </div>
        <hr />
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputContainer}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <div className={styles.infoWrapper}>
                <img src={info} alt="info" className={styles.icon} />
                <div className={styles.tooltip}>
                  User will be logged out immediately
                </div>
              </div>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputContainer}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className={styles.infoWrapper}>
                <img src={info} alt="info" className={styles.icon} />
                <div className={styles.tooltip}>
                  User will be logged out immediately
                </div>
              </div>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className={styles.inputContainer}>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className={styles.infoWrapper}>
                <img src={info} alt="info" className={styles.icon} />
                <div className={styles.tooltip}>
                  User will be logged out immediately
                </div>
              </div>
            </div>
          </div>
          <div className={styles.btn}>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
