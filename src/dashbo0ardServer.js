#!/usr/bin/env node

/**
 * Module dependencies.
 */

let app = require("./httpServer");
let ws = require("./websocketServer");
let debug = require("debug")("dashb0ard:server");
let http = require("http");

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

/**
 * Initialize modules
 */

let modules = require("./modules/index");
for (let i = 0, len = modules.length; i < len; i++) {
  if (modules[i].initialize) {
    modules[i].initialize();
    debug("initialized " + modules[i].name);
  }
  if (modules[i].wsManager) {
    ws.use(modules[i].name, modules[i].wsManager);
  }
}

/**
 * Create HTTP server.
 */

let server = http.createServer(app);

/**
 * Create WS server
 */

ws.start(server);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
