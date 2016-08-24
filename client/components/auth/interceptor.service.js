'use strict';

(function() {

function authInterceptor($rootScope, $q, $cookies, $injector, Util, $location) {
	var state;
	return {
		// Add authorization token to headers
		request(config) {
			config.headers = config.headers || {};
			var urlParams = $location.search();
			if ($cookies.get('vecs_token') && Util.isSameOrigin(config.url)) {
				config.headers.Authorization = 'Bearer ' + $cookies.get('vecs_token');
			} else if (urlParams['vecs_token']) {
				$cookies.put('vecs_token', urlParams['vecs_token']);
				config.headers.Authorization = 'Bearer ' + urlParams['vecs_token'];
			}
			return config;
		},

		// Intercept 401s and redirect you to login
		responseError(response) {
			if (response.status === 401) {
				// (state || (state = $injector.get('$state'))).go('login');
				window.location = "https://vecsgardenia.com/index.php?route=account/login";
				// remove any stale tokens
				$cookies.remove('vecs_token');
			}
			return $q.reject(response);
		}
	};
}

angular.module('webApp.auth')
	.factory('authInterceptor', authInterceptor);

})();
