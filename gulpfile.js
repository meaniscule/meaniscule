var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var runSeq = require('run-sequence');


gulp.task('default', function() {
	gulp.start('build');
});

gulp.task('build', function() {
	runSeq(['buildJS', 'buildCSS']);
});

gulp.task('buildJS', function () {
    return gulp.src(['./public/app/app.js', './public/app/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public'));
});

gulp.task('buildCSS', function() {
  // place code for your default task here
});



