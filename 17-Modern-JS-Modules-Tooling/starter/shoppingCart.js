//Exporting module

console.log('Exporting module');
const shippingCost = 10;
export const cart = [];

//export has to be in top level code
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart`);
};

const totalPrice = 237;
const totalQuanity = 23;

export { totalPrice, totalQuanity as tQ }; // we can also export as a variable

//exporting a default function
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart`);
}
