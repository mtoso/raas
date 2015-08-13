'use strict';

require("babel/register")({
  // This will override `node_modules` ignoring - you can alternatively pass
  // an array of strings to be explicitly matched or a regex / glob
  ignore: false
});

require('global-define')({basePath: __dirname});

var React = require('react'),
    express = require('express'),
    path =  require('path'),
    bodyParser = require('body-parser'),
    util = require('./util');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('env', process.env.NODE_ENV || 'development');
app.use(bodyParser.json());

var isCacheActive = app.get('env') === 'production' ? true : false;

app.post('/', function(req, res) {
  try {
    var viewPath = path.resolve('./node_modules/' + req.query.module + '/components/' + req.query.component);
    var component = util.getComponent(viewPath, isCacheActive);
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

app.listen(app.get('port'), function() {
  console.log('Started on port ' + app.get('port') + ' in ' + app.get('env') + ' mode');
});
