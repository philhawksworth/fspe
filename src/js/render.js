
var handlebars  = require('hbsfy/runtime');
var reqwest = require('reqwest');
var $ = require('jbone');
$.ajax = reqwest.compat;


// list ALL templates
// TODO : Automate this so that it is generated from the list of templates found in the directory
var templates = {
  pageTemplate : require("../templates/page-template.hbs"),
  messageTemplate : require("../templates/message-template.hbs"),
};


function addEventHandlers() {

  var dynamicPageLinks = document.querySelectorAll('[data-template]');

  $(dynamicPageLinks).on("click", function(e){
    e.preventDefault();

    // tell the page that a content transition is happening
    $('body').addClass('loading');
    $('body .content')[0].addEventListener("animationend", function(e){
        $('body').removeClass('loading');
    }, false);

    var dataSource = returnAPIPath(e.target.pathname);
    var template = e.target.getAttribute("data-template");
    reqwest(dataSource, function (resp) {
      renderContent(template, resp);
      setAddress(e.target.pathname);
    })
  });

};

function setAddress(path){
  history.pushState({}, null, path);
}

// todo add popstate to manage browser history button usage




// Determine the api path from the hijcked link's href
function returnAPIPath(path){
  return "/api" + path.replace(".html", ".json");
}


// Output some data to the page via a given template
function renderContent(template, data){
  var output = templates[template](data);
  $('.content').html(output);
};


// let's go!
$(function () {
  addEventHandlers();
});


