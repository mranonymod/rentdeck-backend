const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String},
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )

const ProductSchema = new mongoose.Schema(
    {
        title : {type : String , required : true ,unique : true},
        desObj : { type: Object , required : true} ,
        images  : {type : [String] , required : true} ,
        categories : {type : String , required : true} ,
        tags :[ {type: String}] ,
        rentalrate : {type : Number , required : true} ,
        condition : { type : String } ,
        countInStock: {
            type: Number,
            required: true,
            default: 0,
          },
        reviews: [reviewSchema],
        rating: {
            type: Number,
            required: true,
            default: 0,
          },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
          },

    } ,
    { timestamps : true }
);


module.exports=mongoose.model("Product", ProductSchema)