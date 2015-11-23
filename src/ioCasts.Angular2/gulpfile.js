/// <binding Clean='clean' ProjectOpened='pack' />

/**
 * @author Thomas Brian <tdbrian@gmail.com>
 * @fileOverview gulpfile.js handles all build processes for the project
 * including bundling and cleaning.
 * @license MIT
 */
var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    webpack = require('gulp-webpack'),
    project = require("./project.json"),
    liveReloadPlugin = require('webpack-livereload-plugin');

// ------------------------------------------------------------------------
// Project paths
// ------------------------------------------------------------------------

var paths = { webroot: "./" + project.webroot + "/" };

paths.app = "./App/";
paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";
paths.ts = paths.app + "**/*.ts";

// ------------------------------------------------------------------------
// Cleanup Tasks
// ------------------------------------------------------------------------

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

/**
 * @name clean
 * @description Handles all cleaning 
 */
gulp.task("clean", ["clean:js", "clean:css"]);

// ------------------------------------------------------------------------
// Minification Tasks
// ------------------------------------------------------------------------

gulp.task("min:js", function () {
    gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

/**
 * @name min
 * @description Handles all minification
 */
gulp.task("min", ["min:js", "min:css"]);

// ------------------------------------------------------------------------
// Bundling Tasks
// ------------------------------------------------------------------------

/**
 * @name pack
 * @description Handles all bundling via watch
 */
gulp.task('pack', function () {
    gulp.src('./App/app.ts')
      .pipe(webpack({
          watch: true,
          devtool: 'source-map',
          module: {
              loaders: [
                { test: /\.ts$/, loader: 'ts-loader' },
              ],
          },
          plugins: [
              new liveReloadPlugin()
          ],
          output: {
              filename: 'bundle.js',
          }
      }))
      .pipe(gulp.dest('wwwroot/js'));
});