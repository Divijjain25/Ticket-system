import React from "react";
import styles from "./About.module.css";
import workStructure from "../../assets/Home/workStructure.svg";
export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.header}>
        <h2>
          At its core, Hubly is a robust CRM
          <br />
          solution.
        </h2>
        <p>
          Hubly helps businesses streamline customer interactions, track leads,
          and automate tasks—
          saving you time and maximizing revenue. Whether you’re a startup or an
          enterprise, Hubly adapts to your needs, giving you the tools to scale
          efficiently.
        </p>
      </div>
      <div className={styles.body}>
        <div className={styles.leftContent}>
          <div className={styles.workDefine}>
            <h3 className={styles.workDefineHeader}>
              Multiple Platforms Together!
            </h3>
            <p >
              Email communication is a breeze with our fully integrated, drag &
              drop email builder.
            </p>
          </div>
          <div className={styles.workDefine}>
            <h4>CLOSE</h4>
            <p>
              Capture leads using our landing pages, surveys, forms, calendars,
              inbound phone system & more!
            </p>
          </div>
          <div className={styles.workDefine}>
            <h4>NURTURE</h4>
            <p>
              Capture leads using our landing pages, surveys, forms, calendars,
              inbound phone system & more!
            </p>
          </div>
        </div>
        <div className={styles.rightContent}>
          <img src={workStructure} alt="Work Structure" />
        </div>
      </div>
    </section>
  );
}
