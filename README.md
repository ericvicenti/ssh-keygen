ssh-keygen
==========

Generates a SSH key-pair

### Install
1. Make sure you have ssh-keygen (try `$ ssh-keygen` if you aren't sure)
2. npm package install

```
npm install ssh-keygen
```
OR download from github and place in ./node_modules

### Usage



```js
var keygen = require('ssh-keygen');
var fs = require('fs');

var location = __dirname + '/foo_rsa';
var comment = 'joe@foobar.com';
var password = 'keypassword'; // false and undefined will convert to an empty pw

keygen({
  location: location,
  comment: comment,
	password: password,
  read: true
}, function(err, out){
	if(err) return console.log('Something went wrong: '+err);
	console.log('Keys created!');
	console.log('private key: '+out.key);
	console.log('public key: '+out.pubKey);
});

```

The following shell command will get executed:

```
$ ssh-keygen -t rsa -b 2048 -C "joe@foobar.com" -N "keypassword" -f ./foo_rsa
Generating public/private rsa key pair.
Your identification has been saved in ./foo_rsa.
Your public key has been saved in ./foo_rsa.pub.
The key fingerprint is:
02:f7:40:b6:c7:b3:a3:68:16:53:dd:86:63:df:b5:33 joe@foobar.com
The key's randomart image is:
+--[ RSA 2048]----+
|      o          |
|     o + o       |
|    . = O o   .  |
|     + = * . . . |
|    o . S . . E  |
|     + o .     o |
|    + .          |
|   o             |
|                 |
+-----------------+
```

### Parameters

* location, desired location for the key. The public key will be at the location + `.pub`, defaults temp dir
* read, should the callback have the key files read into it, defaults true
* force, destroy pre-existing files with the location name and the public key name, defaults true
* destroy, destroy the key files once they have been read, defaults false
* comment, the comment that should be embedded into the key, defaults empty
* password, the password for the key, defaults empty

### Note

It is advisable to generate your keys on a machine with a significant random source like one with a mouse/trackpad.

### License

ssh-keygen is [open source](https://github.com/ericvicenti/ssh-keygen/blob/master/LICENSE.md) under the MIT license

### Windows

This package bundles binaries for windows. The current version is: `2.4.4.2-rc3`

### Todo

* Real tests

Contributors welcome!
