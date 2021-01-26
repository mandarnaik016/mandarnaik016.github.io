const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const optimizejs = require("gulp-optimize-js");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const imagemin = require("gulp-imagemin");
const clean = require("gulp-clean");
const browserSync = require("browser-sync").create();

// Paths
const htmlSrc = "./*.html";
const jsSrc = "./src/js/";
const cssSrc = "./src/css/";
const fontSrc = "./src/font/**/*.*";
const imgSrc = "./src/img/**/*.*";

const rootDist = "./dist";
const jsDist = "./dist/js";
const cssDist = "./dist/css";
const fontDist = "./dist/font";
const imgDist = "./dist/img";

// gulp js
gulp.task("js", () => {
  return gulp
    .src([
      jsSrc + "jquery.min.js",
      jsSrc + "popper.min.js",
      jsSrc + "bootstrap-material-design.min.js",
      jsSrc + "moment.min.js",
      jsSrc + "bootstrap-datetimepicker.js",
      jsSrc + "nouislider.min.js",
      jsSrc + "material-kit.min.js",
      jsSrc + "jquery.matchHeight.min.js",
      jsSrc + "main.js",
    ])
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(optimizejs())
    .pipe(concat("app.min.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(jsDist))
    .pipe(browserSync.stream());
});

// gulp css
gulp.task("css", () => {
  return gulp
    .src([cssSrc + "material-kit.min.css", cssSrc + "font-awesome.min.css"])
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(concat("app.min.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(cssDist))
    .pipe(browserSync.stream());
});

// gulp font
gulp.task("font", () => {
  return gulp.src(fontSrc).pipe(gulp.dest(fontDist));
});

// gulp img
gulp.task("img", () => {
  return gulp.src(imgSrc).pipe(imagemin()).pipe(gulp.dest(imgDist));
});

// gulp clean
gulp.task("clean", () => {
  return gulp.src(rootDist).pipe(clean());
});

// gulp watch
gulp.task("watch", () => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  gulp.watch(jsSrc + "*.js", gulp.series("js"));
  gulp.watch(cssSrc + "*.css", gulp.series("css"));
  gulp.watch(htmlSrc).on("change", browserSync.reload);
});

// gulp default
gulp.task("default", gulp.series("js", "css", "font", "img"));
