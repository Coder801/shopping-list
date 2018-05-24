const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const rimraf = require('gulp-rimraf');
const connect = require('gulp-connect');

const PATH = {
  src: {
    js: './src/js/*.js',
    css: './src/css/*.scss',
    html: './src/html/*.html'
  },
  dist: {
    js: './dist/js/',
    css: './dist/css/',
    html: './dist/'
  },
  watch: {
    js: './src/js/*.js',
    css: './src/css/*.scss',
    html: './src/html/*.html'
  }
}

gulp.task('js', function() {
  return gulp.src(PATH.src.js)
    .pipe(babel({
      presets: 'env'
    }))
    .pipe(gulp.dest(PATH.dist.js))
    .pipe(connect.reload());
});

gulp.task('css', function() {
  return gulp.src(PATH.src.css)
    .pipe(sass())
    .pipe(gulp.dest(PATH.dist.css))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  return gulp.src(PATH.src.html)
    .pipe(gulp.dest(PATH.dist.html))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(PATH.watch.js, ['js']);
  gulp.watch(PATH.watch.css, ['css']);
  gulp.watch(PATH.watch.html, ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('clear', function() {
 return gulp.src('./dist', {
     read: false
   })
   .pipe(rimraf());
});

gulp.task('default', ['connect', 'html', 'js', 'css', 'watch']);
