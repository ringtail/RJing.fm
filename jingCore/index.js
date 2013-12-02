/*
	jingCore module
	provide the main funciton about jing.fm api

	including:
	*login
	*logout
	*__setToken
 */

var request = require("request"),
	logger = require('../logger');

var BASE_API = "http://jing.fm/api/v1";


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

			logger.correct('successfully login!');
			callback({
				headers:response.headers,
				body:body
			});

		})
	},
	search:function(keywords){
		//查询歌曲
	},
	addStar:function(){
		//加星标；
	},
	logout:function(){
		//logout
		//
	}
}