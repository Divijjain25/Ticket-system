const {signup,login} = require('../controllers/authController')
const {protect} = require('../middlewares/authMiddlewares')
const express = require('express')
const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)


module.exports = router