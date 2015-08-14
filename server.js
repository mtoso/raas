'use strict';

require("babel/register")({
  // This will override `node_modules` ignoring - you can alternatively pass
  // an array of strings to be explicitly matched or a regex / glob
  ignore: false
});

var React = require('react'),
    express = require('express'),
    path =  require('path'),
    bodyParser = require('body-parser'),
    util = require('./util');

var app = express();

var deleteModuleCache = app.get('env') === 'production' ? false : true;

require('global-define')({
  basePath: __dirname,
  deleteModuleCache: deleteModuleCache
});

app.set('port', process.env.PORT || 3000);
app.set('env', process.env.NODE_ENV || 'development');
app.use(bodyParser.json());



app.get('/', function(req, res) {

  try {
    var viewPath = path.resolve('./node_modules/' + req.query.module + '/' + req.query.component +'/index.js');
    var component = util.getComponent(viewPath, deleteModuleCache);
    var props = req.body || null;

    console.log('Request for ' + viewPath + ' with ' + JSON.stringify(props));

    res.status(200).send(
      React.renderToString(
        React.createElement(component, props)
      )
    );
  } catch(err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

app.listen(app.get('port'), function() {
  console.log('Started on port ' + app.get('port') + ' in ' + app.get('env') + ' mode');
});
