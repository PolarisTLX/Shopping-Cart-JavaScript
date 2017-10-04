//JavaScript code for Shopping Cart Project

//code forked from here again before creating a MODULE
//that all holds all of the project to protect it from other deveopers

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


//Module emcompasing project to protect it
//SC = Shopping Cart
var SC = (function(){
  //-----------Private methods and properties---------
  //anything decalred with var =   in this function is made private
  //innaccessible outside this function and would have no conflicts with names of variables outside

  var cart = [];

  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  };


  //save the cart locally
  //SC.saveCart = function()
  function saveCart() {
    //console.log("saveCart was called");

    //localStorage.setItem("name", value);
    //localStorage.setItem("shoppingCart", cart);
    //NOTE local storage is best for strings and numbers
    //so going to convert cart into a usable string:
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  };


  //load saved cart from storage
  //SC.loadCart = function() {
  function loadCart() {
    //console.log("loadCart function has been called");

    //cart = localStorage.getItem("shoppingCart");
    //NOTE this will be a string because that's how we store it
    //need to convert it back into usable code
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
  };







  //---------Public methods and properties------
  var obj = {};


  //Function to add items to cart
  //function addItemToCart(name, price, count) {
  obj.addItemToCart = function(name, price, count) {
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
    var item = new Item(name, price, count);
    cart.push(item);
    displayCart();
    saveCart();
  };
  ///*  TEST
  // addItemToCart("Apple", 1.22, 3);
  // addItemToCart("Pear", 1.57, 2);
  // addItemToCart("Apple", 1.22, 3);
  //console.log(cart);
  //*/


  //user manual inputs item count:
  obj.userInputCount = function (name, count) {
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
  //function removeItemFromCart(name) {
  obj.removeItemFromCart = function (name) {
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
  };
  /*
  console.log(cart[0].count);
  removeItemFromCart("Apple");  //2
  removeItemFromCart("Apple");  //1
  removeItemFromCart("Apple");  //0
  removeItemFromCart("Apple");  //0
  console.log(cart);
  */


  //remove all items from cart
  //function removeItemFromCartAll(name) {
  obj.removeItemFromCartAll = function (name) {
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
  };
  /* TEST
  console.log(cart.length);
  removeItemFromCartAll("Apple");
  console.log(cart.length);
  console.log(cart);
  */



  //Empty cart
  //function emptyCart() {
  obj.emptyCart = function() {
    cart = [];
    saveCart();
  };
  /*  TEST
  console.log(cart.length);
  emptyCart();
  console.log(cart.length);
  */


  //return total number of items in the cart
  //function countCart() {
  obj.countCart = function() {
    var totalCount = 0;
    for (i in cart){
      totalCount += cart[i].count;
    }
    return totalCount;
  };
  //console.log(countCart());



  //return total $ cost of shopping cart
  //function totalCart() {
  obj.totalCart = function() {
    var totalCartCost = 0;
    for (i in cart) {
      totalCartCost += cart[i].count * cart[i].price;
    }
    //return +totalCartCost.toFixed(2);
    return +totalCartCost.toFixed(2);
    //NOTE .toFixed() turns the number into a string
    //so the + turns it back into a number
  }
;
  /*show that .toFixed returns a string: (before the + is added to correct it)
  console.log(5);  //5
  console.log(totalCart());  //0.00
  console.log(5 + totalCart()); //50.00
  console.log(5 + +totalCart());  //5.00  which is correct
  */
  //console.log("$"+totalCart());



  //show the whole cart, will just return an array
  //function listCart() {
  obj.listCart = function() {
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




//---------this needs to be the last line ----------------
  return obj;
})();










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








//saveCart();  //call this after adding each item! for example

/*TEST
//localStorage.setItem("usernametest", "Joe");
//this will show up as an entry in the developer tools -> Application > Storage -> Local Storage -> file://
//and will not go away until the browser is closed

addItemToCart("Apple", 1.22, 4);  //10 shown in local storage
removeItemFromCart("Apple");  //9 shown in local storage
removeItemFromCartAll("Apple");  //Apple removed completed from local storage
*/








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
