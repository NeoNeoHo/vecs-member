'use strict';

var _ = require('lodash');
var q = require('q');
var Customer = require('../api/customer/customer.controller.js');
var api_config = require('../config/api_config');
var schedule = require('node-schedule');
var Coupon = require('../api/coupon/coupon.controller.js');




// ###################  Accounting for Ezcat and Credit Card  ########################
// ####  ToDo: This section should be automatized 
// ####		   by linking ezcat's and credit card company's system
// ####################################################################################
// var accountingCrontab = schedule.scheduleJob({hour: 9, minute: 20}, function(){
// 	var lnow = moment();
// 	var ltoday = moment().format('YYYY-MM-DD');
// 	var lyesterday = lnow.subtract(1, 'days').format('YYYY-MM-DD');
// 	var l_7_DaysBefore = lnow.subtract(6, 'days').format('YYYY-MM-DD');
// 	accounting.checkCreditCard(lyesterday);
// 	accounting.checkEzcat(l_7_DaysBefore);
// });


// ###################  DB Customer to MailChimp Integration ######################
// ####
// ####
// ################################################################################

// var _CUSTOMER_ID_ = 10000;
// Customer.getLatestCustomer().then(function(rows) {
// 	var result = rows[0] || rows;
// 	_CUSTOMER_ID_ = result.customer_id;
// }, function(err) {
// 	console.log(err);
// });
// var customer_update_rule = new schedule.RecurrenceRule();
// customer_update_rule.minute = new schedule.Range(0, 59, 1);
// var syncCustomer2MailChimp = schedule.scheduleJob(customer_update_rule, function() {
// 	customer.getNewerCustomer(_CUSTOMER_ID_).then(function(rows) {
		
// 	}, function(err) {

// 	});
// });



