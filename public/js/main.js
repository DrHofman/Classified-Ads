'use strict';

// Declare app level module which depends on filters, and services
angular.module('besedoca', ['ngRoute', 'ngAnimate', 'ngResource', 'ngSanitize', 'ngTouch']).

config(function($routeProvider, $locationProvider) {

  $routeProvider.when('/dashboard', {
    templateUrl: '/dashboard.html',
    controller: 'dashboardCtrl'
  });
  
  $routeProvider.when('/', {
    templateUrl: '/main.html',
    controller: 'mainCtrl'
  });
  
  $routeProvider.when('/:category', {
    templateUrl: '/main.html',
    controller: 'mainCtrl'
  });
  
  $routeProvider.when('/ad/:id', {
    templateUrl: '/ad.html',
    controller: 'adCtrl'
  });
  
  $routeProvider.otherwise({
    redirectTo: '/'
  });
  
  $locationProvider.html5Mode(true);
  
});
