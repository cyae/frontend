// Only for Node.js
// var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// request and listen using generator
const asyncRequest = (sourcePath, handler) => {
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 200) {
            const data = JSON.parse(request.responseText);
            handler(undefined, data); // if no error, resolve the response
        } else if (request.readyState === 4) {
            handler("failed", undefined); // if return error, reject the request
        }
    })

    request.open('GET', sourcePath);
    request.send();

}

var urlPath1 = 'https://jsonplaceholder.typicode.com/todos/1';
var urlPath2 = 'https://jsonplaceholder.typicode.com/todos/2';
var urlPath3 = 'https://jsonplaceholder.typicode.com/todos/3';

const handler = (err, data) => console.log(err ? err : data);

console.log('Async call start...');
console.log(1);
console.log(2);
asyncRequest(urlPath1, handler);
console.log(3);
console.log(4);
asyncRequest(urlPath2, handler);
console.log(5);
console.log(6);
asyncRequest(urlPath3, handler);
console.log('Async call done.');