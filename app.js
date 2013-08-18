'use strict';
var local, browserify, express, routes, config, app, application, fs, byline, documentsPath, fileClerk;
local = true;
browserify = require('browserify-middleware');
express = require('express');
fs = require('fs');
byline = require('byline');
documentsPath = './data';
fileClerk = require('./modules/fileClerk').fileClerk(fs, byline, documentsPath);
routes = require('./modules/routes').routes(fileClerk);
config = require('./config');
app = express();
config.configure(app, express, browserify);
routes.initialize(app);
application = app.listen(3333);
if (local) {
  console.log('Express service listening on port %d, environment: %s', application.address().port, app.settings.env);
}