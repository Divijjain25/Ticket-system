import React, { useState } from "react";
import pic from "../../assets/Dashboard/People.svg";
import styles from "./ChatItem.module.css";
export default function ChatItem({ id,chat, isActive, onSelect }) {
  const preview =
    chat.title.split(" ").length > 5
      ? chat.title.split(" ").slice(0, 5).join(" ") + "..."
      : chat.title;

  return (
    <div className={`${isActive?styles.border:""}`}>
      <div
        className={`${styles.container} ${isActive ? styles.active : ""}`}
        onClick={onSelect}
      >
        <img src={pic} alt="Profile pic" />
        <div className={styles.content}>
          <h5>{`Chat ${id+1}`}</h5>
          <p>{preview}</p>
        </div>
      </div>
    </div>
  );
}
