const asyncHandler = require( 'express-async-handler')
const Order = require( '../models/Order.js')

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

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id , placed : true })
  res.json(orders)
})
const getMyCart = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id , placed : false })
  res.json(orders)
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
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
const updateOrderToReturned = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isReturned = true
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
  module.exports={addRentalItems,getOrderById , getMyOrders ,getMyCart ,updateOrderToPaid, updateOrderToDelivered, updateOrderToReturned, getOrders}
