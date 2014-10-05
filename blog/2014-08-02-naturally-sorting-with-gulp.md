---
title: "Naturally Sorting a Filestream with Gulp"
layout: "post"
date: "2014-08-02 13:54:00"
description: 
tags: [gulp, npm, plugins]
---

Recently, I've been developing a custom static site generator using
[gulp](http://gulpjs.com/). Among other things, one of the requirements of the
site is to automatically process multiple markdown files into webpages for
inclusion on the site. As an author of long markdown documents, it's often
convenient to split these documents into multiple files and give them names
with numbers to signify what order they should be assembled then. This presents
a problem, however, because computer programs tend to sort strings in
[ASCIIbetical order](http://en.wikipedia.org/wiki/ASCII#Order) meaning they are
sorted by comparing character ASCII values to each other.

```bash
$ ls -1
part-1.md
part-10.md
part-2.md
part-3.md
part-4.md
part-5.md
part-6.md
part-7.md
part-8.md
part-9.md
```

When we try and feed these files through our gulp pipeline, `part-10.md` will
be inserted between `part-1.md` and `part-2.md`. The way to get around this
problem is by using something called a "natural sort" which attempts to sort
names in way a human would do so. There are many different implementations of
this sort that will try to recognize all sorts of things from dates and times
to IP addresses. The sort is not always perfect but for my purposes of sorting
alphanumeric strings in a logical way, it works just fine.

In order to incorporate this sort into my gulp pipeline, I created a quick gulp
plugin that when applied to a stream, will re-emit the files in a naturally
sorted way. It uses the
[natural-compare-lite](https://www.npmjs.org/package/natural-compare-lite)
library but can be easily modified to use any other sorting algorithm.

Head on over to [npm](https://www.npmjs.org/package/gulp-natural-sort) to check
it out or view the source code over at
[github](https://github.com/emgeee/gulp-natural-sort).
