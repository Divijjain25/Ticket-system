import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import Plan from "../../components/Plan/Plan";
import Footer from "../../components/Footer/Footer";
import chatbot from "../../assets/Home/chatbot.svg";
import cross from "../../assets/Home/cross.svg";
import styles from "./HomePage.module.css";
import Chatbox from "../../components/Chatbox/Chatbox";
import ChatbotPopup from "../../components/ChatbotPopup/ChatbotPopup";
export default function HomePage() {
  const [openChat, setOpenChat] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 700);
    // console.log(isMobile,handleResize());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.container}>
      {isMobile ? (
        <></>
      ) : (
        <>
          <Navbar />
          <Hero />
          <About />
          <Plan />
          <Footer />
        </>
      )}

      {openChat ? (
        <>
          <Chatbox />
        </>
      ) : (
        <></>
      )}
      <ChatbotPopup />
      <div className={styles.chatbot} onClick={() => setOpenChat(!openChat)}>
        {openChat ? <img src={cross} alt="" /> : <img src={chatbot} alt="" />}
      </div>
    </div>
  );
}
