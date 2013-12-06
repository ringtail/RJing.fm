/*
	jingCore module
	provide the main funciton about jing.fm api

	including:
	*login
	*logout
	*__setToken
 */

var request = require("request"),
	logger = require('../logger'),
  async = require('async');

var BASE_API = "http://jing.fm/api/v1";

var jingCore = {
	__token:{
		//token ;
	},
	getHeader:function(string){
		return this.__token.headers[string];
	},
	getUid:function(){
		return this.__token.id;
	},
	setKeywords:function(keywords){
		this.__token.keywords = keywords;
	},
	getKeywords:function(){
		return this__token.keywords;
	}
}

module.exports={
	login:function(email,pwd,callback){
		//login jing.fm
		var LOGIN_URL = BASE_API+"/sessions/create";

		request.post({
			url:LOGIN_URL,
			form:{
				email:email,
				pwd:pwd
			},
			json:true
		},function(err,response,body){
			if(err)
				logger.error('fail to login!');

			jingCore.__token.headers = response.headers;
			jingCore.__token.id = body.result.usr.id;

			logger.correct('successfully login!');
			callback();

		})
	},
	search:function(keywords,callback){
		//查询歌曲
		var SONG_URL = BASE_API+'/search/jing/fetch_pls';

		request.post({
			url:SONG_URL,
			headers:{
				'Jing-A-Token-Header':jingCore.getHeader('jing-a-token-header'),
				'Jing-R-Token-Header':jingCore.getHeader('jing-r-token-header')
			},
			form:{
				q:keywords,
				u:jingCore.getUid()
			},
			json:true
		},function(err,response,body){
			if(err){
				logger.error('fail to get song list');
			}
			logger.notice('正在查找你要听的歌曲。');
			if(body.result.total === 0 ){
				//not any songs
				logger.error('貌似没有找到你想要的歌曲哦。')
			}else{
				//items refactor and play;

        // console.dir(body.result.items);
        var SOURCE_URL = BASE_API+'/media/song/surl';
        async.map(body.result.items,function(item,callback){
          // console.dir(item);
          request.post({
                url: SOURCE_URL,
                headers:{
                  'Jing-A-Token-Header':jingCore.getHeader('jing-a-token-header'),
                  'Jing-R-Token-Header':jingCore.getHeader('jing-r-token-header')
                },
                form: {
                    mid:item.mid
                },
                json: true
            },function(err, response, body) {
                // item.src = body.result;
                callback(null,body.result);
            });

        },function(err,results){
          // console.log(results);
            callback(results);
        })
				// callback(body.result.items);
			}
		})

	},
	addStar:function(){
		//加星标；
	},
	logout:function(){
		//logout

	},
	/*
		remove some time ß
	 */
	__getToken:function(){
		return jingCore;
	}
}
