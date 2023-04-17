var x = 10; // global x
var y = 10; // global y

if (x > 5 || y > 5) {
    let x = 5; // define local x
    var y = 5; // rewrite global y
}

console.log(x, y);

var listItems = document.getElementsByClassName('list-item');

// if we use 'var index' as iter, index will be global
// there's only one global index that increments to listItems.length
// for each item in listItems, the onclock callback will be registered as log(listItems.length) 
for (var index = 0; index < listItems.length; index++) {
    listItems[index].onclick = () => {
        console.log(index);
    }
    console.log(index);
}
console.log(index);

// so we should use 'let index2' as iter, index will be local
// there're multiple index2 for each loop
for (let index2 = 0; index2 < listItems.length; index2++) {
    listItems[index2].onclick = () => {
        console.log(index2);
    }
    console.log(index2);
}
console.log(index2); // undefined golbal index2
