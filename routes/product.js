const router = require('express').Router();
const { getProducts , getProductById , searchProductbyTitle} = require('../controllers/productsC.js')
//GET ALL PROUDUCTS
router.route('/').get(getProducts)

router.route('/s').get(searchProductbyTitle)


router.route('/:id').get(getProductById)


module.exports=router