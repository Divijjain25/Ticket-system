const {protect,isAdmin,isSuperAdmin} = require('../middlewares/authMiddlewares')
const {addMember,getAllMembers,getMember,deleteMember,updateMember} = require('../controllers/teamController')
const express = require('express')
const router = express.Router()

router.post('/',protect,isAdmin,addMember);
router.get('/',protect,getAllMembers);
router.get('/:id',protect,getMember);
router.delete('/:id',protect,isAdmin,isSuperAdmin,deleteMember);
router.put('/:id',protect,isAdmin,isSuperAdmin,updateMember)

module.exports = router