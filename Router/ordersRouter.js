const express = require('express');

const { addOrder, getAllOrders, takeAllOrders, getPendingOrders, getPendingOrdersHistory, getDeliveredOrders, getDeliveredOrdersHistory, updateStatus, DeleteOrder } = require('../Controller/orderController');

router = express.Router();

router.get('/all', getAllOrders);
router.get('/allOrders', takeAllOrders);
router.get('/processing', getPendingOrders);
router.get('/processing/:mobile', getPendingOrdersHistory);
router.get('/delivered', getDeliveredOrders);
router.delete('/delivered/:id', DeleteOrder);
router.get('/delivered/:mobile', getDeliveredOrdersHistory);
router.put('/processing/:id', updateStatus);
router.delete('/processing/:id', DeleteOrder);
router.post('/', addOrder);

module.exports = router;