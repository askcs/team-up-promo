var gulp = require('gulp');
var sourcemaps   = require('gulp-sourcemaps');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');

gulp.task('styles', function ()
{
  gulp.src('sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('promo/css'))
    .pipe(connect.reload())
});

gulp.task('watch', function(){
  gulp.watch('./styles/**/*.scss', ['css']);
  gulp.watch('*.html', ['html']);
});

gulp.task('connect', function() {
  connect.server({livereload: true});
})

gulp.task('build', ['styles'])
gulp.task('default', ['build', 'connect', 'watch']);