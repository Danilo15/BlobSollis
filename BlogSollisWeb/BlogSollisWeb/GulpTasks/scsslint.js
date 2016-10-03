module.exports = function (gulp, scsslint) {

    gulp.task('scss-lint:main', function () {
        return gulp.src('Content/views/**/*.scss')
          .pipe(scsslint());
    });
};