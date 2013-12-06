/*
  RJplayer UI skin;
 */
var player = require('../player'),
   fs = require('fs'),
   logger = require('../logger'),
   readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// menu.createStream().pipe(process.stdout);
module.exports={
  init:function(){
    // need to be sepearated;
   fs.readFile('config',function(err,data){
      if(err)
        logger.error('fail to load config');

      var array = data.toString().split('\n');

      player.init(array[0],array[1],function(){
        logger.correct('登录中...');
        rl.question('请输入想要听的歌曲或者歌手的名字:\n',function(answer){
          player.play(answer||array[2]);
          rl.close();

          // menu.reset();
          // menu.write('RJing.fm !\n');
          // menu.write('-------------------------\n');

          // menu.add('>>>> play <<<<');
          // menu.add('>>>> pause <<<<');
          // menu.add('>>>> stop <<<<');
          // menu.add('>>>> next <<<<');
          // menu.add('>>>> before <<<<');
          // menu.add('>>>> speedUp <<<<');
          // menu.add('>>>> speedDown <<<<');
          // menu.add('>>>> loop <<<<');
          // menu.add('>>>> EXIT <<<<');

          // menu.on('select', function (label) {
          //     switch(label){
          //       case "pause":player.pause();break;
          //       case "stop":player.stop();break;
          //       case "before":player.before();break;
          //       case "next":player.next();break;
          //       case "speedUp":player.speedUp();break;
          //       case "speedDown":player.speedDown();break;
          //       case "loop":player.loop();break;
          //       case "exit":player.exit();break;
          //     }
          // });
          // menu.createStream().pipe(process.stdout);
        })
      })
   })
  }
}
