/**
 * Created by Giorgi on 10/10/2014.
 */

function toBinary(input) {
    var res = [];
    var arr = "";
    var bin = input.toString(2);
    if (bin.length < 8) {
        for (var i = 0; i < 7 - bin.length; i++)
            arr += "0";
        res.push("0" + arr + bin);
    } else if (bin.length < 12) {
        for (var i = 0; i < 11 - bin.length; i++)
            arr += "0";
        arr = arr + bin;
        res.push("110" + arr.substr(0, 5));
        res.push("10" + arr.substr(5));
    } else if (bin.length < 17) {
        for (var i = 0; i < 16 - bin.length; i++)
            arr += "0";
        arr = arr + bin;
        res.push("1110" + arr.substr(0, 4));
        res.push("10" + arr.substr(4, 6));
        res.push("10" + arr.substr(10));
    } else if (bin.length < 22) {
        for (var i = 0; i < 21 - bin.length; i++)
            arr += "0";
        arr = arr + bin;
        res.push("11110" + arr.substr(0, 3));
        res.push("10" + arr.substr(3, 6));
        res.push("10" + arr.substr(9, 6));
        res.push("10" + arr.substr(15));
    } else if (bin.length < 27) {
        for (var i = 0; i < 26 - bin.length; i++)
            arr += "0";
        arr = arr + bin;
        res.push("111110" + arr.substr(0, 2));
        res.push("10" + arr.substr(2, 6));
        res.push("10" + arr.substr(8, 6));
        res.push("10" + arr.substr(14, 6));
        res.push("10" + arr.substr(20));
    } else if (bin.length < 32) {
        for (var i = 0; i < 31 - bin.length; i++)
            arr += "0";
        arr = arr + bin;
        res.push("1111110" + arr.substr(0, 1));
        res.push("10" + arr.substr(1, 6));
        res.push("10" + arr.substr(7, 6));
        res.push("10" + arr.substr(13, 6));
        res.push("10" + arr.substr(19, 6));
        res.push("10" + arr.substr(25));
    }
    return res;
}

function encodeChar(input) {
    var charCode = input.charCodeAt(0);
    var code = "";
    var result = [];
    result = toBinary(charCode);
    for (var i = 0; i < result.length; i++)
        code = code + "%" + parseInt(result[i], 2).toString(16);
    return code;
}

function encodeString(input) {
    var reserved = {
        "!": "%21", "#": "%23", "$": "%24",
        "&": "%26", "'": "%27", "(": "%28",
        ")": "%29", "*": "%2a", "+": "%2b",
        ",": "%2c", "/": "%2f", ":": "%3a",
        ";": "%3b", "=": "%3d", "?": "%3f",
        "@": "%40", "[": "%5b", "]": "%5d",
        " ": "%20"
    };
    var arr = [];
    for (var i = 0; i < input.length; i++) {
        var k = input.charCodeAt(i);
        if (k < 128) {
            if (reserved[input[i]] !== undefined)
                arr.push(reserved[input[i]]);
            else
                arr.push(input[i]);
        } else
            arr.push(encodeChar(input[i]));
    }
    return arr.join("");
}

function countOnes(input) {
    var count = 0;
    for (var i = 0; i < input.length; i++) {
        if (input[i] !== "0")
            count++;
        else break;
    }
    return count;
}

/*
    var reserved = {
        "%21": "!", "%23": "#", "%24": "$",
        "%26": "&", "%27": "'", "%28": "(",
        "%29": ")", "%2a": "*", "%2b": "+",
        "%2c": ",", "%2f": "/", "%3a": ":",
        "%3b": ";", "%3d": "=", "%3f": "?",
        "%40": "@", "%5b": "[", "%5d": "]",
        "%20": " "
      };
 */

function decodeString(input) {
    var arr = input.split("%");
    var decoded = arr[0];
    for (var i = 1; i < arr.length; i++) {
        var first = parseInt(arr[i], 16).toString(2);
        var symbol = "";
        var ones = countOnes(first);
        if (ones !== 1) {
            symbol = first.substr(ones + 1, 7 - ones);
            for (var j = 1; j < ones; j++)
                symbol += parseInt(arr[i + j], 16).toString(2).substring(2);
            i = i + ones - 1;
            decoded += String.fromCharCode(parseInt(symbol, 2)) + (arr[i]).substring(2);
        } else {
            decoded += String.fromCharCode(parseInt(arr[i].substring(0,2), 16)) + arr[i].substring(2);
        }
    }
    return decoded;
}

function encode(input) {
    var cs = (Object.prototype.toString.call(input));
    switch (cs) {
        case "[object String]":
            return encodeString(input);
        case "[object Array]":
            var arr = []
            for (var elem in input) {
                arr.push(encodeString(elem));
            }
            return arr;
        case "[object Object]":
            var arr = [];
            for (var key in input) {
                arr.push(encodeString(key) + "=" + encodeString(input[key]));
            }
            return arr.join("&");
        case "[object Number]":
            return input;
    }
}

function decode(input) {
    var cs = (Object.prototype.toString.call(input));
    switch (cs) {
        case "[object String]":
            if (input.indexOf("&") === -1) {
                return decodeString(input);
            } else {
                var arr = input.split("&");
                var dict = {}
                for (var i = 0; i < arr.length; i++) {
                    var tmp = arr[i].split("=");
                    dict[decodeString(tmp[0])] = decodeString(tmp[1]);
                }
                return dict;
            }
        case "[object Array]":
            var arr = []
            for (var elem in input) {
                arr.push(decodeString(elem));
            }
            return arr;
    }
}

console.log(encode("€"));
console.log(encode("ა"));
console.log(encode("Ҩ"));
console.log(encode("'"));
console.log(decode("key=%23%23%23&key1=value1"));
console.log(decode("%E1%83%9A%E1%83%90%E1%83%A1"));
console.log(decode("%E1%83%90"));
console.log(decode("dakns%200asjd%20lasd%20"));