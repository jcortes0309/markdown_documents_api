# Markdown Documents API

You are making an API for storing markdown documents and rendering the documents as HTML. You will store the documents as files on your filesystem by using the ```fs``` module. Use asynchronous IO for all filesystem operations - sychronous IO will cripple the server's ability to serve multiple requests simultaneously. You should use Postman to test these APIs as you work.

## PUT /documents/:filename

Sending a PUT request to the ```/documents/:filename``` URL will cause it to be saved in the ```data``` subdirectory within your application. The file path will be taken from the route parameter. The body of the request will be an object in JSON format, with the property ```contents```. Example: ```PUT /documents/how-to-write-an-express-app.md``` with the body of:

```
{
  "contents": "Install it first: `npm install express`"
}
```

Will save a new file with the file path ```data/how-to-write-an-express-app.md``` containing content from the ```contents``` property of the JSON object.

*Hint: see ```express_file_io.js``` in ```express-examples.zip``` for an example of using file IO in the context of an express application*


## GET /documents/:filename

Sending a GET request to the ```/documents/:filename``` URL will return a JSON object containing the title and contents properties. Example: ```GET /documents/how-to-write-an-express-app.md``` will return a JSON response like:

```
{
  "filename": "how-to-write-an-express-app.md",
  "contents": "Install it first: `npm install express`"
}
```


## GET /documents/display

Sending a GET request to the ```/documents/:filename/display``` URL will render an HTML web page containing the result of the markdown page converted into HTML. Example: ```GET /documents/how-to-write-an-express-app.md/display``` will return HTML like:

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>how-to-write-an-express-app.md</title>
  </head>
  <body>
    <p>Install it first: <code>npm install express</code></p>
  </body>
</html>
```


## GET /documents

Sending a GET request to the ```/documents``` URL will return an array containing the file paths of the documents that exist (any file in the ```data``` subdirectory). For example: ```GET /documents``` might return:

```
[
  "how-to-write-an-express-app.md",
  "how-to-nodejs.md",
  "how-to-python.md"
]
```

*Hint: research the [fs.readdir](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback) function.*


## DELETE /documents/:filename

Sending a DELETE request to the ```/documents/:filename``` API will remove the corresponding file from the filesystem.


## Bonus: Use PostgreSQL

Redo the app but save the information in PostgreSQL instead of files.
