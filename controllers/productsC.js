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