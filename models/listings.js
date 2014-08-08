/*jslint node: true */
'use strict';
var fs = require('fs');
var path = require('path');
var Database = require('./db');

var SCHEMA = [
    "CREATE TABLE IF NOT EXISTS listings (",
        "id INTEGER PRIMARY KEY AUTOINCREMENT,",
        "title TEXT,",
        "price TEXT,",
        "description TEXT,",
        "email TEXT,",
        "phone TEXT,",
        "city TEXT,",
        "category TEXT",
    ");"
];

/**
 * Base model for all pull request operations
 * @constructor
 */
function ListingsDataModel(){
    var $self = this;
    this.db = new Database();
    this.db.loadObject('SELECT count(*) as c FROM sqlite_master WHERE type=\'table\' AND name=\'listings\'')
        .then(function(result){
            var ret = false;
            if(result.c === 0){
                $self.db.execute(SCHEMA.join('\n'));
            }
        })
}

ListingsDataModel.prototype = {
    /**
     * Gets all listings in the table
     * @return {external:Promise} On success the promise will be resolved with an object<br />
     * On error the promise will be rejected with an {@link Error}.
     */
    getListings : function(category){
        
        var where = ' ';
        
        if (category !== 'all') {
            where = " WHERE category = '" + category + "' "; 
        }
        
        return this.db.loadObjectList("SELECT id, title, price, description, email, phone, city, category FROM listings" + where + "ORDER BY id DESC;");
    },
    /**
     * Gets a listing by a ID
     * @param  {number} id ID of a listing
     * @return {external:Promise} On success the promise will be resolved with an object<br />
     * On error the promise will be rejected with an {@link Error}.
     */
    getListingById : function(id){
        return this.db.loadObject("SELECT id, title, price, description, email, phone, city, category FROM listings WHERE id = ?", id);
    },
    /**
     * Saves a listing
     * @param  {string} name    URL of the repository
     * @param  {string} desc     User principal name
     * @param  {string} data A message for the pull request
     * @return {external:Promise} On success the promise will be resolved with an object<br />
     * On error the promise will be rejected with an {@link Error}.
     */
    saveListing : function(id, title, price, description, email, phone, city, category){
        var $self = this;
        var sqldata = [title, price, description, email, phone, city, category];
        var sql = 'INSERT INTO listings (title, price, description, email, phone, city, category) VALUES (?, ?, ?, ?, ?, ?, ?);';

        if(id) {
            sql = 'UPDATE listings SET title=?, price=?, description=?, email=?, phone=?, city=?, category=? WHERE id=?;';
            sqldata.push(id);
        }

        return $self.db.execute(sql, sqldata)
            .then(function(result){

                var res = {
                    id : id || result.lastID,
                    title: title,
                    price: price,
                    description: description,
                    email: email,
                    phone: phone,
                    city: city,
                    category: category
                }
                
                return res;
            });
    }
}

module.exports = ListingsDataModel;