import React, { useContext, useEffect, useState } from "react";
import Chatbar from "../ChatBar/Chatbar";
import styles from "./ContactCenter.module.css";
import UserChat from "../UserChat/UserChat";
import TicketDetails from "../TicketDetails/TicketDetails";
import { TicketContext } from "../../contexts/TicketContext";
import { getAllMembers, getTickets } from "../../services/index";
export default function ContactCenter() {
  const {
    ticket,
    setTicket,
    setSelectedChat,
    chatList,
    setChatList,
    setCurrentMember,
  } = useContext(TicketContext);

  const [members, setMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    getTickets("")
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setChatList(data.tickets);

          if (data.tickets.length == 0) {
            localStorage.removeItem("ticketId");
          }

          if (ticket?._id) {
            const chosenTicket = data?.tickets.find(
              (item) => item._id === ticket?._id
            );
            if (chosenTicket) {
              setSelectedChat(ticket?._id);
              localStorage.setItem("ticketId", ticket?._id);
            } else {
              setSelectedChat(data?.tickets[0]?._id);

              localStorage.setItem("ticketId", data?.tickets[0]?._id);
            }
          } else if (localStorage.getItem("ticketId")) {
            const chosenTicket = data?.tickets.find(
              (ticket) => ticket._id === localStorage.getItem("ticketId")
            );

            if (!chosenTicket) {
              if (data?.tickets.length !== 0) {
                setSelectedChat(data?.tickets[0]?._id);

                localStorage.setItem("ticketId", data?.tickets[0]?._id);
              }
            } else {
              setSelectedChat(localStorage.getItem("ticketId"));
            }
          } else {
            if (data?.tickets.length !== 0) {
              setSelectedChat(data?.tickets[0]?._id);
              localStorage.setItem("ticketId", data?.tickets[0]?._id);
            }
          }

          if (!ticket) {
            if (localStorage.getItem("ticketId")) {
              const chosenTicket = data?.tickets.find(
                (ticket) => ticket._id === localStorage.getItem("ticketId")
              );

              if (chosenTicket) {
                setTicket(chosenTicket);
              } else {
                if (data?.tickets.length == 0) {
                  setTicket(null);
                } else {
                  setTicket(data?.tickets[0]);
                }
              }
            } else {
              if (data?.tickets.length == 0) {
                setTicket(null);
              } else {
                setTicket(data?.tickets[0]);
              }
            }
          } else {
            const chosenTicket = data?.tickets.find(
              (item) => item._id === ticket?._id
            );

            if (chosenTicket) {
              setTicket(chosenTicket);
            } else {
              if (data?.tickets.length == 0) {
                setTicket(null);
              } else {
                setTicket(data?.tickets[0]);
              }
            }
          }
        }
      })
      .catch((error) => {
        console.error("Failed to fetch chat data:", error);
      });
  }, []);

  useEffect(() => {
    if (!ticket) return;

    getAllMembers()
      .then(async (response) => {
        const data = await response.json();

        if (response.ok) {
          setMembers(data.teams);
          const matchedUser = data.teams.find(
            (user) => user._id === ticket.assignedTo
          );
          if (matchedUser) {
            setCurrentMember(matchedUser);
            setSelectedUser(matchedUser);

            // matchedUser._id === ticket.assignedTo
            //   ? setDisabled(false)
            //   : setDisabled(true);
          }
        }
      })
      .catch((error) => {
        console.error("Failed to fetch members:", error);
      });
  }, [ticket]);

  return (
    <div className={styles.container}>
      <Chatbar />
      <UserChat chats={chats} setChats={setChats} />
      <TicketDetails
        members={members}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        setChats={setChats}
      />
    </div>
  );
}
