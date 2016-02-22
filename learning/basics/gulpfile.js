'use strict'

var gulp = require('gulp');
var runSequence = require('run-sequence');
var chalk = require('chalk');
var watch = require('gulp-watch');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var mocha = require('gulp-mocha');

gulp.task('compile-ts', function() {
    console.log(chalk.green('compiling TS files'));
    var soruceTsFiles = "./src/app/*.ts";
        
    var tsResult = gulp.src(soruceTsFiles)
                   .pipe(sourcemaps.init())
                   .pipe(ts(tsProject));
    return tsResult.js
                    .pipe(sourcemaps.write('.'))
                    .pipe(gulp.dest('./src/js/'))
});

gulp.task('compile-ts-test', function() {
    console.log(chalk.green('compiling TS Test files'));
    var soruceTsFiles = "./test/*.ts";
        
    var tsResult = gulp.src(soruceTsFiles)
                   .pipe(sourcemaps.init())
                   .pipe(ts(tsProject));
    return tsResult.js
                    .pipe(sourcemaps.write('.'))
                    .pipe(gulp.dest('./test/js/'))
});

gulp.task('clean-ts', function(cb) {
    console.log(chalk.magenta('Cleaning TS files'));
    var typeScriptGenFiles = [ "./src/js/*.js",
                               "./src/js/*.js.map"];
                               
    return del(typeScriptGenFiles, cb);
});

gulp.task('clean-ts-test', function(cb) {
    console.log(chalk.magenta('Cleaning TS-Test files'));
    var typeScriptGenFilesTst = [ "./test/js/*.js",
                               "./test/js/*.js.map"];
                               
    return del(typeScriptGenFilesTst, cb);
});

gulp.task('watch', function(){
    console.log(chalk.green('Now watching for TS file changes'));
    return gulp.watch(['./src/app/*.ts','./test/*.ts'], ['clean-ts','compile-ts','clean-ts-test','compile-ts-test','test']);
    //gulp.watch('./test/*.ts', ['clean-ts-test','compile-ts-test', 'test']);
});

gulp.task('test', function(){
    console.log(chalk.yellow('Running tests'));
    return gulp.src('./test/js/test.js', {read: false})
               .pipe(mocha({reqporter: 'nyan'})); 
});

gulp.task('default', function(){
    runSequence('clean-ts', 'compile-ts','compile-ts-test','test','watch');
})