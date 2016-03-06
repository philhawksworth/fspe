var handlebars  = require('handlebars');
var glob = require("glob");
var fs = require('fs');


// options is optional
glob("./api/*.json", function (er, files) {

  for (var i = 0; i < files.length; i++) {
    // get the data from the api
    var data = JSON.parse(fs.readFileSync(files[i], 'utf8'));

    // render the data into the template
    var hbsTemplate = fs.readFileSync("./templates/page-template.hbs", 'utf8');
    var template = handlebars.compile(hbsTemplate);
    var result = template(data);

    // output the resukt to file
    var outputDest = files[i].replace(".json",".html").replace("/api/","/dist/");
    var writeStream = fs.createWriteStream(outputDest);
    writeStream.write(result);
    writeStream.end();
  }
});
