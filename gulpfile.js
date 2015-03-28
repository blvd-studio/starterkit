var gulp  		= require('gulp'),
	gutil 		  = require('gulp-util'),
	jshint     	= require('gulp-jshint'),
	uglify		  = require('gulp-uglify'),
	sass       	= require('gulp-sass'),
	concat     	= require('gulp-concat'),
	minifyCSS 	= require('gulp-minify-css'),
  plumber     = require('gulp-plumber'),
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

var onError = function (error) {  
  gutil.beep();
  console.log(error.toString());
  this.emit('end');
};

gulp.task('libs-plugins', function() {
	return gulp.src(input.libs)
  .pipe(plumber({
      errorHandler: onError
    }))
	.pipe(uglify())
	.pipe(concat('plugins.min.js'))
	.pipe(gulp.dest(output.javascript));
});

gulp.task('build-js', function() {
	return gulp.src(input.javascript)
  .pipe(plumber({
      errorHandler: onError
    }))
	.pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(uglify())
	.pipe(concat('scripts.min.js'))
	.pipe(gulp.dest(output.javascript))
});



gulp.task('build-css', function() {
  	gulp.src(input.sass)
      .pipe(plumber({
      errorHandler: onError
    }))
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