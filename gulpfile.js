/**
 * Created by laixiangran on 2017/5/7.
 * homepage：http://www.laixiangran.cn
 */

var gulp = require('gulp');
var rename = require("gulp-rename");

var config = {
    root: './',
    src: './src',
    index: './src/index.html',
    devIndex: './src/index-dev.html',
    testIndex: './src/index-test.html',
    prodIndex: './src/index-prod.html'
};

gulp.task('build:dev', function () {
    return gulp.src(config.devIndex)
        .pipe(rename(config.index))
        .pipe(gulp.dest(config.root));
});

gulp.task('build:test', function () {
    return gulp.src(config.testIndex)
        .pipe(rename(config.index))
        .pipe(gulp.dest(config.root));
});

gulp.task('build:prod', function () {
    return gulp.src(config.prodIndex)
        .pipe(rename(config.index))
        .pipe(gulp.dest(config.root));
});
