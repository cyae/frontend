const fs = require('fs');

// when reading big files, we can't operate until the file is fully loaded.
// in that case, we use stream read to perform early operation

const readStream = fs.createReadStream('./data/tweets.json');
const writeStream = fs.createWriteStream('./data/test.txt');

// listen to 'data' event on 'on' behavior of the stream
readStream.on('data', chunk => {
    console.log(chunk.toString());
    writeStream.write('\nNEW CHUNK\n'); // copy data from .json to .txt
    writeStream.write(chunk);
})

// a neater way to copy same as above
readStream.pipe(writeStream);
