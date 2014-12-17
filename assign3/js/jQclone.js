/**
 * Created by Giorgi on 12/14/2014.
 */

/**
 * Self-Executing Anonymous Function
 * =================================
 * Nothing is accessible outside the anonymous function.
 * To allow access to a variable or function, we need to
 * expose it to the global ‘window’ object. One of the major
 * benefits of this pattern is that you can limit access to
 * variables and functions within your closure, essentially
 * making them private and only choosing to expose an API of
 * your choice to the global scope. One popular spin on this
 * design pattern, which can be seen in the jQuery source, is
 * to pass in some commonly used objects. In our code we
 * reference ‘window’ as a parameter to the anonymous function.
 */
(function (window, document) {
// your implementation here

    function first() {
        var result = [];
        if (this.length > 0)
            result.push(this[0]);
        return factory(result);
    }

    function last() {
        var result = [];
        if (this.length > 0)
            result.push(this[this.length - 1]);
        return factory(result);
    }

    function each(callback) {
        for (var i = 0; i < this.length; i++)
            callback.call(this, this[i], i);
        return this;
    }

    function find(selector) {
        var result = [];
        for (var i = 0; i < this.length; i++)
            result = result.concat(compose(this[i].querySelectorAll(selector)));
        return factory(result);
    }

    function hasClass(className) {
        var result = false,
            regex = new RegExp("(?:^|\\s)" + className + "(?!\\S)");
        if (this.length > 0)
            result = regex.test(this[0].className);
        return result;
    }

    function addClass(className) {
        var classNames = className.split(" ");
        for (var i = 0; i < this.length; i++) {
            for (var j = 0; j < classNames.length; j++) {
                var regex = new RegExp("(?:^|\\s)" + classNames[j] + "(?!\\S)");
                if (!regex.test(this[i].className))
                    this[i].className += (" " + classNames[j]);
            }
        }
        return this;
    }

    function removeClass(className) {
        var classNames = className.split(" ");
        for (var i = 0; i < this.length; i++) {
            for (var j = 0; j < classNames.length; j++) {
                var regex = new RegExp("(?:^|\\s)" + classNames[j] + "(?!\\S)");
                this[i].className = this[i].className
                    .replace(regex, '');
            }
        }
        return this;
    }

    function toggleClass(className, addOrRemove) {
        var classNames = className.split(" ");
        for (var i = 0; i < classNames.length; i++) {
            if (typeof addOrRemove !== 'undefined') {
                if (addOrRemove)
                    this.addClass(classNames[i]);
                else
                    this.removeClass(classNames[i]);
            } else {
                if (this.hasClass(classNames[i]))
                    this.removeClass(classNames[i]);
                else
                    this.addClass(classNames[i]);
            }
        }
        return this;
    }

    function attr(name, value) {
        var result = null;
        if (typeof value !== 'undefined') {
            for (var i = 0; i < this.length; i++)
                this[i].setAttribute(name, value);
            result = this;
        } else {
            if (this.length > 0)
                result = this[0].getAttribute(name);
        }
        return result;
    }

    function css(cssStyle, value) {
        if (typeof value !== 'undefined') {
            for (i = 0; i < this.length; i++) {
                for (var k in cssStyle)
                    if (cssStyle.hasOwnProperty(k))
                        this[i].style[k] = value;
            }
        } else {
            if (typeof cssStyle !== 'string') {
                for (var i = 0; i < this.length; i++) {
                    for (var key in cssStyle)
                        if (cssStyle.hasOwnProperty(key))
                            this[i].style[key] = cssStyle[key];
                }
            } else {
                if (this.length > 0) {
                    var style = this[0].style;
                    var computedStyle = window.getComputedStyle(this[0]);
                    return {
                        Style: style[cssStyle],
                        ComputedStyle: computedStyle[cssStyle]
                    }
                }
            }
        }
        return this;
    }

    function data(key1, key2) {
        if (document.body.dataset) {
            // modern HTML5 browser
            if (key1 === 'undefined' && key2 === 'undefined') {

            } else if (key1 !== 'undefined') {
                if (typeof key1 === 'string') {

                } else {

                }
            } else {

            }
        } else {
            // archaic browser, use custom solution
            if (key1 === 'undefined' && key2 === 'undefined') {

            } else if (key1 !== 'undefined') {
                if (typeof key1 === 'string') {

                } else {

                }
            } else {

            }
        }
    }

    function ajax(element) {
        // TODO: ajax
        var result, client = window.XMLHttpRequest
            ? new XMLHttpRequest()
            : new ActiveXObject("Microsoft.XMLHTTP");
        result.done = done;
        result.fail = fail;
        return result
    }

    function done(callback) {

    }

    function fail(callback) {

    }

    function factory(element) {
        element.first = first;
        element.last = last;
        element.each = each;
        element.find = find;
        element.hasClass = hasClass;
        element.addClass = addClass;
        element.removeClass = removeClass;
        element.toggleClass = toggleClass;
        element.attr = attr;
        element.css = css;
        element.data = data;
        return element;
    }

    function compose(element) {
        var result = [];
        for (var i = 0; i < element.length; i++)
            result.push(element[i]);
        return result;
    }

// expose jQClone to global scope
    window.JQClone = function (selector, search) {
        search = typeof search !== 'undefined' ? search : document;
        var result = [];
        if (typeof selector !== 'undefined') {
            var local = search.querySelectorAll(selector);
            result = compose(local);
        }
        return factory(result);
    };
    window.$ = window.JQClone;
    window.$.ajax = ajax;
})(window, document);
