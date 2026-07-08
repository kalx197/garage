const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, orderController.placeOrder);
router.get('/', verifyToken, orderController.getMyOrders);

module.exports = router;
