const express = require('express');
const app = express();
let cors = require('cors');
app.use(cors());
const port = 3010;
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];
function addNewItemToCart(productId, name, price, quantity) {
  let newCartItem = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity
  };
  
  cart.push(newCartItem); 
  return cart;
}
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity)
  let result = addNewItemToCart(productId, name, price, quantity);
  res.json({ result });
});
function updateQuantityById(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}
app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = updateQuantityById(cart, productId, quantity);
  res.json(result);
});
function deleteItemFromCart(cart, productId) {
  return cart.productId != productId;
}
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = cart.filter((cart) => deleteItemFromCart(cart, productId));
  cart = result;
  res.json(result);
});
app.get('/cart', (req, res) => {
  res.json(cart);
});
function calculateTotalQuantity(cart) {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity = totalQuantity + cart[i].quantity;
  }
  return totalQuantity;
}
app.get('/cart/total-quantity', (req, res) => {
  let result = calculateTotalQuantity(cart);
  res.json({ totalQuantity: result });
});
function calculateTotalPrice(cart) {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice = totalPrice + cart[i].price * cart[i].quantity;
  }
  return totalPrice;
}
app.get('/cart/total-price', (req, res) => {
  let result = calculateTotalPrice(cart);
  res.json({ totalPrice: result });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
