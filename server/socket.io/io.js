var io = null;

exports.init = function(server){
	io = require('socket.io')(server);
	io.on('connection', function(socket){
		console.log('connection');
		socket.on('register', function(obj){
			console.log(obj.uid);
		});
	});
}

exports.update = function(resource, todos){
	console.log('test');
	io && io.emit(`/api/${resource}`, todos);
}