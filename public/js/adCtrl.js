'use strict';

/* Controllers */

angular.module('besedoca').

controller('adCtrl', function($scope, $routeParams, listingSrv) {

    var id = $routeParams.id || 'all';

    $scope.listing = listingSrv.getById(id);
    
    $scope.categoryIcon = {
        Cars: 'plane',
        Phones: 'phone',
        Services: 'wrench'
    }

});
