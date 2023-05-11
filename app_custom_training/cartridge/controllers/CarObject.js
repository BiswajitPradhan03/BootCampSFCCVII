'use strict';
var server = require('server');
server.get('Show', function (req, res, next) {
   
    var carobj=require('*/cartridge/scripts/carobj');
    var profile=carobj.testfuction();
    res.render('Kris',{profiles:profile});
    next();
});

module.exports = server.exports();