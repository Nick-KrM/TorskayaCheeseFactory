import documentRefs from './refs.js';
import { getProdById, updateData, saveData, clearData, cartVisibility, counterItemsCart } from './cartIcon.js';
const prodListCart = documentRefs.prodListCart;
// console.log(prodListCart);

let selectedProdCart;
selectedProdCart = updateData();

const cartItems = document.querySelector('#cart-template').innerHTML.trim();

const cartTemplate = Handlebars.compile(cartItems);

const cartMarkup = selectedProdCart.map(item => cartTemplate(item)).join('');

const cartItemsContainer = documentRefs.prodListCart;

function weigthChangeBtn(e) {
    e.preventDefault();
    updateData();

    const target = e.target.dataset.btnAssignment;

    if (target === undefined) {
        return
    };

    if (target === 'add') {
        console.log(`Добавляем вес кнопкой: ${target}`);
    };

    if (target === 'reduce') {
        console.log(`Уменьшаем вес кнопкой: ${target}`);
    };

    if (target === 'delete') {
        console.log(`Удаляем товар из спискаы: ${target}`);
    };
};

// Вешаю слушателя на списко товаров, если он не пустой.
if (prodListCart !== null) {
    prodListCart.addEventListener('click', weigthChangeBtn);
};

cartItemsContainer.insertAdjacentHTML('beforeend', cartMarkup);