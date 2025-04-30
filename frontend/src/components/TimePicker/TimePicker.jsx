import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "./TimePicker.module.css";
import { ChatbotContext } from "../../contexts/ChatbotContext";

const TimePicker = () => {
  const hours = Array.from({ length: 24 }, (_, i) => (i < 10 ? "0" + i : i.toString()));
  const minutes = Array.from({ length: 60 }, (_, i) => (i < 10 ? "0" + i : i.toString()));
  const seconds = Array.from({ length: 60 }, (_, i) => (i < 10 ? "0" + i : i.toString()));

  const [selectedHour, setSelectedHour] = useState("00");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedSecond, setSelectedSecond] = useState("00");

  const {missedChatTimerInSec,missedChatTimer,setMissedChatTimer} =useContext(ChatbotContext)

  const hourRefs = useRef({});
  const minuteRefs = useRef({});
  const secondRefs = useRef({});

  useEffect(() => {
    const hrs = Math.floor(missedChatTimerInSec / 3600);
    const mins = Math.floor((missedChatTimerInSec % 3600) / 60);
    const secs = missedChatTimerInSec % 60;

    const h = hrs < 10 ? "0" + hrs : hrs.toString();
    const m = mins < 10 ? "0" + mins : mins.toString();
    const s = secs < 10 ? "0" + secs : secs.toString();

    setMissedChatTimer((prev) => ({
      ...prev,
      hours: h,
      minutes: m,
      seconds: s,
    }));
        

    // After setting values, scroll them into view
    setTimeout(() => {
      hourRefs.current[h]?.scrollIntoView({ behavior: "smooth", block: "center" });
      minuteRefs.current[m]?.scrollIntoView({ behavior: "smooth", block: "center" });
      secondRefs.current[s]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100); // slight delay after render
  }, [missedChatTimerInSec]);

  const renderScrollColumn = (items, type, refs) => (
    <div className={styles.scrollColumn}>
      {items.map((item, index) => (
        <div
          key={index}
          ref={(el) => (refs.current[item] = el)}
          className={`${styles.scrollItem} ${
            missedChatTimer[type] === item ? styles.active : ""
          }`}
          onClick={() => {
            setMissedChatTimer((prev) => ({
              ...prev,
              [type]: item,
            }));
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
  

  return (
    <div className={styles.timePicker}>
      {renderScrollColumn(hours, "hours", hourRefs)}:
      {renderScrollColumn(minutes, "minutes", minuteRefs)}:
      {renderScrollColumn(seconds, "seconds", secondRefs)}
    </div>
  );
};

export default TimePicker;