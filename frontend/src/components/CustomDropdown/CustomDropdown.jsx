import { useContext, useEffect, useState } from "react";
import styles from "./CustomDropdown.module.css";
import admin from "../../assets/ContactCenter/admin.svg";
import teamLogo from '../../assets/Sidebar/teams.svg'
import dropdown from "../../assets/ContactCenter/dropdown.svg";
import { TicketContext } from "../../contexts/TicketContext";
export default function CustomDropdown({
  members,
  selectedUser,
  setSelectedUser,
  setShowMemberPopup,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const {ticket} = useContext(TicketContext)
  const [disableDropdown,setDisableDropdown] = useState(false)
  useEffect(() => {

    if(localStorage.getItem("user")!==ticket?.assignedTo){
      setDisableDropdown(true)
    }
    else if(ticket?.status==='resolved')
    {
      setDisableDropdown(true)
    }
    else if(localStorage.getItem("role")==="member"){
      setDisableDropdown(true)
    }
    else{
      setDisableDropdown(false)
    }
  }, [ticket?.status,ticket?._id,ticket?.assignedTo]);

  const toggleDropdown = () => {
    // console.log(disabled);
    disableDropdown?setIsOpen(false):setIsOpen(!isOpen)
    
  };
 

  const handleSelect = (member) => {
    setSelectedUser(member);
    setIsOpen(false);
    setShowMemberPopup(true);
  };

  return (
    <div className={styles.dropdown}>
      <div className={`${styles.selected} ${disableDropdown ? styles.disabled : ''}`} onClick={toggleDropdown}>
        <div>
          {
            !disableDropdown?<img src={admin} alt="admin pic" />:<img src={teamLogo} alt="disabled"  />
          }
          
          <span>
            {selectedUser?.firstName} {selectedUser?.lastName}
          </span>
        </div>
        <img src={dropdown} style={{ width: "0.7vw" }} alt="" />
      </div>

      {isOpen && (
        <ul className={styles.options}>
          {members.map((member,index) => (
            <li key={index} onClick={() => handleSelect(member)} >
              <img src={admin} />
              <span>
                {member?.firstName} {member?.lastName}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}