/*
	songManager and curd operation;
 */
var logger = require('../logger'),
	fs = require('fs'),
	request = require('request'),
	http = require('http'),
  paht = require('path'),
  sys = require('sys');


//
// init readline
// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

var songList = {
	__cache:[],
	__LIMIT_NUM:50,
	__currentIndex:0,
	push:function(item){
		var index = this.__currentIndex%this__LIMIT_NUM;
		this.__cache[index]=item;
		this.__currentIndex++;
		return this;
	},
	fetch:function(index){
		if(typeof index === "string" && index ==='all'){

		}else if(typeof index === 'number'){
			//
      try{

        return this__cache[index];

      }catch(e){
        logger.error('no such song in the list');
      }
		}else{
			logger.error('invalide number!')
		}
	}
}




module.exports={
	insert:function(itemsArray){
		//insert a song into the cache;
		if(typeof itemsArray !== 'array'&& itemsArray.length===0)
			logger.error('获取歌曲列表失败。');

		for(var i=0,length=itemsArray.length;i<length;i++){
			var temp ={};
			for(var item in itemsArray[i]){

				//temp
				temp.albumName = item.an;
				temp.artist = item.atn;
				temp.frontPage = item.fid;
				temp.url  = item.src;
				temp.name = item.n;

				songList.push(temp);
			}
		}

	},
	download:function(index,path){
		//write a file into the file;
    var item = songList.fetch(index);

    var sourchUrl = item.src;

    var file = path+"/test.data";
    http.get(item,function(err,response){
      response.pipe(file);
    })

	},
	getSongUrl:function(index){
		//find a song by index;
	}
}
