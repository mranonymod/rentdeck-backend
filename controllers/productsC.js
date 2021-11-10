const Product = require('../models/Product.js')
const asyncHandler =require('express-async-handler')

const getProducts = asyncHandler( async(req , res) => {
      const items = await Product.aggregate([{$sample : { size : 20}} , {$match : {countInStock : { $gte : 1} } } ] );
      if (items.length==0) 
      { res.status(404); throw Error('No items');}
      else{
      res.json(items)}
    })
const someProducts = asyncHandler( async(req , res) => {
  console.log("SOME PRODUCTS FETCHED")
      const items = await Product.aggregate([{$sample : { size : parseInt(req.query.n)}}, {$match : {countInStock : { $gte : 1} } }]);
      if (items.length==0) 
      { res.status(404); throw Error('No items');}
      else{
      res.json(items)}
    })

const getProductById = asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id)
        console.log("PRODUCT FETCHED BY ID")
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

const searchProductbyTitle= asyncHandler(async(req,res)=>{
  console.log("PRODUCT SEARCHED BY TITLE")
  const products = await Product.find({title : {$regex : req.query.q , $options : "i"}})
  if (!products.length==0) {
    res.json(products)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const getByCategories = asyncHandler(async(req,res)=>{

  const cat = req.body.categories
  console.log("PRODUCTS BROWSED BY CATEGORIES")
  if (!cat) {
    const items = await Product.find();
    if (items.length==0) 
    { res.status(404); throw Error('No items');}
    else{
    res.json(items)}
}
else 
{ 
const prodCat=await Product.find({categories : {"$in" : cat} })
if (!prodCat.length==0) {
  res.json(prodCat)
} else {
  res.status(404)
  throw new Error('Product not found')
}
}}
)
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(10)

  res.json(products)
})

module.exports={
  getProducts,
  getProductById,
  createProductReview,
  getTopProducts,
  searchProductbyTitle,
  getByCategories,
  someProducts
}