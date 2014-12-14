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
        return setMethods(this[0]);
    }

    function last() {
        return setMethods(this[this.length - 1]);
    }

    function each(callback) {
        for (var i; i < this.length; i++)
            callback(this[i], i);
        return this;
    }

    function find(selector) {
        var result = [];
        for (var i = 0; i < this.length; i++)
            result.concat(this[i].querySelectorAll(selector));
        return setMethods(result);
    }

    function hasClass(className) {
        var regex = new RegExp("(?:^|\\s)" + className + "(?!\\S)");
        return this.first().className.match(regex) !== null;
    }

    function addClass(className) {
        var classNames = className.split(" ");
        for (var i = 0; i < this.length; i++) {
            for (var j = 0; j < classNames.length; j++) {
                if (!this[i].hasClass(classNames[j]))
                    this[i].className += (" " + className);
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

    function css(name) {
        return this[0].getAttribute(name);
    }

    function setMethods(element) {
        element = typeof element !== 'undefined' ? element : [];
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
        return element;
    }

// expose jQClone to global scope
    window.jQClone = function (selector, search) {
        search = typeof search !== 'undefined' ? search : document;
        var result = search.querySelectorAll(selector);
        return setMethods(result);
    };
    window.$ = window.jQClone;
})(window, document);
