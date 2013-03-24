var keygen = require('./src/ssh-keygen');

console.log('Generating key pair')

keygen({
  comment: 'john@doe.com',
  read: true
}, function(err, out){
	if(err) return console.log('There was a problem : '+err);
  console.log('Done generating key pairs');
  console.log(out.key)
  console.log(out.pubKey)
});