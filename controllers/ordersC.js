import asyncHandler from 'express-async-handler'
import Order from '../models/Order.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addRentalItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    toBeReturnedAt
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
      taxPrice,
      shippingPrice,
      totalPrice,
      toBeReturnedAt
    })  
    const createdOrder = await order.save()

    res.status(201).json(createdOrder)}


})

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    )
    if (order) {
      res.json(order)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })
//update user by admin
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered=req.body.isDelivered || order.isDelivered
    if(req.body.isDelivered)
    {order.deliveredAt=Date.now()}
    order.isReturned=req.body.isReturned || order.isReturned
    const updatedOrder = await order.save()
    res.json({
      _id: updatedOrder._id
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
  
  module.exports={addRentalItems,getOrderById}
