var Player = require('player');

// create player instance
var player = new Player('https://haxmax-pillow-leeyangwoo-1.c9users.io/msg/output.mp3');
player.add('https://haxmax-pillow-leeyangwoo-1.c9users.io/msg/output.mp3');
// play now and callback when playend
player.play('https://haxmax-pillow-leeyangwoo-1.c9users.io/msg/output.mp3',function(err, player){
  console.log('playend!');
});
