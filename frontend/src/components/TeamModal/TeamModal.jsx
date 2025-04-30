import React, { useState } from "react";
import styles from "./TeamModal.module.css";
import { addMember, editMember } from "../../services/index";
import { toast } from "react-toastify";

//Add member
export function AddMemberModal({ openAddModal, setOpenAddModal, onAddMember }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "member",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMember(formData)
      .then(async (response) => {
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          onAddMember(data.member);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            role: "member",
          });
          setOpenAddModal(false);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(data.message || "Internal Server Error");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Add Team members</h3>
        <p>
          Talk with colleagues in a group chat. Messages in this group are only
          visible to it's participants. New teammates may only be invited by the
          administrators.
        </p>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email ID</label>
            <input
              type="text"
              name="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="role">Designation</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className={styles.btns}>
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenAddModal(false);
              }}
            >
              Cancel
            </button>
            <button onClick={handleSubmit}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

//Edit Member
export function EditMemberModal({ openEditModal, setOpenEditModal,member,onEditMember}) {
  const[formData,setFormData]=useState(member)

  const handleChange=(e)=>{
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
  
      const updatedFields = {};
  
      if (formData.firstName !== member.firstName) {
        updatedFields.firstName = formData.firstName;
      }
  
      if (formData.lastName !== member.lastName) {
        updatedFields.lastName = formData.lastName;
      }
  
      if (formData.email !== member.email) {
        updatedFields.email = formData.email;
      }
      
      if (formData.role !== member.role) {
        updatedFields.role = formData.role;
      }
      
      if (Object.keys(updatedFields).length === 0) {
        toast.info("No changes made");
        return;
      }
  
      try {
        const response = await editMember(updatedFields,member._id);
        const data = await response.json();
        console.log(data);
        
        if (response.ok) {
          setFormData({firstName:"",lastName:"",email:"",role:""})
          onEditMember(data.user)
          setOpenEditModal(false)
          toast.success(data.message || "Member details updated");
        } else {
          toast.error(data.message || "Failed to update member details");
        }
      } catch (error) {
        console.error("Member details update error:", error);
        toast.error("Something went wrong. Please try again.");
      }
    };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Edit Team member</h3>
        <p>
          Talk with colleagues in a group chat. Messages in this group are only
          visible to it's participants. New teammates may only be invited by the
          administrators.
        </p>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email ID</label>
            <input type="text" placeholder="Email ID" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="role">Designation</label>
            <select value={formData.role} name="role" onChange={handleChange}>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className={styles.btns}>
            <button onClick={() => setOpenEditModal(false)}>Cancel</button>
            <button onClick={handleSubmit}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
