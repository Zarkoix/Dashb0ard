const debug = require("debug")("dashb0ard:module:weather");
const request = require("request");

const apiKey = "ceca56fa57605eca433c8a43ac5d66ec";

module.exports = {
  name: "weather",
  restManager: function(username, callback) {
    debug("weather manager called");
    request(
      "http://api.openweathermap.org/data/2.5/weather?q=Seattle&APPID=" +
        apiKey,
      { json: true },
      (err, res, body) => {
        if (err) {
          debug(err);
          callback(err);
        }
        callback(body);
      }
    );
  }
};
