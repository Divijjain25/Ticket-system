import React, { useState } from "react";
import admin from "../../assets/ContactCenter/admin.svg";
import editBtn from "../../assets/Teams/edit.svg";
import deleteBtn from "../../assets/Teams/delete.svg";
import styles from "./TeamRow.module.css";
import {DeletePopup} from "../Popup/Popup";
import { EditMemberModal } from "../TeamModal/TeamModal";
export default function TeamRow({team, openEditModal, setOpenEditModal,member,setMember,onDeleteMember}) {
  const [openPopup, setOpenPopup] = useState(false);

  const handleEdit=(e)=>{
    e.preventDefault();
    setMember(team)
    setOpenEditModal(true)
  }

  return (
    <div className={styles.contentBodyRow}>
      <ul className={styles.data}>
        <li style={{width:"7vw"}}>
          <img src={admin} alt="Admin Pic"  />
        </li>
        <li>{team.firstName} {team.lastName}</li>
        <li>+1 (000) 000-0000</li>
        <li>{team.email}</li>
        <li>{team.role}</li>
      </ul>
      <div className={styles.btns}>
        <img src={editBtn} alt="Edit button" onClick={handleEdit} />
        <img
          src={deleteBtn}
          onClick={() => setOpenPopup(true)}
          alt="Delete button"
        />
      </div>
      {openPopup ? (
        
          <DeletePopup
            id={team._id}
            showPopup={openPopup}
            setShowPopup={setOpenPopup}
            onDeleteMember={onDeleteMember}
          />
        
      ) : (
        <></>
      )}
    </div>
  );
}
