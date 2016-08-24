'use strict';

angular.module('webApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('member.order_info', {
        url: 'order/info',
        templateUrl: 'app/main/order/info/info.html',
        controller: 'InfoCtrl',
        authenticate: true
      });
  });