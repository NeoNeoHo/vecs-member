'use strict';

angular.module('webApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('member.order_review', {
        url: 'order/review',
        templateUrl: 'app/main/order/review/review.html',
        controller: 'ReviewCtrl',
        authenticate: true
      });
  });