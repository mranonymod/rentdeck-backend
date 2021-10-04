const router = require('express').Router();

import {
    addRentalItems,getOrderById , getMyOrders ,updateOrderToPaid, updateOrderToDelivered, updateOrderToReturned
} from '../controllers/orderController.js'
import { tkCheck, admin } from '../middleware/authMiddleware.js'

router.route('/').post(tkCheck, addRentalItems).get(tkCheck, admin)
router.route('/myorders').get(tkCheck, getMyOrders)
router.route('/:id').get(tkCheck, getOrderById)
router.route('/:id/pay').put(tkCheck, updateOrderToPaid)
router.route('/:id/deliver').put(tkCheck, admin, updateOrderToDelivered)
router.route('/:id/return').put(tkCheck, admin, updateOrderToReturned)

module.exports=router