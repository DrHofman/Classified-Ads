var fs = require('fs');
var path = require('path');

module.exports = function(app) {
    fs.readdirSync(__dirname + path.sep).forEach(function(file){
        var module = __dirname + path.sep + file;
        if(fs.lstatSync(module).isDirectory()){
            require(module)(app);
        }
    })

};