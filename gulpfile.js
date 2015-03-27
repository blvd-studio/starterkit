var gulp  		= require('gulp'),
	gutil 		= require('gulp-util'),
	jshint     	= require('gulp-jshint'),
	uglify		= require('gulp-uglify'),
	sass       	= require('gulp-sass'),
	concat     	= require('gulp-concat'),
	minifyCSS 	= require('gulp-minify-css'),
	browserSync = require('browser-sync'),
	reload      = browserSync.reload;	

    input  = {
      'sass': 'sources/scss/**/*.scss',
      'javascript': 'sources/javascript/**/*.js',
      'libs': 'public/assets/javascript/libs/**/*.js'
    },

    output = {
      'stylesheets': 'public/assets/stylesheets',
      'javascript': 'public/assets/javascript'
    };

gulp.task('default', ['watch']);


gulp.task('libs-plugins', function() {
	return gulp.src(input.libs)
	.pipe(uglify())
	.pipe(concat('plugins.min.js'))
	.pipe(gulp.dest(output.javascript));
});

gulp.task('build-js', function() {
	return gulp.src(input.javascript)
	.pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(uglify())
	.pipe(concat('scripts.min.js'))
	.pipe(gulp.dest(output.javascript))
});



gulp.task('build-css', function() {
  	gulp.src(input.sass)
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest(output.stylesheets))
    .pipe(reload({stream: true}));
});

	
gulp.task('watch', function() {

 	//return gutil.log('gulp is running!')
	browserSync({
        server: {
            baseDir: "./"
        }
    });

	gulp.watch(input.javascript, ['build-js']);
  	gulp.watch(input.sass, ['build-css']);
   	gulp.watch(['public/**', '*.html']).on('change', reload);

});