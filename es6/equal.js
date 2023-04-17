let age = 25;

// loose comparison with auto conversion
console.log(age == 5 ** 2);
console.log(age == '25'); // '25' is auto converted to 25

// strict comparison without conversion
console.log(age === 25);
console.log(age === '25');
