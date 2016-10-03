module.exports = function (gulp, cssmin) {
    gulp.task('cssmin:minify', function () {
        gulp.src('Content/build/*.css')
            .pipe(cssmin())
            .pipe(gulp.dest('Content/build'));
        gulp.src('Content/plugins/*.css')
            .pipe(cssmin())
            .pipe(gulp.dest('Content/build'));
        gulp.src('Content/skin-vista/*.css')
            .pipe(cssmin())
            .pipe(gulp.dest('Content/build'));
        gulp.src('Content/controls/*.css')
            .pipe(cssmin())
            .pipe(gulp.dest('Content/build'));
    });
}