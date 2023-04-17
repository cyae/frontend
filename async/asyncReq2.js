// const { response } = require("express");

// async call using promise(resolve, reject) pattern
const asyncRequest2 = sourcePath => {

    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
            if (request.readyState === 4 && request.status === 200) {
                const data = JSON.parse(request.responseText);
                // handler(undefined, data);
                resolve(data);
            } else if (request.readyState === 4) {
                // handler("failed", undefined);
                reject('Err code: ' + request.responseText);
            }
        })

        request.open('GET', sourcePath);
        request.send();

    })
};

var localPath1 = '/data/tweets.json';
var localPath2 = '/data/fb-friend.json';
var localPath3 = '/data/yt-vids.json';

// syncRequest(localPath1).then(data1 => {
//     console.log(data1);
//     return syncRequest(localPath2);
// }).then(data2 => {
//     console.log(data2);
//     return syncRequest(localPath3);
// }).then(data3 => {
//     console.log(data3);
// }).catch(err => {
//     console.log(err);
// })

// A neater way to do the same as above
fetch(localPath1).then(response => {
    // console.log(response);
    const dataPromised = response.json();
    return dataPromised; // return as Promise, note you cannot access data in response!
}).then(data => {
    console.log(data); // implement Promise.resolve to access data
    return fetch(localPath2); // chain to the next request
}).then(response => {
    // console.log(response);
    const dataPromised = response.json(); // chain to parse with Promise.then
    return dataPromised;
}).then(data => {
    console.log(data);
}).catch(err => { // implement Promise.reject in case of failure
    console.log(err);
})