"use strict";
exports.routes = function (fileClerk) {
  return {
    initialize : function (app) {
      app.get('/', function (req, res) {
        res.render('mentat');
      });
      app.get('/indent', function (req, res) {
        res.render('indent');
      });
      app.post('/getDocumentLines', function (req, res) {
        var documentName = req.param('documentName');
        fileClerk.getDocumentLines(documentName, function (lines) {
          res.send(lines);
        });
      });
      app.post('/getDocumentNames', function (req, res) {
        fileClerk.getDocumentNames(function (err, documentNames) {
          if (err) {
            throw err;
          }
          res.send(documentNames);
        });
      });
    }
  };
};

