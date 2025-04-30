const Ticket= require('../models/Ticket')
const Message = require('../models/Message')

const getMissedChatsPerWeek = async (req, res) => {
    try {
      const missedChats = await Ticket.aggregate([
        { $match: { isMissed: true } }, // only missed chats
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              week: { $isoWeek: "$createdAt" }
            },
            missedCount: { $sum: 1 }
          }
        },
        { $sort: { "_id.year": 1, "_id.week": 1 } }
      ]);
  
      res.status(200).json({ message:"Missed chats per week data achieved",missedChats:missedChats });
    } catch (err) {
      console.error("Missed Chats Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const getAverageReplyTime = async (req, res) => {
    try {
      const tickets = await Ticket.find({});
      let totalReplyTime = 0;
      let totalTicketsWithReply = 0;
  
      for (const ticket of tickets) {
        const messages = await Message.find({ ticket: ticket._id }).sort({ createdAt: 1 });
  
        
        const firstCustomerMessage = messages.find(m => m.senderType === "customer");
  
        if (!firstCustomerMessage) continue; // skip if no customer message
  
        
        const adminMessages = messages.filter(m => 
          ["system"].includes(m.senderType) && 
          m.createdAt > firstCustomerMessage.createdAt
        );
  
        
        const thirdAdminReply = adminMessages[2]; 
  
        if (thirdAdminReply) {
          const replyTimeSeconds = Math.floor((thirdAdminReply.createdAt - firstCustomerMessage.createdAt) / 1000);
  
          totalReplyTime += replyTimeSeconds;
          totalTicketsWithReply++;
        }
      }
  
      const averageReplyTime = totalTicketsWithReply > 0 
        ? Math.floor(totalReplyTime / totalTicketsWithReply) 
        : 0;
  
      res.status(200).json({ message:"Average reply time data achieved",averageReplyTimeInSeconds: averageReplyTime });
    } catch (err) {
      console.error("Get Average Reply Time Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const getTotalAndResolvedChats = async(req,res)=>{
    try {
        // Fetch total tickets
        const totalTickets = await Ticket.countDocuments();
    
        // Fetch total resolved tickets
        const resolvedTickets = await Ticket.countDocuments({ status: 'resolved' });
    
        // Calculate percentage of resolved tickets
        let resolvedPercentage = 0;
        if (totalTickets > 0) {
          resolvedPercentage = Math.round((resolvedTickets / totalTickets) * 100);
        }
    
        // Return the stats
        res.status(200).json({
          message:"Total Chats and resolved chats achieved",
          totalTickets,
          resolvedTickets,
          resolvedPercentage
        });
      } catch (err) {
        console.error("Error fetching ticket stats:", err);
        res.status(500).json({ message: "Internal Server Error" });
      }
  }

  module.exports={getMissedChatsPerWeek,getAverageReplyTime,getTotalAndResolvedChats}