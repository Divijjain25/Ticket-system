import React, { useContext, useState } from 'react'
import styles from './ChatbotPopup.module.css'
import chatbotDp from '../../assets/Chatbot/botDp.svg'
import closeBtn from '../../assets/Chatbot/closeBtn.svg'
import { ChatbotContext } from '../../contexts/ChatbotContext';
export default function ChatbotPopup() {

    const [isVisible, setIsVisible] = useState(true);
    const {welcomeMessage} =useContext(ChatbotContext)

  return (
    <>
    {isVisible ? (
      <div className={styles.container}>
        <div className={styles.closeBtn} onClick={() => setIsVisible(false)}>
          <img src={closeBtn} alt="Close" />
        </div>
        <img src={chatbotDp} className={styles.botDp} alt="Bot" />
        <p className={styles.body}>
          {welcomeMessage}
        </p>
      </div>
    ) : null}
  </>
      
  )
}
