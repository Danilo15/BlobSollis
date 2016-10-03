module.exports = function (gulp, jshint) {
    gulp.task('jshint:lint', function () {
        return gulp.src('Scripts/app/**/*.js')
            .pipe(jshint({laxcomma:true}))
            .pipe(jshint.reporter())
    });
}