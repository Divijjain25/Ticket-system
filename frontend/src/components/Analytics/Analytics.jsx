import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import MissedChatsChart from "../MissedChatChart/MissedChatChart";
import { getAverageReplyTime, getTotalAndResolvedChats } from "../../services";
import { toast } from "react-toastify";
import CircleProgress from "../CircleProgress/CircleProgress";
export default function Analytics() {

const [averageReplyTime,setAverageReplyTime]=useState(0)
const [chatStats,setChatStats] = useState({
  resolvedChatPercentage:0,
  totalChats:0
})

  useEffect(() => {
    getAverageReplyTime()
    .then(async(response)=>{
      const data= await response.json()
      if(response.ok){
        // console.log(data?.getAverageReplyTimeInSeconds);
        
        setAverageReplyTime(data?.averageReplyTimeInSeconds)
      }
      else{
        toast.error("Failed to get data")
      }

    })
    .catch((error)=>{
      console.error(error);
      toast.error("Internal Server Error")
    })
  }, []);


  useEffect(() => {
    getTotalAndResolvedChats()
    .then(async(response)=>{
      const data=await response.json();

      if(response.ok){
        setChatStats((prev)=>({...prev,resolvedChatPercentage:data.resolvedPercentage,totalChats:data.totalTickets}))
      }
      else{
        toast.error("Failed to get data")
      }
    })
    .catch((error)=>{
      console.error(error);
      toast.error("Internal Server Error")
      
    })
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Analytics</h2>
      <div className={styles.contents}>
        <div className={styles.content}>
          <h3>Missed Chats</h3>
          {/* <img src={reports} className={styles.report} alt="Report" /> */}
          <MissedChatsChart/>
        </div>
        <div className={styles.content}>
          <div className={styles.contentContainer}>
            <div className={styles.detailContent}>
              <h3>Average Reply Time</h3>
              <p>
                For highest customer satisfaction rates you should aim to reply
                to an incoming customer's message in 15 seconds or less. Quick
                responses will get you more conversations, help you earn
                customers trust and make more sales.
              </p>
            </div>
            <h4>{averageReplyTime} secs</h4>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.contentContainer}>
            <div className={styles.detailContent}>
              <h3>Resolved Chats</h3>
              <p>
                A callback system on a website, as well as proactive
                invitations, help to attract even more customers. A separate
                round button for ordering a call with a small animation helps to
                motivate more customers to make calls.
              </p>
            </div>
            {/* <img src={piechart} alt="" /> */}
            <CircleProgress percentage={chatStats.resolvedChatPercentage}/>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.contentContainer}>
            <div className={styles.detailContent}>
              <h3 style={{color:"#000"}}>Total Chats</h3>
              <p>
                This metric Shows the total number of chats for all Channels for
                the selected the selected period
              </p>
            </div>
            <h4>{chatStats.totalChats} Chats</h4>
          </div>
        </div>
      </div>
    </div>
  );
}