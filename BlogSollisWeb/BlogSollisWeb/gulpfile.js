var globalConfig = {
    appSrc: 'scripts/app',
    utilidadesSrc: 'scripts/app/utilidades',
    masterSrc: 'scripts/app/master',
    masterAdmSrc: 'scripts/app/masterAdm',
    viewsSrc: 'Scripts/app/views',
    vendorsSrc: 'scripts/vendors',
    routersSrc: 'scripts/app/routers',
    controlsSrc: 'Scripts/app/controls',
    pluginsSrc: 'scripts/plugins',
    buildSrc: 'scripts/build',
    optimize: 'none'
};

var paths = {
    jquery: 'Scripts/vendors/jquery-2.1.3.min',
    backbone: 'empty:',
    underscore: 'empty:',
    app: globalConfig.appSrc,
    plugins: globalConfig.pluginsSrc,
    utilidades: globalConfig.utilidadesSrc,
    master: globalConfig.masterSrc,
    masterAdm: globalConfig.masterAdmSrc,
    views: globalConfig.viewsSrc,
    routers: globalConfig.routersSrc,
    controls: globalConfig.controlsSrc,
    build: globalConfig.buildSrc,
    vendors: globalConfig.vendorsSrc
};

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    requirejs = require('gulp-requirejs-optimize'),
    sass = require('gulp-ruby-sass'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
    scsslint = require('gulp-scss-lint')
    runSequence = require('run-sequence');

//PROD & DEV
gulp.task('prod-build', ['prodsub']);

gulp.task('prodsub', function (callback) {
    runSequence('sass-min:concat', 'requirejs-prod', 'uglify');
})

gulp.task('devsub', ['copy', 'sass:concat', 'requirejs']);
gulp.task('dev-build', ['devsub']);
//FIM PROD & DEV

//ESTA É UMA FORMA NA QUAL O CONCAT SO IRÁ RODAR APÓS O TERMINO DA TASK SASS

gulp.task('sass:concat', ['sass'], function () {
    gulp.start('concat');
})

gulp.task('sass-min:concat', ['sass'], function () {
    gulp.start('concat');
    gulp.start('cssmin');
})

//FIM ESTA É UMA FORMA NA QUAL O CONCAT SO IRÁ RODAR APÓS O TERMINO DA TASK SASS

//SCSS LINT
require('./GulpTasks/scsslint.js')(gulp, scsslint);
gulp.task('scss-lint', ['scss-lint:main']);
//FIM SCSS LINT

//JSHINT
require('./GulpTasks/jshint.js')(gulp, jshint);
gulp.task('jshint', ['jshint:lint']);
//FIM JSHINT

//CONCAT
require('./GulpTasks/concat')(gulp, concat);
gulp.task('concat', ['concat:concat-css', 'concat:concat-js']);
//FIMCONCAT

//CSSMIN
require('./GulpTasks/cssmin')(gulp, cssmin);
gulp.task('cssmin', ['cssmin:minify']);
//FIMCSSMIN

//REQUIREJS
require('./GulpTasks/requirejs')(gulp, requirejs, globalConfig, paths);
gulp.task('requirejs-prod', function () {
    globalConfig.optimize = 'uglify';
    gulp.start('requirejs');
})
gulp.task('requirejs', ['requirejs:home', 'requirejs:login', 'requirejs:help', 'requirejs:esqueciminhasenha', 'requirejs:trocarsenha']);
//FIM REQUIREJS

//SASS
require('./GulpTasks/sass')(gulp, sass);
gulp.task('sass', ['sass:main']);
//FIM SASS

//COPY
require('./GulpTasks/copy')(gulp);
gulp.task('copy', ['copy:css', 'copy:js']);
//FIM COPY

//UGLIFY
require('./GulpTasks/uglify')(gulp, uglify);
gulp.task('uglify', ['uglify:compress']);
//FIM UGLIFY

//WATCH
require('./GulpTasks/watch')(gulp, watch);
gulp.task('watch', ['watch:stream']);
//FIM WATCH

//WATCHONEFILE
gulp.task('watchOneFile', ['watchOneFile:main']);
//FIM WATCHONEFILE