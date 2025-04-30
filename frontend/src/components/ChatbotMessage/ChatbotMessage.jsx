import React from "react";
import styles from "./ChatbotMessage.module.css";
import chatbotDp from "../../assets/Chatbot/botDp.svg";
import DefaultMessage from "../DefaultMessage/DefaultMessage";
export default function ChatbotMessage({
  firstMessage,
  setFirstMessage,
  firstMessageContent,
  message,
  messages,
  setMessages,
  showImage,
  isSettings
}) {
  // const showBotDp = botMessage && (index === 0 || !messages[index - 1].botMessage)
  return (
    <div
      className={`${styles.messageContainer} ${
        firstMessage == true || message?.senderType == "customer"
          ? styles.send
          : styles.receive
      }`}
    >
      {message?.senderType == "system" && showImage ? (
        <img src={chatbotDp} className={styles.profileImg} alt="Bot Pic" />
      ) : (
        <div className={styles.profileImg}></div>
      )}
      {firstMessage ? (
        <div className={styles.firstMessage}>
          <p>{firstMessageContent}</p>
          <DefaultMessage
            firstMessageContent={firstMessageContent}
            setFirstMessage={setFirstMessage}
            messages={messages}
            setMessages={setMessages}
          />
        </div>
      ) : (
        <p style={{
          fontSize: isSettings ?"0.8vw":"",
        }}>{message?.content}</p>
      )}
    </div>
  );
}