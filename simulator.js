
var https = require('https');
var http = require('http');
const fs = require('fs');
var app = require('./app.js');

var port = +(process.env.SIMULATOR_PORT || 9087) 

const httpsOptions = {
    key: fs.readFileSync('./certs/psplorenzo_1024.key'),
    cert: fs.readFileSync('./certs/psplorenzo_1024.crt')
};

http.createServer(app).listen(port,()=>{ console.log('HTTP listening on port '+port)});
https.createServer(httpsOptions, app).listen(port+1,()=>{ console.log('HTTPS listening on port '+(port+1))});