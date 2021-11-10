const asyncHandler = require( 'express-async-handler')
const { create } = require('../models/Order.js')
const Order = require( '../models/Order.js')
const Razorpay = require("razorpay");

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addRentalItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
    deposit,
    duration
  } = req.body
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return } 
  else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      deposit,
      duration
    })  
    const createdOrder = await order.save()
    console.log("ORDER CREATED")
    res.status(201).json(createdOrder)}


})

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    )
    console.log("ORDER FETCHED BY ID")
    if (order) {
      res.json(order)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })

const getMyOrders = asyncHandler(async (req, res) => {
  console.log("ALL ORDERS FOR USER FETCHED")
  const orders = await Order.find({user : req.user._id})
  if (orders) {
      res.json(orders)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
})
const getMyCart = asyncHandler(async (req, res) => {
  console.log("cart")
  const orders = await Order.findOne({ user: req.user._id , placed : false })
  if (orders) {
      res.json(orders)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
})
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      }
      const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
const razorPay = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
  var razorpayInstance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });
  razorpayInstance.orders.create(
    {
      amount: parseInt(order.totalPrice),
      currency: "INR",
      receipt: order._id,
    },
    (err, order) => {
      if (err) return console.log(err);
      res.json(order);
    }
  );
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  const {deliveredAt , toBeReturnedAt}=req.body
  if (order) {
    order.isDelivered=true
    order.deliveredAt=deliveredAt
    order.toBeReturnedAt=toBeReturnedAt
    

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
const updateOrderToReturned = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  console.log(req.body)
  const {returnedAt}=req.body
  if (order) {
    order.isReturned = true
    order.returnedAt = returnedAt
    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})



  module.exports={addRentalItems,getOrderById , getMyOrders ,getMyCart ,updateOrderToPaid, updateOrderToDelivered, updateOrderToReturned, getOrders , razorPay}
