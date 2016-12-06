const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

app.set("view engine", "hbs");

app.put("/documents/:filepath", function(request, response) {
  let filepath = "./data/" + request.params.filepath;
  let contents = request.body.contents
  console.log(contents);
  fs.writeFile(filepath, contents, function(error) {
    if (error) {
      request.status(500);
      response.json({
        message: "Couldn't save file because: " + err.message
      });
    } else {
      response.json({
        message: "File " + filepath + " saved."
      });
    }
  });
});

app.get("/documents/:filepath", function(request, response) {
  let filepath = "./data/" + request.params.filepath;
  if (fs.existsSync(filepath)) {
    fs.readFile(filepath, function(error, content) {
    if (error) {
      console.log("\nSorry, there is no such file or directory: ");
      console.log(error.message, "\n");
      return;
    }
    var fileContent = content.toString();
    console.log("The fileContent is: ", fileContent);
    });
  } else {
    console.log("Boooo.  The file doesn't exist :( ");
  }
  // console.log("The file name is: ", filepath);
});






app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
