'use strict'; // eslint-disable-line

const gulp = require( 'gulp' );
const webserver = require( 'gulp-webserver' );
const babel = require( 'babelify' );
const sourcemaps = require( 'gulp-sourcemaps' );
const browserify = require( 'browserify' );
const source = require( 'vinyl-source-stream' );
const uglify = require( 'gulp-uglify' );
const watchify = require( 'watchify' );
const vBuffer = require( 'vinyl-buffer' );

function build( src, dest, watch ) {
    let bundler = browserify( src, {
        debug: true,
    })
    .transform( babel.configure({
        presets: ['es2015'],
    }));
    if ( watch ) {
        bundler = watchify( bundler );
    }

    function rebundle() {
        return bundler.bundle()
        .on( 'error', err => {
            throw err;
        })
        .pipe( source( 'brinkbit-animation.min.js' ))
        .pipe( vBuffer())
        .pipe( sourcemaps.init({ loadMaps: true }))
        // .pipe( uglify())
        .pipe( sourcemaps.write( './' ))
        .pipe( gulp.dest( dest ));
    }

    if ( watch ) {
        bundler.on( 'update', rebundle );
    }

    return rebundle();
}

gulp.task( 'build debug', () => {
    return build([ 'debug/debug.js', 'src/index.js', 'src/letters.js' ], 'debug/bin', true );
});

gulp.task( 'webserver', ['build debug'], () => {
    return gulp.src([
        './',
    ])
    .pipe( webserver({
        livereload: true,
        fallback: 'debug/index.html',
    }));
});

gulp.task( 'debug', ['webserver']);
