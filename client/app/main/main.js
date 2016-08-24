'use strict';

angular.module('webApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('member', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        authenticate: true
      });
  });
