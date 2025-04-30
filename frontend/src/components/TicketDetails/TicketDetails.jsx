import React, { useContext, useEffect, useState } from "react";
import styles from "./TicketDetails.module.css";
import pic from "../../assets/Dashboard/People.svg";

import profile from "../../assets/ContactCenter/profile.svg";
import tel from "../../assets/ContactCenter/tel.svg";
import mail from "../../assets/ContactCenter/mail.svg";
import ticketIcon from "../../assets/ContactCenter/ticket.svg";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import dropdown from "../../assets/ContactCenter/dropdown.svg";
import { AssignedPopup } from "../Popup/Popup";
import { TicketContext } from "../../contexts/TicketContext";
import { reassignTicket, updateTicketStatus } from "../../services/index";
import { toast } from "react-toastify";
export default function TicketDetails({
  members,
  setSelectedUser,
  selectedUser,
  setChats
}) {
  const { ticket,setChatList,setTicket } = useContext(TicketContext);
  const [selected, setSelected] = useState("");

  // const disabled

  const [disabledUi,setDisabledUi]=useState(false)

useEffect(() => {

  if(localStorage.getItem("user")!==ticket?.assignedTo){
    setDisabledUi(true)
  }

  else if (ticket?.status === "resolved") {
    setSelected("resolved");
    // setResolved(true)
    setDisabledUi(true)
    // setChats([])
  } else {
    setSelected("");
    setDisabledUi(false)
  }
}, [ticket?.status,ticket?.assignedTo,ticket?._id]);
  const showIcon = selected === "";

  const [showMemberPopup, setShowMemberPopup] = useState(false);
  const [showStatusPopup, setShowStatusPopup] = useState(false);

  const handleStatus = (e) => {
    setSelected(e.target.value);
    if (e.target.value == "resolved") setShowStatusPopup(true);
  };


  const handleReassign = () => {
    reassignTicket(selectedUser._id, ticket._id)
      .then(async (response) => {
        const data = await response.json();

        if (response.ok) {
          // console.log(data);

          

          if(ticket.assignedTo === data.ticket.assignedTo){
              setDisabledUi(false)
          }
          else{
            setChats([])

            setTicket((prevTicket) => {
              const updatedTicket = {
                ...prevTicket,
                assignedTo: data.ticket.assignedTo,
              };
            
              setChatList(prevList =>
                prevList.map(c => c._id === updatedTicket._id ? updatedTicket : c)
              );
            
              return updatedTicket;
            }
            )

          }

          

          setShowMemberPopup(false);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Failed to reassign ticket:", error);
      });
  };

  const handleAssignCancel = () => {
    setShowMemberPopup(false);
  
    const originalAssignee = members.find(member => member._id === ticket?.assignedTo);
    if (originalAssignee) {
      setSelectedUser(originalAssignee);
    }
  };

  const handleResolve =()=>{
    updateTicketStatus(ticket._id)
    .then(async(response)=>{
      const data = await response.json();
      if (response.ok) {
        setShowStatusPopup(false)

        setTicket((prevTicket) => {
          const updatedTicket = {
            ...prevTicket,
            status: "resolved",
          };
        
          setChatList(prevList =>
            prevList.map(c => c._id === updatedTicket._id ? updatedTicket : c)
          );
        
          return updatedTicket;
        });

        // setResolved(true)
      //   setDisabled(true)
      //   setChats([])
      }
      else{
        toast.error(data.message)
      }
    })
    .catch((error)=>{
      console.error("Error updating ticket status:", error);
    })
  }

  const handleResolveCancel=()=>{
    setSelected("")
    setShowStatusPopup(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {!disabledUi ? (
          <img src={pic} alt="Profile pic" />
        ) : (
          <div className={styles.profileCircle}></div>
        )}

        <h3>Chat</h3>
      </div>
      <div className={styles.details}>
        <h4>Details</h4>
        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <img src={profile} alt="Profile" />
            <p>{ticket?.customer?.name}</p>
          </div>
          <div className={styles.info}>
            <img src={tel} alt="Tel" />
            <p>{ticket?.customer.phone}</p>
          </div>
          <div className={styles.info}>
            <img src={mail} alt="Mail" />
            <p>{ticket?.customer?.email}</p>
          </div>
        </div>
      </div>
      <div className={styles.teammates}>
        <h4>Team Member</h4>
        <div className={styles.ticketStatus}>
          <CustomDropdown
            members={members}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            setShowMemberPopup={setShowMemberPopup}
          />
          {  
          showMemberPopup ? (
            <AssignedPopup
              message={"Chat would be assigned to Different team member"}
              handleClick={handleReassign}
              setShowPopup={setShowMemberPopup}
              showPopup={showMemberPopup}
              handleCancel={handleAssignCancel}
            />
          ) : (
            <></>
          )}
          <select
            className={styles.status}
            value={selected}
            onChange={handleStatus}
            disabled={disabledUi}
            style={
              showIcon
                ? {
                    backgroundImage: `url("${ticketIcon}"), url("${dropdown}")`,
                    backgroundRepeat: "no-repeat, no-repeat",
                    backgroundPosition:
                      "0.5rem center, calc(100% - 10px) center",
                    backgroundSize: "1.2rem, 0.7vw",
                    padding: "10px 2.5rem 10px 2.7rem",
                    width: "100%",
                    borderRadius: "10px",
                    outline: "none",
                    border: "2px solid #ccc",
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    color: "#808080",
                    fontWeight: "500",
                    fontFamily: "'Inter',sans-serif",
                  }
                : {
                    padding: "10px",
                    width: "100%",
                    borderRadius: "10px",
                    outline: "none",
                    border: "2px solid #ccc",
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    color: "#808080",
                    fontWeight: "500",
                    fontFamily: "'Inter',sans-serif",
                  }
            }
          >
            <option value="" disabled hidden>
              Ticket Status
            </option>
            <option value="resolved">Resolved</option>
            <option value="unresolved">Unresolved</option>
          </select>

          {showStatusPopup ? (
            <AssignedPopup
              message={"Chat will be closed"}
              setShowPopup={setShowStatusPopup}
              showPopup={showStatusPopup}
              handleClick={handleResolve}
              handleCancel={handleResolveCancel}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
