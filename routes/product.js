const router = require('express').Router();
const { getProducts , getProductById , searchProductbyTitle , getTopProducts , getByCategories} = require('../controllers/productsC.js')
//GET ALL PROUDUCTS
router.route('/').get(getProducts)

router.route('/s').get(searchProductbyTitle)

router.route('/categories').post(getByCategories)

router.route('/:id').post(getProductById)


module.exports=router