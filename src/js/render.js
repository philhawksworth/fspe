
var handlebars  = require('hbsfy/runtime');
var reqwest = require('reqwest');
var $ = require('jbone');
$.ajax = reqwest.compat;

// list ALL templates
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

  console.log(template, data);

  // populate the template with data
  var output = templates[template](data);

  // add output to the page
  $('.content').html(output);

  // tell the page that loading has completed
  // $('body').removeClass('loading');
};


// let's go!
$(function () {
  addEventHandlers();
});


