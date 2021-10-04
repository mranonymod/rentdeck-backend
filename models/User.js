const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        username : {type : String , required : true ,unique : true},
        googleId : {type : String},
        password : { type: String} ,
        email  : {type : String , required : true ,unique : true}  ,
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
          },
    } ,
    { timestamps : true }
);

module.exports=mongoose.model("User", UserSchema)