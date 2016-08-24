'use strict';

angular.module('webApp')
	.controller('InfoCtrl', function ($scope, $location, Order, Config, Cart, Customer) {
		$scope.is_loading_table = true;
		var urlParams = $location.search();
		var order_id = urlParams['order_id'] ? urlParams['order_id'] : 0;
		Order.getOrderProducts(order_id).then(function(order) {
			console.log(order);
			$scope.is_loading_table = false;
			$scope.order = order[0] || order;
		}, function(err) {
			console.log(err);
		});

	});
