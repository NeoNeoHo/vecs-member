'use strict';

angular.module('webApp')
	.controller('ReviewCtrl', function ($scope, $location, Order, Config, Cart, Customer) {
		$scope.is_loading_table = true;
		var urlParams = $location.search();
		var order_id = urlParams['order_id'] ? urlParams['order_id'] : 0;
		
		Order.getReviewOrderProducts(order_id).then(function(order_data) {
			console.log(order_data);
			$scope.is_loading_table = false;
			if(order_data.is_reviewed) {
				$scope.text_is_reviewed = '您已經評論過囉！！'
			} else {
				$scope.order = order_data.data[0] || order_data.data;
			}
		}, function(err) {
			console.log(err);
		});

		$scope.submit_review = function() {
			Order.addReview({order_id: $scope.order.order_id, products: $scope.order.products}).then(function(result) {
				console.log(result);
			}, function(err) {
				console.log(err);
			});
		};

	});
