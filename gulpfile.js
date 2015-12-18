var gulp = require('gulp');
var browserSync = require("browser-sync").create();

gulp.task('default', function() {
  browserSync.init({
    server: './',
    browser: ['firefox']
  });
  gulp.watch('*.html', browserSync.reload);
});
