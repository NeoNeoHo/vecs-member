'use strict';

angular.module('webApp', [
  'webApp.auth',
  'webApp.admin',
  'webApp.constants',
  'ngAnimate',
  'ngCookies',
  // 'ngMessages',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'duScroll',
  'angular-spinkit',
  'ngclipboard',
  '720kb.socialshare'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/discover');

    $locationProvider.html5Mode(true);
  });
