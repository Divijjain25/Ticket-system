import React from "react";
import styles from "./Plan.module.css";
export default function Plan() {
  return (
    <section className={styles.plan}>
      <div className={styles.header}>
        <h2>We have plans for everyone!</h2>
        <p>
          Hubly helps businesses streamline customer interactions, track leads,
          and automate tasks—saving you time and maximizing revenue. Whether
          you’re a startup or an enterprise, Hubly adapts to your needs, giving
          you the tools to scale efficiently.
        </p>
      </div>
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.head}>
            <h3>STARTER</h3>
            <p>
              Best for local businesses needing to improve their online
              reputation.
            </p>
          </div>
          <h3 className={styles.amount}>
            $199 <span>/monthly</span>
          </h3>
          <div className={styles.details}>
            <h5>What's included</h5>
            <ul className={styles.list}>
              <li>Unlimited Users</li>
              <li>GMB Messaging</li>
              <li>Reputation Management</li>
              <li>GMB Call Tracking</li>
              <li>23/7 Award Winning Support</li>
            </ul>
          </div>
          <button>SIGN UP FOR STARTER</button>
        </div>

        <div className={styles.card}>
          <div className={styles.head}>
            <h3>GROW</h3>
            <p>
              Best for all businesses that want to take full control of their
              marketing automation and track their leads, click to close.
            </p>
          </div>
          <h3 className={styles.amount}>
            $399 <span>/monthly</span>
          </h3>
          <div className={styles.details}>
            <h5>What's included</h5>
            <ul className={styles.list}>
              <li>Pipeline Management</li>
              <li>Marketting Automation Campaigns</li>
              <li>Live Call Transfer</li>
              <li>GMB Messaging</li>
              <li>Embed-able Form Builder</li>
              <li>Reputation Management</li>
              <li>23/7 Award Winning Support</li>
            </ul>
          </div>
          <button>SIGN UP FOR GROW</button>
        </div>
      </div>
    </section>
  );
}
