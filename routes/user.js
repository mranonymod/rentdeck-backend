const router = require('express').Router();
const { tkCheck, admin } = require('../middleware/authMiddleware')
const {registerUser,loginUser , getUserProfile ,updateUserProfile ,getUsers , deleteUser , getUserById , updateUser} =require('../controllers/usersC')
//REGISTER
router.route('/').post(registerUser).get(tkCheck, admin).get(tkCheck, admin ,getUsers)

//LOGIN

router.post('/login',loginUser)
//
router.route('/profile').get(tkCheck, getUserProfile).put(tkCheck, updateUserProfile)
//
router
  .route('/:id')
  .delete(tkCheck, admin, deleteUser)
  .get(tkCheck, admin, getUserById)
  .put(tkCheck, admin, updateUser)

module.exports=router
