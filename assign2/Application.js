/**
 * Created by Giorgi on 11/22/2014.
 */
var Router = require('./Router.js');
var Server = require('./Server.js');
var fileReader = require('fs');
var router = new Router();
var server = new Server();
var type = {
    "html":"text/html",
    "css":"text/css",
    "js":"text/javascript",
    "jpg":"image/jpg",
    "png":"image/png"
};

router.add("/users/{id:n}/permissions/{permName:s}",
    {
        GET: function(request, response, params){
            response.writeHead(200, {"Content-Type":"text/html", "filename":"index.html"});
            response.write(data);
            response.end();
        },
        POST: function(request, response, params){
            response.writeHead(200, {"Content-Type":"text/html", "filename":"index.html"});
            response.write(data);
            response.end();
        },
        DELETE: function(request, response, params){
            response.writeHead(200, {"Content-Type":"text/html", "filename":"index.html"});
            response.write(data);
            response.end();
        }
    },
    function(request, response, error){
        response.writeHead(500, {});
        response.end();
    });

router.add("/{fileName:s}/{fileExt:s}",
    {
        GET: function(request, response, params) {
            var file = request.url.substr(1, request.url.length);
            file = file.replace("/", ".");
            var tmp = type[file.split(".")[1]];
            fileReader.readFile(file, function (error, data) {
                if (!error) {
                    response.writeHead(200, {"Content-Type":tmp,
                        "Content-Disposition":"attachment; filename:" + file});
                    response.write(data);
                    response.end();
                }
            });
        }
    },
    function(request, response, error){
        response.writeHead(500, {});
        response.end();
    });

router.add("/home/{fileName:s}/{fileExt:s}",
    {
        GET: function(request, response, params) {
            var file = request.url.substr(1, request.url.length);
            file = file.replace("/", ".");
            fileReader.readFile(file, function (error, data) {
                if (!error) {
                    response.writeHead(200, {"Content-Type":type[file.split(".")[1]],
                        "Content-Disposition":"attachment; filename:" + file});
                    response.write(data);
                    response.end();
                }
            });
        },
        POST: function(request, response, params) {},
        DELETE: function(request, response, params) {}
    },
    function(request, response, error){
        response.writeHead(500, {});
        response.end();
    });

server.start(router);