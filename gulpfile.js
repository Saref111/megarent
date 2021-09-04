"use strict";

var fs = require('fs')

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var scss = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var del = require("del");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify-es").default;
var pipeline = require("readable-stream").pipeline;
var svgstore = require("gulp-svgstore");
var fileinclude = require('gulp-file-include');

const ABC_MAP = {
  "а": "a",
  "б": "b",
  "в": "v",
  "г": "g",
  "д": "d",
  "е": "e",
  "ё": "io",
  "ж": "zh",
  "з": "z",
  "и": "i",
  "й": "j",
  "к": "k",
  "л": "l",
  "м": "m",
  "н": "n",
  "о": "o",
  "п": "p",
  "р": "r",
  "с": "s",
  "т": "t",
  "у": "u",
  "ф": "f",
  "х": "h",
  "ц": "ts",
  "ч": "ch",
  "ш": "sh",
  "щ": "shch",
  "ь": "",
  "ъ": "",
  "ы": "y",
  "э": "e",
  "ю": "iu",
  "я": "ia",
  " ": "-",
  "ь": "",
}

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(fileinclude({
      prefix: '@@',
      basepath: 'source/view-parts'
    }))
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
});

gulp.task("css", function () {
  return gulp.src("source/scss/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(scss({allowEmpty: true}))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/scss/**/*.scss", gulp.series("css", "refresh"));
  gulp.watch("source/scss/*.scss", gulp.series("css", "refresh"));
  gulp.watch("source/**/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("js", "refresh"));
  gulp.watch("source/img/**/*", gulp.series("images", "webp", "sprite", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("images", function () {
  return gulp.src("source/img/*")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*-forwebp.{png,jpeg,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*",
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("js", function () {
  return pipeline(
    gulp.src("source/js/*.js"),
    sourcemap.init(),
    uglify(),
    rename({suffix: ".min"}),
    sourcemap.write("."),
    gulp.dest("build/js")
  );
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("sprite", function () {
  return gulp.src("source/img/svg/*.svg")
    .pipe(imagemin([imagemin.svgo()]))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("css-nomin", function () {
  return gulp.src("source/scss/style.scss")
    .pipe(plumber())
    .pipe(scss())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"));
});

gulp.task("rename", function () {
  return gulp.src("source/img1/*")
    .pipe(rename(function(path) {
      var name = path.basename;
      var nameArr = name.toLowerCase().split("")
      var newName = nameArr.map((it) => {
        if (Object.keys(ABC_MAP).some(key => key === it)) {
          return ABC_MAP[it];
        } else {
          return it
        }
      }).join("");


      var htmlFolder = fs.readdirSync('./source/scss/blocks/')
      htmlFolder.forEach((file) => {
        if (file.endsWith('.scss')) {
            var a = fs.readFileSync('./source/scss/blocks/' + file)

            var r = new RegExp(name, 'g')

            a = a.toString().replace(r, newName)

            fs.writeFileSync('./source/scss/blocks/' + file, a)
        }
      } )

      htmlFolder = fs.readdirSync('./source/')
      htmlFolder.forEach((file) => {
        if (file.endsWith('.html')) {
            var a = fs.readFileSync('./source/' + file)

            var r = new RegExp(name, 'g')

            a = a.toString().replace(r, newName)

            fs.writeFileSync('./source/' + file, a)
        }
      } )
      
      return path.basename = newName;
    }))
    .pipe(gulp.dest("source/img/"));
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "webp",
  "images",
  "html",
  "css",
  "js",
  "sprite",
  "css-nomin"
));

gulp.task("start", gulp.series("build", "server"));
