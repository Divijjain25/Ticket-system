import React, { useContext, useEffect, useState } from "react";
import ChatItem from "../ChatItem/ChatItem";
import styles from "./Chatbar.module.css";
import { TicketContext } from "../../contexts/TicketContext";
export default function Chatbar() {
  
  
  const { ticket,setTicket,selectedChat,setSelectedChat,chatList } = useContext(TicketContext);

 
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Contact Center</h2>
      </div>

      <div className={styles.chatContainer}>
        <h4>Chats</h4>
        <hr />
        <div className={styles.chatList}>
          {chatList.map((chat, index) => (
            <ChatItem
              key={index}
              id={index}
              chat={chat}
              isActive={selectedChat === chat._id}
              onSelect={() => {
                setSelectedChat(chat._id);
                localStorage.setItem("ticketId",chat._id)
                setTicket({...chat});
                // console.log("check",chat);
                
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
