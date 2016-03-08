## Prerequisists

- node
- npm


## installation

Clone the repo and in the project root install dependencies with:

`npm install`


## Building

Builds output a static site to the `/dist` folder.

Build the entire project by using npm with the command `npm run build`, this also purges the `/dist` folder.

More granular build control is available via:
- `npm run build:html` to compile the static html files
- `npm run build:js` to compile the javascript and handlebars templates for client-side rendering


## Serving

`npm run serve` will run a static web server exposing the contents of the `/dist` output folder.


# Content API

Content for use in the templates is intended to be made available to:

1. The templates which build the static pages
2. Direct to the browser for inclusion in the site via javascript rendering in the browser.

For development purposes, a dummy API is provided to satisfy the example pages. The full build command will also make the API avaible in the `/dist` folder for serving via the same static server.


