var urlPath1 = 'https://jsonplaceholder.typicode.com/todoss/1';
var urlPath2 = 'https://jsonplaceholder.typicode.com/todos/2';
var urlPath3 = 'https://jsonplaceholder.typicode.com/todos/3';

// async call using async-await
const asyncRequest3 = async sourcePath => { // async ALWAYS return a promise
    const respond = await fetch(sourcePath); // await is just Promise.then

    if (respond.status !== 200) { // need to manually throw err in case of failure, otherwise the err will be resolved
        throw new Error('fetch failed'); // throw err and halt here leaving incompleted
    }

    const data = await respond.json(); // chain to parse with await
    return data;
}

console.log('Async call start...');
console.log(1);
console.log(2);
asyncRequest3(urlPath1)
    .then(data => console.log(data))
    .then(() => asyncRequest3(urlPath2))
    .then(data => console.log(data))
    .catch(err => console.log(err))
console.log(3);
console.log(4);
asyncRequest3(urlPath3)
    .then(data => console.log(data))
    .then(() => asyncRequest3(urlPath2))
    .catch(err => console.log(err))
console.log(5);
console.log(6);
console.log('Async call done.');