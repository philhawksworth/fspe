
var handlebars  = require('hbsfy/runtime');
var reqwest = require('reqwest');
var $ = require('jbone');

// list ALL templates
var templates = {
  pageTemplate : require("../templates/page-template.hbs"),
  messageTemplate : require("../templates/message-template.hbs"),
};


// prune npm


$.ajax = reqwest.compat;



function addEventHandlers() {

  var dynamicPageLinks = document.querySelectorAll('[data-template]');

  $(dynamicPageLinks).on("click", function(e){
    e.preventDefault();
    var dataSource = returnAPIPath(e.target.pathname);
    var template = e.target.getAttribute("data-template");
    reqwest(dataSource, function (resp) {
      renderContent(template, resp);
      setAddress(e.target.pathname);
    })
  });

};

function setAddress(path){
  history.pushState({}, null, path + ".html");
}

// todo add popstate to manage browser history button usage




// Determine the api path from the hijcked link's href
function returnAPIPath(path){
  return "/api" + path + ".json";
}


// Output some data to the page via a given template
function renderContent(template, data){

  console.log(template, data);

  // populate the template with data
  var output = templates[template](data);

  // add output to the page
  $('.content').html(output);
};


// let's go!
$(function () {
  addEventHandlers();
});


