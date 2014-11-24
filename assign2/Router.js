/**
 * Created by Giorgi on 11/19/2014.
 */
module.exports = Router;

function Router() {
    var map = {};

    function compose(route) {
        var result = "^" + route.replace(/{(\w+):(n|s)}/g, function(a1, a2, a3) {
            var dict = {s:"[a-zA-Z]+", n:"[0-9]+"};
            return dict[a3];
        }) + "$";
        result = result.split("/").join("\\/");
        return new RegExp(result);
    }

    function composeParameterMap(url, route) {
        var result = {};
        var urlArr = url.split("/");
        var routeArr = route.split("/");
        for (var i = 0; i < routeArr.length; i++) {
            if (routeArr[i][0] === "{") {
                var name = routeArr[i].substring(1, routeArr[i].indexOf(":"));
                result[name] = urlArr[i];
            }
        }
        return result;
    }

    this.get = function(url) {
        for (var i in map) {
            var tmp = map[i];
            if((tmp.regex).test(url))
                return {callbacks:tmp.callbacks,
                    errorHandler:tmp.errorHandler,
                    params:composeParameterMap(url, i)};
        }
    };

    this.add = function(route, callbacks, errorHandler) {
        var reg = compose(route);
        map[route] = {callbacks:callbacks, errorHandler:errorHandler, regex:reg};
    };

    this.remove = function(route) {
        delete map[route];
    };
}