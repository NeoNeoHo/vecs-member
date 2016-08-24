'use strict';

angular.module('webApp')
	.controller('DiscoverController', function ($scope, Discover) {
		$scope.products = Discover.products;
		$scope.questions = Discover.questions;
		$scope.solutions = Discover.solutions;
		$scope.anwsers = {};
		$scope.solution_products = [];
		$scope.submitDiscover = function() {
			$scope.solution_products = [];
			var solutions = _.values($scope.anwsers).sort();
			var anwser = '';
			if(solutions.includes(21) || solutions.includes(71)) {
				if(solutions.includes(35)) {
					anwser = solutions[0] + '-' + 32;
				} else {
					anwser = solutions[0] + '-' + solutions[2];
				}
			} else {
				anwser = solutions[0] + '-' + solutions[2];
			}

			$scope.customer_solution = _.find($scope.solutions, {'anwser': anwser});

			if(solutions.includes(52) || solutions.includes(53)) {
				$scope.customer_solution.acne = _.find($scope.products, {model: 'acne30'});
			}
			if(solutions.includes(61)) {
				$scope.customer_solution.specials = {products:[], desc: '一週1~2次晚上洗臉後使用杏仁酸/繡線菊更新精華調理－不建議與芙蓉花系列併用。 一週敷『蘑菇毛控淨化泥膜』或『金縷梅抗痘竹炭膜』1~2次。'};
				$scope.customer_solution.specials.products.push(_.find($scope.products, {model: 'acid30'}));
				$scope.customer_solution.specials.products.push(_.find($scope.products, {model: 'peel15'}));
				$scope.customer_solution.specials.products.push(_.find($scope.products, {model: 'mushMask75'}));
				$scope.customer_solution.specials.products.push(_.find($scope.products, {model: 'acicharMask75d30'}));
			}
			_.forEach($scope.customer_solution.products, function(product_step){
				$scope.solution_products.push(_.find($scope.products, {step: product_step}));
			});
		};
	});
