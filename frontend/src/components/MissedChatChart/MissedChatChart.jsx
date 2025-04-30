import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getWeeklyMissedChatUpdate } from "../../services";

const MissedChatChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
   getWeeklyMissedChatUpdate()
      .then(async(response) => {
        const data =await response.json()
        if(response.ok){
        const formattedData = data.missedChats.map(item => ({
          week: `Week ${item._id.week}, ${item._id.year}`,
          missedChats: item.missedCount
        }));
        setData(formattedData);
    }
      })
      .catch((error)=>{
        console.error(error);
        
      })
  }, []);

  return (
    <ResponsiveContainer width="80%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="missedChats" stroke="#00D907" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MissedChatChart;