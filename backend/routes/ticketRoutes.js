const express = require('express')
const {createTicketFromChat,updateTicketStatus,reassignTicket,getTickets,getTicketStatus,getMissedChatsPerWeek} =require('../controllers/ticketController')
const {protect,isAdmin} =require('../middlewares/authMiddlewares')

const router = express.Router();

router.post("/", createTicketFromChat);
router.put("/:ticketId/status", protect, updateTicketStatus);
router.put("/:ticketId/reassign",protect,isAdmin,reassignTicket)
router.get("/",protect,getTickets)
router.get("/:id/status",getTicketStatus)

module.exports =router