const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    title: { type: String, required: true },

    customer: {
      name: { type: String, required:true},   
      email: { type: String, required:true },
      phone: { type: String, required:true }
    },
  
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["resolved", "unresolved"], default: "unresolved" },
    ticketId: { type: String},
    createdAt: { type: Date, default: Date.now },

    isMissed: { type: Boolean, default: false },
  });
  
  const Ticket = mongoose.model("Ticket", ticketSchema);
  module.exports = Ticket;