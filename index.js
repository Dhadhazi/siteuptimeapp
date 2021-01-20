/*
 * Primary file for the API
 *
 */

// Dependencies
const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const config = require("./config");

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

  // Get the payload, if any
  const decoder = new StringDecoder("utf-8");
  var buffer = "";
  // Because the coming in data is a stream, we need to collect it and wait for it to end
  req.on("data", function (data) {
    buffer += decoder.write(data);
  });

  // End event always get called after we get all the payload, even if payload is empty
  req.on("end", function () {
    buffer += decoder.end();

    // Choose the handler this request should go to. If one is not found, use notFound handler
    const chosenHandler = router[trimmedPath] || handlers.notFound;

    // Construct the data object to send to the handler
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer,
    };

    // route the request to the handler specified in the router
    chosenHandler(data, function (statusCode, payload) {
      // Use the status code called back by the handler or default to 200
      statusCode = statusCode || 200;

      // Use the payload called back by the handler or default to an empty object
      payload = payload || {};

      // Convert the payload to a string
      const payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
});

// Start the server
server.listen(config.port, function () {
  console.log(
    `The server is listening on port ${config.port} in ${config.envName} mode`
  );
});

// Define the handlers
var handlers = {};

// Sample handler
handlers.sample = function (data, callback) {
  // Callback a http status code, and a payload object
  callback(406, { name: "sample handler" });
};

// Not found handler
handlers.notFound = function (data, callback) {
  callback(404);
};

// Define a request router
const router = {
  sample: handlers.sample,
};
