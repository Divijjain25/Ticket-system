import { createContext, useEffect, useState } from "react";
import { getSettings } from "../services/index";
import { toast } from "react-toastify";

export const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [selectedHeaderColor, setSelectedHeaderColor] = useState("");

  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState("");

  const [welcomeMessage, setWelcomeMessage] = useState("");

  const [customizeMessages, setCustomizeMessages] = useState([]);

  const [formPlaceholders, setFormPlaceholders] = useState();

  const [missedChatTimer,setMissedChatTimer]=useState({
    hours:"00",
    minutes:"00",
    seconds:""
  });

  const [missedChatTimerInSec,setMissedChatTimerInSec] = useState()

  useEffect(() => {
    getSettings()
    .then(async(response)=>{
        const data= await response.json()
        if(response.ok){
          setSelectedHeaderColor(data.settings.headerColor)
          setSelectedBackgroundColor(data.settings.backgroundColor)
          setWelcomeMessage(data.settings.welcomeMessage)
          setCustomizeMessages(data.settings.defaultMessages)
          setFormPlaceholders(data.settings.formPlaceholders)
          setMissedChatTimerInSec(data.settings.missedChatTimerInSeconds)
          // console.log(data.settings.missedChatTimerInSec);
          
        }
    })
    .catch((error)=>{
        toast.error(error)
    })
  }, []);

  return (
    <ChatbotContext.Provider
      value={{
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
        missedChatTimer,
        setMissedChatTimer,
        missedChatTimerInSec,
        setMissedChatTimerInSec
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};
