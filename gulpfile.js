'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var mergeStream = require('merge-stream');

var rimraf = require('rimraf');
var stylish = require('jshint-stylish');

var pkg = require('./package.json');
var bower = require('./bower.json');
var funName = 'getScrollMaxY';

var banner = [
  '/*!',
  ' * <%= pkg.name %>.js | MIT (c) Shinnosuke Watanabe',
  ' * <%= pkg.homepage %>',
  '*/\n'
].join('\n');

gulp.task('lint', function() {
  gulp.src('{,src/}*.js')
    .pipe($.jscs({esnext: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish));
  gulp.src('*.json')
    .pipe($.jsonlint())
    .pipe($.jsonlint.reporter());
});

gulp.task('clean', rimraf.bind(null, 'dist'));

gulp.task('transpile', ['clean'], function() {
  return mergeStream(
    gulp.src('src/*.js')
      .pipe($.es6Transpiler())
      .pipe($.header(banner + '!function() {\n', {pkg: pkg}))
      .pipe($.footer('\nwindow.' + funName + ' = ' + funName + ';\n}();\n'))
      .pipe($.rename(bower.main))
      .pipe(gulp.dest('')),
    gulp.src('src/*.js')
      .pipe($.es6Transpiler())
      .pipe($.footer('\nmodule.exports = ' + funName + ';\n'))
      .pipe($.header(banner, {pkg: pkg}))
      .pipe($.rename(pkg.main))
      .pipe(gulp.dest('')),
    gulp.src('src/*.js')
      .pipe($.es6Transpiler())
      .pipe($.wrapAmd({exports: funName}))
      .pipe($.header(banner, {pkg: pkg}))
      .pipe($.rename(bower.main))
      .pipe($.rename({suffix: '-amd'}))
      .pipe(gulp.dest(''))
  );
});

gulp.task('build', ['lint', 'transpile']);

gulp.task('watch', function() {
  gulp.watch(['src/*.js'], ['transpile']);
  gulp.watch(['{,src/}*.js', '*.json'], ['lint']);
});

gulp.task('default', ['build', 'watch']);
