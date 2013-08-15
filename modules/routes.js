"use strict";
var fs = require('fs'),
  byline = require('byline'),
  getLines = function (cb) {
    var lines = [],
      lineNumber = 1,
      stream = byline(fs.createReadStream('data/sample.txt'));
    stream.on('data', function (line) {
      lines.push({number: lineNumber, text : line.toString('utf-8')});
      lineNumber += 1;
    });
    stream.on('end', function (line) {
      cb(lines);
    });
  };
exports.routes = function () {
  return {
    initialize : function (app) {
      app.get('/', function (req, res) {
        getLines(function (lines) {
          res.render('module', { lines: lines });
        });
      });
    }
  };
};

