//JavaScript code for Shopping Cart Project


/*ALL GLOBAL VARIABLES in Project:

cart : Array
Item : Object/Class
*/


/* ALL FUNCTIONS in Project:

addItemToCart()
removeItemFromCart()
removeItemFromCartAll()
emptyCart()

countCart()
totalCart()

listCart()
displayCart()

saveCart()
loadCart()
*/


/* ALL Interactive DOM Elements in Project:

$(".add-to-cart").click
$("#clear-cart").click
$("#show-cart").on("click", ".add-item",
$("#show-cart").on("click", ".delete-item",
$("#show-cart").on("click", ".delete-item-all",
*/



/*Lecture 22
Protect project from future users by creating a uniquely named variable,
that all holds all of the global variables and functions
Example:

var JS_ShoppingCart = {};

JS_ShoppingCart.cart = [];
JS_ShoppingCart.item = function(thing, count){
  .
  .
};
JS_ShoppingCart.addItemToCart = function(name, price, count){
  .
  .
};
JS_ShoppingCart.removeItemFromCart = function(name){
  .
  .
};
.
.
.

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
      displayCart();
      return;
    }
  }
  //if no item by that name was found, add one of it to the cart
  cart.push(item);
  displayCart();
  saveCart();
}

///*  TEST
// addItemToCart("Apple", 1.22, 3);
// addItemToCart("Pear", 1.57, 2);
// addItemToCart("Apple", 1.22, 3);
//console.log(cart);
//*/


//user manual inputs item count:
function userInputCount(name, count) {
  for (i in cart) {
    if (cart[i].name === name) {
      cart[i].count = count;
      saveCart();
      displayCart();
      break;
    }
  }
};


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
      displayCart();
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
      displayCart();
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
  //return +totalCartCost.toFixed(2);
  return +totalCartCost.toFixed(2);
  //NOTE .toFixed() turns the number into a string
  //so the + turns it back into a number
}

/*show that .toFixed returns a string: (before the + is added to correct it)
console.log(5);  //5
console.log(totalCart());  //0.00
console.log(5 + totalCart()); //50.00
console.log(5 + +totalCart());  //5.00  which is correct
*/

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
    //subtotal for cost of multiple of an item:
    itemCopy.subtotal = +(item.price * item.count).toFixed(2);
    //NOTE .toFixed() turns the number into a string
    //so the + turns it back into a number
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
  //console.log("saveCart was called");

  //localStorage.setItem("name", value);
  //localStorage.setItem("shoppingCart", cart);
  //NOTE local storage is best for strings and numbers
  //so going to convert cart into a usable string:
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

//saveCart();  //call this after adding each item! for example

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
  //console.log("loadCart function has been called");

  //cart = localStorage.getItem("shoppingCart");
  //NOTE this will be a string because that's how we store it
  //need to convert it back into usable code
  cart = JSON.parse(localStorage.getItem("shoppingCart"));
}

// loadCart();



// Lecture 15
//jQuery portion

$(".add-to-cart").click(function(event) {
  event.preventDefault();   //this prevents a link from refreshing the page, which is their default behavior
  var name = $(this).attr("data-name");  //attr is attribute
  var price = Number($(this).attr("data-price"));
  //need to make Number() because it comes back as a string

  //call function that we wrote earleir
  addItemToCart(name, price, 1);
  //call function below that places the item in the HTML:
  displayCart();

});

$("#clear-cart").click(function(event) {
  //console.log("Clear Cart button has been pressed");
  event.preventDefault();
  alert("Your cart will now be emptied");
  emptyCart();
  //console.log(cart);
  //update the display to show that it is now empty:
  displayCart();
});



//now we want items in cart to populate a section of the html:
function displayCart() {
  //console.log("displayCart function has been called");
  var cartArray = listCart();
  var output = "";
  for(i in cartArray) {
    output += "<li>"
    +cartArray[i].name
    +" Price: $"+cartArray[i].price
    +" Quantity: <input style='width: 2.5em' class='count-input' type='number' data-name='"+cartArray[i].name+"' value='"+cartArray[i].count+"'>"
    +"   Subtotal: $"+cartArray[i].subtotal
    //add a delete 1 button
    +" <button class='delete-item' data-name='"
    +cartArray[i].name+"' data-price='"
    +cartArray[i].price+"'>-</button>"
    //NOTE: this button and it's class does not exist until this function is run
    +" <button class='add-item'  data-name='"
    +cartArray[i].name+"' data-price='"
    +cartArray[i].price+"'>+</button>"
    +" <button class='delete-item-all'  data-name='"
    +cartArray[i].name+"' data-price='"
    +cartArray[i].price+"'>Delete All</button>"
    +"</li>";
  }
  $("#show-cart").html(output);
  //output is what will replace / overwrite
  // what is currently written in the portion of the html
  //that has id="show-cart"

  //var totalCartRound = Math.floor(totalCart());
  //did the rounding with .toFixed(2) in the totalCart() function
  $("#total-cart").html("Total Cart: $"+totalCart());
  //number of items in the cart
  $("#count-cart").html(countCart());
}

//act on "-" button that is added during displayCart() function
$("#show-cart").on("click", ".delete-item", function(event) {
//because it only exists after displayCart() is run
//need to use  .on("click",...)  to make jQuery "look"
//also all these item will exist within the <ul id="show-cart">
//"#show-cart" is a parent / ancester to what we want to target
//$("parent/ancester").on("event-type", "target event occured on", function to run {...});
//the "parent/ancestor" needs to exists before.
//we only look for the existance of the "target" once the "event-type" occurs
  var name = $(this).attr("data-name");
  removeItemFromCart(name);
});

//act on "+" button that is added during displayCart() function
$("#show-cart").on("click", ".add-item", function(event) {
  var name = $(this).attr("data-name");
  var price = $(this).attr("data-name");
  var count = 1;
  addItemToCart(name, price, count);
  //could also do:
  //addItemToCart(name, 0, 1);
  //since if the item already exists, the price never gets used in that function


});

//act on "Delete All" button that is added during displayCart() function
$("#show-cart").on("click", ".delete-item-all", function(event) {
  var name = $(this).attr("data-name");
  removeItemFromCartAll(name);
});


//USER manually inputs a quantity of an item
$("#show-cart").on("change", ".count-input", function(event) {
  var name = $(this).attr("data-name");
  //the count will be the value typed into the field, which is .val()
  //NOTE, this comes back as a string, so need to wrap in Number()
  var count = Number($(this).val());
  userInputCount(name, count);
});

//to have cart show up on pageload:
loadCart();
displayCart();
















/*  PRACTICE CONCEPTS AT START OF PROJECT:
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
