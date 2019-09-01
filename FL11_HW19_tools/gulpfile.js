let { watch, series } = require('gulp');
let gulp = require('gulp');
let babel = require('gulp-babel');
let concat = require('gulp-concat');
let imagemin = require('gulp-imagemin');
let uglify = require('gulp-uglify');
let less = require('gulp-sources-less');
let sourcemaps = require('gulp-sourcemaps');
let browserSync = require('browser-sync').create();
const htmlmin = require("gulp-htmlmin");

let serverTask = () => {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
};

let html = () => {
  return gulp.src('./src/index.html')
    .pipe(
      htmlmin({
      collapseWhitespace: true,
      removeComments: true
    })
  )
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({ stream: true }));
};

let lessTask = () => {
  return gulp.src('src/less/styles.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
    .pipe(browserSync.reload({ stream: true }));
};

let jsTask = () => {
  return gulp.src('src/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream())
    .pipe(browserSync.reload({ stream: true }));
};

let compressImgTask = () => {
  return gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.reload({ stream: true }));
};

gulp.task('default', gulp.series(html, compressImgTask, lessTask, jsTask));

exports.serve = () => {
  serverTask();
  watch('src/js/*.js', series(jsTask));
  watch('src/less/*.less', lessTask); 
  watch('src/img/*', series(compressImgTask));
  watch('src/index.html', series(html));
};