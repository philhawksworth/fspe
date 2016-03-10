# Full Stack Progressive Enhancement

An experimental project architecture to provide dynamic client-side rendering with Javascript and server-rendered views all from the same content API and a simple templated static site generator.


## Project goals

This project aims to provide a site development architecture which enables:

- Template driven static site generation
- Client-side dynamic pages as a progressive enhancement to static pages
- A URL for every page of content
- Zero server side logic required for its webserver
- Deployable to any static site server
- Decoupled and customizable content source
- Local caching of managed content for dependency free development process
- Support for atomic design development patterns
- Parity between local development and hosted production output

### Additional goals

- automation of deployment to S3



## Prerequisites

- node
- npm


## installation

Clone the repo and in the project root install dependencies with:

`npm install`


## Building

Building outputs a static site to the `/dist` folder.

Build the entire project by using npm with the command `npm run build`, this also purges the `/dist` folder.

More granular build control is available via:
- `npm run build:html` to compile the static html files
- `npm run build:js` to compile the javascript and handlebars templates for client-side rendering


## Content API

Content for use in the templates is intended to be made available to:

1. The templates which render the static pages in the server.
2. The browser for inclusion in the site via javascript rendering client-side.

For development purposes, a dummy API is provided to satisfy the example pages. The full build command will also make the API available in the `/dist` folder for serving via the same static server.


## Serving

`npm run serve` will run a static web server exposing the contents of the `/dist` output folder.



## Development approach

To build a site on this framework you'll need to follow these conventions:

// todo






