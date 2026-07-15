// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];
        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
function checkContentHeight(target) {
    var stageHeight = $(window).height();
    var newHeight = (stageHeight / 2) - (target.height() / 2);
    return newHeight;
}

function checkContentWidth(target) {
    var stageWidth = $(window).width();
    var newWidth = (stageWidth / 2) - (target.width() / 2);
    return newWidth;
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function getDistance(sx, sy, ex, ey) {
    var dis = Math.sqrt(Math.pow(sx - ex, 2) + Math.pow(sy - ey, 2));
    return dis;
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function getAnglePosition(x1, y1, radius, angle) {
    var pos = {
        x: 0,
        y: 0
    };
    pos.x = x1 + radius * Math.cos(angle * Math.PI / 180);
    pos.y = y1 + radius * Math.sin(angle * Math.PI / 180);
    return pos;
}

function isEven(n) {
    n = Number(n);
    return n === 0 || !!(n && !(n % 2));
}
