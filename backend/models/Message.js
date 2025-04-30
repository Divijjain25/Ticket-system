const mongoose=require('mongoose')

const messageSchema = new mongoose.Schema({
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true },
    senderType: { type: String, enum: ["customer", "system"], required: true },
    senderName: String,
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;