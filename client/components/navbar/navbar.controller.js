angular.module('webApp')
	.controller('NavbarController', function($scope, $sce, Auth, Megamenu, Promotion) {
		$scope.menu = [
			{
				title: 'Home',
				state: 'main'
			}
		];
		$scope.isCollapsed = true;
		$scope.isLoggedIn = Auth.isLoggedIn;
		$scope.isAdmin = Auth.isAdmin;
		$scope.getCurrentUser = Auth.getCurrentUser;
		Promotion.getModule('member', 'notification').then(function(result) {
				$scope.notification = $sce.trustAsHtml(result.setting);
			}, function(err) {
				$scope.notification = '';
			});
		$scope.trustAsHtml = function(string) {
    		return $sce.trustAsHtml(string);
		};
		Megamenu.getTree().then(function(data) {
			$scope.megamenu = data;
		}, function(err) {});
	});

