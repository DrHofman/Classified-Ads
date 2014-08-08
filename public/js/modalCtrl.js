'use strict';

/* Controllers */

angular.module('besedoca').

controller('modalCtrl', function($rootScope, $scope, listingSrv) {

    // Get the jquery version of the modal object
    // so that we can use the default bootstrap behaviours
    var submitYourListing = $('#submitYourListing');
    
    // Define the validation responses for each from-group object
    var validationResponses = {
        listingTitle: {
            group: {
                pristine: '',
                success: 'has-success',
                required: 'has-error',
                minlength: 'has-error',
                maxlength: 'has-error'
            },
            msg: {
                pristine: false,
                success: false,
                required: 'A title is required to submit a listing.',
                minlength: 'Your title must be at least 3 characters long to submit a listing.',
                maxlength: 'Your listing title cannot exceed 255 characters.'
            },
            icon: {
                pristine: 'glyphicon-asterisk',
                success: 'glyphicon-ok',
                required: 'glyphicon-asterisk',
                minlength: 'glyphicon-remove',
                maxlength: 'glyphicon-remove'
            }
        },
        listingPrice: {
            group: {
                pristine: '',
                success: 'has-success',
                number: 'has-error',
                min: 'has-error',
                max: 'has-error'
            },
            msg: {
                pristine: false,
                success: false,
                number: 'A price must be a number.',
                min: 'Minimum price is 1.',
                max: 'You have exceeded the maximum price value allowed (9999999).'
            },
            icon: {
                pristine: '',
                success: 'glyphicon-ok',
                number: 'glyphicon-remove',
                min: 'glyphicon-remove',
                max: 'glyphicon-remove'
            }
        },
        listingDescription: {
            group: {
                pristine: '',
                success: 'has-success',
                required: 'has-error',
                minlength: 'has-error',
                maxlength: 'has-error'
            },
            msg: {
                pristine: false,
                success: false,
                required: 'A description is required to submit a listing.',
                minlength: 'Your description must be at least 20 characters long to submit a listing.',
                maxlength: 'Your listing description cannot exceed 1000 characters.'
            },
            icon: {
                pristine: 'glyphicon-asterisk',
                success: 'glyphicon-ok',
                required: 'glyphicon-asterisk',
                minlength: 'glyphicon-remove',
                maxlength: 'glyphicon-remove'
            }
        },
        listingEmail: {
            group: {
                pristine: '',
                success: 'has-success',
                required: 'has-error',
                email: 'has-error',
                maxlength: 'has-error'
            },
            msg: {
                pristine: false,
                success: false,
                required: 'An email is required to submit a listing.',
                email: 'You must provide a vaild email address.',
                maxlength: 'Your email cannot exceed 255 characters.'
            },
            icon: {
                pristine: 'glyphicon-asterisk',
                success: 'glyphicon-ok',
                required: 'glyphicon-asterisk',
                email: 'glyphicon-remove',
                maxlength: 'glyphicon-remove'
            }
        },
        listingPhone: {
            group: {
                pristine: '',
                success: 'has-success',
                maxlength: 'has-error'
            },
            msg: {
                pristine: false,
                success: false,
                maxlength: 'Your phone number cannot exceed 60 characters.'
            },
            icon: {
                pristine: 'glyphicon-asterisk',
                success: 'glyphicon-ok',
                maxlength: 'glyphicon-remove'
            }
        },
        listingCity: {
            group: {
                pristine: '',
                success: 'has-success',
                required: 'has-error',
                minlength: 'has-error',
                maxlength: 'has-error'
            },
            msg: {
                pristine: false,
                success: false,
                required: 'A city name is required to submit a listing.',
                minlength: 'A city name must be at least 2 charecters long.',
                maxlength: 'A city name cannot exceed 60 characters.'
            },
            icon: {
                pristine: 'glyphicon-asterisk',
                success: 'glyphicon-ok',
                required: 'glyphicon-asterisk',
                minlength: 'glyphicon-remove',
                maxlength: 'glyphicon-remove'
            }
        },
        listingCategory: {
            group: {
                pristine: '',
                success: 'has-success',
                required: 'has-error'
            },
            msg: {
                pristine: false,
                success: false,
                required: 'A city name is required to submit a listing.'
            }
        }
    };
    
    $scope.categories = [
        {'name': 'Cars'},
        {'name': 'Phones'},
        {'name': 'Services'}
    ];
    
    $scope.alerts = '';
    
    // Listen to the default bootstrap event
    // and reset the form to pristine state when fired
    submitYourListing.on('hidden.bs.modal', resetModal)
    
    // The form data object
    $scope.listing = {};

    // Method to be called when the modal needs to be closed
    $scope.dismiss = function() {
        submitYourListing.modal('hide');
    };

    // Method to be called when submitting the modal form
    $scope.save = function() {
        var data= angular.copy($scope.listing);
        
        //if ($scope.submitListing.$valid) {
            listingSrv.save(data, function() {
                submitYourListing.modal('hide');
            });
        //} else {
        //    $scope.alerts = true;
        //}
    };
    
    // Process the relevant form data and set the
    // validation state of each field based on the
    // validationResponses object
    $scope.feedback = function(ele, type) {

        var myEle = $scope.submitListing[ele];
        var result = 'pristine';
        
        if (myEle.$valid && !myEle.$pristine) {
            result = 'success';
        } else if (!myEle.$valid && !myEle.$pristine) {
            result = getFirstError(myEle.$error);
        }
        
        return validationResponses[ele][type][result];
    };
    
    /**
     *  Return the first occurred error from the errors object
     */
    function getFirstError(errors) {
    
        for (var error in errors) {
            if (errors[error]) {
                return error;
            }
        }
    
    }
    
    /**
     *  Explicitly reset ng-model values
     *  to force an update on the view
     */
    function resetModal() {
        $scope.submitListing.$setPristine();
        $scope.alerts = false;
        
        $scope.listing.title = '';
        $scope.listing.price = '';
        $scope.listing.description = '';
        $scope.listing.email = '';
        $scope.listing.phone = '';
        $scope.listing.city = '';
        $scope.listing.category = '';
    }

});
