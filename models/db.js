/*jslint node: true */
'use strict';
var fs = require('fs');
var Q = require('q');
var path = require('path');
var sqlite3 = require("sqlite3").verbose();

var DATAFILE = 'database.db';

/**
 * Simple database class to handle SQLite3 commands
 * @constructor
 */
function Database(){
    var exists = fs.existsSync(DATAFILE);
    if(!exists) {
      console.log("Creating DB file.");
      fs.openSync(DATAFILE, "w");
    }

    this.db = new sqlite3.Database(DATAFILE);
}

Database.prototype = {
    /**
     * Executes the SQL statement and returns these as a array
     * @param {...*} args SQL statement e.g ("SELECT *... WHERE id=?", param1, param2...)
     * @return {external:Promise} On success the promise will be resolved with an array<br />
     * On error the promise will be rejected with an {@link Error}.
     */
    loadObjectList : function(){
        var deferred = Q.defer();
        var args = Array.prototype.slice.call(arguments);
        var cb = function(err, row){
            if(err){
                deferred.reject(err);
            }

            deferred.resolve(row);
        }
        args.push(cb);
        this.db.all.apply(this.db, args);
        return deferred.promise;

    },
    /**
     * Executes the SQL statement and returns a single object
     * @param {...*} args SQL statement e.g ("SELECT *... WHERE id=?", param1, param2...)
     * @return {external:Promise} On success the promise will be resolved with an object<br />
     * On error the promise will be rejected with an {@link Error}.
     */
    loadObject : function(){
        var deferred = Q.defer();
        var args = Array.prototype.slice.call(arguments);
        var cb = function(err, row){
            if(err){
                deferred.reject(err);
            }

            deferred.resolve(row);
        };
        args.push(cb);
        this.db.get.apply(this.db, args);
        return deferred.promise;
    },
    /**
     * Executes the SQL statement and returns these result
     * @param {...*} args SQL statement e.g ("INSERT INTO... id=? AND name=?", param1, param2...)
     * @return {external:Promise} On success the promise will be resolved with an object<br />
     * On error the promise will be rejected with an {@link Error}.
     */
    execute : function(){
        var deferred = Q.defer();
        var args = Array.prototype.slice.call(arguments);
        var cb = function(err){
            if(err){
                deferred.reject(err);
            }

            deferred.resolve(this);
        }
        args.push(cb);
        this.db.run.apply(this.db, args);
        return deferred.promise;
    },
}

module.exports = Database;