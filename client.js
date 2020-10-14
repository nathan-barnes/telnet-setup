const Telnet = require("telnet-client");

const run = async () => {
  let telnet = new Telnet();

  let params = {
    host: process.env.ZEA_TELNET_HOST,
    port: process.env.ZEA_TELNET_PORT,
    //shellPrompt: "/ # ", // or negotiationMandatory: false
    negotiationMandatory: false,
    timeout: 1500,
    initialCTRLC: true,
    initialLFCR: true,
  };

  console.log(params);

  telnet.on("connect", () => {
    console.log("Connected.");
  });

  telnet.on("ready", () => {
    console.log("Ready.");
  });

  telnet.on("data", (data) => {
    console.log(data.toString("utf8"));
  });

  telnet.on("writedone", () => {
    console.log("writedone");
  });

  telnet.on("timeout", () => {
    console.log("Timeout.");
  });

  telnet.on("failedlogin", () => {
    console.log("failedlogin");
  });

  telnet.on("error", () => {
    console.log("error");
  });

  telnet.on("end", () => {
    console.log("end");
  });

  telnet.on("close", () => {
    console.log("close");
  });

  try {
    await telnet.connect(params);

    const socket = telnet.getSocket();

    let res = await telnet.send("uptime");
  } catch (err) {
    console.error(err);
  }

  // try {
  //   let res = await telnet.exec("uptime");
  //   console.log("Async result:", res);
  // } catch (err) {
  //   console.error("Zea exec error:", err);
  // }
};

run();
