'use strict'
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
    });


});


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

