var http = require('http');
const multer = require('multer');
var fs = require('fs');


var server = http.createServer();

server.on('request', function (req, res) {
  // process the req here
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.multiples = true; //use this while dealing with multiple files
    console.log("HEllo")
    form.parse(req, function (err, fields, files) {
      var oldpath = files.uploadfile.filepath;
      var newpath = './' + files.uploadfile.originalFilename;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File Uploaded!')
        return res.end();
      });
    })
  } else {
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
  }
});
server.listen(8080);