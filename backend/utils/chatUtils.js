const Ticket = require('../models/Ticket');
const Message = require('../models/Message');
const Settings = require('../models/Settings')
const checkAndMarkMissedChats = async () => {

  const settings = await Settings.findOne();
  const missedChatTimerInSeconds = settings.missedChatTimerInSeconds;

  const tickets = await Ticket.find({ isMissed: false }); 

  for (const ticket of tickets) {
    const currentTime = new Date();
    const ticketCreatedTime = ticket.createdAt;
    const secondsElapsed = Math.floor((currentTime - ticketCreatedTime) / 1000);

    if (secondsElapsed >= missedChatTimerInSeconds) {
      // Fetch messages
      const messages = await Message.find({ ticket: ticket._id }).sort({ createdAt: 1 });

      const adminMessages = messages.filter(
        (msg) => msg.senderType === 'system'
      );

      if (adminMessages.length === 2) {
        ticket.isMissed = true;
        await ticket.save();
      }
    }
  }
};

module.exports = { checkAndMarkMissedChats };