'use strict';

angular.module('webApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('member.order_history', {
        url: 'order/history',
        templateUrl: 'app/main/order/history/history.html',
        controller: 'HistoryCtrl',
        authenticate: true
      });
  });