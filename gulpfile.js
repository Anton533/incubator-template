const { watch, src, dest, series, parallel } = require('gulp');
const fileinclude = require('gulp-file-include');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

function buildCss() {
  return src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ cascade: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('./build/css'))
    .pipe(browserSync.stream());
}

function buildHtml() {
  return src(['./src/html/pages/*.html'])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: 'src/html/parts/',
      })
    )
    .pipe(dest('./build'));
}

function buildJs() {
  return src('./src/js/**/*').pipe(dest('./build/js'));
}

function watchHtml() {
  watch(['./src/html/**/*.html', './src/data/*.json'], buildHtml);
}

function watchJs() {
  watch('./src/js/**/*', buildJs);
}

function watchSass() {
  watch(['./src/sass/**/*.scss'], buildCss);
}

function watchStatic() {
  watch(['./static/**/*'], copyStaticFiles);
}

function copyStaticFiles() {
  return src('./static/**/*').pipe(dest('./build'));
}

function watchBuildAndReloadBrowser() {
  watch(['build/**/*', '!build/css']).on('change', browserSync.reload);
}

const build = parallel(copyStaticFiles, buildHtml, buildJs, buildCss);
const watchFiles = parallel(watchHtml, watchJs, watchSass, watchStatic, watchBuildAndReloadBrowser);

function serve() {
  browserSync.init({
    server: './build',
    ghostMode: false,
  });

  watchFiles();
}

exports.default = series(build, serve);
