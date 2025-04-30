const express =require( "express");
const { sendMessage, getMessages } =require( "../controllers/messageController.js");

const router = express.Router();

router.post("/:ticketId/send", sendMessage);

router.get("/:ticketId", getMessages);

module.exports=router