'use strict';
var server = require('server');

server.get('Show', function (req, res, next) {
   
    res.render('Kris',{msg:"Hello Krishna"});
    //res.json({title: "HELLO PERFAWARE"})
    next();
});

module.exports = server.exports();