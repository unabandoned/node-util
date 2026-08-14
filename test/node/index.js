var spawn = require('child_process').spawn;
var path = require('path');

var tests = [
  require.resolve('./debug'),
  require.resolve('./format'),
  require.resolve('./inspect'),
  require.resolve('./log'),
  require.resolve('./promisify'),
  require.resolve('./callbackify'),
  require.resolve('./types')
];

function run(filename) {
  return new Promise(function (resolve, reject) {
    var proc = spawn(process.argv[0], [filename], { stdio: 'inherit' });
    proc.on('close', function (code) {
      if (code !== 0) {
        reject(new Error('test ' + path.basename(filename) + ' failed'));
      } else {
        resolve();
      }
    });
  });
}

(async function () {
  for (var i = 0; i < tests.length; i++) {
    await run(tests[i]);
  }
})().catch(function (err) {
  console.error(err);
  process.exit(1);
});
