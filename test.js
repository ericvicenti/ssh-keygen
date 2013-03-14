var keygen = require('./src/ssh-keygen');

console.log('Generating key pair')
keygen(__dirname + '/foobar_rsa', 'john@doe.com', 'keyPassword', function(err){
	if(err) console.log('There was a problem');
	else console.log('Done generating key pairs in '+__dirname);
});