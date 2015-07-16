require('node-jsx').install();
import express from "express";
import path from "path";
import httpProxy from "http-proxy";
import React from "react";
import Router from "react-router";
import renderer from "react-engine";
  
import Routes from "./routes";

const proxy = httpProxy.createProxyServer();
const app = express();

// create the view engine with `react-engine`
var engine = renderer.server.create({
  reactRoutes: path.join(__dirname + '/routes')
});

/// set the engine
app.engine('.jsx', engine);

// set the view directory
app.set('views', __dirname + '/public/views');

// set jsx as the view engine
app.set('view engine', 'jsx');

// finally, set the custom view
app.set('view', renderer.expressView);

//expose public folder as static assets
//app.use('/public', express.static('public'));

  // Prevent static files to rerouted thorugh react-router
  app.use('/public',express.static(__dirname + '/public'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//Check and set variable if app is on production or development
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 5000 : 3000;

if (!isProduction) {

  // We require the bundler inside the if block because
  // it is only needed in a development environment. Later
  // you will see why this is a good idea
  var webpack = require('./webpack.js'); 
  webpack();

  // Here we redirect the public folder to our webpack server
  app.get('/public/*', function (req, res) {
      proxy.web(req, res, {
          target: 'http://localhost:1337'
      });
    });

  // Redirect all requests so react-router handles them. 
  app.get('/*', function (req, res) {
    res.render(req.url,{isProduction});
  });


  // It is important to catch any errors from the proxy or the
  // server will crash. An example of this is connecting to the
  // server when webpack is bundling
  proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
  });

  // We need to use basic HTTP service to proxy
  // websocket requests from webpack
  //var server = http.createServer(app);  

  app.listen(port, function () {
    console.log('Development Server running on port ' + port);
  }); 

} else {

  app.get('/*', function (req, res) {
    res.render(req.url,{isProduction});
  });

  app.listen(port, function () {
    console.log('Production Server running on port ' + port);
  }); 

}
