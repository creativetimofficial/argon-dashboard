/**
 * Gulp file to automate the various tasks
**/

var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var csscomb = require('gulp-csscomb');
var cleanCss = require('gulp-clean-css');
var cssnano = require('gulp-cssnano');
var composer = require('gulp-uglify/composer');
var concat = require('gulp-concat');
var del = require('del');
var imagemin = require('gulp-imagemin');
var htmlPrettify = require('gulp-html-prettify');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var gulpRun = require('gulp-run');
var gulpUtil = require('gulp-util');
var npmDist = require('gulp-npm-dist');
var postcss = require('gulp-postcss');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var uglifyEs = require('uglify-es');
var uglify = composer(uglifyEs, console);
var rename = require('gulp-rename');
var useref = require('gulp-useref-plus');
var wait = require('gulp-wait');

// Define paths

var paths = {
    dist: {
        base: 'dist',
        img:  'dist/assets/img',
        libs: 'dist/assets/vendor'
    },
    base: {
        base: './',
        node: 'node_modules'
    },
    src: {
        index: '/pages/dashboards/dashboard.html',
        base: './',
        css:  'assets/css',
        html: '**/*.html',
        img:  'assets/img/**/*.+(png|jpg|gif|svg)',
        js:   'assets/js/**/*.js',
        scss: 'assets/scss/**/*.scss'
    }
}

// Compile SCSS

gulp.task('scss', function() {
  return gulp.src(paths.src.scss)
    .pipe(wait(500))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([require('postcss-flexbugs-fixes')]))
    .pipe(autoprefixer({
        browsers: ['> 1%']
    }))
    .pipe(csscomb())
    .pipe(gulp.dest(paths.src.css))
    .pipe(browserSync.reload({
        stream: true
    }));
});

// Minify CSS

gulp.task('minify:css', function() {
  return gulp.src([
        paths.src.css + '/argon.css'
    ])
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dist.base + '/css'))
});

// Concat JS files

gulp.task('concat:js', function(done) {

	files = [
		paths.src.base + '/assets/js/components/license.js',
		paths.src.base + '/assets/js/components/layout.js',
		paths.src.base + '/assets/js/components/init/*js',
		paths.src.base + '/assets/js/components/custom/*js',
		paths.src.base + '/assets/js/components/maps/*js',
		paths.src.base + '/assets/js/components/charts/*js',
		paths.src.base + '/assets/js/components/vendor/*js'
	];

	return gulp
		.src(files)
		.pipe(concat("argon.js"))
		.pipe(gulp.dest(paths.dist.base + '/js'));

	done();
});

// Minify JS

gulp.task('minify:js', function(cb) {
    return gulp.src([
            paths.src.base + '/assets/js/argon.js'
        ])
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.dist.base + '/js'))
});

// Live reload

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: [paths.src.base, paths.base.base]
        },
        index: [paths.src.index]

    })
});

// Watch for changes

gulp.task('watch', gulp.series('browserSync', 'scss'), function() {
    gulp.watch(paths.src.scss, ['scss']);
    gulp.watch(paths.src.js, browserSync.reload);
    gulp.watch(paths.src.html, browserSync.reload);
});

// Clean

gulp.task('clean:dist', function() {
    return del(paths.dist.base);
});

// Copy CSS

gulp.task('copy:css', function() {
    return gulp.src([
        'assets/css/argon.css'
    ])
    .pipe(gulp.dest(paths.dist.base + '/css'))
});

// Copy JS

gulp.task('copy:js', function() {
    return gulp.src([
        'assets/js/argon.js'
    ])
    .pipe(gulp.dest(paths.dist.base + '/js'))
});

// Build

gulp.task('build',
    gulp.series('clean:dist', 'scss', 'copy:css', 'copy:js', 'concat:js', 'minify:js', 'minify:css')
);

// Default

gulp.task('default',
    gulp.series('scss', 'browserSync', 'watch')
);
