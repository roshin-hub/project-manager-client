// Include gulp
var gulp = require('gulp');
var replace = require('gulp-replace');

gulp.task('templates', function () {
    return gulp.src('src/environments/environment.ts', {base: "src/environments/"})
      .pipe(replace(/http:\/\/localhost:\d+/g, 'http://34.74.133.177:8090'))      
      .pipe(gulp.dest('src/environments/'));
});

// Default tasks
gulp.task('default', ['templates']);