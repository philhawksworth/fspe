var handlebars = require('handlebars');
var layouts = require('handlebars-layouts');
var glob = require("glob");
var fs = require('fs');
var chalk = require('chalk');

var paths = {
  api : "api/",
  pages : "pages/",
  output : "dist/",
  layouts : "templates/layouts/"
}

// Register helpers
handlebars.registerHelper(layouts(handlebars));
handlebars.registerPartial('base', fs.readFileSync(paths.layouts + 'base.hbs', 'utf8'));

// set up the dist folder
if (!fs.existsSync(paths.output)){
    fs.mkdirSync(paths.output);
}



glob("**/*.hbs", {cwd: paths.pages}, function (er, files) {

  for (var i = 0; i < files.length; i++) {

    // get the data from the corresponding api source
    var api = paths.api + files[i].replace(".hbs",".json");
    var data = JSON.parse(fs.readFileSync(api, 'utf8'));

    // render the data into the template
    var hbsTemplate = fs.readFileSync(paths.pages + files[i], 'utf8');
    var template = handlebars.compile(hbsTemplate);
    var result = template(data);

    // output the resukt to file
    var outputDest = paths.output + files[i].replace(".hbs",".html");
    var writeStream = fs.createWriteStream(outputDest);
    writeStream.write(result);
    writeStream.end();

    console.log(
      chalk.green("File created:"),
      outputDest
    );
  }
});
