var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');
var Player = require('player');
var request = require('request');
var stream;
var speaker, decoder;

var url = 'https://haxmax-pillow-leeyangwoo-1.c9users.io'
var socket = require('socket.io-client')(url);

var wnPlayer = new Player([
  './oxygen.mp3',
   './crowd.mp3',
   './heartbeat.mp3'   
]);

wnPlayer.play(function(err, player){
  console.log('playend!');
  player.play();
});


var SerialPort = require("serialport").SerialPort;
var serialPort;

socket.on('connect', function() {
    serialPort = new SerialPort("/dev/ttyUSB0", {
        baudrate: 9600
    });
    serialPort.on("open", function() {
        console.log('serialPort is open');

        serialPort.on('data', function(data) {
            //console.log('microphone data: ' + data);
            socket.emit('message', data);
        });
    });
    socket.on('playcontrol', function(data) {

        if (data.action == 'play') {
		wnPlayer.pause();
		playMsg(data.fileurl,data.length,function(){
	console.log('msg play complete');
	wnPlayer.pause();
}); 
}
        if (data == 'stop') {
            if (stream) {
                stream.unpipe();
            }
            console.log('stopping')
        }
    })
});

function playMsg(url,length,callback){
setTimeout(function(){
callback()
},length*1000);
speaker = new Speaker();
            decoder = new lame.Decoder();
            console.log("get msg from server");
            stream = request(url);
            stream.pipe(decoder).pipe(speaker);


}
