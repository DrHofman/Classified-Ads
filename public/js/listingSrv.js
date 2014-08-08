'use strict';

/* Controllers */

angular.module('besedoca').

factory('listingSrv', function($resource) {
    
    // An list object to save all listing items locally
    var listings = [];
    
    // Resource mapping to the remote listing object
    var Listings = $resource('/listings/:category', {category: '@category'});
    
    // Resource mapping to the remote object of
    // a single listing item
    var listing = $resource('/listing');
    
    
    var listingData = {
        title: 'title',
        price: 'price',
        description: 'description',
        email: 'email',
        phone: 'phone',
        city: 'city',
        category: 'category'
    };

    return {
        data: listings,
        get: function(category) {
            while(listings.length > 0) {
                listings.pop();
            }
            
            Listings.get({category: category}, function(value, response) {
                value.data.forEach(function(item, index) {
                    listings.push(item);
                });
            });
        },
        getById: function(id) {
            var res = '';
            
            listings.forEach(function(item, index) {
                if (item.id == id) {
                    res = item;
                }
            });
            
            return res;
        },
        save: function(listingData, cb) {
            listing.save(listingData).$promise.then(function(response) {
                console.log(response);
                listingData.id = response.data.id;
                listings.unshift(listingData);
                cb();
            }).catch(function(response) {
                console.log(response);
            });
            
            this.alerts = true;
        },
        alerts: false
    };

});
