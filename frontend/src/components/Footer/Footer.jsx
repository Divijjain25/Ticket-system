import React from "react";
import styles from "./Footer.module.css";
import logo from '../../assets/Home/logo.svg'
import socialIcons from '../../assets/Home/socialicons.svg'
export default function Footer() {
  return (
    <section className={styles.footer}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
        <h1>Hubly</h1>
      </div>
      <div className={styles.offers}>
            <div className={styles.offer}>
                <h5>Product</h5>
                <ul className={styles.list}>
                    <li>Universal checkout</li>
                    <li>Payment workflows</li>
                    <li>Observability</li>
                    <li>UpliftAI</li>
                    <li>Apss & Integrations</li>
                </ul>
            </div>

            <div className={styles.offer}>
                <h5>Why Primer</h5>
                <ul className={styles.list}>
                    <li>Expand to new markets</li>
                    <li>Boost payment success</li>
                    <li>Improve conversion rates</li>
                    <li>Reduce payments fraud</li>
                    <li>Recover revenue</li>
                </ul>
            </div>

            <div className={styles.offer}>
                <h5>Developers</h5>
                <ul className={styles.list}>
                    <li>Primer Docs</li>
                    <li>API Reference</li>
                    <li>Payment methods guides</li>
                    <li>Service status</li>
                    <li>Community</li>
                </ul>
            </div>

            <div className={styles.offer}>
                <h5>Resources</h5>
                <ul className={styles.list}>
                    <li>Blog</li>
                    <li>Success stories</li>
                    <li>News room</li>
                    <li>Terms</li>
                    <li>Privacy</li>
                </ul>
            </div>

            <div className={styles.offer}>
                <h5>Company</h5>
                <ul className={styles.list}>
                    <li>Careers</li>
                </ul>
            </div>
      </div>

      <img src={socialIcons} alt="Social Icons" className={styles.social} />
    </section>
  );
}
