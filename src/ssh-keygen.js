var spawn = require('child_process').spawn;
var _ = require('underscore');
var fs = require('fs');
var os = require('os');
var path = require('path');

var log = function(a){
	if(process.env.VERBOSE) console.log('ssh-keygen: '+a);
}
function checkAvailability(location, force, callback){
	var pubLocation = location+'.pub';
	log('checking availability: '+location);
	fs.exists(location, function(keyExists){
		log('checking availability: '+pubLocation);
		fs.exists(pubLocation, function(pubKeyExists){
			doForce(keyExists, pubKeyExists);
		})
	});
	function doForce(keyExists, pubKeyExists){
		if(!force && keyExists) return callback(location+' already exists');
		if(!force && pubKeyExists) return callback(pubLocation+' already exists');
		if(!keyExists && !pubKeyExists) return callback();
		if(keyExists){ 
			log('removing '+location);
			fs.unlink(location, function(err){
				if(err) return callback(err);
				keyExists = false;
				if(!keyExists && !pubKeyExists) callback();
			});
		}
		if(pubKeyExists) {
			log('removing '+pubLocation);
			fs.unlink(pubLocation, function(err){
				if(err) return callback(err);
				pubKeyExists = false;
				if(!keyExists && !pubKeyExists) callback();
			});
		}
	}
}
function ssh_keygen(location, opts, callback){
	opts || (opts={});

	var pubLocation = location+'.pub';
	if(!opts.comment) opts.comment = '';
	if(!opts.password) opts.password = '';

	var keygen = spawn('ssh-keygen', [
		'-t','rsa',
		'-b','2048',
		'-C', opts.comment,
		'-N', opts.password,
		'-f', location
	]);

	keygen.stdout.on('data', function(a){
		log('stdout:'+a);
	});

	var read = opts.read;
	var destroy = opts.destroy;

	keygen.on('exit',function(){
		log('exited');
		if(read){
			log('reading key '+location);
			fs.readFile(location, 'utf8', function(err, key){			
				if(destroy){
					log('destroying key '+location);
					fs.unlink(location, function(err){
						if(err) return callback(err);
						readPubKey();
					});
				} else readPubKey();
				function readPubKey(){
					log('reading pub key '+pubLocation);
					fs.readFile(pubLocation, 'utf8', function(err, pubKey){
						if(destroy){
							log('destroying pub key '+pubLocation);
							fs.unlink(pubLocation, function(err){
								if(err) return callback(err);
								return callback(undefined, { key: key, pubKey: pubKey });
							});
						} else callback(undefined, { key: key, pubKey: pubKey });
					});
				}
			});
		} else if(callback) callback();
	});

	keygen.stderr.on('data',function(a){
		log('stderr:'+a);
	});
};

module.exports = function(opts, callback){
	var location = opts.location;
	if(!location) location = path.join(os.tmpDir(),'id_rsa');

	if(_.isUndefined(opts.read)) opts.read = true;
	if(_.isUndefined(opts.force)) opts.force = true;
	if(_.isUndefined(opts.destroy)) opts.destroy = true;

	checkAvailability(location, opts.force, function(err){
		if(err){
			log('availability err '+err);
			return callback(err);
		}
		ssh_keygen(location, opts, callback);
	});
};
