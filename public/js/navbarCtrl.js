'use strict';

/* Controllers */

angular.module('besedoca').

controller('navbarCtrl', function($rootScope, $scope) {
    
    $scope.submitYourListing = function() {
        $('#submitYourListing').modal('toggle');
    };

});
