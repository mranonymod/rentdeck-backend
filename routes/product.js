const router = require('express').Router();
const { getProducts , getProductById} = require('../controllers/productsC.js')
//GET ALL PROUDUCTS
router.route('/').get(getProducts)

router.route('/:id').get(getProductById)


module.exports=router