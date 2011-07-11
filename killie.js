/*
 Death to incompatibility
 This will offer better alternatives to an unsupported browser
 Freely distributable under MIT-style license to use, modify or publish as required
 */
( function (WIN, DOC) {
    /*************************/
    /* Configure the message */
    /*************************/
    var CSS_FILE = 'killie.css',
    MESSAGE_TITLE = "Your browser is not supported!",
    MESSAGE_OPTIONS = "To start enjoying a better and more secure web we recommend installing:",
    BROWSERS = [{
        "href" : "http://www.google.com/chrome",
        "name" : "Chrome"
    },{
        "href" : "http://www.mozilla.com/en-US/firefox/upgrade.html?from=getfirefox",
        "name" : "Firefox"
    },{
        "href" : "http://windows.microsoft.com/en-US/internet-explorer/products/ie/home",
        "name" : "Internet Explorer"
    },{
        "href" : "http://www.apple.com/safari/",
        "name" : "Safari"
    }
    ],
    MESSAGE_FRAME = "If you're unable to install a new browser, try the <a href=\"http://www.google.com/chromeframe/\" class=\"icon chrome-frame\">Chrome Frame</a> plugin for Internet Explorer.",

    /**********************************/
    /* No need to configure this part */
    /**********************************/
    msg = DOC.createElement('div'),
    cookieName = "killie",
    msgAnim = null,
    Animation, il, i;

    //finish off the message options by adding the browsers in the order provided above
    for (i = 0, il = BROWSERS.length; i < il; i += 1) {
        if (i) {
            MESSAGE_OPTIONS += (i + 1 < il) ? ',' : ' or';
        }
        MESSAGE_OPTIONS += ' <a class="icon ' + BROWSERS[i].name.toLowerCase() + '" href="' + BROWSERS[i].href + '">' + BROWSERS[i].name + '</a>';
    }

    //quick and dirty animation class
    Animation = function (el, duration) {
        var properties = {},
        interval = 25,
        intDur = duration / interval,
        itt = 0,
        timer = false;

        function clear() {
            clearInterval(timer);
            itt = 0;
        }

        function cubicOut(t, b, c, d) {
            t = t / d - 1;
            return c * (t * t * t + 1) + b;
        }

        function animate() {
            for (var i in properties) {
                if (properties.hasOwnProperty(i)) {
                    el.style[i] = Math.round(cubicOut(itt, properties[i].from, properties[i].to - properties[i].from, intDur)) + 'px';
                }
            }
            itt += 1;
            if (itt > intDur)
                clear();
        }

        return {
            el : el,
            animate : function (anims) {
                var i;
                properties = {};
                for (i in anims)
                    if (anims.hasOwnProperty(i)) {
                        properties[i] = {
                            from : parseInt(this.el.style[i], 10),
                            to : anims[i]
                        };
                    }
                if (timer)
                    clear();
                timer = setInterval(animate, interval);
            }
        };
    };
    //css file loader with callback on complete
    function loadCSS(url, callback) {
        var file = DOC.createElement('link'),
        html = DOC.getElementsByTagName('html')[0],
        img = DOC.createElement('img');
        //setup the file params
        file.type = 'text/css';
        file.rel = 'stylesheet';
        file.href = url;
        DOC.getElementsByTagName('head')[0].appendChild(file);
        if (callback) {
            img.src = url;
            img.onerror = function() {
                setTimeout(callback, 100);
                html.removeChild(img);
            }
            html.appendChild(img);
        }
        return file;
    }

    function show() {
        msgAnim.animate({
            'top' : 0
        });
    }

    function hide() {
        msgAnim.animate({
            'top' : -msg.offsetHeight
        });
        setCookie();
    }

    function init() {
        var inner = DOC.createElement('div'),
        cls = DOC.createElement('a');
        //close button
        cls.className = 'close';
        cls.innerHTML = '<strong>x</strong><span> close</span>';
        cls.onclick = hide;
        //the inner content
        inner.className = "inner";
        inner.innerHTML = '<h3>' + MESSAGE_TITLE + '</h3><p>' + MESSAGE_OPTIONS + '</p><p>' + MESSAGE_FRAME + '</p>';
        inner.appendChild(cls);
        //message
        msg.id = 'browser-user-message';
        msg.appendChild(inner);
        //create the global animation class that we will use
        msgAnim = new Animation(msg, 700);
        //add css and fire the show event when the css is loaded
        loadCSS(CSS_FILE, function () {
            DOC.body.appendChild(msg);
            //hide it by default
            msg.style.top = '-' + msg.offsetHeight + 'px';
            //scroll it down
            show();
        });
    }

    function createCookie(name,value,days) {
        var expires = "", date;
        if (days) {
            date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=",
        ca = document.cookie.split(';'), 
        i, il, c;
        for(i = 0, il = ca.length; i < il; i += 1) {
            c = ca[i];
            while (c.charAt(0) ===' ') {
                c = c.substring(1,c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length,c.length);
            }
        }
        return null;
    }

    function setCookie() {
        createCookie(cookieName, 1, 7);
        return false;
    }

    function checkCookie() {
        return (readCookie(cookieName));
    }

    //clear cookie for testing
    //createCookie(cookieName,0,-1);

    //wait till page is loaded
    if (!checkCookie()) {
        if (WIN.addEventListener) {
            WIN.addEventListener('load', init, false);
        } else {
            WIN.attachEvent('onload', init);
        }
    }
}(window, document));