const {getProfile,updateProfile} = require('../controllers/profileController')
const {protect} = require('../middlewares/authMiddlewares')
const express = require('express')
const router = express.Router()

router.get('/',protect,getProfile)
router.put('/',protect,updateProfile)

module.exports=router