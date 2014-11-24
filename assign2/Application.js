/**
 * Created by Giorgi on 11/22/2014.
 */
var Router = require('./Router.js');
var Server = require('./Server.js');
var fileReader = require('fs');
var router = new Router();
var server = new Server();


//fileReader.readFile("index.html", function(e, data){
//    console.log(data.toString());
//});

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
            file = file.replace("/", ".");
            fileReader.readFile(file, function (err, data) {
                if (err) {

                } else {

                    response.writeHead(200, {"Content-Type": "text/html",
                        "Content-Disposition":"attachment; filename:" + file});
                    response.write(data);
                    response.end();
                }
            });
        }
    },
    function(error){
        response.writeHead(500, {});
        response.end();
    });

server.start(router);