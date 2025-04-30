const mongoose = require("mongoose")

const settingsSchema = new mongoose.Schema({
  headerColor: { type: String, default: "#33475b" },
  backgroundColor: { type: String, default: "#eee" },
  defaultMessages: { type: [String], default: ["How can I help you?", "Ask me anything!"] },
  welcomeMessage: { type: String, default: "👋 Want to chat about Hubly? I'm a chatbot here to help you find your way." },
  missedChatTimerInSeconds: { type: Number, default: 300 }, // 5 minutes = 300 seconds
  formPlaceholders: {
    name: { type: String, default: "Your name" },
    email: { type: String, default: "example@gmail.com" },
    phone: { type: String, default: "+1 (000) 000-0000" },
  }
}, { timestamps: true });

const Settings=mongoose.model("Settings", settingsSchema);
module.exports=Settings