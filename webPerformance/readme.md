UMD
http://bob.yexley.net/umd-javascript-that-runs-anywhere/
https://addyosmani.com/writing-modular-js/
puzzle
https://github.com/getify/wepuzzleit

https://www.webpagetest.org/
http://whichloadsfaster.zomdir.com/

https://keioka.github.io/performance/2016/10/21/web-performance-overview.html
https://msdn.microsoft.com/en-us/magazine/gg622887.aspx
https://www.nngroup.com/articles/response-times-3-important-limits/

check gzip
http://www.gidnetwork.com/tools/gzip-test.php

http://yslow.org/


Loading

<link rel="prefetch" href="something.jpg">

<script>
    var img = new Image();
    img.src = "something.jpg";
</script>


Lazy Loading, On-demand Loading, Postloading
LABjs.com
<script>
function scriptLoaded() {
    // yay!
}

var scr = document.createElement("script");
scr.src = "foobar.js";
document.head.appendChild(scr);

scr.onload = scriptLoaded;
scr.onreadystatechange = function() {
    if (scr.readyState === "loaded" || scr.readyState === "complete") {
        scriptLoaded();
    }
}
</script>

Parallel Loading
<script>
    function allScriptsLoaded() {
        // yay!
    }

    function loadScript(source,done) {
        var scr = document.createElement("script");
        scr.src - source;
        scr.async = false;  // <---- LOOKEY LOOKEY!!
        document.head.appendChild(scr);

        if(done) {
            scr.onload = done;
            scr.onreadystatechange = function() {
                if (scr.readyState === "loaded" || scr.readyState === "complete") {
                    done();
                }
            }
        }
    }

    loadScript("jquery.js");
    loadScript("foobar.js");
    loadScript("baz.js", allScriptsLoaded);
</script>


Animation Js
<script>
    // old way
    function updateElement() {
        $elem.css({
            left: x + "px",
            top: y + "px"
        });
    }

    var x, y;

    function doAnimation() {
        // calculate new x, y
        updateElement();
        setTimeout(doAnimation, 1000/60);
    }

    // html5 way
    function updateElement() {
        $elem.css({
            left: x + "px",
            top: y + "px"
        });
    }

    var x, y;

    function doAnimation() {
        // calculate new x, y
        updateElement();
        requestAnimationFrame(doAnimation);
    }
    
    requestAnimationFrame(doAnimation);

    // CSS transition 
    function updateElement() {
        $elem.css({
            left: x + "px",
            top: y + "px"
        });
    }

    var x, y;

    // calculate new x, y (one time, no loop)
    #foo {
        transition: left 0.5s, top 0.5s;
    }

</script>