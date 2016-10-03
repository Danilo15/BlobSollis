module.exports = function (gulp, concat) {
    gulp.task('concat:concat-css', function () {
        return gulp.src(['Content/bootstrap/bootstrap.css','Content/bootstrap/fileinput.css','Content/build/app.css'])
          .pipe(concat('bundle.css'))
          .pipe(gulp.dest('Content/build'));
    });

    gulp.task('concat:concat-js', function () {
        return gulp.src(['Scripts/vendors/jquery-2.2.1.js', 'Scripts/plugins/picturefill.js', 'node_modules/fastclick/lib/fastclick.js', 'Scripts/plugins/jquery.validate.js', 'Scripts/plugins/validationHelper.pt-BR.js', 'Scripts/vendors/browserDetection.js', 'Scripts/vendors/bootstrap.js', 'node_modules/underscore/underscore.js', 'node_modules/backbone/backbone.js', 'Scripts/vendors/bootbox.js', 'Scripts/vendors/mousetrap.min.js', 'Scripts/plugins/jquery.are-you-sure.js'])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('Scripts/build'));
    });
}