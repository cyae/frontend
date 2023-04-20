const fs = require('fs');

// 1. async read
const futureTweet = fs.readFile('../data/tweets.json', (err, data) => {
  if (err) {
    console.log(err);
    return undefined;
  }
  const buffered = data.toString();
  return JSON.parse(buffered);
});

// console.log(futureTweet); // error for async

// 2. sync read
try {
  var data = fs.readFileSync('../data/tweets.json');
} catch (err) {
  console.log(err);
}

const buffered = data.toString();
console.log(JSON.parse(buffered)); // ok for sync

// 3. async write
fs.writeFile('../data/test.txt', 'hello world', () => {
  console.log('completed');
});

// 4. sync write
// ...

// 5. mk/rm dirs async
if (!fs.existsSync('../testDir')) {
  fs.mkdir('../testDir', err => {
    if (err) {
      console.log('err');
    }
    console.log('created');
  });
} else {
  console.log('dir already existed. try to delete first...');
  fs.rmdir('../testDir', err => {
    if (err) {
      console.log('err');
    }
    console.log('folder deleted.');
  });
}

// 6. delete file async
if (fs.existsSync('../data/test.txt')) {
  fs.unlink('../data/test.txt', err => {
    if (err) {
      console.log(err);
    }
    console.log('file deleted.');
  });
}
