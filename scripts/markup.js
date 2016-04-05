/*
  Generate the static html pages for items found in the API sitemap
*/
var glob = require("glob");
var fs = require('fs');
var chalk = require('chalk');
var utils = require('./utils.js');
var paths = require('./config.js').paths;

// list of pages and their data sources compiled from API
var pages = require(paths.root + paths.api + '_sitemap.js');

// templating engine support
var cons = require('consolidate');
var nunjucks = require('nunjucks');
var engine = 'nunjucks';
nunjucks.configure('./src/templates');


(function () {

  console.log(
    chalk.blue("\n  baking pages from API data")
  );

  // set up the dist folder
  utils.ensureFolder(paths.output);

  for(var p in pages){

    (function(){

    // get the data from the corresponding api source
    var api = paths.api + p + ".json"
    var data = JSON.parse(fs.readFileSync(api, 'utf8'));

    // add an output path to the data object for convenience
    data.outputPath = paths.output + p;

    // determine the template file name
    var templateName = pages[p].template + ".html";

    // render the page
    cons[engine]('src/templates/'+ templateName, data, function(err, html){
      if (err) throw err;
        // ensure that paths nested folders exists
        utils.ensureFolder(data.outputPath);

        // output the result to file
        var outputDest = data.outputPath + "/index.html"
        var writeStream = fs.createWriteStream(outputDest);
        writeStream.write(html);
        writeStream.end();

        console.log(
          chalk.grey("  compiling to"),
          outputDest
        );
      });

    })();

  }

}());

