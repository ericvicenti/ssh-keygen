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


var keygenPromise = require('./src/ssh-keygen').keygenPromise;
 
keygenPromise({
  comment: 'promise@doe.com',
  read: true
}).then(out=>{
  console.log('Done generating key pairs');
  console.log(out.key)
  console.log(out.pubKey)
}).catch(err=>{
  console.log('There was a problem : '+err);
});

