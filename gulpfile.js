'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var stylish = require('jshint-stylish');

var pkg = require('./package.json');
var funName = 'getScrollMaxY';

var banner = [
  '/*!',
  ' * <%= pkg.name %>.js | MIT (c) Shinnosuke Watanabe',
  ' * <%= pkg.homepage %>',
  '*/\n'
].join('\n');

gulp.task('lint', function() {
  gulp.src('{,src/}*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish));
  gulp.src('*.json')
    .pipe($.jsonlint())
    .pipe($.jsonlint.reporter());
});

gulp.task('transpile', function() {
  gulp.src(['src/*.js'])
    .pipe($.es6Transpiler())
    .pipe($.wrapUmd({
      exports: funName,
      namespace: funName
    }))
    .pipe($.header(banner, {pkg: pkg}))
    .pipe($.rename({
      basename: pkg.name
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch(['src/*.js'], ['transpile']);
  gulp.watch(['{,src/}*.js', '*.json'], ['lint']);
});

gulp.task('build', ['lint', 'transpile']);
gulp.task('default', ['build', 'watch']);
