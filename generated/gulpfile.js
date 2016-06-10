const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const runSeq = require('run-sequence');
const sass = require('gulp-sass');
const livereload = require('gulp-livereload');
const rename = require('gulp-rename');
const mocha = require('gulp-mocha');
const babel = require('gulp-babel');

// Live reload
gulp.task('reload', function() {
    livereload.reload();
})

// Default
gulp.task('default', function() {
    livereload.listen();
    gulp.start('build');

    gulp.watch(['client/pre-build/app.js', 'client/pre-build/**/*.js'], function() {
        runSeq('buildJS', 'reload');
    });

    gulp.watch(['client/pre-build/app.scss', 'client/pre-build/**/*.scss'], function() {
        runSeq('buildCSS', 'reload');
    });

    // Reload when a template (.html) file changes.
    gulp.watch(['client/**/*.html', 'server/*.html'], ['reload']);

    gulp.watch(['server/**/*.js'], ['testServerJS']);

});


// Build tasks
//// Build all
gulp.task('build', function() {
    runSeq(['buildJS', 'buildCSS']);
});

gulp.task('buildJS', function() {
    return gulp.src(['./client/pre-build/app.js', './client/pre-build/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('build.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./client/build'));
});

gulp.task('buildCSS', function() {
    return gulp.src('./client/pre-build/app.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(rename('build.css'))
        .pipe(gulp.dest('./client/build'));
});


// Testing
gulp.task('testServerJS', function() {
    return gulp.src('./server/**/*.spec.js', {
            read: false
        })
        .pipe(mocha({
            reporter: 'spec'
        }));
});