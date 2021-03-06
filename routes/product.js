const router = require('express').Router();
const { getProducts , getProductById , searchProductbyTitle , getTopProducts , getByCategories,someProducts} = require('../controllers/productsC.js')
//GET ALL PROUDUCTS
router.route('/').get(getProducts)

router.route('/some?:n').get(someProducts)

router.route('/s?:q').get(searchProductbyTitle)

router.route('/categories').post(getByCategories)

router.route('/id/:id').get(getProductById)


module.exports=router