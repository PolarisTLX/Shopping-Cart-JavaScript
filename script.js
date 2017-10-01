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

/*
 INITIAL EXERCISE
var cart = [];
var item = {name: "Apple", cost: 1.99, count:3};

cart.push(item);

//console.log(cart);
console.log(cart[0]);
console.log(cart[0].name);

*/

/*
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
*/


var cart = [];
//{name:"", price: , count: }
var Item = function(name, price, count) {
  this.name = name;
  this.price = price;
  this.count = count;
};


/*Small scale practice
//var a = new Item();  //{name:"", price: , count: }
var Brush = new Item("Brush", 1.99, 1);  //{name:"Brush", price: 1.99, count: 1}
//console.log(example);

//Ways to add items to cart:
cart.push(Brush);
//console.log(cart);

cart.push(new Item("Apple", 2.13, 3))
console.log(cart);
*/



//Function to add items to cart
function addItemToCart(name, price, count) {

  var item = new Item(name, price, count);
  //if name already exists, just increase the count of that item
  for (i in cart) {
    if (cart[i].name === name) {
      cart[i].count += count;
      //if found, return to stop this function here
      return;
    }
  }
  //if no item by that name was found, add one of it to the cart
  cart.push(item);
}

///*  TEST
addItemToCart("Apple", 1.22, 3);
addItemToCart("Pear", 1.57, 2);
addItemToCart("Apple", 1.22, 3);
console.log(cart);
//*/

//removes 1 item from cart
function removeItemFromCart(name) {
  for (i in cart) {
    if (cart[i].name === name){
      cart[i].count--;
      //if that count becomes 0, remove that item object entirely from the cart:
      if (cart[i].count === 0) {
        //.splice(position in array, how many items removed from that position)
        cart.splice(i, 1);
      }
      //if item desired removed exists and is not 0, reduce by 1, and stop function here
      return;
    }
  }
  //if not item by that name exists in the cart, show error message
  console.log("There are none of this item in your cart.");
}


/*
console.log(cart[0].count);
removeItemFromCart("Apple");   //5
removeItemFromCart("Apple");   //4
console.log(cart[0].count);
removeItemFromCart("Banana");
removeItemFromCart("Apple");  //3
removeItemFromCart("Apple");  //2
removeItemFromCart("Apple");  //1
removeItemFromCart("Apple");  //0
removeItemFromCart("Apple");  //0
removeItemFromCart("Apple");  //0
console.log(cart);
*/

//remove all items from cart
function removeItemFromCartAll(name) {
  for (i in cart) {
    if (cart[i].name === name) {
      //if item exists, remove that item object from the cart array entirely
      //.splice(position in array, how many items removed from that position)
      cart.splice(i, 1);
      return;
    }
  }
  //if not item by that name exists in the cart, show error message
  console.log("There are none of this item in your cart.");
}

/* TEST
console.log(cart.length);
removeItemFromCartAll("Apple");
console.log(cart.length);
console.log(cart);
*/



//Empty cart
function emptyCart() {
  cart = [];
}

/*  TEST
console.log(cart.length);
emptyCart();
console.log(cart.length);
*/


//return total number of items in the cart
function countCart() {

}

//return total $ cost of shopping cart
function totalCart() {

}

//show the whole cart
function listCart() {

}

//save the cart locally
function saveCart(){

}

//load saved cart from storage
function loadCart() {

}
