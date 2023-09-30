"use strict";
let gulp = require("gulp");
let autoPrefix = require("gulp-autoprefixer");
let cleanCSS = require("gulp-clean-css");
let uglifyES = require("gulp-uglify-es").default;
let rename = require("gulp-rename");
let del = require("del");

//Styles
function style() {
  return gulp
    .src("./src/css/style.css")
    .pipe(
      autoPrefix({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(gulp.dest("./dist/css"));
}

//Scripts
function script() {
  return gulp
    .src("./src/js/index.js")
    .pipe(uglifyES())
    .pipe(gulp.dest("./dist/js/"));
}

//Copy files
function copyFile() {
  const file = ["./src/*.ico", "./src/*.php"];

  return gulp.src(file).pipe(gulp.dest("./dist"));
}

// Copy HTML
function html() {
  return gulp.src("./src/*.html").pipe(gulp.dest("./dist"));
}

// Images
function img() {
  return gulp.src("./src/img/**/*.*").pipe(gulp.dest("./dist" + "/img"));
}

// Fonts
function fonts() {
  return gulp.src("./src/fonts/**/*.*").pipe(gulp.dest("./dist/fonts"));
}

// Clean
function clean() {
  return del(["./dist"]);
}

gulp.task(
  "build",
  gulp.series(clean, style, script, copyFile, html, img, fonts)
);
