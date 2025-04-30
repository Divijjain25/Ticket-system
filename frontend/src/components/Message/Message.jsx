import React, { useContext } from 'react'
import styles from './Message.module.css'
import userPic from '../../assets/Dashboard/People.svg' 
import adminPic from "../../assets/ContactCenter/admin.svg"
import { TicketContext } from '../../contexts/TicketContext'
export default function Message({chat,currentMember,showImage}) {

  const{chatList,ticket} = useContext(TicketContext)
  const indexName = chatList.findIndex(item => item._id === ticket._id)

  return (
    <div className={`${styles.messageContainer} ${chat.senderType === 'system' ? styles.sendMessage : ''}`}>
    {showImage ? 
      <img
        src={chat.senderType === 'system' ? adminPic : userPic}
        alt="User Pic"
        className={styles.imgSpace}
      />
    :
    <div className={styles.imgSpace}></div>
    }
    <div className={`${styles.details} ${chat.senderType === 'system' ? styles.sendMessageDetails : ''}`}>

      {
          showImage?
          chat.senderType === 'system'
            ?<h5> {currentMember?.firstName} {currentMember?.lastName}</h5>
            : <h5>Chat {indexName+1}</h5>
            :""
      }
     
      <p>{chat.content}</p>
    </div>
  </div>
  )
}
