'use strict';

angular.module('webApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('checkout.final_confirm', {
        url: '/final_confirm',
        templateUrl: 'app/checkout/final_confirm/final_confirm.html',
        // controller: 'CheckoutController'
        authenticate: true
      });
  });