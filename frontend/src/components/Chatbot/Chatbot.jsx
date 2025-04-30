import React, { useContext, useState } from "react";
import styles from "./Chatbot.module.css";
import chatbotLogo from "../../assets/Chatbot/chatbotlogo.svg";
import ChatbotMessage from "../ChatbotMessage/ChatbotMessage";
import closeBtn from "../../assets/Chatbot/closeBtn.svg";
import sendBtn from "../../assets/Chatbot/sendBtn.svg";
import editBtn from "../../assets/Chatbot/editBtn.svg";
import TimePicker from "../TimePicker/TimePicker";
import { ChatbotContext } from "../../contexts/ChatbotContext";
import { updateSettings } from "../../services/index";
import { toast } from "react-toastify";
export default function Chatbot() {
  // TODO: change default message placeholder with formplaceholder

  const {
    selectedHeaderColor,
    setSelectedHeaderColor,
    selectedBackgroundColor,
    setSelectedBackgroundColor,
    welcomeMessage,
    setWelcomeMessage,
    customizeMessages,
    setCustomizeMessages,
    formPlaceholders,
    setFormPlaceholders,
    missedChatTimer
  } = useContext(ChatbotContext);
  
  const headerColors = ["#33475b", "#fff", "#000"];

  const handleHeaderColor=(color)=>{
   
    setSelectedHeaderColor(color)
    const settings={}
    settings.headerColor=color

    updateSettings(settings)
    .then(async(response)=>{
      const data= await response.json()
      if(response.ok){
        toast.success("Header color changed")
      }
      else{
        toast.error("Failed to update header color")
      }
    }).catch((error)=>{
      toast.error("Error changing header color")
    })
  }

  const backgroundColors = ["#eee", "#fff", "#000"];

  const handleBackgroundColor=(color)=>{
   
    setSelectedBackgroundColor(color)
    const settings={}
    settings.backgroundColor=color

    updateSettings(settings)
    .then(async(response)=>{
      const data= await response.json()
      if(response.ok){
        toast.success("Background color changed")
      }
      else{
        toast.error("Failed to update background color")
      }
    }).catch((error)=>{
      toast.error("Error changing background color")
    })
  }

  const [editIndex, setEditIndex] = useState(null);
  const [tempMessage, setTempMessage] = useState("");

  const handleEditClick = (index) => {
    setEditIndex(index);
    setTempMessage(customizeMessages[index]);
  };

  const saveEdit = () => {
    if (editIndex !== null) {
      const updated = [...customizeMessages];
      updated[editIndex] = tempMessage;
      setCustomizeMessages(updated);

        const settings={}
        settings.defaultMessages=updated
    
        updateSettings(settings)
        .then(async(response)=>{
          const data= await response.json()
          if(response.ok){
            toast.success("Default messages changed")
          }
          else{
            toast.error("Failed to update default messages")
          }
        }).catch((error)=>{
          toast.error("Error changing default messages")
        })
      

      setEditIndex(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEdit();
    }
  };

  const [editFormField, setEditFormField] = useState(null);
  const [tempFormValue, setTempFormValue] = useState("");

  const handleFormEditClick = (field) => {
    setEditFormField(field);
    setTempFormValue(formPlaceholders[field]);
  };

  const saveFormEdit = () => {
    if (editFormField) {
      const updatedPlaceholders = {
        ...formPlaceholders,
        [editFormField]: tempFormValue,
      };
      
      setFormPlaceholders(updatedPlaceholders);
      
      const settings = {};
      settings.formPlaceholders = { ...updatedPlaceholders };
      
    
        updateSettings(settings)
        .then(async(response)=>{
          const data= await response.json()
          if(response.ok){
            toast.success("Form placegolders changed")
          }
          else{
            toast.error("Failed to update form placeholders")
          }
        }).catch((error)=>{
          toast.error("Error changing form placeholders")
        })
      

      setEditFormField(null);
    }
  };

  const handleFormKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveFormEdit();
    }
  };

  const [tempWelcomeMsg, setTempWelcomeMsg] = useState(welcomeMessage);
  const [isEditingWelcome, setIsEditingWelcome] = useState(false);

  const handleWelcomeEditClick = () => {
    setTempWelcomeMsg(welcomeMessage);
    setIsEditingWelcome(true);
  };

  const handleWelcomeKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveWelcomeMessage();
    }
  };

  // Save the changes
  const saveWelcomeMessage = () => {
    setWelcomeMessage(tempWelcomeMsg);
      const settings={}
      settings.welcomeMessage= tempWelcomeMsg
  
      updateSettings(settings)
      .then(async(response)=>{
        const data= await response.json()
        if(response.ok){
          toast.success("Welcome message changed")
        }
      }).catch((error)=>{
        toast.error("Error changing welcome message")
      })
    

    setIsEditingWelcome(false);
  };

  const handleTimer =(e)=>{
    e.preventDefault()
    const settings={}
    settings.missedChatTimer= missedChatTimer
    console.log(missedChatTimer);
    
    updateSettings(settings)
    .then(async(response)=>{
      const data= await response.json()
      if(response.ok){
        toast.success("Missed Chat Timer changed")
      }
    }).catch((error)=>{
      toast.error("Error changing missed chat timer")
    })

  }

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>Chat Bot</h2>
      </div>
      <div className={styles.content}>
        <div className={styles.leftContent}>
          <div className={styles.chatbox}>
            <div
              className={styles.chatboxHeader}
              style={{ backgroundColor: selectedHeaderColor }}
            >
              <img src={chatbotLogo} alt="Chatbot DP" />
              <h5>Hubly</h5>
            </div>
            <div
              className={styles.chatboxBody}
              style={{ backgroundColor: selectedBackgroundColor }}
            >
              <ChatbotMessage
              isSettings={true}
                message={{
                  content: customizeMessages[1],
                  senderType: "system",
                }}
                key={2}
                index={2}
              />
              <ChatbotMessage
              isSettings={true}
                message={{
                  content: customizeMessages[0],
                  senderType: "system",
                }}
                key={1}
                index={1}
              />

              <div className={styles.defaultMessage}>
                <h5 className={styles.defaultMessageHeader}>Introduce Yourself</h5>
                <form className={styles.defaultMessageForm}>
                  <div className={styles.defaultMessageFormGroup}>
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      disabled
                      placeholder={formPlaceholders?.name}
                    />
                  </div>

                  <div className={styles.defaultMessageFormGroup}>
                    <label htmlFor="phone">Your Phone</label>
                    <input
                      type="text"
                      name="phone"
                      disabled
                      placeholder={formPlaceholders?.phone}
                    />
                  </div>

                  <div className={styles.defaultMessageFormGroup}>
                    <label htmlFor="email">Your Email</label>
                    <input
                      type="text"
                      name="email"
                      disabled
                      placeholder={formPlaceholders?.email}
                    />
                  </div>

                  <button disabled> Thank You!</button>
                </form>
              </div>
            </div>
            <div className={styles.chatboxInput}>
              <textarea
                name=""
                id=""
                placeholder="Write a message"
                disabled
              ></textarea>
              <button className={styles.chatboxBtn} disabled>
                <img src={sendBtn} alt="" />
              </button>
            </div>
          </div>

          <div className={styles.chatbotPopup}>
            <div
              className={styles.closeBtn}
              onClick={() => setIsVisible(false)}
            >
              <img src={closeBtn} alt="Close" />
            </div>
            <img src={chatbotLogo} className={styles.botDp} alt="Bot" />
            <p className={styles.chatbotPopupBody}>{welcomeMessage}</p>
          </div>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.editContainer}>
            <h5 className={styles.editContainerHeader}>Header Color</h5>
            <div className={styles.colorOption}>
              {headerColors.map((color, index) => (
                <div
                  key={index}
                  className={styles.color}
                  style={{ backgroundColor: color }}
                  onClick={()=>handleHeaderColor(color)}
                />
              ))}
            </div>
            <div className={styles.chosenColor}>
              <div
                className={styles.square}
                style={{ backgroundColor: selectedHeaderColor }}
              />
              <p>{selectedHeaderColor}</p>
            </div>
          </div>

          <div className={styles.editContainer}>
            <h5 className={styles.editContainerHeader}>
              Custom Background Color
            </h5>
            <div className={styles.colorOption}>
              {backgroundColors.map((color, index) => (
                <div
                  key={index}
                  className={styles.color}
                  style={{ backgroundColor: color }}
                  onClick={() => handleBackgroundColor(color)}
                />
              ))}
            </div>
            <div className={styles.chosenColor}>
              <div
                className={styles.square}
                style={{ backgroundColor: selectedBackgroundColor }}
              />
              <p>{selectedBackgroundColor}</p>
            </div>
          </div>

          <div className={styles.editContainer}>
            <h5 className={styles.editContainerHeader}>Customize Message</h5>
            <div className={styles.editMessageContainer}>
              {customizeMessages.map((message, index) => (
                <div key={index} className={styles.editMessageRow}>
                  {editIndex === index ? (
                    <input
                      type="text"
                      autoFocus
                      value={tempMessage}
                      onChange={(e) => setTempMessage(e.target.value)}
                      onBlur={saveEdit}
                      onKeyDown={handleKeyDown}
                      className={styles.editInput}
                    />
                  ) : (
                    <p className={styles.editMessage}>
                      {message}
                      <img
                        src={editBtn}
                        alt="Edit"
                        className={styles.editIcon}
                        onClick={() => handleEditClick(index)}
                      />
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.editContainer}>
            <h5 className={styles.editContainerHeader}>Introduction Form</h5>
            <div className={styles.editDefaultMessageContainer}>
              <form className={styles.form}>
                {["name", "phone", "email"].map((field) => (
                  <div className={styles.formGroup} key={field}>
                    <label htmlFor={field}>
                      Your {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    {editFormField === field ? (
                      <input
                        type="text"
                        value={tempFormValue}
                        onChange={(e) => setTempFormValue(e.target.value)}
                        onBlur={saveFormEdit}
                        onKeyDown={handleFormKeyDown}
                        className={styles.editInput}
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder={formPlaceholders?.[field]}
                        onFocus={() => handleFormEditClick(field)}
                        readOnly
                      />
                    )}
                  </div>
                ))}

                <button type="submit">Thank You!</button>
              </form>
            </div>
          </div>

          <div className={styles.editContainer}>
            <h5 className={styles.editContainerHeader}>Welcome Message</h5>
            <div className={styles.welcomeMessageContainer}>
              <span>{tempWelcomeMsg.length}/100</span>
              <div className={styles.welcomeMessage}>
                {isEditingWelcome ? (
                  <textarea
                    value={tempWelcomeMsg}
                    onChange={(e) => {
                      if (e.target.value.length <= 100) {
                        setTempWelcomeMsg(e.target.value);
                      }
                    }}
                    onKeyDown={handleWelcomeKeyDown}
                    onBlur={saveWelcomeMessage}
                    autoFocus
                  />
                ) : (
                  <>
                    <textarea value={welcomeMessage} readOnly />{" "}
                    <img
                      src={editBtn}
                      alt="Edit"
                      onClick={handleWelcomeEditClick}
                      style={{ cursor: "pointer" }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          <div className={styles.editContainer}>
            <h5 className={styles.editContainerHeader}>Missed chat timer</h5>
            <div className={styles.timeContainer}>
              <TimePicker/>
              <button onClick={handleTimer}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}