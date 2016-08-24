'use strict';

angular.module('webApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('discover', {
        url: '/discover',
        templateUrl: 'app/discover/discover.html',
        controller: 'DiscoverController',
        controllerAs: 'discover'
      });
  });
