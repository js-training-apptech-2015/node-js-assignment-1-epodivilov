var request = require('request');

var externalServers = require('../config').servers;

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
    })
};