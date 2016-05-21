var five = require("johnny-five");
var raspi = require('raspi-io');

var board = new five.Board({
  io: new raspi()
});
var servo;


board.on('ready', function() {
console.log("board ready");
 servo = new five.Servo({
    pin: "GPIO12", 
    type: "continuous"
  });

  // Clockwise, top speed.
  servo.cw(1);

});

board.on('exit',function(){
    console.log("disconnected.");
    servo.stop();
    console.log("complete");
}); 
 

