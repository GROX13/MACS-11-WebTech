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
        try {
            for (var key in map) {
                var tmp = map[key];
                if ((tmp.regex).test(url))
                    return {
                        callbacks: tmp.callbacks,
                        errorHandler: tmp.errorHandler,
                        params: composeParameterMap(url, key)
                    };
            }
        } catch(error) {
            console.error(error);
        }
    };

    this.add = function(route, callbacks, errorHandler) {
        try {
            var reg = compose(route);
            map[route] = {callbacks: callbacks, errorHandler: errorHandler, regex: reg};
        } catch(error) {
            console.error(error);
        }
    };

    this.remove = function(route) {
        try {
            delete map[route];
        } catch(error) {
            console.error(error);
        }
    };
}