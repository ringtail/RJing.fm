/*
  mplayer instance
 */
var exec = require('child_process').exec,
  jingCore = require('../jingCore'),
  logger = require('../logger'),
  __staus = false,
  menu,
  __keys = "",
  __mplayer_process;

function __loop(keys, mplayer) {
  jingCore.search(keys, function(results) {
    logger.correct('播放中>>');
    menu = require('terminal-menu')({
      width: 29,
      x: 4,
      y: 2
    });
    menu.reset();
    menu.write('RJing.fm !\n');
    menu.write('-------------------------\n');
    menu.add('>>>> pause <<<<');
    menu.add('>>>> stop <<<<');
    menu.add('>>>> next <<<<');
    menu.add('>>>> before <<<<');
    menu.add('>>>> speedUp <<<<');
    menu.add('>>>> normal Speed <<<<');
    menu.add('>>>> speedDown <<<<');
    menu.add('>>>> loop <<<<');
    menu.add('>>>> calm <<<<');
    menu.add('>>>> exit <<<<');

    menu.on('select', function(label) {
      switch (label) {
        case ">>>> pause <<<<":
          player.pause();
          break;
        case ">>>> stop <<<<":
          player.stop();
          break;
        case ">>>> before <<<<":
          player.before();
          break;
        case ">>>> next <<<<":
          player.next();
          break;
        case ">>>> speedUp <<<<":
          player.speedUp();
          break;
        case ">>>> normal Speed <<<<":
          player.speed();
          break;
        case ">>>> speedDown <<<<":
          player.speedDown();
          break;
        case ">>>> loop <<<<":
          player.loop();
          break;
        case ">>>> calm <<<<":
          player.calm();
          break;
        case ">>>> exit <<<<":
          player.exit();
          break;
      }
    });
    menu.createStream().pipe(process.stdout);
    __mplayer_process = exec('mplayer -slave -quiet ' + results.toString().replace(/,/g, ' '), {
      maxBuffer: 20000 * 1024
    }, function(error, stdout, stderr) {
      if (error)
        logger.error('error occur');

      logger.correct('finished and next list is coming');
      return __loop(keys);
    })
  })
}

function __getInstance() {
  return __mplayer_process;
}
process.on('exit', function() {
  try {
    __mplayer_process.kill('SIGTERM');
  } catch (e) {
    //
  }
  logger.correct('terminated');
})
var player = {
  pause: function() {
    return __getInstance().stdin.write('pause\n');
  },
  stop: function() {
    return __getInstance().stdin.write('stop\n');
  },
  next: function() {
    return __getInstance().stdin.write('pt_step 1\n');
  },
  before: function() {
    return __getInstance().stdin.write('pt_step -1\n');
  },
  speedUp: function() {
    return __getInstance().stdin.write('speed_mult  2\n');
  },
  speedDown: function() {
    return __getInstance().stdin.write('speed_mult 0.5\n');
  },
  speed: function(num) {
    return __getInstance().stdin.write('speed_set  ' + num || 1 + '\n');
  },
  calm: function() {
    return __getInstance().stdin.write('mute\n');
  },
  loop: function(num) {
    return __getInstance().stdin.write('loop ' + 100 || num + '\n');
  },
  download: function() {

  },
  exit: function() {
    process.exit();
  },
  __getInstance: function() {
    return __mplayer_process;
  }
}
module.exports = {
  init: function(email, pwd, callback) {
    jingCore.login(email, pwd, callback);
  },
  play: function(keys) {
    __keys = keys;
    __status = true;
    __loop(keys);

  },
}
