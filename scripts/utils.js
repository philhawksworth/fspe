
var fs = require('fs');
var mkdirp = require('mkdirp');

module.exports = {

  // create a folder if it does not already exist
  ensureFolder : function(path) {
    if (!fs.existsSync(path)){
      mkdirp.sync(path);
    }
  }

};
