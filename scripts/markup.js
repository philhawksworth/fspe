/*
  Generate the static html pages for items found in the API sitemap
*/
var glob = require("glob");
var fs = require('fs');
var chalk = require('chalk');

var pages = require('../src/api/_sitemap.js');
var utils = require('./utils.js');
var paths = require('./config.js').paths;
var dots = require("dot").process({ path: paths.templates });

(function () {

  console.log(
    chalk.blue("\n  baking pages from API data")
  );

  // set up the dist folder
  utils.ensureFolder(paths.output);

  for(var p in pages){

    // get the data from the corresponding api source
    var api = paths.api + p + ".json"
    var data = JSON.parse(fs.readFileSync(api, 'utf8'));

    var templateName = pages[p].template;

    // use the correct .jst template file
    var render = require('../src/templates/'+ templateName);
    var result = render(data);

    // var result = dots[templateName](data);

    // ensure that paths nested folders exists
    utils.ensureFolder(paths.output + p);

    // output the result to file
    var outputDest = paths.output + p + "/index.html";
    var writeStream = fs.createWriteStream(outputDest);
    writeStream.write(result);
    writeStream.end();

    console.log(
      chalk.grey("  compiling to"),
      outputDest
    );
  }

}());

