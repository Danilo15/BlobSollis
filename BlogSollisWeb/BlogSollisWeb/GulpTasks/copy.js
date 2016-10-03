module.exports = function (gulp) {
    var files =
       ['scripts/build/bundle.js',
        'scripts/vendors/select2.js',
        'scripts/vendors/jquery.2.1.3.min.js',
        'scripts/plugins/jquery.cep-1.0.js',
        'scripts/plugins/bootstrap-datepicker.js',
        'scripts/plugins/locales/bootstrap-datepicker.pt-BR.js',
        'scripts/plugins/fileupload/fileinput.js',
        'scripts/plugins/jquery-ui-1.11.4.js',
        'scripts/plugins/jquery.validate.js',
        'scripts/vendors/bootbox.js',
        'scripts/plugins/jquery.dynatree.js',
        'scripts/plugins/validationHelper.js',
        'scripts/plugins/toastr.js',
        'scripts/plugins/fileinput_locale_pt-BR.js',
        'scripts/plugins/validationHelper.en-US.js',
        'scripts/plugins/validationHelper.es-AR.js',
        'scripts/plugins/validationHelper.pt-BR.js',
        'scripts/plugins/typeahead.jquery.js',
        'scripts/vendors/require.js'];

    gulp.task('copy:js', function () {
        return gulp.src(files)
          .pipe(gulp.dest('Scripts/build'));
    });

    gulp.task('copy:css', function () {
        gulp.src('Content/build/*.css')
            .pipe(gulp.dest('Content/build'));
        gulp.src('Content/plugins/*.css')
            .pipe(gulp.dest('Content/build'));
        gulp.src('Content/skin-vista/*.css')
            .pipe(gulp.dest('Content/build'));
        gulp.src('Content/controls/*.css')
            .pipe(gulp.dest('Content/build'));
    });
}