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
       gulp connect -- hosts the examples directory at http://localhost:3000/
       
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
        ' * @license <%= pkg.name %> - <%= pkg.description %>',
        ' * <%= pkg.homepage %>',
        ' * version: <%= pkg.version %>',
        ' *',
        ' * Copyright (c) 2016-2017 Ashish Chopra',
        ' * Released under the <%= pkg.license %> license',
        ' * https://github.com/ashish-chopra/angular-gauge/blob/master/LICENSE',
        ' */',
        ''
      ].join('\n');

    gulp.task('clean', () => {
        return gulp.src('./dist/*', {
                read: false
            })
            .pipe(clean());
    });

    gulp.task('lint', () => {
        return gulp.src('src/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter());
    });

    gulp.task('style', () => {
        return gulp.src('**/*.js')
            .pipe(jscs());
    });


    gulp.task('js', () => {
        return gulp.src('src/angularjs-gauge.js')
            .pipe(gulp.dest('./dist/'))
            .pipe(rename('angularjs-gauge.min.js'))
            .pipe(sourcemaps.init())
            .pipe(uglify({
                preserveComments: 'license'
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist/'))
            .pipe(gulp.dest('./examples/'))
            .pipe(connect.reload());
    });

    gulp.task('watch', () => {
        gulp.watch('src/*.js', ['js']);
        gulp.watch('./examples/**/*.*', ['reload']);
    });

    gulp.task('default', sequence('clean', 'lint', 'style', 'js', 'connect', 'watch'));
    gulp.task('build', sequence('clean', 'lint', 'style', 'js'));

    // connects the server at given port and root.
    // enables the live reloading.
    gulp.task('connect', () => {
        return connect.server({
            livereload: true,
            root: './examples/',
            port: port
        });
    });

    gulp.task('reload', () => {
        return gulp.src('./examples/**/*.*')
            .pipe(connect.reload());
    });

    // run tests once and exit
    gulp.task('test', ['build'], (done) => {
        return new KarmaServer({
            configFile: __dirname + '/karma.conf.js',
            singleRun: true
        }, done).start();
    });

    
    // Watch for file changes and re-run tests on each change
    gulp.task('tdd', ['lint'], (done) => {
        new KarmaServer({
            configFile: __dirname + '/karma.conf.js'
        }, done).start();
    });

    gulp.task('prepublish', function() {
        return gulp.src(['./dist/angularjs-gauge.js', './dist/angularjs-gauge.min.js'], {base: 'dist'})
        .pipe(header(banner, {
                pkg: pkg
            }))
        .pipe(gulp.dest('./dist/'));
    });
})();