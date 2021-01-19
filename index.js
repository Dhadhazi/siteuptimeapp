/*
 * Primary file for the API
 *
 */

// Dependencies
const http = require("http");
const url = require("url");

// The server should respond to all requests with a string
const server = http.createServer(function (req, res) {
  // Get the URL and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname; // Untrimmed path the user requests
  const trimmedPath = path.replace(/^\/+|\/+$/g, ""); // Cuts off the / from the path

  // Get the query string as an object
  const queryStringObject = parsedUrl.query;

  // Get the HTTP Method
  const method = req.method.toLowerCase();

  // Get the headers as an object
  const headers = req.headers;

  // Send the response
  res.end("Hello World\n");
});

// Start the server, have it listen on port 3000
server.listen(3000, function () {
  console.log("The server is listening on port 3000 now");
});
