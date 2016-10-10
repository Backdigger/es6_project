var gulp = require('gulp');
var webserver = require('gulp-webserver');
 
gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      fallback: 'main.html',
      livereload: true,
      directoryListing: true,
      open: true
    }));
});


