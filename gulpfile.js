'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var debug = require('gulp-debug');


var paths = {
  scss: 'app/styles/*.scss',
  js: 'app/scripts/**/*.js',
  images: 'app/images/',
  html: 'app/**/*.html',

  output: 'public/'
};

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: paths.output
    }
  });
});

gulp.task('css', function() {
  gulp.src(paths.scss)
    .pipe(sass())
    .pipe(gulp.dest(paths.output+'styles/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js', function() {
  gulp.src(paths.js)
    .pipe(gulp.dest(paths.output+'scripts/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('templates', function() {
  gulp.src(paths.html)
    .pipe(gulp.dest(paths.output))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('images', function() {
  gulp.src(paths.images)
    .pipe(gulp.dest(paths.output+'images/'));
});

gulp.task('build', ['css','js','templates','images']);

gulp.task('default', ['build','browser-sync'], function() {
  gulp.watch(paths.scss, ['css']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.html, ['templates']);

});

