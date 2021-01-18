!function () {
    var e = window.__LS.svgPath;
    for (var t = function (e) {
        var t = window.localStorage.getItem("lssvg");
        if (!t) return !1;
        try {
            return (t = JSON.parse(t))[e] || !1
        } catch (e) {
            return window.localStorage.removeItem("lssvg"), !1
        }
    }, n = function (e) {
        var n = function (e) {
            document.getElementById("svg-symbols").innerHTML += e
        };
        if (t(e)) n(t(e)); else {
            var o = new XMLHttpRequest;
            o.open("GET", e, !0), o.send(), o.onload = function (t) {
                n(o.responseText);
                var r = window.localStorage.getItem("lssvg");
                if (r) {
                    var s = {}, a = e.split(".")[0];
                    try {
                        var l = JSON.parse(r);
                        for (var i in l) i.split(".")[0] !== a && (s[i] = l[i]);
                        s[e] = o.responseText, window.localStorage.setItem("lssvg", JSON.stringify(s))
                    } catch (t) {
                        console.warn("Error fetch svg...")
                    }
                } else {
                    var obj = {};
                    obj[e] = o.responseText
                    window.localStorage.setItem("lssvg", JSON.stringify(obj))
				}
            }
        }
    }, o = 0; o < e.length; o++) n(e[o])
}();