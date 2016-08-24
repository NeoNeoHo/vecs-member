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
  'angular-spinkit'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
