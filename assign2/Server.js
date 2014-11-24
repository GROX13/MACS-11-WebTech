/**
 * Created by Giorgi on 11/24/2014.
 */
var Router = require('./Router.js');
var http = require('http');
module.exports = Server;

function Server() {
    this.start = function(router) {
        var server = http.createServer(function (request, response) {
            var res = router.get(request.url);
            try {
                res.callbacks[request.method](request, response, res.params);
            } catch (error) {
                try {
                    res.errorHandler();
                } catch (error) {}
            }
        });
        server.listen(22222);
    };
}
