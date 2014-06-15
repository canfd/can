/*
 * can
 *
 * Copyright(c) 2014 André König <andre.koenig@konexmedia.com>
 * MIT Licensed
 *
 */

/**
 * @author André König <andre.koenig@konexmedia.com>
 *
 */

'use strict';

var gulp = require('gulp');
var sequence = require('run-sequence');
var jshint = require('gulp-jshint');
var karma = require('gulp-karma');
var rimraf = require('gulp-rimraf');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var header = require('gulp-header');

var pkg = require('./package.json');

var paths = {};

var banner = ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version v<%= pkg.version %>',
        ' * @author <%= pkg.author.name %> (<%= pkg.author.email %>)',
        ' * @license <%= pkg.license %>',
        ' *',
        ' */', ''].join('\n');

paths.sources = ['./lib/**/*.js', './specs/**/*.js', 'gulpfile.js', 'karma.conf.js'];
paths.specs   = ['./specs/**/*.spec.js'];

paths.lib = [
    './lib/index.js'
];

gulp.task('lint', function () {
    return gulp.src(paths.sources)
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter('default'));
});

gulp.task('test', function () {
    return gulp.src(paths.lib.concat(paths.specs))
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }));
});

gulp.task('clean', function () {
    return gulp.src(paths.build)
        .pipe(rimraf());
});

gulp.task('build', function () {
    var source = './lib/index.js';

    sequence('clean', function () {
        return gulp.src(source)
            .pipe(rename(pkg.name + '.js'))
            .pipe(header(banner, {pkg : pkg}))
            .pipe(gulp.dest(paths.build));        
    });
    
    sequence('clean', function () {
        return gulp.src(source)
            .pipe(rename(pkg.name + '.min.js'))
            .pipe(uglify())
            .pipe(header(banner, {pkg : pkg}))
            .pipe(gulp.dest(paths.build));
    });
});

gulp.task('default', ['lint', 'test', 'build']);