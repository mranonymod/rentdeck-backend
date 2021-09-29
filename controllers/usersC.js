const asyncHandler=require('express-async-handler')
const genTk =require('../utils/genTk')
const User =require('../models/User')
const bcrypt = require("bcryptjs");

// REGISTER allowed for everyone
const registerUser =asyncHandler(async (req,res)=>{
    console.log(req.body)
    const { username, email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
    
        const newUsr = new User({
            username ,
            password ,
            email 
        })
        bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
          if (err) throw err;
          newUsr.password = hash;
          newUsr.save()
              .then(response => {
                 res.status(200).json({success: true,
                   result: response
                 })
              })
              .catch(err => {
                res.status(500).json({
                   errors: [{ error: err }]
                });
             });
          });
        
})
})

//LOGIN allowed for everyone
const loginUser = asyncHandler(async(req ,res)=>
{  const {username , password} = req.body
console.log(username , password)
    const usr = await User.findOne({username : username});
   
    if(usr){
      const check = await bcrypt.compare(password, usr.password);
      
      if(check)
      {
        const {pass , ...snd} = usr._doc
        res.json({...snd,
          token: genTk(usr._id),
        })
      } }else {
        res.status(401)
        throw new Error('Invalid email or password')
      }})

//  get profile of the user for user

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
      res.json({
        _id: user._id,
        name: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })

//update user profile for user
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
      user.username = req.body.username || user.username
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = req.body.password
      }
  
      const updUser = await user.save()
  
      res.json({
        _id: updUser._id,
        name: updUser.username,
        email: updUser.email,
        isAdmin: updUser.isAdmin,
        token: genTk(updUser._id),
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
  
 //get all users for admin
  const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
  })
  
// delete user by id for admin
  const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
      await user.remove()
      res.json({ message: 'User removed' })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
  
//get a user by id for admin
  const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
  
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
  
//update user by admin
  const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin
  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })

module.exports={registerUser , loginUser , getUserProfile , updateUserProfile , getUsers , deleteUser , getUserById , updateUser}