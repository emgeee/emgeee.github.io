'use strict';

var gulp = require('gulp');
var fs = require('fs');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var ngAnnotate = require('gulp-ng-annotate');

var marked = require('gulp-marked');
var fm = require('front-matter');
var data = require('gulp-data');
var swig = require('gulp-swig');
var rename = require('gulp-rename');

var plumber = require('gulp-plumber');
var size = require('gulp-size');
var debug = require('gulp-debug');

var paths = {
  scss: 'app/styles/*.scss',
  js: 'app/scripts/**/*.js',
  images: 'app/images/**',
  html: 'app/**/*.html',

  blog: 'blog/*.md',

  output: 'public/'
};

var pureCssFiles = [
  'base.css',
  'grids-responsive.css',
  'menus.css'
];


gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: paths.output
    }
  });
});

gulp.task('css', function() {
  gulp.src(paths.scss)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(paths.output+'styles/'))
    .pipe(autoprefixer())
    .pipe(size({title: 'main.css'}))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js', function() {
  gulp.src(paths.js)
    .pipe(plumber())
    .pipe(ngAnnotate())
    .pipe(gulp.dest(paths.output+'scripts/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('templates', function() {
  gulp.src(paths.html)
    .pipe(plumber())
    .pipe(gulp.dest(paths.output))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('images', function() {
  gulp.src(paths.images)
    .pipe(gulp.dest(paths.output+'images/'));
});

function generateFileName(title) {
  return title.replace(/\W+|\s+/g, '-').toLowerCase();
}

gulp.task('blog', function() {

  var posts = [];

  gulp.src(paths.blog)
    .pipe(data(function(file) {

      var content = fm(String(file.contents));
      var d = content.attributes;
      d.date = Date.parse(d.date);
      d.fileName = d.file_name || generateFileName(d.title);

      posts.push(d);

      file.contents = new Buffer(content.body);
      return d;
    }))
    .pipe(marked({
      highlight: function(code) {
        return require('highlight.js').highlightAuto(code).value;
      },
      langPrefix: 'hljs ',
      smartypants: true
    }))
    .pipe(rename(function(path){
      path.basename = posts[posts.length-1].fileName;
    }))
    .pipe(gulp.dest(paths.output+'posts/'))
    .on('end', function() {
      posts.sort(function(a,b) {
        return b.date - a.date;
      });
      fs.writeFileSync(paths.output+'posts.json', JSON.stringify(posts, null, '  '));
    })
    .on('error', function(err) {
      console.log('Error', err);
    });
});

gulp.task('build', ['css','js','templates','images','blog']);

gulp.task('default', ['build','browser-sync'], function() {
  gulp.watch(paths.scss, ['css']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.html, ['templates']);

  gulp.watch(paths.blog, ['blog']);

});

