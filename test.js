var http = require('http')
var url = 'http://uinames.com/api/';

http.get(url, function(res) {
    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('end', function() {

        console.log(JSON.parse(body));
    });
}).on('error', function(e) {
    console.log("Got an error: ", e);
});
