/*
       File: gulpfile.js
       Author: Ashish Chopra
       Updated on: 21 may, 2016
       --------------------------------------
       Gulpfile.js is customized for library development process for
       writing front end libraries in JavaScript.
       
       TODO:
       1. Adding the test framework support
       2. Adding the code coverage support
       3. Add the build assets support 
       4. Utilize jshint and jscs tasks written below.
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
        pkg = require('./package.json');

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
        return gulp.src('src/angular-gauge.js')
            .pipe(header(banner, {
                pkg: pkg
            }))
            .pipe(gulp.dest('./dist'))
            .pipe(gulp.dest('./examples/'));
    });

    gulp.task('js', ['bower'], function () {
        return gulp.src('src/angular-gauge.js')
            .pipe(header(banner, {
                pkg: pkg
            }))
            .pipe(rename('angular-gauge.min.js'))
            .pipe(sourcemaps.init())
            .pipe(uglify({
                preserveComments: 'license'
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist/'))
            // .pipe(gulp.dest('./examples/'))
            .pipe(connect.reload());
    });

    gulp.task('watch', function () {
        gulp.watch('src/*.js', ['js']);
        gulp.watch('./examples/**/*.*', ['reload'])
    });

    gulp.task('default', sequence('clean', 'js', 'connect', 'watch'));

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
    })

})();