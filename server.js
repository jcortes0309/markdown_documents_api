const express = require("express");
const bodyParser = require("body-parser");
const marked = require("marked")
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

app.set("view engine", "hbs");

app.put("/documents/:filename", function(request, response) {
  let filepath = "./data/" + request.params.filename;
  let contents = request.body.contents;
  console.log(contents);
  fs.writeFile(filepath, contents, function(error) {
    if (error) {
      request.status(500);
      response.json({
        message: "Couldn't save the file because: " + err.message
      });
    } else {
      response.json({
        message: "File " + filepath + " saved."
      });
    }
  });
});

app.get("/documents/:filename", function(request, response) {
  let filename = request.params.filename;
  fs.readFile("./data/" + filename, function(error, contents) {
    if (error) {
      response.status(500);
      response.json({
        message: "Couldn't read file because: " + error.message
      });
    } else {
      response.json({
        filename: filename,
        contents: contents.toString()
      });
    }
  });
});

app.get("/documents/:filename/display", function(request, response) {
  let filename = request.params.filename;
  fs.readFile("./data/" + filename, function(error, contents) {
    if (error) {
      response.status(500);
      response.json({
        message: "Couldn't read the file because: " + error.message
      });
    } else {
      fileContent = contents.toString();
      fileContent = marked(fileContent);
      console.log(fileContent);
      response.render("display.hbs", {
        title: filename,
        contents: fileContent
      });
    }
  });
});





app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
