Kill it dead
============
A small piece of javascript added to your page to alert the user that their browser 
is not supported (or support soon to be dropped) by this site and prompt them to upgrade.

Aim
---
To kill Internet Explorer < 8... though it would be nice to kill IE 8 too, and I also hear
grumblings of IE9.

Use
---
You're going to have to store the javascript and css files somewhere on your webspace.

1. Change the *killie.css* to suit your needs
2. Minify and Upload *killie.css* to your webspace
3. In *killie.js* change the css path to the above location (2).
4. Minify and Upload *killie.js* to your webspace
5. In your html (either before the &lt;/head&gt; or, for better performance, before the 
&lt;/body&gt; tag) use one of the following (depending what version of ie you're after):

### For IE6
    <!--[if IE lte 6]><script src="path/to/killie.js"></script><![endif]-->

### For IE7
    <!--[if IE lte 7]><script src="path/to/killie.js"></script><![endif]-->


Configure
---------
In the first few lines of *killie.js* there are a few variables you can change which 
modifies the message and the browsers offered, as well as the path to your css. Feel
free to change these to suit your needs and language requirements.