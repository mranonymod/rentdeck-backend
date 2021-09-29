const Product = require('../models/Product.js')
const asyncHandler =require('express-async-handler')

const getProducts = asyncHandler( async(req , res) => {
      const items = await Product.find();
      if (items.length==0) 
      { res.status(404); throw Error('No items');}
      else{
      console.log(items)
      res.json(items)}
    })

const getProductById = asyncHandler(async (req, res) => {
    console.log(typeof(req.params.id))
        const product = await Product.findById(req.params.id)
        
        if (product) {
          res.json(product)
        } else {
          res.status(404)
          throw new Error('Product not found')
        }
      })
module.exports={getProducts , getProductById}

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(10)

  res.json(products)
})

module.exports={
  getProducts,
  getProductById,
  createProductReview,
  getTopProducts,
}