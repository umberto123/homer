var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

var jsFiles = ['*.js', 'src/**/*.js'];
var unitTestFiles = 'tests/**/*.js';

gulp.task('coding-standards', function defineCodingStandards() {
	return gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish', {
			verbose: true
		}));
});

gulp.task('coding-style', function defineCodingStyle() {
	return gulp.src(jsFiles)
		.pipe(jscs())
		.pipe(jscs.reporter())
		.pipe(jscs.reporter('fail'));
});

gulp.task('unit-tests', function unitTest() {
	return gulp.src(unitTestFiles, {read: false})
		.pipe(mocha({reporter: 'nyan'}))
        .once('error', function testError() {
            process.exit(1);
        })
        .once('end', function testEnd() {
            process.exit();
        });
});

gulp.task('serve', ['coding-standards', 'coding-style'], function serve() {
	//gulp.watch(jsFiles, ['coding-standards', 'coding-style', 'unit-tests']);

	var options = {
		script: 'app.js',
		delayTime: 1,
		env: {
			// 'PORT': 5000
			// 'dbConnection': ...
		},
		watch: jsFiles
	};

	return nodemon(options).on('restart', function res() {
		//console.log('restarting server......');
	});
});