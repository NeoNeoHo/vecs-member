'use strict';

angular.module('webApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('invite', {
        url: '/invite',
        templateUrl: 'app/invite/invite.html',
        controller: 'InviteController',
        controllerAs: 'invite'
      });
  });
