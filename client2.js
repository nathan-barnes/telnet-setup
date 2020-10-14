var Telnet = require("telnet-client");
var connection = new Telnet();

// these parameters are just examples and most probably won't work for your use-case.
var params = {
  host: process.env.ZEA_TELNET_HOST,
  port: process.env.ZEA_TELNET_PORT,
  //shellPrompt: "/ # ", // or negotiationMandatory: false
  negotiationMandatory: false,
  timeout: 1500,
  // removeEcho: 4
};

connection.on("ready", function (prompt) {
  connection.exec(cmd, function (err, response) {
    console.log(response);
  });
});

connection.on("timeout", function () {
  console.log("socket timeout!");
  connection.end();
});

connection.on("close", function () {
  console.log("connection closed");
});

connection.connect(params);
