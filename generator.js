// function* gen() {
//     var a = yield '1';
//     console.log(a);
//     var b = yield '1';
//     var c = yield '1';
//     console.log('phase one completed');
//     var d = yield '2';
//     var e = yield '2';
//     console.log('phase two completed');
//     return a + " " + b + " " + c + " " + d + " " + e;
// }

// var myGen = gen();

// console.log(myGen.next(0));
// console.log(myGen.next(1));
// console.log(myGen.next(2));
// console.log(myGen.next(3));
// console.log(myGen.next(4));
// console.log(myGen.next(5));

generatorWrapper(function* generator() {
    var tweets = yield JSON.parse(
        `[
    {
        "user": "jack",
        "tweet": "where is mario?"
    }, {
        "user": "yoshi",
        "tweet": "hmm, nice apple"
    }, {
        "user": "yoshi",
        "tweet": "i eat an apple"
    }, {
        "user": "yoshi",
        "tweet": "sod off bowser"
    }
]`
    );
    console.log("tweets loaded");
    console.log(tweets);

    setTimeout(() => {
        console.log("call me back later");
    }, 2000);

    var friends = yield JSON.parse(
        `[
    {
        "name": "mario"
    }, {
        "name": "peach"
    }, {
        "name": "luigi"
    }, {
        "name": "toad"
    }
]`
    );
    console.log("friends loaded");
    console.log(friends);

    var ytVids = yield JSON.parse(
        `[
    {
        "title": "welcome to my channel",
        "pubYear": 2014
    }, {
        "title": "how to lay an egg",
        "pubYear": 2015
    }, {
        "title": "how to breath fire",
        "pubYear": 2016
    }
]`
    );
    console.log("ytVids loaded");
    console.log(ytVids);

});

function generatorWrapper(generator) {
    var gen = generator();

    function handle(yieldedTask) {
        if (!yieldedTask.done) {
            // yieldedTask.value.then(
            //     data => {
            return handle(gen.next(yieldedTask.value));
            //     }
            // )
        }
    }

    return handle(gen.next());
}