var clc = require('cli-color');

var error = clc.red.bold,	
	warn = clc.yellow,
	notice = clc.blue,
	correct = clc.green;

module.exports={
	warn:function(string){
		console.log(warn(string));
	},
	error:function(string){
		console.log(error(string));
	},
	notice:function(string){
		console.log(notice(string));
	},
	correct:function(string){
		console.log(correct(string));
	}
}