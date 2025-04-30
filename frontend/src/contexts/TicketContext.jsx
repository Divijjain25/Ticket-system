import { createContext,useEffect,useState } from "react";

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  
    const[ticket,setTicket]=useState()
    const[chatList,setChatList]=useState([])
    const [selectedChat, setSelectedChat] = useState();
    const [currentMember,setCurrentMember]=useState()
    
      

  return (
    <TicketContext.Provider
      value={{
       ticket,
       setTicket,
       selectedChat,
       setSelectedChat,
       chatList,
       setChatList,
       currentMember,
       setCurrentMember
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
