'use strict';

angular.module('webApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('member.order', {
        url: 'order',
        templateUrl: 'app/main/order/order.html',
        // controller: 'CheckoutController',
        authenticate: true
      });
  });