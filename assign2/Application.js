/**
 * Created by Giorgi on 11/22/2014.
 */
var Router = require('./Router.js');
var Server = require('./Server.js');
var fileReader = require('fs');
var router = new Router();
var server = new Server();

router.add("users/{id:n}/permissions/{permName:s}",
    {
        GET: function(request, response, params){
            response.writeHead(200, {'content-type': 'text/html'});
            response.write(params.id + '<br/>' + params.permName);
            response.end();
        }
    },
    function(error){
        response.writeHead(500, {});
        response.end();
    });

router.add("/{fileName:s}/{fileExt:s}",
    {
        GET: function(request, response, params) {
            var file = request.url.substr(1, request.url.length - 1);
            fs.readFile(file.replace("/", "."), function (err, data) {
                response.writeHead(200, {"Content-Type":"attachment;filename:" + file.replace("/", ".")});
                response.write(data);
                response.end();
            });
        }
    },
    function(error){
        response.writeHead(500, {});
        response.end();
    });

server.start(router);