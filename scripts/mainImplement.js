import getGoodsInStock from './AvailabilityСheck.js';

const itemsArray = getGoodsInStock;
// console.log(itemsArray);

const source = document.querySelector('#menu-template').innerHTML.trim();
// console.log(source);
const template = Handlebars.compile(source);
// console.log(template);
const markup = itemsArray.map(item => template(item)).join('');
// console.log(markup);

const container = document.querySelector('#js-menu');
container.innerHTML = markup;