var request = require('request');
var chalk = require('chalk');
var fs = require('fs');

var utils = require('./utils.js');
var paths = require('./config.js').paths;


var contentful = {
  access_token : "c685bb6a2978131d6e287e6e1a6c1b1b71ce6cf3c7a3be2caa43cc6b4ec580eb",
  space_id : "ot0mnooc6nee",
  root : "https://cdn.contentful.com/spaces/"
};

var content_url = contentful.root +
    contentful.space_id +
    "/entries/?access_token=" +
    contentful.access_token;



function getPageData(){

  //set the searhc attribites on the content url
  var url = content_url + "&content_type=page";
  console.log(chalk.grey("  getting pages data:"), url);

  request(url, function (error, response, body) {

    var content = JSON.parse(body);
    var sitemap = {};

    for (var i = 0; i < content.items.length; i++) {

      var thisItem = content.items[i];


      var apiData = JSON.stringify(thisItem.fields);
      var folder = thisItem.fields.slug
      var levels = folder.split("/");

      // if the slug is not root, make sure subdirectories exist
      if(levels.length > 1 ) {
        var i = folder.lastIndexOf('/');
        var name =  folder.substr(0, i)
        utils.ensureFolder(paths.api + name);
      }

      // output the result to file
      var outputDest = paths.api + folder + ".json";
      var writeStream = fs.createWriteStream(outputDest);
      writeStream.write(apiData);
      writeStream.end();

      console.log(
        chalk.grey("  data endpoint created:"),
        outputDest
      );

      //add to the sitemap object
      sitemap[thisItem.fields.slug] = thisItem.fields;
      sitemap[thisItem.fields.slug].id = thisItem.sys.id;

    }

    // output a sitemap file
    outputDest = paths.api + "_sitemap.json";
    writeStream = fs.createWriteStream(outputDest);
    writeStream.write(JSON.stringify(sitemap));
    writeStream.end();

    console.log(
      chalk.grey("  sitemap created:"),
      outputDest
    );


  });

}


getPageData();




