const WebSocket = require("ws");
const debug = require("debug")("dashb0ard:websocket");
const debugHeartBeat = require("debug")("dashb0ard:websocket:heartbeat");
const jwt = require("./database/jwt");
const secret = require("./authenticationMiddleware").secret;

/**
 * a structure of references to wsManager functions of modules
  {
    moduleName: wsManagerForModule,
  }
 */
let c = {};

module.exports = {
  start: function(server) {
    /**
     * a structure mapping users to their web socket connections
     {
       root: [],
       adamt77: [ws1, ws2, ws3, ws4]
     }
     */
    const map = {};

    const wss = new WebSocket.Server({ server });
    debug("WSS ready");

    let nextID = 0;
    wss.on("connection", function connection(ws, req) {
      debug("WS connection created");

      ws.isAlive = true; // for use by heartbeat protocol to check status of sockets

      /**
       * according to spec whenever a ws is sent 'ping' it will return pong
       * this is used to check its heartbeat
       */
      ws.on("pong", heartbeat);

      ws.on("message", function incoming(message) {
        message = JSON.parse(message);
        switch (message.type) {
          case "auth":
            jwt
              .verifyToken(message.token, secret)
              .then(info => {
                debug(
                  "Auth succeeded for websocket, username: %s",
                  info.username
                );
                ws.username = info.username;
                ws.admin = info.admin;
                ws.id = nextID;
                nextID++;
                if (map[info.username] && map[info.username].length > 0) {
                  const numClients = map[info.username].push(ws);
                  debug(numClients + " clients connected for " + info.username);
                } else {
                  map[info.username] = [ws];
                }
              })
              .catch(e => {
                debug("Auth failed for websocket " + e);
                ws.send(
                  JSON.stringify({
                    type: "error",
                    value: "Authentication Failed"
                  })
                );
              });
            break;
          /**
           * no server level type on the packet, so let's see if it's addressed to a module
           */
          default:
            if (ws.username) {
              // ensure that the user is logged in
              if (c[message.type]) {
                // is there a type?
                // if so call the wsManager for that module with the packet
                c[message.type](message, ws, map[ws.username]);
              } else {
                debug("no route for %s exists", message.type);
              }
            } else {
              debug("message from unauth'd user");
            }
        }
      });

      /**
       * a WS lost a connection, so lets remove it from that client's list of connected WS client's
       */
      ws.on("close", function close() {
        if (ws.username) {
          debug(ws.username + " had a client disconnect");
          const l = map[ws.username].findIndex(o => o.id === ws.id);
          if (l > -1) {
            map[ws.username].splice(l, 1);
          } else {
            debug("Error finding ws to close");
          }
          debug(
            map[ws.username].length + " client(s) connected for " + ws.username
          );
        }
      });
    });

    /**
     * called by 'pong' messages
     */
    function heartbeat() {
      this.isAlive = true;
    }

    /**
     * poll every connection every once in awhile to make sure they're still alive
     * if they're not lets terminate that connection
     * currently no way to tear down the interval, add 'const interval =' to set to a variable
     */
    setInterval(function ping() {
      debugHeartBeat("checking heartbeat");
      wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) {
          debug("closing connection, heartbeat lost");
          return ws.terminate();
        }

        ws.isAlive = false;
        ws.ping("", false, true);
      });
      debugHeartBeat("finished checking heartbeats");
    }, 30000);
  },

  use: function(route, f) {
    debug("registering route WS route: " + route);
    c[route] = f;
  }
};
