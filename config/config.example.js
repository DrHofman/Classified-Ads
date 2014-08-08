module.exports = {
    server : {
        //server listening port
        port : PORTNUMBER,
        ssl : {
            use_ssl : false,
            certificate : 'certs/server.pem', //certificate as pem
            key : 'certs/server.pem', //key as pem
        }
    },
    logging : {
        enabled : true,
        file : false,//'logs/test.log', //path to file or false for no file output
        options : { //for options https://github.com/expressjs/morgan
            format : 'dev', //default for apache like logging
            immediate : false
        }
    },
    //session settings
    session : { // details https://github.com/expressjs/session
        secret : 'OY64F27o7245mjlEgMDGFpofgSdtnPcy', //some random string
        maxAge : new Date(Date.now() *  15 * 60 * 1000),
        expires  : new Date(Date.now() *  15 * 60 * 1000)
    }
};