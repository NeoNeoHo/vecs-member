'use strict';

var express = require('express');
var controller = require('./order.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/order/:order_id', auth.isAuthenticated(), controller.getOrder);
router.get('/order/', auth.hasRole('user'), controller.getOrders);
router.get('/orderProducts/:order_id', auth.isAuthenticated(), controller.getOrderProducts);
router.get('/orderReviewProducts/:order_id', auth.hasRole('mail'), controller.getOrderReviewProducts);
router.post('/order/', auth.isAuthenticated(), controller.create);
router.post('/orderHistory/', auth.isAuthenticated(), controller.insertOrderHistory);
router.put('/order/:order_id', auth.isAuthenticated(), controller.updateOrder);
// router.delete('/orderResidual/:order_id', auth.isAuthenticated(), controller.deleteOrderResidual);

module.exports = router;
