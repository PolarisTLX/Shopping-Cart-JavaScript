//JavaScript code for Shopping Cart Project

//code forked from here before creating a uniquely named variable,
//that all holds all of the global variables and functions


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

var SC = {};
//SC = JavaScript_ShoppingCart

SC.cart = [];
SC.item = function(thing, count){
  .
  .
};
SC.addItemToCart = function(name, price, count){
  .
  .
};
SC.removeItemFromCart = function(name){
  .
  .
};
.
.
.

*/

//GLOBAL VARIABLE TO PROTECT PROJECT:
var SC = {};
//SC = JavaScript_ShoppingCart
//SC = Shopping Cart


//var cart = [];
SC.cart = [];
//{name:"", price: , count: }
//var Item = function(name, price, count) {
SC.Item = function(name, price, count) {
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
//function addItemToCart(name, price, count) {
SC.addItemToCart = function(name, price, count) {
  //if name already exists, just increase the count of that item
  for (i in SC.cart) {
    if (SC.cart[i].name === name) {
      SC.cart[i].count += count;
      //if found, return to stop this function here
      SC.saveCart();
      SC.displayCart();
      return;
    }
  }
  //if no item by that name was found, add one of it to the cart
  var item = new SC.Item(name, price, count);
  SC.cart.push(item);
  SC.displayCart();
  SC.saveCart();
}

///*  TEST
// addItemToCart("Apple", 1.22, 3);
// addItemToCart("Pear", 1.57, 2);
// addItemToCart("Apple", 1.22, 3);
//console.log(cart);
//*/


//user manual inputs item count:
SC.userInputCount = function(name, count) {
  for (i in SC.cart) {
    if (SC.cart[i].name === name) {
      SC.cart[i].count = count;
      SC.saveCart();
      SC.displayCart();
      break;
    }
  }
};

//removes 1 item from cart
//function removeItemFromCart(name) {
SC.removeItemFromCart = function(name) {
  for (i in SC.cart) {
    if (SC.cart[i].name === name){
      SC.cart[i].count--;
      //if that count becomes 0, remove that item object entirely from the cart:
      if (SC.cart[i].count === 0) {
        //.splice(position in array, how many items removed from that position)
        SC.cart.splice(i, 1);
      }
      //if item desired removed exists and is not 0, reduce by 1, and stop function here
      SC.saveCart();
      SC.displayCart();
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
//function removeItemFromCartAll(name) {
SC.removeItemFromCartAll = function(name) {
  for (i in SC.cart) {
    if (SC.cart[i].name === name) {
      //if item exists, remove that item object from the cart array entirely
      //.splice(position in array, how many items removed from that position)
      SC.cart.splice(i, 1);
      SC.saveCart();
      SC.displayCart();
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
//function emptyCart() {
SC.emptyCart = function() {
  SC.cart = [];
  SC.saveCart();
}

/*  TEST
console.log(cart.length);
emptyCart();
console.log(cart.length);
*/

//End of lecture 10 of 34


//Lecture 11

//return total number of items in the cart
//function countCart() {
SC.countCart = function() {
  var totalCount = 0;
  for (i in SC.cart){
    totalCount += SC.cart[i].count;
  }
  return totalCount;
}

//console.log(countCart());



//return total $ cost of shopping cart
//function totalCart() {
SC.totalCart = function() {
  var totalCartCost = 0;
  for (i in SC.cart) {
    totalCartCost += SC.cart[i].count * SC.cart[i].price;
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
//function listCart() {
SC.listCart = function() {
  var cartCopy = [];
  for (i in SC.cart) {
    var item = SC.cart[i];
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
//function saveCart() {
SC.saveCart = function() {
  //console.log("saveCart was called");

  //localStorage.setItem("name", value);
  //localStorage.setItem("shoppingCart", cart);
  //NOTE local storage is best for strings and numbers
  //so going to convert cart into a usable string:
  localStorage.setItem("shoppingCart", JSON.stringify(SC.cart));
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
//function loadCart() {
SC.loadCart = function() {
  //console.log("loadCart function has been called");

  //cart = localStorage.getItem("shoppingCart");
  //NOTE this will be a string because that's how we store it
  //need to convert it back into usable code
  SC.cart = JSON.parse(localStorage.getItem("shoppingCart"));
}

// loadCart();



// Lecture 15
//jQuery portion

$(".add-to-cart").click(function(event) {
  event.preventDefault();   //this prevents a link from refreshing the page, which is their default behavior
  var name = $(this).attr("data-name");  //attr is attribute
  var price = Number($(this).attr("data-price"));
  //need to make Number() because it comes back as a string
  //can also just put a + before it for same affect

  //call function that we wrote earleir
  SC.addItemToCart(name, price, 1);
  //call function below that places the item in the HTML:
  SC.displayCart();

});

$("#clear-cart").click(function(event) {
  //console.log("Clear Cart button has been pressed");
  event.preventDefault();
  alert("Your cart will now be emptied");
  SC.emptyCart();
  //console.log(cart);
  //update the display to show that it is now empty:
  SC.displayCart();
});



//now we want items in cart to populate a section of the html:
//function displayCart() {
SC.displayCart = function() {
  //console.log("displayCart function has been called");
  var cartArray = SC.listCart();
  var output = "";
  for(i in cartArray) {
    output += "<li>"
    +cartArray[i].name
    +" Price: $"+cartArray[i].price
    +" Quantity: <input class='count-input' type='number' data-name='"+cartArray[i].name+"' value='"+cartArray[i].count+"'>"
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
  //Total $ of cart
  $("#total-cart").html(SC.totalCart());
  //number of items in the cart
  $("#count-cart").html(SC.countCart());
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
  SC.removeItemFromCart(name);
});

//act on "+" button that is added during displayCart() function
$("#show-cart").on("click", ".add-item", function(event) {
  var name = $(this).attr("data-name");
  var price = $(this).attr("data-name");
  var count = 1;
  SC.addItemToCart(name, price, count);
  //could also do:
  //addItemToCart(name, 0, 1);
  //since if the item already exists, the price never gets used in that function


});

//act on "Delete All" button that is added during displayCart() function
$("#show-cart").on("click", ".delete-item-all", function(event) {
  var name = $(this).attr("data-name");
  SC.removeItemFromCartAll(name);
});

//USER manually inputs a quantity of an item
$("#show-cart").on("change", ".count-input", function(event) {
  var name = $(this).attr("data-name");
  //the count will be the value typed into the field, which is .val()
  //NOTE, this comes back as a string, so need to wrap in Number()
  var count = Number($(this).val());
  SC.userInputCount(name, count);
});



//to have cart show up on pageload:
SC.loadCart();
SC.displayCart();













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




/*Javascript Module Pattern
Used to protect a project by wrapping a while project in a self-invoking or instantly invoking function expression (IIFE?)

(function(){})();
//NOTE the several extra ()()


SIMPLE EXAMPLE:

var test = (function(){
  var cart = [];
  var obj = {};

  obj.addItem = function(name) {
  cart.push(name);
  }
  obj.countCart = function() {
  console.log("Count Cart:"+cart.length);
  }
  return obj;
})();

test.addItem("Foo");
test.addItem("Bar");
test.countCart();
console.log(test.cart);

*/
