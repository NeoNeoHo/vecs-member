'use strict';

var express = require('express');
var controller = require('./review.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:order_id', controller.getReview);
router.post('/', auth.hasRole('mail'), controller.addReview);
// router.put('/address', auth.isAuthenticated(), controller.updateAddress);


module.exports = router;
