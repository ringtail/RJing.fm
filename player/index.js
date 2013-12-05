/*
	mplayer instance
 */
var exec = require('child_process').exec;
var jingCore = require('../jingCore');
module.exports={
  init:function(email,pwd){
    jingCore.login(email||'773913792@qq.com',pwd||'227228',function(){

    });
  },
	play:function(keys){
    jingCore.search(keys,function(results){
      exec('mplayer '+results.toString().replace(/,/g,' '),{
        maxBuffer:20000*1024
      },function(error,stdout,stderr){
        if(error)
          logger.error('error occur');
        logger.correct('finished');
      })
    })
	},
	pause:function(){

	},
	stop:function(){

	},
	next:function(){

	},
	before:function(){

	},
	volumeUp:function(){

	},
	volumeDown:function(){

	},
	calm:function(){

	}
}
