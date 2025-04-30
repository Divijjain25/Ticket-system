import React, { useContext, useEffect, useState } from "react";
import styles from "./UserChat.module.css";
import sendBtn from "../../assets/ContactCenter/sendbtn.svg";
import homeBtn from "../../assets/Sidebar/dashboard.svg";
import Message from "../Message/Message";
import { TicketContext } from "../../contexts/TicketContext";
import { getMessages, sendMessages } from "../../services";
import { toast } from "react-toastify";
export default function UserChat({ chats, setChats }) {
  const { ticket, chatList, currentMember } = useContext(TicketContext);

  const [notify, setNotify] = useState("");

  const [disabledChat, setDisabledChat] = useState(false);
  const [totalSystemMessages, setTotalSystemMessages] = useState(0);

  const [message, setMessage] = useState({
    senderType: "system",
    senderName: "system",
    content: "",
  });

  useEffect(() => {
    let disabled = false;

    if (chatList.length === 0) {
      setNotify("No chats to display");
      disabled = true;
    } else if (localStorage.getItem("user") !== ticket?.assignedTo) {
      setNotify(
        "This chat is assigned to a new team member. You no longer have access"
      );
      setChats([]);
      disabled = true;
    } else if (ticket?.status !== "unresolved") {
      setNotify("This chat has been resolved");
      setChats([]);
      disabled = true;
    } else {
      getMessages(ticket._id)
        .then(async (response) => {
          const data = await response.json();
          // console.log(data?.messages);
          if (response.ok) {
            setChats(data?.messages);
            setDisabledChat(false);
            setTotalSystemMessages(
              data?.messages.filter((chat) => chat.senderType === "system")
                .length
            );
          }
        })
        .catch((error) => {
          console.error("Failed to fetch messages:", error);
        });
      disabled = false;
    }

    setDisabledChat(disabled);
  }, [
    ticket?.status,
    ticket?.assignedTo,
    currentMember,
    ticket?._id,
    chatList,
  ]);

  // useEffect(() => {
  //   if (ticket?._id && ticket?.status==="unresolved") {
  //     getMessages(ticket._id)
  //       .then(async (response) => {
  //         const data = await response.json();
  //         // console.log(data?.messages);
  //         if (response.ok) {
  //           setChats(data?.messages);
  //           setDisabledChat(false)
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Failed to fetch messages:", error);
  //       });
  //   }
  //   else{
  //     setChats([])
  //     setNotify("This chat has been resolved")
  //     setDisabledChat(true)
  //   }

  // }, [ticket?._id,ticket?.status]);

  const formatTime = (isoDate) => {
    const date = new Date(isoDate);

    const formatted = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formatted;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSend = (e) => {
    e.preventDefault();

    sendMessages(ticket?._id, message)
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          console.log(data);

          setChats((prev) => [data.newMessage, ...prev]);

          setMessage({
            senderType: "system",
            senderName: "system",
            content: "",
          });
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{ticket?.ticketId}</h3>
        <img src={homeBtn} alt="Home" />
      </div>
      <div className={styles.chatBody}>
        {chats.map((chat, index) => {
          const nextChat = chats[index + 1];
          const showImage =
            index === chats.length - 1 ||
            chat.senderType !== nextChat?.senderType;

          return (
            <React.Fragment key={index}>
              {ticket?.isMissed && totalSystemMessages == 2 && index == chats.length%3 ? (
                <p className={styles.missedChat}>Replying to missed chat</p>
              ) : (
                <></>
              )}
              <Message
                chat={chat}
                showImage={showImage}
                key={index}
                currentMember={currentMember}
              />
            </React.Fragment>
          );
        })}
        {chatList.length !== 0 ? (
          <div className={styles.timeContainer}>
            <div
              style={{
                height: "1px",
                width: "30%",
                borderTop: "1px solid #8c8e92",
              }}
            ></div>
            <p>{formatTime(ticket?.createdAt)}</p>
            <div
              style={{
                height: "1px",
                width: "30%",
                borderTop: "1px solid #8c8e92",
              }}
            ></div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.inputContainer}>
        {disabledChat ? (
          <p className={styles.disableText}>{notify}</p>
        ) : (
          <div className={styles.input}>
            <textarea
              name="content"
              id="content"
              placeholder="type here"
              value={message.content}
              onChange={handleChange}
            ></textarea>
            <img src={sendBtn} alt="Send Button" onClick={handleSend} />
          </div>
        )}
      </div>
    </div>
  );
}