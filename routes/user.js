const router = require('express').Router();
const { tkCheck, admin } = require('../middleware/authMiddleware')
const {registerUser,loginUser , getUserProfile ,updateUserProfile} =require('../controllers/usersC')
//REGISTER
router.route('/').post(registerUser).get(tkCheck, admin).get(tkCheck, admin)

//LOGIN

router.post('/login',loginUser)
//
router.route('/profile').get(tkCheck, getUserProfile).put(tkCheck, updateUserProfile)
//

module.exports=router