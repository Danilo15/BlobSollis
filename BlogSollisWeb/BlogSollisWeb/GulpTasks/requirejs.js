module.exports = function (gulp, requirejs, globalConfig, paths) {
    //HOME
    gulp.task('requirejs:home', function () {
        return gulp.src('Scripts/app/views/home-main.js')
            .pipe(requirejs(function (file) {
                return {
                    name: 'Scripts/app/views/home-main',
                    out: 'Scripts/build/home.js',
                    baseUrl: '',
                    optimizeAllPluginResources: true,
                    noGlobal: true,
                    optimize: globalConfig.optimize,
                    mainConfigFile: 'Scripts/app/views/home-main.js',
                    allowSourceOverwrites: false,
                    paths: paths
                };
            }))
            .pipe(gulp.dest('./'));
    });

    //LOGIN
    gulp.task('requirejs:login', function () {
        return gulp.src('Scripts/app/views/login-main.js')
            .pipe(requirejs(function (file) {
                return {
                    name: 'Scripts/app/views/login-main',
                    out: 'Scripts/build/login.js',
                    baseUrl: '',
                    optimizeAllPluginResources: true,
                    noGlobal: true,
                    optimize: globalConfig.optimize,
                    mainConfigFile: 'Scripts/app/views/login-main.js',
                    allowSourceOverwrites: false,
                    paths: paths
                };
            }))
            .pipe(gulp.dest('./'));
    });

    //HELP
    gulp.task('requirejs:help', function () {
        return gulp.src('Scripts/app/help-main.js')
            .pipe(requirejs(function (file) {
                return {
                    name: 'Scripts/app/help-main',
                    out: 'Scripts/build/help.js',
                    baseUrl: '',
                    optimizeAllPluginResources: true,
                    noGlobal: true,
                    optimize: globalConfig.optimize,
                    mainConfigFile: 'Scripts/app/help-main.js',
                    allowSourceOverwrites: false,
                    paths: paths
                };
            }))
            .pipe(gulp.dest('./'));
    });

    //TROCARSENHA
    gulp.task('requirejs:trocarsenha', function () {
        return gulp.src('Scripts/app/views/trocarsenha-main.js')
            .pipe(requirejs(function (file) {
                return {
                    name: 'Scripts/app/views/trocarsenha-main',
                    out: 'Scripts/build/trocarsenha.js',
                    baseUrl: '',
                    optimizeAllPluginResources: true,
                    noGlobal: true,
                    optimize: globalConfig.optimize,
                    mainConfigFile: 'Scripts/app/views/trocarsenha-main.js',
                    allowSourceOverwrites: false,
                    paths: paths
                };
            }))
            .pipe(gulp.dest('./'));
    });

    //ESQUECIMINHASENHA
    gulp.task('requirejs:esqueciminhasenha', function () {
        return gulp.src('Scripts/app/views/esqueciminhasenha-main.js')
            .pipe(requirejs(function (file) {
                return {
                    name: 'Scripts/app/views/esqueciminhasenha-main',
                    out: 'Scripts/build/esqueciminhasenha.js',
                    baseUrl: '',
                    optimizeAllPluginResources: true,
                    noGlobal: true,
                    optimize: globalConfig.optimize,
                    mainConfigFile: 'Scripts/app/views/esqueciminhasenha-main.js',
                    allowSourceOverwrites: false,
                    paths: paths
                };
            }))
            .pipe(gulp.dest('./'));
    });

    //HOMEADM
    gulp.task('requirejs:home-adm', function () {
        return gulp.src('Scripts/app/views/home-adm-main.js')
            .pipe(requirejs(function (file) {
                return {
                    name: 'Scripts/app/views/home-adm-main',
                    out: 'Scripts/build/home-adm.js',
                    baseUrl: '',
                    optimizeAllPluginResources: true,
                    noGlobal: true,
                    optimize: globalConfig.optimize,
                    mainConfigFile: 'Scripts/app/views/home-adm-main.js',
                    allowSourceOverwrites: false,
                    paths: paths
                };
            }))
            .pipe(gulp.dest('./'));
    });

    //POSTS
    gulp.task('requirejs:posts', function () {
        return gulp.src('Scripts/app/views/posts-main.js')
            .pipe(requirejs(function (file) {
                return {
                    name: 'Scripts/app/views/posts-main',
                    out: 'Scripts/build/posts.js',
                    baseUrl: '',
                    optimizeAllPluginResources: true,
                    noGlobal: true,
                    optimize: globalConfig.optimize,
                    mainConfigFile: 'Scripts/app/views/posts-main.js',
                    allowSourceOverwrites: false,
                    paths: paths
                };
            }))
            .pipe(gulp.dest('./'));
    });
}