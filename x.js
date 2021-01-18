var https = require('https');
var fs = require('fs');


var ca = [
  fs.readFileSync(__dirname+'/SIAcert/SIACorporateRootCA.crt') 
]
  

var options = {
  host: 'toolbox.sia.eu',
  port: 443,
  path: '',
  method: 'GET',
  agentOptions: {
    "rejectUnauthorized": false,
    ca: ca
}
};

var req = https.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.stack);
});

// write data to request body
req.write('data\n');
req.write('data\n');
req.end();