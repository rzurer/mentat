"use strict";
exports.fileClerk = function (fs, byline, documentsPath) {
  return {
    getDocumentNames : function (cb) {
      fs.readdir(documentsPath, cb);
    },
    getDocumentLines : function (documentName, cb) {
      var lines = [],
        lineNumber = 1,
        stream = byline(fs.createReadStream(documentName));
      stream.on('data', function (line) {
        lines.push({number: lineNumber, text : line.toString('utf-8')});
        lineNumber += 1;
      });
      stream.on('end', function (line) {
        cb(lines);
      });
    }
  };
};