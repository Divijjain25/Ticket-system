const express = require('express')
const {getMissedChatsPerWeek,getAverageReplyTime,getTotalAndResolvedChats} =require('../controllers/analyticsController')
const {protect} =require('../middlewares/authMiddlewares')

const router = express.Router();

router.get("/missed-chats/weekly", protect, getMissedChatsPerWeek);
router.get("/average-reply-time",protect,getAverageReplyTime)
router.get("/ticket-stats",protect,getTotalAndResolvedChats)

module.exports=router