# ssh-keygen

Generates a SSH key-pair.

### Install

1. Make sure you have ssh-keygen (try `$ ssh-keygen` if you aren't sure)
2. Run `npm install @micalevisk/ssh-keygen` if you're using NPM

### Usage

```js
// With CommonJS
const path = require('path')
const fs = require('fs')
const keygen = require('@micalevisk/ssh-keygen')

keygen({
  location: path.join(__dirname, 'foo_rsa'),
  comment: 'joe@foobar.com',
  password: 'keypassword',
  read: true,
  format: 'PEM',
}, function onDoneCallback(err, out) {
  if (err) return console.error('Something went wrong:', err)
  console.log('Keys created!')
  console.log('private key:', out.key)
  console.log('public key:', out.pubKey)
})
```

#### Parameters

- **`location`**: desired location for the key. The public key will be at the location + `.pub`. Defaults a temporary directory
- **`read`**: should the callback have the key files read into it. Defaults to `true`
- **`force`**: destroy pre-existing files with the location name and the public key name. Defaults to `true`
- **`destroy`**: destroy the key files once they have been read. Defaults to `false`
- **`comment`**: the comment that should be embedded into the key. Defaults to an empty `string`
- **`password`**: the password for the key. Falsy values will turn this into an empty string. Defaults to an empty `string`
- **`size`**: Specifies the number of bits in the key to create
- **`format`**: Specify a key format for key generation. Defaults to `'RFC4716'`

#### Promise-based API

> **NOTE:** You'll need NodeJS version 8 or later because it's rely on [`util.promisify`](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original) utility.

If you don't supply the second parameter to `keygen` (ie., the callback), then it will return a Promise that resolves to an plain object with `key` and `pubkey` properties.

### How it works

The following shell command will get executed:

```bash
$ ssh-keygen -t rsa -b 2048 -C "joe@foobar.com" -N "keypassword" -m PEM -f ./foo_rsa
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

### Note

It is advisable to generate your keys on a machine with a significant random source like one with a mouse/trackpad.

### License

`@micalevisk/ssh-keygen` is [open source](./LICENSE.md) under the MIT license.

All credits go to [**Eric Vicenti**](https://github.com/ericvicenti).

### Windows

This package bundles binaries for windows. The current version is: `2.4.4.2-rc3`
