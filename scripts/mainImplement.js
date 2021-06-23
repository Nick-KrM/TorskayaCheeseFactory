import getGoodsInStock from './availability.js';

const itemsArray = getGoodsInStock;

const source = document.querySelector('#menu-template').innerHTML.trim();

const template = Handlebars.compile(source);

const markup = itemsArray.map(item => template(item)).join('');


const container = document.querySelector('#js-menu');
container.innerHTML = markup;