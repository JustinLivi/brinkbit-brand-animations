'use strict'; // eslint-disable-line

const gulp = require( 'gulp' );
const webserver = require( 'gulp-webserver' );
const brinkbuild = require( 'brinkbit-gulp-build' );

gulp.task( 'build', () => brinkbuild.buildJs( 'debug/debug.js' ));

gulp.task( 'webserver', ['build'], () => {
    return gulp.src([
        './',
    ])
    .pipe( webserver({
        livereload: true,
        fallback: 'debug/index.html',
    }));
});

gulp.task( 'debug', ['webserver']);
