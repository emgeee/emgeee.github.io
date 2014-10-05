---
title: "Livereload with Cordova and Gulp"
layout: "post"
date: "2014-06-12 19:33:00"
description:
tags: [livereload, cordova, howto, apps, gulp]
---

I recently started on an
[Ionic](http://ionicframework.com/)/[Cordova](http://cordova.apache.org/) app
that uses [Gulp](http://gulpjs.com/) as the main build system. While I've used
[Grunt](http://gruntjs.com/) several times in the past I have found Gulp to be
much more of an intuitive approach and definitely easier to work with.


 ![](http://3.bp.blogspot.com/-v9Z1NslDIYA/U5oAC052K3I/AAAAAAAAAXs/V88Gf_1cOT8/s1600/gulp_cordova_livereload.png)


In a Cordova project, you develop the application in the **$ROOT\_DIR/www/**
directory. When you build the project for ios, Cordova copies those files from
that directory to **$ROOT\_DIR/platforms/ios/www** directory. In order to
streamline the development process, I wanted to make use of  
[livereload](http://livereload.com/) via the 
[gulp-livereload](https://github.com/vohof/gulp-livereload) and
[cordova-gapreload](https://github.com/fingerproof/cordova-plugin-gapreload) plugins.
The basic setup is to use Gulp to watch for changes in the www/ directory and
when a change is detected, copy the file to the appropriate location in the
**platforms/ios/www** directory before triggering livereload. The main reason
for copying files is that the gapreload plugin looks for assets served relative
to the **platforms/** directory.


As you'd expect with any project, asset files can be numerous and the build
system itself should not impose a restriction on nested folders. These
requirements make manually listing files and structures an onerous task that
should be avoided. Fortunately, file
[globbing](http://en.wikipedia.org/wiki/Glob_(programming)) exists precisely to
simplify this task. When specifying files to watch, you can use a glob pattern
to match multiple files in many directories with a single expression. For
example, to watch all files in the **www/** directory, you could specify a
route glob as such:  ** www/\*\* **


**Important:**  Pretty much every JS library I've found that does any sort of
route matching with globs uses the
[minimatch](https://github.com/isaacs/minimatch) library. Currently this
library has what I consider to be unintuitive, undocumented, and even incorrect
behavior. The library does not do path normalization before matching which
leads to the library not recognizing the equality of paths prefixed with the
relative "./" compared to those that are not. Thus a glob specified as
.**/www/\*\*/\*.js** would **NOT** match the path **www/app/test.js** . In the
Gulp ecosystem at least, it seems that path names are piped between processes
without the "./" so I would recommend that **any relative paths or globs you
manually specify not have the "./" prefix.**


Once you have Gulp setup to properly watch your asset files and copy them to
the appropriate directory, the next step is to configure a basic http server to
serve those assets, then trigger a livereload. I fulfilled the first
requirement using the simple
[ecstatic](https://github.com/jesusabdullah/node-ecstatic) module configured to
serve all files from the **platforms/ios/www/** directory on port 8000. **Make
sure your assets are served with a very short cache time** . This can be done
with ecstatic by specifying **cache: 0**  in the config object.   Once Gulp
copies a changed file to the appropriate directory, pipe the new file to
livereload to trigger the change.


The final step is to install the the Cordova plugin. From your root directory
type: `cordova plugin add pro.fing.cordova.gapreload --variable
SERVER\_HOST="<host>"` where **<host>**  is the is the computer the files are
hosted from. If you're developing with the emulator, this would probably be
**localhost**  however you can also specify any IP  you want meaning you can
use this setup when developing with an actual device



## Conclusion
That's pretty much it! Now when you save a file, Gulp should
automatically detect the file has changed, copy it to the platforms directory,
then trigger a livereload action. You app running in the emulator should
instantly receive the livereload notification, load the changed file from the
server, then refresh the webview so the changes take effect.



## Caveats
This setup has been working pretty well for me however there are
some caveats that are important to mention. First of all, when using the
gapreload plugin XMLHttpRequests will be subject to cross origin restrictions
meaning you won't be able to make normal requests to servers that don't have
CORS enabled, even if you whitelist the domain in your config.xml.




Below are the relevant portions of my Gulpfile.js:

<script src="https://gist.github.com/emgeee/29e3f4c3674a08923c2f.js"></script>
