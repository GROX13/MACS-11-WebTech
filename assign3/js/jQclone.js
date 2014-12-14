/**
 * Created by Giorgi on 12/14/2014.
 */

/*
 *
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
                    .replace(new RegExp("(?:^|\\s)" + classNames[j] + "(?!\\S)/g", '' ));
            }
        }
        return this;
    }

    function toggleClass(className, addOrRemove) {
        addOrRemove = typeof addOrRemove !== 'undefined' ? addOrRemove : false;
        if (addOrRemove)
            this.addClass(className);
        else
            this.removeClass(className);
        return this;
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
        element.css = toggleClass;
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
