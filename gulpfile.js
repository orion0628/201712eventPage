// plugin  var
var gulp = require('gulp'),
    php  = require('gulp-connect-php');
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    bower = require('gulp-bower'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    fileinclude = require('gulp-file-include'),
    gulpPlumber = require('gulp-plumber');

// common
var reload = browserSync.reload;
//path
var web = {
    sass: [
        'sass/*.scss',
        'sass/**/*.scss',
        'sass/**/**/*.scss'
    ],
    html: [
        '*.html',
        'app/*.html',
        'app/**/*.html'
    ],
    images: [
      'images/*'
    ],
    js: [
      'js/*.js',
      'js/**/*.js'
    ]
    // fonts: ['resources/assets/fonts/*', 'resources/assets/fonts/**/*'],
};

gulp.task('autoprefixer', function () {
    var plugins = [
        autoprefixer({
            broswer: ['last 1 vrsion']
        })
    ];
    return gulp.src('./css/*.css')
        .pipe(gulpPlumber())
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./css/autoprefixer'));
});


//  sass
gulp.task('styles', function () {
    gulp.src(web.sass) //要處理的scss檔案
        //  .pipe(gulpPlumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({
            outputStyle: 'expanded' // compact , expanded, nested
        }))
        .pipe(gulp.dest('css')) //指定編譯後的路徑

});
//========
//html template / app(可以自己改名稱)/*.html
//========
gulp.task('fileinclude', function () {
    gulp.src(['app/*.html'])
        .pipe(gulpPlumber())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./'));
});


//broswerSync static
gulp.task('static', ['styles'], function () {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "index.html"
        }
    });
    gulp.watch(web.sass, ['styles']).on('change', reload); //watch  sass
    gulp.watch('css/*.css', ['autoprefixer']).on('change', reload); //watch  sass
    gulp.watch(web.html , ['fileinclude']).on('change', reload); //watch html
    gulp.watch(web.images).on('change', reload); //watch images
    gulp.watch(web.js).on('change', reload); //watch images
});

//執行指令
gulp.task('default', ['static', 'php']);


gulp.task('php', function() {
    php.server({ base: './app/php', port: 8555, keepalive: true});
});

// gulp.task('browser-sync',['php'], function() {
//     browserSync({
//         proxy: '127.0.0.1:8010',
//         port: 8080,
//         open: true,
//         notify: false
//     });
// });