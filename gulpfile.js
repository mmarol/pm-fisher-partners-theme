const { src, dest, series, parallel, watch } = require("gulp");

// Utilities
const yargs = require("yargs");
const gulpif = require("gulp-if");
const del = require("del");
const sourcemaps = require("gulp-sourcemaps");

// Browser reloading
const browserSync = require("browser-sync").create();

// CSS compiling
const sass = require("gulp-sass")(require("sass"));
const cleancss = require("gulp-clean-css");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

// Javascript compiling
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify");

// Image minification
const imagemin = require("gulp-imagemin");

// Utility constants
const origin = "src";
const destination = "dist";
const PRODUCTION = yargs.argv.prod;

// delete folder before build
async function clean(cb) {
	await del(destination);
	cb();
}

// transform js to browser readable format and minify
function js() {
	return browserify({
		entries: [`${origin}/js/index.js`],
		transform: [babelify.configure({ presets: ["@babel/preset-env"] })],
	})
		.bundle()
		.pipe(source("build.js"))
		.pipe(buffer())
		.pipe(gulpif(!PRODUCTION, sourcemaps.init({ loadMaps: true })))
		.pipe(gulpif(PRODUCTION, uglify()))
		.pipe(sourcemaps.write("."))
		.pipe(dest(`${destination}/js`));
}

// convert sass to css and minify
function css(cb) {
	// for minified vendor files
	src(`${origin}/scss/vendor/**/*.css`).pipe(dest(`${destination}/css`));

	// Front-end stylesheet
	src(`${origin}/scss/style.scss`)
		.pipe(gulpif(!PRODUCTION, sourcemaps.init()))
		.pipe(sass().on("error", sass.logError))
		.pipe(gulpif(PRODUCTION, postcss([autoprefixer()])))
		.pipe(
			gulpif(
				PRODUCTION,
				cleancss({
					compatibility: "ie8",
				})
			)
		)
		.pipe(gulpif(!PRODUCTION, sourcemaps.write()))
		.pipe(dest(`${destination}/css`))
		.pipe(browserSync.stream());

	// Editor stylesheet
	src(`${origin}/scss/editor-styles.scss`)
		.pipe(gulpif(!PRODUCTION, sourcemaps.init()))
		.pipe(sass().on("error", sass.logError))
		.pipe(gulpif(PRODUCTION, postcss([autoprefixer()])))
		.pipe(
			gulpif(
				PRODUCTION,
				cleancss({
					compatibility: "ie8",
				})
			)
		)
		.pipe(gulpif(!PRODUCTION, sourcemaps.write()))
		.pipe(dest(`${destination}/css`))
		.pipe(browserSync.stream());
	cb();
}

// minify images
function img(cb) {
	src(`${origin}/img/**/*.{jpg,jpeg,png,svg,gif}`)
		// .pipe(
		// 	gulpif(
		// 		PRODUCTION,
		// 		imagemin([
		// 			imagemin.svgo({
		// 				plugins: [{ removeViewBox: true }, , { cleanupIDs: false }],
		// 			}),
		// 		])
		// 	)
		// )
		.pipe(dest("dist/img"));
	cb();
}

// copy files in the src folder that are not images, scripts, or scss files
function copy(cb) {
	src([
		`${origin}/**/*`,
		`!${origin}/{img,js,scss}`,
		`!${origin}/{img,js,scss}/**/*`,
	]).pipe(dest("dist"));
	cb();
}

// watch for changes
function watcher(cb) {
	watch(`**/*.{twig,php}`).on("change", browserSync.reload);
	// watch(`**/*.php`).on("change", browserSync.reload);
	watch(`${origin}/**/*.php`).on("change", browserSync.reload);
	watch(`${origin}/**/*.scss`).on("change", series(css, browserSync.reload));
	watch(`${origin}/**/*.js`).on("change", series(js, browserSync.reload));
	watch(`${origin}/**/*.{jpg,jpeg,png,svg,gif}`).on(
		"change",
		series(img, browserSync.reload)
	);
	watch([
		`${origin}/**/*`,
		`!${origin}/{img,js,scss}`,
		`!${origin}/{img,js,scss}/**/*`,
	]).on("change", series(copy, browserSync.reload));
	cb();
}

// run browsersync server
function server(cb) {
	browserSync.init({
		notify: false,
		// open: false,
		proxy: "pm-fisher-partners.local",
		https: true,
		injectChanges: true,
	});
	cb();
}

// clean the dist folder, run the js, css and image compilation, run the server, watch for changes
exports.default = series(clean, parallel(js, css, img, copy), server, watcher);
