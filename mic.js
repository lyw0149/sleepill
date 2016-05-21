var raspi = require('raspi-io');
var five = require("johnny-five");
var board = new five.Board({

io: new raspi()

});

board.on("ready", function() {
  var mic = new five.Sensor("GPIO7");
//  var led = new five.Led(11);

  mic.on("data", function() {
    console.log(this.value);
  });
});
