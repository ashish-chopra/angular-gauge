/*
       File: gulpfile.js
       Author: Ashish Chopra
       Updated on: 21 may, 2016
       -----------------------------------------
 
       gulpfile.js is a build automation script for front-end
       web app project structure. It supports both development
       and production level build lifecycle.
       
       Development lifecycle supports copying assets, linting, CSS precompiling,
       copying templates and HTML and live reloading on any changes.
       
       Prod lifecycle generates an optimized build in which code is minified, images are 
       optimized etc.
       
       This build script can be used with following commands:
       gulp                    -- default task used during development, switches on live reloading.
       gulp clean              -- cleans the output of last build inside `dist` folder
       gulp build:[options]    -- builds the code for defined options {dev | prod}.
       gulp test               -- executes the test cases (coming soon)
       gulp serve              -- It hosts the `dist` folder on a server at port 3000 (default)
       
       NOTE: Some commands mentioned above are not working right now. 
       For more read the FUTURE WORK section. These are added on NEED BASIS.   
    
       FUTURE WORK
       1. Support for eslinting.
       2. Support for Unit Testing
       3. Support for developing production ready builds.
       4. Refactoring using gulp-load-plugins.
       5. Adding a version.txt file during build generation. [Done]
       6. Fixing linking errors of sourcemaps
       7. JS loading using requireJS or browserify.
       
 */



/* IMPORT USED PACAKGES */

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    mbf = require('main-bower-files'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    sourcemap = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    runSequence = require('run-sequence'),
    source = require('vinyl-source-stream'),
    configs = require('./package.json');



/* DEFINE PATH AND GLOBAL CONSTANTS */
var port = 3000,
    path = {
        bower: 'bower_components',
        scripts: "src/scripts/**",
        templates: "src/templates/**",
        scss: "src/scss/**/*.scss",
        styles: "src/scss/**/*.scss",
        index: "src/*.html",
        assets: "src/assets/**",
		data: "src/data/**",
        vendor: 'dist/vendor',
        css: 'dist/css',
        dist: "dist",
        root: "dist",
        versionFile: 'version.txt'
    },
    sassOptions = {
        errLogToConsole: true,
        outputStyle: 'compressed'
    },
    autoprefixerOptions = {
        browsers: ['last 2 versions']
    },
    BUILD_TYPE = {
        PROD: "Production",
        DEV: "Development"
    },
    buildType = BUILD_TYPE.PROD; // holds the type of build 'development' or 'production'


/* DEFINING SUB TASKS */


// copy the static content like images
// and fonts in dist location
gulp.task('statics', function () {
    return gulp.src([path.assets], {
            base: 'src'
        })
        .pipe(gulp.dest(path.dist))
        .pipe(connect.reload());
});

// process the index html and templates
gulp.task('html', function () {
    return gulp.src([path.index, path.templates], {
            base: 'src'
        })
        .pipe(gulp.dest(path.dist))
        .pipe(connect.reload());
});

// process dummy data files 
gulp.task('data', function () {
    return gulp.src(path.data, {
            base: 'src'
        })
        .pipe(gulp.dest(path.dist))
        .pipe(connect.reload());
});

// process sass and generate autoprefixed CSS and sourcemaps
// ERROR: sourcemaps linking is an issue in chromeDevTools. Fix needed.
gulp.task('css', function () {
    return gulp.src(path.scss, {
            base: 'src/scss'
        })
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(sourcemap.init())
        .pipe(sass(sassOptions))
        .pipe(sourcemap.write({
            includeContent: false,
            sourceRoot: 'src/scss/'
        }))
        .pipe(sourcemap.init({
            loadMaps: true
        }))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemap.write('./'))
        .pipe(gulp.dest(path.css))
        .pipe(connect.reload());

});

// process domain scripts
gulp.task('js', function () {
    return gulp.src(path.scripts, {
            base: 'src'
        })
        .pipe(gulp.dest(path.dist))
        .pipe(connect.reload());
});

//process vendor scripts and styles
gulp.task('vendor', function () {
    return gulp.src(mbf(), {
            base: path.bower
        })
        .pipe(gulp.dest(path.vendor));
});

// watching the changes and fire up the tasks
gulp.task('watch', function () {
    // watching static content
    gulp.watch(path.assets, ['statics']);
    // watching html
    gulp.watch([path.index, path.templates], ['html']);
    //watching css
    gulp.watch(path.styles, ['css']);
    //watching scripts
    gulp.watch(path.scripts, ['js']);
	//watching data
    gulp.watch(path.data, ['data']);

});

// connects the server at given port and root.
// enables the live reloading.
gulp.task('connect', function () {
    return connect.server({
        livereload: true,
        root: path.root,
        port: port
    });
})

// tagging a version with the build just created
gulp.task('version-tag', function () {
    var template =  " --------------------- Build Details -------------------- \r\n" +
                    " build type : " + buildType + "\r\n" +
                    " created on : " + new Date() + "\r\n" +
                    " version: " + configs.version + "\r\n" +
                    " --------------------------------------------------------";
    
    var stream = source(path.versionFile);
    stream.write(template);
    stream.pipe(gulp.dest(path.dist));
});

//cleans the dist location
function cleanTask() {
    return gulp.src(path.dist, {
            read: false
        })
        .pipe(clean());
}

function defaultTask() {
    runSequence('clean', 'common', 'connect', 'watch');
}

function buildDevTask() {
    buildType = BUILD_TYPE.DEV;
    runSequence('clean', 'common', 'version-tag');
}

function buildProdTask() {
    buildType = BUILD_TYPE.PROD;
    console.log('coming soon.');
}

/* DEFINE CUSTOM TASK CHAINING */

gulp.task('clean', cleanTask);
gulp.task('default', defaultTask);
gulp.task('build:dev', buildDevTask);
gulp.task('build:prod', buildProdTask);
gulp.task('common', ['statics', 'vendor', 'html', 'css', 'js', 'data']);
gulp.task('test', []);
gulp.task('serve', ['connect']);