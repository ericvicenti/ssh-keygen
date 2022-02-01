var keygen = require('./src/ssh-keygen');

function runCallbackVersion(onDone) {
  console.log('[callback API] Generating key pair')

  keygen({
    comment: 'john@doe.com',
    read: true,
  }, function (err, out) {
    if (err) {
      console.log('There was a problem:', err);
      process.exitCode = 1;
    } else {
      console.log('Done generating key pairs');
      console.log(out.key);
      console.log(out.pubKey);
    }
    onDone();
  });
}

async function runPromiseVersion(onDone) {
  console.log('[promise API] Generating key pair')

  try {
    const out = await keygen({
      comment: 'john@doe.com',
      read: true,
    });

    console.log('Done generating key pairs');
    console.log(out.key);
    console.log(out.pubKey);
  } catch (err) {
    console.log('There was a problem:', err);
    process.exitCode = 2;
  } finally {
    onDone();
  }
}

runCallbackVersion(() => {
  runPromiseVersion(() => { });
});
