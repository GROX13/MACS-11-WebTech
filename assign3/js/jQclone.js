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
                this[i].className
                    .replace(new RegExp("(?:^|\\s)" + classNames[j] + "(?!\\S)/g", ''));
            }
        }
        return this;
    }

    function toggleClass(className, addOrRemove) {
        var classNames = className.split(" ");
        for (var i = 0; i < classNames.length; i++) {
            if (typeof addOrRemove !== 'undefined') {
                if (addOrRemove(classNames[i]))
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

    function attr(name) {
        return this[0].getAttribute(name);
    }

    function css(cssStyle, value) {
        var i;
        if (typeof value !== 'undefined') {
            return this[0].getComputedStyle(cssStyle, null);
        } else {
            if (typeof cssStyle === Object) {
                for (i = 0; i < this.length; i++) {
                    this[i].style = cssStyle;
                }
            } else {
                for (i = 0; i < this.length; i++) {
                    this[i].style = cssStyle;
                }
            }
        }
        return this;
    }

    function data() {
        if (document.body.dataset) {
            // modern HTML5 browser
        } else {
            // archaic browser, use custom solution
        }
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
})(window, document);
