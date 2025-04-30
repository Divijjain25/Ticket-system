import React from 'react'
import styles from './Popup.module.css'
import { deleteMember } from '../../services/index';
import { toast } from 'react-toastify';
export function AssignedPopup({message,showPopup,setShowPopup,handleClick,handleCancel}) {
  return (
    <div className={styles.container}>
        <h4>{message}</h4>
        <div className={styles.buttons}>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleClick}>Confirm</button>
        </div>
    </div>
  )
}


export function DeletePopup({showPopup,setShowPopup,id,onDeleteMember}) {

  const handleDelete=(e)=>{
    e.preventDefault();

    deleteMember(id)
    .then(async(response)=>{
        const data=await response.json()

        if(response.ok){
          setShowPopup(false)
          onDeleteMember(id)
          toast.success(data.message)
        }
        else{
          toast.error(data.message)
        }
    })
    .catch((error)=>{
      console.error(error);
      toast.error(data.message)
    })
  }

  return (
    <div className={styles.container}>
        <h4>This teammate will be deleted</h4>
        <div className={styles.buttons}>
            <button onClick={()=>setShowPopup(false)}>Cancel</button>
            <button onClick={handleDelete}>Confirm</button>
        </div>
    </div>
  )
}
