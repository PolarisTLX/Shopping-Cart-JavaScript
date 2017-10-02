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
      saveCart();
      return;
    }
  }
  //if no item by that name was found, add one of it to the cart
  cart.push(item);
  saveCart();
}

///*  TEST
addItemToCart("Apple", 1.22, 3);
addItemToCart("Pear", 1.57, 2);
addItemToCart("Apple", 1.22, 3);
//console.log(cart);
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
      saveCart();
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
      saveCart();
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
  saveCart();
}

/*  TEST
console.log(cart.length);
emptyCart();
console.log(cart.length);
*/

//End of lecture 10 of 34


//Lecture 11

//return total number of items in the cart
function countCart() {
  var totalCount = 0;
  for (i in cart){
    totalCount += cart[i].count;
  }
  return totalCount;
}

//console.log(countCart());



//return total $ cost of shopping cart
function totalCart() {
  var totalCartCost = 0;
  for (i in cart) {
    totalCartCost += cart[i].count * cart[i].price;
  }
  return totalCartCost;
}

//console.log("$"+totalCart());



/*
//Concept practice:
var a = ["A", "B", "C"];
var b = a;   //this makes a reference, not a copy!!!
b.push("D");
console.log(b);  //these two return the same thing!
console.log(a);  //these two return the same thing!
//what affects b ALSO affects a in this case and vice versa.
*/

/*
//if I instead do:
var a = ["A", "B", "C"];

var b = a.slice();  //THIS CREATES A COPY INSTEAD OF A REFERENCE

b.push("D");
console.log(b);  //these DONT return the same thing!
console.log(a);
*/

//PROBLEM IS THAT YOU CAN'T DO THIS FOR AN OBJECT
//(or anything that has objects in it)
//like ".slice()" makes a copy of an array!!!

//REUSABLE CODE!!
/*to create a copy of an object:
var cartCopy = [];
for (i in cart) {
  var item = cart[i];
  var itemCopy = {};
  for (property in item) {
    itemCopy[property] = item[property];
  }
  cartCopy.push(itemCopy);
}
return cartCopy;
*/


//show the whole cart, will just return an array
function listCart() {
  var cartCopy = [];
  for (i in cart) {
    var item = cart[i];
    var itemCopy = {};
    for (property in item) {
      itemCopy[property] = item[property];
    }
    cartCopy.push(itemCopy);
  }
  return cartCopy;
}

/*
var mistakeArray = listCart();
mistakeArray[0].name = "Mistake";
console.log(mistakeArray);
console.log(cart);  //here the original cart array with objects is left untouched
*/


//save the cart locally
function saveCart() {
  //localStorage.setItem("name", value);
  //localStorage.setItem("shoppingCart", cart);
  //NOTE local storage is best for strings and numbers
  //so going to convert cart into a usable string:
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

saveCart();  //call this after adding each item! for example

/*TEST
//localStorage.setItem("usernametest", "Joe");
//this will show up as an entry in the developer tools -> Application > Storage -> Local Storage -> file://
//and will not go away until the browser is closed

addItemToCart("Apple", 1.22, 4);  //10 shown in local storage
removeItemFromCart("Apple");  //9 shown in local storage
removeItemFromCart("Apple");  //8 shown in local storage
removeItemFromCart("Apple");  //7 shown in local storage
removeItemFromCartAll("Apple");  //Apple removed completed from local storage
*/

//load saved cart from storage
function loadCart() {
  //cart = localStorage.getItem("shoppingCart");
  //NOTE this will be a string because that's how we store it
  //need to convert it back into usable code
  cart = JSON.parse(localStorage.getItem("shoppingCart"));
}

loadCart();

var array = listCart();
console.log(array);















//
