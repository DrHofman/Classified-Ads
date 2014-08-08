var Listings = require('../../models/listings.js');
var listings = new Listings();


module.exports = function(app) {

    app.get('/listing/:id', function(req, res) {
        req.checkParams('id', 'ID is empty').notEmpty();
        var errors = req.validationErrors();
        if(errors && errors.length > 0) {
            res.json(406, {error : errors[0].msg });
            return false;
        }

        listings.getListingById(req.params.id)
        .then(function (result) {
            result.scenarios = JSON.parse(result.scenarios);
            res.json(200,  {
                result : true,
                data : result
            });
        })
        .fail(function (err) {
            res.json(err.status || 500, {
                result : false,
                message : err.toString()
            });
        });

    });
    
    app.get('/listings/:category?', function(req, res) {
        
        var category = req.params.category || 'all';
        
        listings.getListings(category)
        .then(function (result) {
            res.json(200,  {
                result : true,
                data : result
            });
        })
        .fail(function (err) {
            res.json(err.status || 500, {
                result : false,
                message : err.toString()
            });
        });
    });

    app.post('/listing', function(req, res) {
        req.assert('title', 'title').notEmpty();
        
        if (req.body.price) {
            req.assert('price','price').isNumeric();
        }
        
        req.assert('description', 'description').notEmpty();
        req.assert('email','email').isEmail();
        req.assert('city','city').notEmpty();
        req.assert('category','category').notEmpty();

        var errors = req.validationErrors();
        if(errors && errors.length > 0) {
            res.json(406, {error : errors[0].msg });
            return false;
        }
        listings.saveListing(false, req.body.title, req.body.price, req.body.description, req.body.email, req.body.phone, req.body.city, req.body.category)
        .then(function (result) {
            res.json(200,  {
                result : true,
                data : result
            });
        })
        .fail(function (err) {
            res.json(err.status || 500, {
                result : false,
                message : err.toString()
            });
        });
    });

};