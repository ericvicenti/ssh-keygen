var spawn = require('child_process').spawn;
var fs = require('fs');

var log = function(a){
	if(process.env.VERBOSE) console.log('ssh-keygen: '+a);
}

function ssh_keygen(location, comment, opts, callback){
	opts || (opts={});
	if(!comment) comment = '';
	if(!opts.password) opts.password = '';

	var keygen = spawn('ssh-keygen', [
		'-t','rsa',
		'-b','2048',
		'-C', comment,
		'-N', opts.password,
		'-f', location
	]);

	keygen.stdout.on('data', function(a){
		log('stdout:'+a);
	});

	keygen.on('exit',function(){
		log('exited');
		if(callback) callback();
	});

	keygen.stderr.on('data',function(a){
		log('stderr:'+a);
	});
};

module.exports = function(location, comment, opts, callback){
	// Make sure the keys dont already exist
	fs.exists(location, function(exists){
		if(exists) return callback(true);
		fs.exists(location+'.pub', function(exists){
			if(exists) return callback(true);
			ssh_keygen(location, comment, opts, callback);
		})
	});
};