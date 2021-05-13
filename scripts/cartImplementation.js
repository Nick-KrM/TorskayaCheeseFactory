import documentRefs from './refs.js';
import { getProdById, updateData, saveData, clearData, cartVisibility, counterItemsCart } from './cart.js';

let selectedProdCart;
selectedProdCart = updateData();

console.log(selectedProdCart);
// const itemsArray = getGoodsInStock;

// const source = document.querySelector('#menu-template').innerHTML.trim();

// const template = Handlebars.compile(source);

// const markup = itemsArray.map(item => template(item)).join('');
//   console.log(markup);

// const container = document.querySelector('#js-menu');
// container.innerHTML = markup;