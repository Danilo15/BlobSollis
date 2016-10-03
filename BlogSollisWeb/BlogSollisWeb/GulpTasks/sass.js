module.exports = function (gulp, sass) {
    var sassConfig = { controls: 'Content/controls', help: 'Content/help.scss', app: 'Content/app.scss', fromFodler: 'Content/views/', destFolder: 'Content/build' };

    gulp.task('sass:main', function () {
        sass(sassConfig.app)
    .pipe(gulp.dest(sassConfig.destFolder));

        sass(sassConfig.controls)
    .pipe(gulp.dest(sassConfig.destFolder));

        sass(sassConfig.help)
    .pipe(gulp.dest(sassConfig.destFolder));

        return sass(sassConfig.fromFodler)
    .pipe(gulp.dest(sassConfig.destFolder));
    });
}