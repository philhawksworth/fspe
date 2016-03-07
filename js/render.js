// var $ = require('jquery');
var handlebars = require('handlebars');
var reqwest = require('reqwest');
var $ = require('jbone');

$.ajax = reqwest.compat;



function addEventHandlers() {

  var dynamicPageLinks = document.querySelectorAll('[data-template]');

  $(dynamicPageLinks).click(function(e){
    e.preventDefault();
    var dataSource = returnAPIPath(e.target.pathname);
    var template = e.target.getAttribute("data-template");
    $.get(dataSource, function( data ) {
      renderContent(template, data);
      setAddress(e.target.pathname);
    }, "json" );
  });

};

function setAddress(path){
  var stateObj = { foo: "bar" };
  history.pushState(stateObj, null, path);
}


// Determine the api path from the hijcked link's href
function returnAPIPath(path){
  return "/api" + path + ".json";
}


// Output some data to the page via a given template
function renderContent(template, data){

  console.log(template, data);

  //source the hbs template
  var hbsTemplate = $("#"+template).html();

  // Compile the template
  var compiledTemplate = handlebars.compile(hbsTemplate);

  // populate the template with data
  var output = compiledTemplate(data);

  // add output to the page
  $('.content').html(output);

};



$(function () {


  addEventHandlers();


});


