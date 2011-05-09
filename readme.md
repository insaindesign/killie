Kill it dead
============

Aim
---
To kill Internet Explorer < 8... though it would be nice to kill IE 8 too.

Use
---
I don't have access to a CDN, so you're going to have to store the javascript 
and css files somewhere on your webspace.

Configure
---------
1. Change the css to what you would like
2. upload killie.css
3. In killie.js change the css path to the above location (2).
4. Upload killie.js
5. In your html (either before the &lt;/head&gt; or, for better performance, before 
the &lt;/body&gt; tag) include one of the following:

### For IE6
    <!--[if IE lte 6]><script src="pathtoie.js"></script><![endif]-->

### For IE7
    <!--[if IE lte 7]><script src="pathtoie.js"></script><![endif]-->
