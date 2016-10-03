module.exports = function (gulp, utf8Convert) {
    gulp.task('utf8-convert:convert', function () {
        gulp.src("./Scripts/build/*.js")
            .pipe(utf8Convert({
                encNotMatchHandle: function (file) {
                    console.log(file);
                }
            }))
            .pipe(gulp.dest('./Scripts/build'));
    });
}