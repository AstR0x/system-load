const gulp = require('gulp');
const babel = require('gulp-babel');
const cssmin = require('gulp-minify-css');
const uglify = require('gulp-uglify-es').default;

gulp.task('css-min', function () {
  return gulp.src('src/css/**/*.css')
      .pipe(cssmin())
      .pipe(gulp.dest('public/css/'))
});

gulp.task('js-min', function () {
  return gulp.src('src/js/**/*.js')
      .pipe(babel({
          plugins: ['transform-react-jsx']}))
      .pipe(uglify())
      .pipe(gulp.dest('public/js/'));
});

gulp.task('php', function () {
  return gulp.src('src/core/*.php')
      .pipe(gulp.dest('public/core/'));
});

gulp.task('watch', function () {
  gulp.watch('src/css/**/*.css', gulp.parallel('css-min'));
  gulp.watch('src/js/**/*.js', gulp.parallel('js-min'));
  gulp.watch('src/core/*.php', gulp.parallel('php'));
});

gulp.task('default', gulp.parallel('watch'));