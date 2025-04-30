import React, { useState } from "react";
import { Link, Links, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { signup } from "../../services/index";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setAgreeToTerms(e.target.checked);
  };

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleClick=()=>{
  //   navigate('/admin/dashboard')
  // }

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = formData;

    if(password!==confirmPassword){
      toast.error("Passwords donot match!")
      return;
    }

    if (!firstName || !lastName || !email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!agreeToTerms) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    signup(formData)
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          toast.success("Signup successful!");
          setFormData({ firstName: "", lastName: "", email: "", password: "" });
          setConfirmPassword("")
          setAgreeToTerms(false);
          navigate('/login')
        } else {
          console.error(data.message);
          toast.error(data.message || "Signup failed");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred during signup. Please try again.");
      });
  };

  return (
    <section className={styles.signup}>
      <div className={styles.header}>
        <h2>Create an account</h2>
        <Link to="/login">
          <h4>Sign in instead</h4>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.input}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confimrPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.terms}>
            <input
              type="checkbox"
              id="terms"
              checked={agreeToTerms}
              onChange={handleCheckboxChange}
              required
            />
            <label htmlFor="terms">
              By creating an account, I agree to our <u>Terms of use</u> and{" "}
              <u>Privacy Policy</u>{" "}
            </label>
          </div>
          <button onClick={handleSubmit}>Create an account</button>
        </div>
      </form>
      <p className={styles.footer}>
        This site is protected by reCAPTCHA and the{" "}
        <span> Google Privacy Policy</span> and <span>Terms of Service</span>{" "}
        apply.
      </p>
    </section>
  );
}
