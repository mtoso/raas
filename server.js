'use strict'

require("babel/register")({
  // This will override `node_modules` ignoring - you can alternatively pass
  // an array of strings to be explicitly matched or a regex / glob
  ignore: false
});
var React = require('react');
var express = require('express');
var path =  require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.post('/', function(req, res) {
  try {
    var viewPath = path.resolve('./node_modules/' + req.query.module + '/components/' + req.query.component);
    console.log(viewPath);
    var component = require(viewPath);
    var props = req.body || null;
    res.status(200).send(

      React.renderToString(
        React.createElement(component, props)
      )
    );
  } catch(err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, function() {
  console.log('Started on PORT 3000');
});
