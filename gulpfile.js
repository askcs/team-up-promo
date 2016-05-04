var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var connect = require('gulp-connect');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var reload = browserSync.reload;
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var glob       = require('glob');
var uglify = require('gulp-uglify');
var port = '4000';
var indexFile = 'indexTeamTelefoon.html';

gulp.task('sass', function ()
{
  return gulp.src('sass/main.scss')
    .pipe(sass({style: 'expanded'}))
    .pipe(autoprefixer('last 2 version'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('promo/css'))
    .pipe(reload({stream: true}));
});

//wrong order
gulp.task('scripts', function (cb) {
  glob('promo/**/*.js', {}, function (err, files)
  {
   var b = browserify();
   files.forEach(function (file) {
    b.add(file);
   });
   b.bundle()
     .pipe(source('app.js'))
     .pipe(buffer())
     .pipe(uglify())
     .pipe(gulp.dest('promo/dist'));
     cb();
   });
 });

gulp.task('serve', ['sass'], function(){
  browserSync.init(startBrowserSync());

  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('*.html').on('change', reload);
});

gulp.task('build', ['sass']);
gulp.task('default', ['serve']);


//////////////////////////////////////////////////////
function startBrowserSync()
{
  if(browserSync.active)
  {
    return;
  }

  return {
    server: {
      baseDir: './',
      index: indexFile
    },
    port: port,
    ghostMode: {
      clicks: true,
      location: false,
      forms: true,
      scroll: true
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'gulp-patterns',
    notify: true,
    reloadDelay: 1000
  };
}