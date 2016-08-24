'use strict';

angular.module('webApp')
	.factory('Config', function ($q, $http) {
		var DIR_IMAGE_PATH = 'https://www.vecsgardenia.com/image';

		// var DIR_COOKIES = 'vecsgardenia.com.tw';
		// var DIR_COOKIES = '61.220.72.50';
		var DIR_COOKIES = 'localhost';

		var DIR_DOMAIN = 'http://' + DIR_COOKIES;
		
		// var DIR_NODE_SUBDOMAIN = 'https://love.' + DIR_COOKIES;
		var DIR_NODE_SUBDOMAIN = 'http:' + DIR_COOKIES + ':9001';
		
		

		var SHIPPING_FEE = {
			EZSHIP: 60,
			HOME: 90,
			OVERSEAS: 350,
		};

		var FREE_SHIPPING_CONDICTION = {
			EZSHIP: 1200,
			HOME: 1200,
			OVERSEAS: 5000
		};

		var PAYMENT_NAME = {
			store_pay: '超商付現',
			hand_pay: '貨到付款',
			credit_pay: '信用卡'
		};

		var SHIPPING_NAME = {
			ship_to_home: '送貨到府',
			ship_to_overseas: '海外配送',
			ship_to_store: '超商取貨'
		};

		var ORDER_STATUS_def = {
			_created: [54, 55, 57, 58, 60],
			_shipped: [20, 28, 32, 42],
			_received: [21, 29, 34],
			_failed: [10, 50, 51, 52, 53, 56, 59],
			_returned: [45, 46]
		};

		// Public API here
		return {
			DIR_IMAGE_PATH: DIR_IMAGE_PATH,
			DIR_COOKIES: DIR_COOKIES,
			DIR_DOMAIN: DIR_DOMAIN,
			DIR_NODE_SUBDOMAIN: DIR_NODE_SUBDOMAIN,
			SHIPPING_FEE: SHIPPING_FEE,
			FREE_SHIPPING_CONDICTION: FREE_SHIPPING_CONDICTION,
			PAYMENT_NAME: PAYMENT_NAME,
			SHIPPING_NAME: SHIPPING_NAME,
			ORDER_STATUS_def: ORDER_STATUS_def
		};
	});
