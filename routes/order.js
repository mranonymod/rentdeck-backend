const router = require('express').Router();

const {
    addRentalItems,getOrderById , getMyOrders ,getMyCart , updateOrderToPaid, updateOrderToDelivered, updateOrderToReturned,getOrders
}=require('../controllers/ordersC.js')
const { tkCheck, admin } =require('../middleware/authMiddleware.js')

router.route('/').post(tkCheck, addRentalItems).get(tkCheck, admin,getOrders)
router.route('/myorders').get(tkCheck, getMyOrders)
router.route('/mycart').get(tkCheck, getMyCart)
router.route('/:id').get(tkCheck, getOrderById)
router.route('/:id/pay').post(tkCheck, updateOrderToPaid)
router.route('/:id/deliver').put(tkCheck, admin, updateOrderToDelivered)
router.route('/:id/return').put(tkCheck, admin, updateOrderToReturned)

module.exports=router