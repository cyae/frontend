var name = 'jack';
var age = 10;

var people = {
    // name: name,
    // age: age,
    name, age,
    // walk: function (x) {
    //     console.log(this.name + " walked " + x + " meters.");
    // },
    walk(x = -1) { // default param
        console.log(this.name + ` walked ${x} meters. 
        good for him.`); // string template
    }
}

people.walk();
