var Driving;
(function (Driving) {
    var Common = (function () {
        function Common() {
        }
        /**
         * debounce function is originally from https://gist.github.com/nmsdvid/8807205
         * its purpose is to improve broser performance for resize and scroll events
         */
        Common.debounce = function (func, wait, immediate) {
            var timeout;
            return function () {
                var context = this, args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    timeout = null;
                    if (!immediate)
                        func.apply(context, args);
                }, wait);
                if (immediate && !timeout)
                    func.apply(context, args);
            };
        };
        Common.utilSetCookie = function (c_name, value, exdays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + exdays);
            var c_value = encodeURI(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());
            document.cookie = c_name + "=" + c_value;
        };
        Common.utilGetCookie = function (c_name) {
            var i, x, y, ARRcookies = document.cookie.split(";");
            for (i = 0; i < ARRcookies.length; i++) {
                x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+$/g, "");
                if (x == c_name) {
                    return decodeURI(y);
                }
            }
            return null;
        };
        Common.utilDeleteCookie = function (c_name) {
            document.cookie = encodeURIComponent(c_name) + "=deleted; expires=" + new Date(0).toUTCString();
        };
        Common.utilGetCurrentYear = function () {
            var d = new Date();
            return d.getFullYear();
        };
        Common.utilGetJSONLen = function (c) {
            var len = 0;
            for (var key in c) {
                len++;
            }
            return len;
        };
        return Common;
    }());
    Driving.Common = Common;
})(Driving || (Driving = {}));
