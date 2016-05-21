
  'use strict'

var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');

var request = require('request');
var stream;
var speaker, decoder;

var url = 'https://haxmax-pillow-leeyangwoo-1.c9users.io'
var socket = require('socket.io-client')(url);

var sendIntervalID;
var sendIndex=0;

//unique device id
var mDeviceID="abcdefg"


socket.on('connect', function(){
    console.log("connected : "+url);
    socket.emit('req_auth',{
      DeviceID:mDeviceID
    });
    socket.on('res_auth',function(data) {
      if(data.resultCode === "success"){
        console.log("auth DEVICE : " + mDeviceID);
        sendIntervalID = new setInterval(sendReport,3000);
      }else{
        console.log("auth failed.");
      }
    });



    socket.on('err',function(msg){
        console.log(msg);
    });

    socket.on('disconnect', function(){
        console.log('disconnect');
        clearInterval(sendIntervalID);
         if (stream) {
	      stream.unpipe();
	    }
	    console.log('stopping')
    });

});

socket.on('playcontrol', function(data) {
	console.log("get file");
  if (data.action == 'play') {
    console.log('playing');

    speaker = new Speaker();
    decoder = new lame.Decoder();

    //stream = fs.createReadStream(data.fileurl);
    stream = request(data.fileurl);
    stream.pipe(decoder).pipe(speaker);


  }
  if (data == 'stop') {
    if (stream) {
      stream.unpipe();
    }
    console.log('stopping')
  }
})


function sendReport(){
        sendIndex++;
        console.log("report send : "+sendIndex);
        socket.emit('report',{
            Index : sendIndex,
            Time:Date(),
            DeviceID:mDeviceID,
            content:"empty content."
        });
}

