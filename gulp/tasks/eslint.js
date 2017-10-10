var gulp = require('gulp');
var gutil = require('gulp-util');
var eslint = require('gulp-eslint');
var cached = require('gulp-cached');
var watch = require('gulp-watch');
var mergeStream = require('merge-stream');
var runSequence = require('run-sequence');
var config = require('./../config');

gulp.task('eslint:resources', function () {

	if (config.global.tasks.linting) {
		return mergeStream(config.global.resources.map(function (currentResource, index) {
			return gulp.src([
				config.global.src + currentResource + '/js/**/*.js',
				'!' + config.global.src + currentResource + '/js/vendor/**/*.js'
			])
				.pipe(cached('eslint'))
				.pipe(eslint())
				.pipe(eslint.format())
				.pipe(eslint.failAfterError());
		}));
	} else {
		gutil.log(gutil.colors.yellow('linting disabled'));
	}

});

gulp.task('eslint:components', function () {

	if (config.global.tasks.linting) {
		return mergeStream(config.global.resources.map(function (currentComponent) {
			return gulp.src([
				config.global.src + currentComponent + '/**/js/**/*.js',
				'!' + config.global.src + currentComponent + '/**/js/vendor/**/*.js'
			])
				.pipe(cached('eslint'))
				.pipe(eslint())
				.pipe(eslint.format())
				.pipe(eslint.failAfterError());
		}));
	} else {
		gutil.log(gutil.colors.yellow('linting disabled'));
	}

});

gulp.task('watch:eslint:resources', function () {

	if (config.global.tasks.linting) {
		config.global.resources.forEach(function(currentResource, index) {
			watch([
				config.global.src + config.global.components[index] + '/**/js/**/*.js',
				'!' + config.global.src + currentResource + '/js/vendor/**/*.js',
			], function () {
				runSequence('eslint')
			});
		});
	} else {
		gutil.log(gutil.colors.yellow('linting disabled'));
	}

});

gulp.task('watch:eslint:components', function () {

	if (config.global.tasks.linting) {
		config.global.resources.forEach(function(currentComponent, index) {
			watch([
				config.global.src + currentComponent + '/**/js/**/*.js',
				'!' + config.global.src + currentComponent + '/**/js/vendor/**/*.js'
			], function () {
				runSequence('eslint')
			});
		});
	} else {
		gutil.log(gutil.colors.yellow('linting disabled'));
	}

});
