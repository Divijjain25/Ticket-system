import React, { useEffect, useState } from "react";
import styles from "./Teams.module.css";
import TeamRow from "../TeamRow/TeamRow";
import addBtn from "../../assets/Teams/addbtn.svg";
import { AddMemberModal, EditMemberModal } from "../TeamModal/TeamModal";
import { getAllMembers } from "../../services/index";
import { toast } from "react-toastify";

export default function Teams() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [teams, setTeams] = useState([]);
  const [member, setMember] = useState();
  useEffect(() => {
    getAllMembers()
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setTeams(data.teams);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
        toast.error(data.message);
      });
  }, []);

  const handleAddMember = (newMember) => {
    setTeams((prev) => [...prev, newMember]);
  };

  const handleEditMember = (updatedMember) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team._id === updatedMember._id ? updatedMember : team
      )
    );
  };
  
  const handleDeleteMember = (deletedMemberId) => {
    setTeams((prevTeams) => prevTeams.filter((team) => team._id !== deletedMemberId));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Team</h2>
      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <ul className={styles.contentHeaderRow}>
            <li style={{width:"7vw"}}></li>
            <li>Full Name</li>
            <li>Phone</li>
            <li>Email</li>
            <li>Role</li>
          </ul>
        </div>
        <div className={styles.contentBody}>
          {teams.map((team, index) => (
            <TeamRow
              team={team}
              openEditModal={openEditModal}
              setOpenEditModal={setOpenEditModal}
              member={member}
              setMember={setMember}
              onDeleteMember={handleDeleteMember}
              key={index}
            />
          ))}
        </div>
        <div className={styles.btn}>
          <button
            onClick={() => setOpenAddModal(true)}
            style={{
              backgroundColor:
                localStorage.getItem("role") == "member" ? "grey" : "#184e7f",
            }}
            disabled={localStorage.getItem("role") == "member" ? true : false}
          >
            <img src={addBtn} alt="" />
            <span>Add team members</span>
          </button>
        </div>
      </div>
      {openAddModal ? (
        <AddMemberModal
          openAddModal={openAddModal}
          setOpenAddModal={setOpenAddModal}
          onAddMember={handleAddMember}
        />
      ) : (
        <></>
      )}

      {openEditModal ? (
        <EditMemberModal
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          member={member}
          onEditMember={handleEditMember}
        />
      ) : (
        <></>
      )}
    </div>
  );
}