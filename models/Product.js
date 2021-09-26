const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        title : {type : String , required : true ,unique : true},
        desObj : { type: Object , required : true} ,
        img  : {type : String , required : true} ,
        typeOf : {type : String , required : true} ,
        categories : { type: Array} ,
        rentalrate : {type : Number , required : true} ,
        condition : { type : String } ,
        countInStock: {
            type: Number,
            required: true,
            default: 0,
          },

    } ,
    { timestamps : true }
);

module.exports=mongoose.model("Product", ProductSchema)