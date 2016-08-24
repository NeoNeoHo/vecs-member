'use strict';

angular.module('webApp')
	.factory('Order', function ($q, $http, Config) {

		var STATUS_def = Config.ORDER_STATUS_def;

		var getStatusLevel = function(order_status_id){
			var level = _.contains(STATUS_def._created, order_status_id) ? '_created' : '';
			level = _.contains(STATUS_def._shipped, order_status_id) ? '_shipped' : level;
			level = _.contains(STATUS_def._received, order_status_id) ? '_received' : level;
			level = _.contains(STATUS_def._failed, order_status_id) ? '_failed' : level;
			level = _.contains(STATUS_def._returned, order_status_id) ? '_returned' : level;
			return level;
		};

		var getOrderProducts = function(order_id) {
			var defer = $q.defer();
			$http.get('/api/orders/orderProducts/'+order_id)
			.then(function(result) {
				defer.resolve(result.data);
			}, function(err) {
				defer.reject(err);
			});
			return defer.promise;	
		};

		var getReviewOrderProducts = function(order_id) {
			var defer = $q.defer();
			$http.get('/api/orders/orderReviewProducts/'+order_id)
			.then(function(result) {
				defer.resolve(result.data);
			}, function(err) {
				defer.reject(err);
			});
			return defer.promise;	
		};

		var addReview = function(order_obj) {
			var defer = $q.defer();
			$http.post('/api/reviews/', order_obj)
			.then(function(result) {
				defer.resolve(result.data);
			}, function(err) {
				defer.reject(err);
			});
			return defer.promise;			
		}
		// Also Create its usage record of "Coupon", "Reward", "Voucher"
		// -----------------------
		var createOrder = function(cart, shipping_info) {
			var defer = $q.defer();
			$http.post('/api/orders/order/', {cart: cart, shipping_info: shipping_info})
			.then(function(result) {
				defer.resolve(result.data);
			}, function(err) {
				defer.reject(err);
			});
			return defer.promise;
		};

		var updateOrder = function(order_id, update_dict) {
			var defer = $q.defer();
			$http.put('/api/orders/order/'+order_id, {update_dict: update_dict})
			.then(function(result) {
				defer.resolve(result.data);
			}, function(err) {
				defer.reject(err);
			});
			return defer.promise;			
		};

		var insertOrderHistory = function(order_id, insert_dict) {
			var defer = $q.defer();
			$http.post('/api/orders/orderHistory/', {order_id: order_id, insert_dict: insert_dict})
			.then(function(result) {
				defer.resolve(result.data);
			}, function(err) {
				defer.reject(err);
			});
			return defer.promise;			
		};
		
		var getOrder = function(order_id) {
			var defer = $q.defer();
			$http.get('/api/orders/order/'+order_id)
			.then(function(result) {
				defer.resolve(result.data);
			}, function(err) {
				defer.reject(err);
			});
			return defer.promise;	
		};

		var getOrders = function() {
			var defer = $q.defer();
			$http.get('/api/orders/order/')
			.then(function(result) {
				defer.resolve(result.data);
			}, function(err) {
				defer.reject(err);
			});
			return defer.promise;	
		};

		var sendOrderSucessMail = function(order_id) {
			var defer = $q.defer();
			console.log('#####@@@@@@#######');
			$http.post('/api/mandrills/order/success/', {order_id: order_id})
			.then(function(result) {
				defer.resolve(result);
			}, function(err) {
				defer.reject(err);
			});
			return defer.promise;				
		};


		// Public API here
		return {
			someMethod: function () {
				return meaningOfLife;
			},
			createOrder: createOrder,
			updateOrder: updateOrder,
			insertOrderHistory: insertOrderHistory,
			getOrder: getOrder,
			getOrders: getOrders,
			getOrderProducts: getOrderProducts,
			getReviewOrderProducts: getReviewOrderProducts,
			getStatusLevel: getStatusLevel,
			sendOrderSucessMail: sendOrderSucessMail,
			addReview: addReview
		};
	});
