/*
       File: gulpfile.js
       Author: Ashish Chopra
       Updated on: 17 Nov, 2016
       --------------------------------------
       Gulpfile.js is customized for library development process for
       writing front end libraries in JavaScript.
       
       TODO:
       1. Adding the code coverage support
       
       Usage:       
       gulp build -- to build the library from source in 'dist/'
       gulp   -- to builds the code, start the server and watch for changes in code and examples..
       gulp test  -- run the test suite and exit
       gulp tdd   -- run the test suite and wait for changes in any code/test files
       
 */

(function () {
    'use strict';

    var gulp = require('gulp'),
        header = require('gulp-header'),
        jshint = require('gulp-jshint'),
        jscs = require('gulp-jscs'),
        clean = require('gulp-clean'),
        connect = require('gulp-connect'),
        rename = require('gulp-rename'),
        uglify = require('gulp-uglify'),
        sourcemaps = require('gulp-sourcemaps'),
        sequence = require('gulp-sequence'),
        pkg = require('./package.json'),
        KarmaServer = require('karma').Server;

    var port = 3000,
        banner = ['/*!',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * <%= pkg.homepage %>',
        ' * Version: <%= pkg.version %>',
        ' *',
        ' * Copyright 2016 Ashish Chopra',
        ' * Released under the <%= pkg.license %> license',
        ' * https://github.com/ashish-chopra/angular-gauge/blob/master/LICENSE',
        ' */',
        ''
      ].join('\n');

    gulp.task('clean', function () {
        return gulp.src('./dist/*', {
                read: false
            })
            .pipe(clean());
    });

    gulp.task('lint', function () {
        return gulp.src('**/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter());
    });

    gulp.task('style', function () {
        return gulp.src('**/*.js')
            .pipe(jscs());
    });

    gulp.task('bower', function () {
        return gulp.src('src/angularjs-gauge.js')
            .pipe(header(banner, {
                pkg: pkg
            }))
            .pipe(gulp.dest('./dist'))
            .pipe(gulp.dest('./examples/'));
    });


    gulp.task('js', ['bower'], function () {
        return gulp.src('src/angularjs-gauge.js')
            .pipe(header(banner, {
                pkg: pkg
            }))
            .pipe(rename('angularjs-gauge.min.js'))
            .pipe(sourcemaps.init())
            .pipe(uglify({
                preserveComments: 'license'
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist/'))
            .pipe(connect.reload());
    });

    gulp.task('watch', function () {
        gulp.watch('src/*.js', ['js']);
        gulp.watch('./examples/**/*.*', ['reload']);
    });

    gulp.task('default', sequence('clean', 'lint', 'style', 'js', 'connect', 'watch'));
    gulp.task('build', sequence('clean', 'lint', 'style', 'js'));

    // connects the server at given port and root.
    // enables the live reloading.
    gulp.task('connect', function () {
        return connect.server({
            livereload: true,
            root: './examples/',
            port: port
        });
    });

    gulp.task('reload', function () {
        return gulp.src('./examples/**/*.*')
            .pipe(connect.reload());
    });

    // run tests once and exit
    gulp.task('test', function (done) {
        new KarmaServer({
            configFile: __dirname + '/karma.conf.js',
            singleRun: true
        }, done).start();
    });

    
    // Watch for file changes and re-run tests on each change
    gulp.task('tdd', function (done) {
        new KarmaServer({
            configFile: __dirname + '/karma.conf.js'
        }, done).start();
    });

})();