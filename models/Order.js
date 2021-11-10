const mongoose = require("mongoose")

const   OrderSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      }, 
      placed : { type : Boolean , required : true , default : false} ,
        orderItems: [
          { qty: { type: Number, required: true },
            product: {
              type: mongoose.Schema.Types.ObjectId,
              required: true,
              ref: 'Product',
            },
          }
        ] ,
        shippingPrice : {
            type: Number,
            required: true,
            default: 0.0,
          },
        deposit: {
            type: Number,
            required: true,
            default: 0.0},
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0},

        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
              },

        paymentMethod: {
            type: String,
            required: true,
              },

        paymentResult: {
          id: { type: String },
          status: { type: String },
          update_time: { type: String },
          email_address: { type: String },
              },
              
        isPaid: {
          type: Boolean,
          required: true,
          default: false,
              },
        paidAt: {
          type: Date,
              },
        isDelivered: {
          type: Boolean,
          required: true,
          default: false,
        },
        deliveredAt: {
                type: Date,
              },

        isReturned: {
                type: Boolean,
                required: true,
                default: false,
              },
        duration :{
          type : Number,
          required:true,
          default : 1,
        },
        toBeReturnedAt: {
                type: Date,
              },

    } ,
    { timestamps : true }
);

module.exports=mongoose.model("Order", OrderSchema)
{/* name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true }, */}