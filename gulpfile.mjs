import gulp from 'gulp';
import open from 'gulp-open';

// Define the `open-app` task
gulp.task('open-app', function () {
    return gulp.src('./pages/dashboard.html')
        .pipe(open({ app: 'chrome' })); // Use 'chrome', 'firefox', or 'msedge' as needed
});

// Add a default task
gulp.task('default', gulp.series('open-app'));
