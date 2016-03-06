var gulp            = require('gulp');
var handlebars      = require('handlebars');
var gulpHandlebars  = require('gulp-compile-handlebars');
var rename          = require('gulp-rename');

// handlebars.registerPartial('footer', '<footer>the end</footer>');
// handlebars.registerHelper('capitals', function(str){
//   return str.toUpperCase();
// });

gulp.task('default', function () {

  options = {
    partialsDirectory : ['./src/partials'],
    allowedExtensions : (['hbs'])
  };

  var templateData = {
    "title": "About",
    "description" : "the about page content"
  };

  return gulp.src('templates/page-template.hbs')
    .pipe(gulpHandlebars(templateData, options))
    .pipe(rename('about.html'))
    .pipe(gulp.dest('dist'));
});
