var url = 'http://yw1-leeyangwoo.c9users.io'

var socket = require('socket.io-client')(url);
var sendIntervalID;
var sendIndex=0;
var mDeviceID="abcdefg"


socket.on('connect', function(){
    console.log("connected : "+url);
    socket.emit('auth',)
    sendIntervalID = setInterval(sendReport,500);

    socket.on('disconnect', function(){
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
