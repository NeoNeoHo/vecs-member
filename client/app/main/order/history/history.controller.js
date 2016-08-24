'use strict';

angular.module('webApp')
	.controller('HistoryCtrl', function ($scope, $location, Order, Config, Cart, Customer) {
		$scope.is_loading_table = true;
		Order.getOrders().then(function(orders) {
			$scope.is_loading_table = false;
			$scope.orders = orders;
		}, function(err) {
			console.log(err);
		});
		$scope.showInfo = function(order_id) {
			window.location.href = '/order/info?order_id='+order_id;
		}
	});
