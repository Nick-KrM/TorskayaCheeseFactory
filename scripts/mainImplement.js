import getGoodsInStock from './AvailabilityСheck.js';

const itemsArray = getGoodsInStock;

const source = document.querySelector('#menu-template').innerHTML.trim();

const template = Handlebars.compile(source);

const markup = itemsArray.map(item => template(item)).join('');
//   console.log(markup);

const container = document.querySelector('#js-menu');
container.innerHTML = markup;

//возвращаем данные из локл
function getData() {
    return cartData;
};