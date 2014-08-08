'use strict';

/* Controllers */

angular.module('besedoca').

controller('mainCtrl', function($scope, $routeParams, $timeout, listingSrv) {

    var category = $routeParams.category || 'all';

    $scope.listings = listingSrv.data;
    
    listingSrv.get(category);
    
    $scope.categoryIcon = {
        Cars: 'plane',
        Phones: 'phone',
        Services: 'wrench'
    }
    
    $scope.alertInfo = {
        type: 'alert-success',
        msg: 'Your listing was successfully submitted into our database, you may view it in the following link.'
    };
    
    $scope.alerts = false;
        
    $scope.$watch(
        function() { return listingSrv.alerts; },
        function(newValue) {
            $scope.alerts = newValue;
            
            $timeout(function() {
                listingSrv.alerts = false;
            }, 3500);
        }
    );

});
