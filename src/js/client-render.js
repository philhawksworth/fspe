var reqwest = require('reqwest');
var $ = require('jbone');
$.ajax = reqwest.compat;

var paths = require("../../scripts/config.js").paths;

// list ALL templates
// TODO : Automate this so that it is generated from the list of templates found in the directory
var templates = {
  main : require("../templates/main.js"),
  listing : require("../templates/listing.js"),
  partial : require("../templates/partial_body.js")
};


function addEventHandlers() {

  var dynamicPageLinks = document.querySelectorAll('[data-template]');

  $(dynamicPageLinks).on("click", function(e){
    e.preventDefault();
    loadPage(e.target.pathname);
    setAddress(e.target.pathname);
  });

  // perform client-side content render for browser history navigation
  window.onpopstate = function(event) {
    loadPage(event.state.path);
  };

  $('body').on("loaded", function(e){
    console.log("content loaded");
  });

};



function loadPage(path){

  // tell the page that a content transition is happening
  $('body').addClass('loading');
  $('body .content')[0].addEventListener("animationend", function(e){
      $('body').removeClass('loading');
      $('body').trigger("loaded");
  }, false);

  // load the data from the api and render it with a template
  var dataSource = returnAPIPath(path + ".json");
  reqwest(dataSource, function (resp) {
    renderContent(resp.template, resp);
  })

};


function setAddress(path){
  var stateObject = {
    path: path
  };
  history.pushState(stateObject, null, path);
}

// todo add popstate to manage browser history button usage



// Determine the api path from the hijcked link's href
function returnAPIPath(path){
  return "/api" + path.replace(".html", ".json");
}


// Output some data to the page via a given template
function renderContent(template, data){
  var output = templates['partial']['body'](data);
  $('.content').html(output);
};


// let's go!
$(function () {
  addEventHandlers();
});

