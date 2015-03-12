'use strict';

// Load plugins
var gulp          = require('gulp');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var jshint        = require('gulp-jshint');
var stripdebug    = require('gulp-strip-debug');
var uglify        = require('gulp-uglify');
var rename        = require('gulp-rename');
var replace       = require('gulp-replace');
var concat        = require('gulp-concat');
var notify        = require('gulp-notify');
var minifycss     = require('gulp-minify-css');
var plumber       = require('gulp-plumber');
var gutil         = require('gulp-util');
var base64        = require('gulp-base64');
var imagemin      = require('gulp-imagemin');
var shell         = require('gulp-shell');
var svgstore      = require('gulp-svgstore');
var browsersync   = require('browser-sync');

// error function for plumber
var onError = function (err) {
  gutil.beep();
  console.log(err);
  this.emit('end');
};

// Browser definitions for autoprefixer
var AUTOPREFIXER_BROWSERS = [
  'last 3 versions',
  'ie >= 8',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// BrowserSync proxy
gulp.task('browser-sync', function() {
  browsersync({
    proxy: 'www.equal-partners.dev',
    port: 3000
  });
});

// CSS task
gulp.task('css', function() {
  return gulp.src('./scss/**/*.scss')
  .pipe(plumber({ errorHandler: onError }))
  .pipe(sass({ style: 'expanded' }))
  .pipe(gulp.dest('./css/'))
  .pipe(gulp.dest('./_site/css/'))
  .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
  .pipe(base64({ extensions:['svg'] }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(minifycss())
  .pipe(gulp.dest('./css/'))
  .pipe(gulp.dest('./_site/css/'))
  .pipe(browsersync.reload({ stream:true }))
  .pipe(notify({ message: 'Styles task done' }));
});

// Lint JS task
gulp.task('jslint', function() {
  return gulp.src('./js/modules/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(jshint.reporter('fail'))
  .pipe(notify({ message: 'Lint task done' }));
});

//Concatenate and Minify JS task
gulp.task('scripts', function() {
  return gulp.src(['./js/modules/**/*','./js/vendors/**/*','!./js/vendors/modernizr.min.js'])
  .pipe(concat('equal.js'))
  .pipe(gulp.dest('./js/'))
  .pipe(gulp.dest('./_site/js/'))
  .pipe(rename('equal.min.js'))
  .pipe(stripdebug())
  .pipe(uglify())
  .pipe(gulp.dest('./js/'))
  .pipe(gulp.dest('./_site/js/'))
  .pipe(browsersync.reload({ stream:true }))
  .pipe(notify({ message: 'Scripts task done' }));
});

// Jekyll build
gulp.task('jekyll', function () {
  return gulp.src('')
  .pipe(shell(['jekyll build']))
  .pipe(browsersync.reload({ stream:true }))
  .pipe(notify({ message: 'Jekyll task done' }));
});

// Optimize Images task
// (leave sprites untouched: otherwise it removes IDs etc)
gulp.task('img', function() {
  return gulp.src(['./img/**/*', '!./img/sprites/*'])
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [ {removeViewBox:false}, {removeUselessStrokeAndFill:false} ]
  }))
  .pipe(gulp.dest('./img/'));
});

// SVG sprite task
gulp.task('spritesvg', function () {
  return gulp.src('./img/svg/sprite_sources/*.svg')
  .pipe(svgstore())
  .pipe(rename("svgsprite.svg"))
  .pipe(gulp.dest('./img/sprites/'))
  .pipe(notify({ message: 'SVG task done' }));
});

//rename pngs for SVG4Everybody
/*gulp.task('spritesvg-png', function () {
  return gulp.src('./img/svg/sprite_sources/*.png')
  .pipe(rename({ prefix:'svgsprite.svg.' }))
  .pipe(gulp.dest('./img/sprites/'));
});*/

// Watch task
gulp.task('watch', ['browser-sync'], function () {
  gulp.watch('./scss/**/*', ['css']);
  gulp.watch('./js/**/*', ['jslint', 'scripts']);
  gulp.watch(['_collaborators/**/*','_includes/**/*','_layouts/**/*','fr/**/*','nl/**/*','index.html'], ['jekyll']);
});

// Tasks
gulp.task('default', ['css', 'jslint', 'scripts', 'jekyll']);
gulp.task('images', ['img']);
gulp.task('svg', ['spritesvg']);
