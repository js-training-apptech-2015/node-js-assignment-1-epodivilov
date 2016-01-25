var restify = require('restify');
var router = require('./routes');

var server = restify.createServer();
server.use(restify.bodyParser());
server.pre(restify.CORS());
server.use(restify.fullResponse());
router(server);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});