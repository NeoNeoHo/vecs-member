'use strict';

var express = require('express');
var controller = require('./referral.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/rc', auth.isAuthenticated(), controller.getRC);
router.get('/result', auth.isAuthenticated(), controller.getReferralResult);
router.post('/referral_list/', auth.isAuthenticated(), controller.isMailInvitedToday);

// router.put('/address', auth.isAuthenticated(), controller.updateAddress);


module.exports = router;
