const Message = require("../models/Message.js");
const Ticket = require("../models/Ticket.js");

const sendMessage = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { senderType, senderName, content } = req.body;

    if (!senderType || !senderName || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    const newMessage = await Message.create({
      ticket: ticket._id,
      senderType,
      senderName,
      content,
    });

    res.status(201).json({ message: "Message sent", newMessage });
  } catch (err) {
    console.error("Send Message Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const messages = await Message.find({ ticket: ticketId }).sort({
      createdAt: -1, 
    });
    res.status(200).json({ messages });
  } catch (err) {
    console.error("Get Messages Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { sendMessage, getMessages };
