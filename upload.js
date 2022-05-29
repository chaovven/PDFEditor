var express = require('express');
var app = express();
var fs = require("fs");
const { exec } = require('child_process');
var bodyParser = require('body-parser');
var multer = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: __dirname + '/uploads/' }).any());

// Get root
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
})


// 
app.post('/pdf-ocr', function (req, res) {
  cmd = ""

  // construct cmd
  for (var i = 0; i < req.files.length; i++) {
    let filepath = req.files[i].path,
      newFilename = __dirname + '/' + req.files[i].originalname
    cmd = cmd + `ocrmypdf -l chi_sim "${filepath}" "${newFilename}"\n`
  }

  // compress if length > 1
  if (req.files.length >= 2) {
    let filelist = ""
    req.files.forEach(file => {
      filelist += `"${file.originalname}" `
    })
    cmd += `tar -cvf "./uploads/ocr_${req.files.length}files.zip" -C ${__dirname} ${filelist}`
  }

  console.log("\nTry to execute the following cmd: ")
  console.log(cmd)

  // execute cmd
  exec(cmd, (err, stdout, stderr) => {
    console.log('\n' + cmd)
    if (err) {
      console.log(stderr)
    } else {
      // delete files after finishing executing cmd
      console.log(stderr)

      // download filename
      download_fn = req.files.length >= 2 ? `./uploads/ocr_${req.files.length}files.zip` : __dirname + '/' + req.files[0].originalname

      // download
      res.download(download_fn, (d_err) => {
        if (d_err) {
          console.log(d_err)
        }
        // delete files
        console.log("\nTrying to deleting files")
        for (var i = 0; i < req.files.length; i++) {
          fs.unlinkSync(req.files[i].path)
          console.log(`\n${req.files[i].path} deleted!`)
          fs.unlinkSync(__dirname + '/' + req.files[i].originalname)
          console.log(`\n${req.files[i].originalname} deleted!`)
        }
        if (req.files.length >= 2) {
          fs.unlinkSync(`./uploads/ocr_${req.files.length}files.zip`)
          console.log(`./uploads/ocr_${req.files.length}files.zip deleted`)
        }
      })
    }
  })
});

app.post('/pdf-merge', function (req, res) {
  req.files.forEach(e => {
  })
});

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log(`Example app listening at http://${host}:${port}`)
})
