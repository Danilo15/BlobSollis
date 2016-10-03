module.exports = function (gulp, watch) {
    gulp.task('watch:stream', function () {
        gulp.watch('Scripts/app/**/*.js').on('change', function (file) {
            gulp.start('requirejs');
        });

        gulp.watch('Content/**/*.scss').on('change', function (file) {
            gulp.start('sass');
        })
    });

    gulp.task('watchOneFile:main', function () {
        var fnJS = function (file) {
            var splited = file.path.split('\\'),
                id = splited.length - 1,
                newFile = splited[id].split('.')[0],
                ext = splited[id].split('.')[1],
                task = 'requirejs:' + newFile.replace('-main', '');

            if (ext === "js" && newFile.indexOf('-build') == -1) {
                console.log(task);
                gulp.start(task);
            }
        }

        gulp.watch('Scripts/app/views/*.js').on('change', function (file) {
            fnJS(file);
        });

        gulp.watch('Scripts/app/views/adm/*.js').on('change', function (file) {
            fnJS(file);
        });

        gulp.watch('Content/**/*.scss').on('change', function (file) {
            gulp.start('sass');
        })
    });
}