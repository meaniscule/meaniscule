var gulp = require('gulp');
var run = require('gulp-run');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var runSeq = require('run-sequence');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var mocha = require('gulp-mocha');


// Default
gulp.task('default', function() {
	gulp.start('build');

	gulp.watch(['./public/app/app.js', './public/app/**/*.js'], function () {
        runSeq('buildJS');
    });

    gulp.watch(['./public/app/app.scss', './public/app/**/*.scss'], function () {
        runSeq('buildCSS');
    });
});


// Database seed
gulp.task('seedDB', function() {
    run('node seed.js').exec();
});


// Build tasks
//// Build all
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

gulp.task('buildCSS', function () {
    return gulp.src('./public/app/app.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(rename('main.css'))
        .pipe(gulp.dest('./public'));
});


// Testing
gulp.task('testServerJS', function() {
    return gulp.src('./public/app/**/*.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});