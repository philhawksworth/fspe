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
ensureFolder(paths.output);




glob("**/*.hbs", {cwd: paths.pages}, function (er, files) {

  for (var i = 0; i < files.length; i++) {

    // get the data from the corresponding api source
    var api = paths.api + files[i].replace(".hbs",".json");
    var data = JSON.parse(fs.readFileSync(api, 'utf8'));

    // render the data into the template
    var hbsTemplate = fs.readFileSync(paths.pages + files[i], 'utf8');
    var template = handlebars.compile(hbsTemplate);
    var result = template(data);

    // ensure that recursive filders exist
    var filePath = files[i].match(/(.*)\/(.*)/);
    if(filePath) {
      ensureFolder(paths.output + filePath[1]);
    }


    // output the result to file
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

function ensureFolder(path){
  console.log("folder needed", path)
  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
  }
}


