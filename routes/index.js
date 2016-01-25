var request = require('request');
var externalServers = require('../config').servers;
var currentServer = externalServers;

module.exports = function (server) {
    server.get('/games', function (req, res, next) {
        var promises = [];

        externalServers.forEach(function (url) {
            promises.push(new Promise(function (resolve, reject) {
                request(url + 'games', function (error, response, body) {
                    if (error) reject(error);

                    resolve({
                        "server": url.match('\/\/([a-z0-9-]+)\.')[1],
                        "data": JSON.parse(body)
                    });
                });
            }));
        });

        Promise.all(promises).then(function (values) {
            res.send(values);
        })
    });

    server.get('/games/:id', function (req, res, next) {
        var promises = [];

        externalServers.forEach(function (url) {
            promises.push(new Promise(function (resolve, reject) {
                request(url + 'games/' + req.params.id, function (error, response, body) {
                    if (error) reject(error);

                    resolve({
                        "server": url.match('\/\/([a-z0-9-]+)\.')[1],
                        "data": JSON.parse(body)
                    });
                });
            }));
        });

        Promise.all(promises).then(function (values) {
            res.send(values);
        })
    });

    server.post('/games', function (req, res, next) {
        var url = currentServer.shift();
        currentServer.push(url);

        request({
            uri: url + 'games',
            method: 'POST',
            json: true,
            body: {type:0}
        }, function (error, response, body) {
            if (error) return (error);
            res.send({
                "server": url.match('\/\/([a-z0-9-]+)\.')[1],
                "data": body
            });
        });
    });
};