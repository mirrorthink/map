/*class MyClass {
    myProp = 42;
    constructor() {
        console.log(this.myProp); // 42
    }
}
WeakMap =
    this.WeakMap ||
    this.MozWeakMap ||
    (WeakMap = (function() {
        function WeakMap() {
            this.keys = [];
            this.values = [];
        }

        WeakMap.prototype.get = function(key) {
            var i, item, j, len, ref;
            ref = this.keys;
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
                item = ref[i];
                if (item === key) {
                    return this.values[i];
                }
            }
        };

        WeakMap.prototype.set = function(key, value) {
            var i, item, j, len, ref;
            ref = this.keys;
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
                item = ref[i];
                if (item === key) {
                    this.values[i] = value;
                    return;
                }
            }
            this.keys.push(key);
            return this.values.push(value);
        };

        return WeakMap;
    })());

MutationObserver =
    this.MutationObserver ||
    this.WebkitMutationObserver ||
    this.MozMutationObserver ||
    (MutationObserver = (function() {
        function MutationObserver() {
            if (typeof console !== "undefined" && console !== null) {
                console.warn("MutationObserver is not supported by your browser.");
            }
            if (typeof console !== "undefined" && console !== null) {
                console.warn(
                    "WOW.js cannot detect dom mutations, please call .sync() after loading new content."
                );
            }
        }

        MutationObserver.notSupported = true;

        MutationObserver.prototype.observe = function() {};

        return MutationObserver;
    })());

getComputedStyle =
    this.getComputedStyle ||
    function(el, pseudo) {
        this.getPropertyValue = function(prop) {
            var ref;
            if (prop === "float") {
                prop = "styleFloat";
            }
            if (getComputedStyleRX.test(prop)) {
                prop.replace(getComputedStyleRX, function(_, _char) {
                    return _char.toUpperCase();
                });
            }
            return ((ref = el.currentStyle) != null ? ref[prop] : void 0) || null;
        };
        return this;
    };

getComputedStyleRX = /(\-([a-z]){1})/g;

export default Util;*/