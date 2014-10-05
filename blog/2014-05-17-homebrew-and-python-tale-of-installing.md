---
title: "Homebrew and Python - A tale of Installing Powerline"
layout: "post"
date: "2014-05-17 00:15:00"
description: 
tags: [brew, vim, howto, powerline]
---

### Introduction
The other day I was attempting to install [powerline](https://github.com/Lokaltog/powerline) to make my Vim setup look prettier when I ran into some trouble with how my system was configured. For those who don't know, powerline is a neat status bar written in Python that provides various visual cues like what mode you are currently in. The  [instructions](https://powerline.readthedocs.org/en/latest/installation/osx.html#installation-osx) for Mac told me install the package via [pip](https://pypi.python.org/pypi/pip), a Python package management system. This sounded easy enough however I quickly ran into some nuanced issues that had to be resolved.


<img border="0" height="10" src="https://raw.github.com/Lokaltog/powerline/develop/docs/source/_static/img/pl-mode-normal.png" width="400">


### Default Python on Mac

By default, OSX comes preinstalled with several versions of Python. Theses version are used as dependencies for various software and, in general, should not really be messed with. The executables are made available via the **/usr/bin**  directory and should link back to **/System/Library/Frameworks/Python.framework/Versions/2.7/bin/** . This is all well and good, however, there are a few problems: firstly, the version of Python in this directory is not necessarily up to day. For me, **/usr/bin/python --version**  yields version 2.7.5 while the most recent version is 2.7.6. More importantly, installing Python packages via the included version of pip require root access (**sudo pip install <package name>**) because packages are saved to  **/Library/Python/2.7/site-packages**. Automatically running install scripts that are downloaded form the internet with root privileges is generally considered a possibly security risk and is something I strive to avoid at all cost.


### Enter Homebrew

To rectify both these issues, I used the wonderful [Homebrew](http://brew.sh/) (brew) package management system. By design, brew promises to never write files outside the directory specified by **brew --prefix**  which defaults to **/usr/local/**. Package information is saved to **/usr/local/Cellar** and executables are linked to **/usr/local/bin** . The beauty of this is that these directories don't require root privileges to write to meaning if you ever need to **sudo brew**  anything, you're probably doing something wrong.

To install an updated version of python, simple enter `brew install python`. Because brew will detect you already have a version of python installed on your system, it may be necessary to run **brew link python**, which will symlink the appropriate executables to **/usr/local/bin** . Now, assuming you have **/usr/local/bin**  in your $PATH (which you should), invoking `which python` should show you that you are now running the brewed version of python and `python --version` should now yield 2.7.6.


Rejoice! You should now have an updated version of python installed and managed by brew. **which pip**  should also show you are running the version that accompanied the brewed python.


### Installing powerline

As mentioned earlier, powerline can be installed using pip. The exact command given by [the documentation](https://powerline.readthedocs.org/en/latest/installation/osx.html#installation-osx) is `pip install --user git+git://github.com/Lokaltog/powerline`.

Unfortunately, this presents an issue for brewed python. According to the brew-python documentation at [https://github.com/Homebrew/homebrew/wiki/Homebrew-and-Python](https://github.com/Homebrew/homebrew/wiki/Homebrew-and-Python). The normal `pip install --user` is disabled for brewed Python. This is because of a bug in distutils, because Homebrew writes a `distutils.cfg` which sets the package `prefix`. Fortunately, the fix is quite simple. If you've installed python via brew, you can safely remove the **--user**  flag, which instructs pip to install the package into the `~/Library/Python/<x>.<y>/lib/python/site-packages/` directory. Instead, pip will install the package into  `/usr/local/lib/python2.7/site-packages`, which shouldn't require root privileges.


### Configuring Vim

The final step is to configure Vim (or whatever else you'd like to user powerline for). If, like me, you use vim or macvim installed through brew, you may have to do one last step. In order for powerline to work, Vim needs to be compiled with python support. Brew does this automatically at install time howeve, it relies on the first version of python found in the user's $PATH when the program is installed. If you did not have brew installed python at the time you installed vim or macvim, you will need to reinstall these versions using something like  **brew reinstall macvim <insert options like --enable-lua>**. Vim will now be linked against the correct version of python and have access to the installed modules.


You should now be able to add the following lines to your vimrc file and bask in the glory of a nifty status bar
```
python from powerline.vim import setup as powerline_setup
python powerline_setup()
python del powerline_setup
```

Those are some of the things I learned while wrestling with brew and python for several hours. I have been using brew for a year or so prior to this without necessarily understanding some of the finer points of the system and no doubt had a lot of cruft on my machine as a result. Hopefully something in this post can save someone out there some time and/or headaches.
