var config = require('./package.json'),
    gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(['*.html', '*.css', "*.js"], reload);
});
