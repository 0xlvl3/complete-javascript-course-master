//Importing Module
/*
//importing syntax

import {
  addToCart,
  totalPrice as price, //we can classify variables for imports
  tQ,
} from './shoppingCart.js';
addToCart('apple', 2);
console.log(price, tQ);

--------------------------------------------------------------
//syntax for importing all from a module

import * as ShoppingCart from './shoppingCart.js'; //this is similar to classes and an API
ShoppingCart.addToCart('bread', 5);
console.log(ShoppingCart.totalPrice);

//using a default function from shoppingCart, we can name the default function any variable we like
import add from './shoppingCart.js';
import { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 5);
console.log(cart);

const res = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await res.json();
console.log(data);


//module pattern


const ShoppingCart2 = (function () {
  const cart = [];
  const shoppingCart = 10;
  const totalPrice = 237;
  const totalQuanity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to the cart`);
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuanity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);



*/
