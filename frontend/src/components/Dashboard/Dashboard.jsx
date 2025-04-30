import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import searchIcon from "../../assets/Dashboard/search.svg";
import sms from "../../assets/Dashboard/sms.svg";
import TicketCard from "../TicketCard/TicketCard";
import { getTickets } from "../../services";
import { toast } from "react-toastify";
export default function Dashboard() {


  const [tickets, setTickets] = useState([]);
  const [searchedTickets, setSearchedTickets] = useState([]);
  const [filterTickets, setFilterTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    getTickets("")
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setTickets(data.tickets);
          setSearchedTickets(data.tickets);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchedTickets(tickets);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = tickets.filter(
        (ticket) =>
          ticket?.customer.name.toLowerCase().includes(query) ||
            ticket?.customer.email.toLowerCase().includes(query) ||
            ticket?.customer.phone.includes(query) ||
            ticket.title.toLowerCase().includes(query) ||
            ticket._id?.toLowerCase().includes(query) ||
            ticket.ticketId?.toLowerCase().includes(query)
      );
      setSearchedTickets(filtered);
    }
  }, [searchQuery, tickets]);


  useEffect(() => {
    if (activeTab === "all") {
      setFilterTickets(searchedTickets);
    } else {
      setFilterTickets(
        searchedTickets.filter((ticket) => ticket.status === activeTab)
      );
    }
  }, [activeTab, searchedTickets]);

 
  return (
    <section className={styles.dashboard}>
      <h2 className={styles.header}>Dashboard</h2>
      <div className={styles.searchBar}>
        <img src={searchIcon} alt="Search" />
        <input
          type="text"
          placeholder="Search for ticket"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${
            activeTab === "all" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("all")}
        >
          <img src={sms} alt="SMS" />
          All Tickets
        </div>
        <div
          className={`${styles.tab} ${
            activeTab === "resolved" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("resolved")}
        >
          Resolved
        </div>
        <div
          className={`${styles.tab} ${
            activeTab === "unresolved" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("unresolved")}
        >
          Unresolved
        </div>
      </div>

      <div className={styles.ticketList}>
        {filterTickets.map((ticket, index) => (
          <TicketCard item={ticket} key={index} />
        ))}
      </div>
    </section>
  );
}