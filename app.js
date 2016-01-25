var restify = require('restify');
var router = require('./routes');
var server = restify.createServer();
router(server);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});