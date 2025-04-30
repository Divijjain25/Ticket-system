import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './Login.module.css'
import {login} from '../../services/index'
import { toast } from "react-toastify";
export default function Login() {

    const [formData,setFormData]=useState({email:"",password:""})
    const navigate = useNavigate()
    const handleChange=(e)=>{
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

     const handleSubmit = (e) => {
        e.preventDefault();
    
        const { email, password } = formData;
    
    
        if (!email || !password) {
          toast.error("Please fill in all required fields.");
          return;
        }
    
        login(formData)
          .then(async (response) => {
            const data = await response.json();
            if (response.ok) {
              
              localStorage.setItem("token",data.token)
              localStorage.setItem("role",data.role)
              localStorage.setItem("user",data.user)
              
              toast.success("Login successful!");
              setFormData({  email: "", password: "" });
              navigate('/admin/dashboard')
            } else {
              console.error(data.message);
              toast.error(data.message || "Login failed");
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error("An error occurred during login. Please try again.");
          });
      };

  return (
    <section className={styles.login}>
      <h2>Sign in to your Plexify</h2>

      <form className={styles.form}>
        <div className={styles.input}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
            />
          </div>
        </div>
        <div className={styles.buttons}>
          <button onClick={handleSubmit}>Log in</button>
          <p style={{color:'#244779',textDecoration:'underline'}}>Forgot password?</p>
          <p>Don't have an account?<Link to='/signup'><span style={{color:'#244779',textDecoration:'underline'}}>Sign up</span></Link></p>
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
