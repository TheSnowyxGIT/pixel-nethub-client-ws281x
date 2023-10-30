const { WebSocketServer } = require("ws");
const ws281x = require("rpi-ws281x-native");

const width = Number(process.env.WIDTH) || 32;
const height = Number(process.env.HEIGHT) || 8;
const gpio = Number(process.env.GPIO) || 18;
const invert = process.env.INVERT === "true";
const brightness = Number(process.env.BRIGHTNESS) || 150;

const options = {
  gpio,
  invert,
  brightness,
  stripType: ws281x.stripType.WS2812,
};
const channel = ws281x(width * height, options);

const wss = new WebSocketServer({ port: process.env.PORT || 8080 });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });
});
