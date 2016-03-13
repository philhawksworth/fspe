/*
  Perform build-time generation of static html pages.
*/

var handlebars = require('handlebars');
var layouts = require('handlebars-layouts');
var glob = require("glob");
var fs = require('fs');
var chalk = require('chalk');

var pages = require('../src/api/_sitemap.js');
var utils = require('./utils.js');
var paths = require('./config.js').paths;


// Register helpers
handlebars.registerHelper(layouts(handlebars));
handlebars.registerPartial('base', fs.readFileSync( paths.layouts + 'base.hbs', 'utf8'));
handlebars.registerPartial('page', fs.readFileSync( paths.layouts + '../page-template.hbs', 'utf8'));
handlebars.registerPartial('navigation', fs.readFileSync( paths.partials + 'navigation.hbs', 'utf8'));

require.extensions['.hbs'] = function (module, filename) {
  var file = fs.readFileSync(filename, "utf8");
  var opts = { traverse: true };
  return module._compile(hbsfy.compile(file, opts), filename);
};

// set up the dist folder
utils.ensureFolder(paths.output);


/*
 generate the static html pages for items found in the API sitemap
*/
function generatePagesFromApi() {


  for(var p in pages){

    // choose template
    var templateFile = pages[p].template + ".hbs";

    // get the data from the corresponding api source
    var api = paths.api + p + ".json"
    var data = JSON.parse(fs.readFileSync(api, 'utf8'));


    // render template to with api data
    var hbsTemplate = fs.readFileSync(paths.templates + templateFile, 'utf8');
    var template = handlebars.compile(hbsTemplate);
    var result = template(data);

    // ensure that paths nested folders exists
    utils.ensureFolder(paths.output + p);


    // output the result to file
    var outputDest = paths.output + p + "/index.html";
    var writeStream = fs.createWriteStream(outputDest);
    writeStream.write(result);
    writeStream.end();

    console.log(
      chalk.grey("  compiling to "),
      outputDest
    );
  }

}



generatePagesFromApi();






