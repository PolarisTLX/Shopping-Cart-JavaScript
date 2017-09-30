/*  PRACTICE CONCEPTS
var array = ["Apple", "Brush", "Carrot", "Dice"];

//same as: for (i=0; i < array.length; i++) {
for (i in array){
  console.log(array[i]);
}

var obj = {name: "Apple", cost: 1.99, count: 2};
console.log(obj.name);
console.log(obj.cost);
console.log("Total cost = " + (obj.cost*obj.count));

for (key in obj) {
  console.log(key+" "+obj[key]);
  //prints:  name Apple   cost 1.99   count 2
}

*/

var cart = [];
var item = {name: "Apple", cost: 1.99, count:3};

cart.push(item);

//console.log(cart);
console.log(cart[0]);
console.log(cart[0].name);

//SCOPE EXERCISE

//just discusses global vs local scoped variables
//which are just outside or inside of a function

var global = "Hello";

function myFunction() {
  console.log("Global:"+global);
}

global = 10;

myFunction();

global = "Hello again";

myFunction();

function myOtherFunction() {
  var global = "This is local";
  console.log("Global:"+global);
}

myOtherFunction();

console.log(global);
