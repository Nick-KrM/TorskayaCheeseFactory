import documentRefs from './refs.js';
import goodsArray from './products.js';

const allGoods = documentRefs.allGoods;
const cartIconCounter = documentRefs.cartIconCounter;

let cartData = [];

allGoods.addEventListener('click', handleBtnClick);

function handleBtnClick(e) {
    e.preventDefault();

    const target = e.target;

    if (target.nodeName !== "BUTTON") {
        return
    };

    const savedGoods = localStorage.getItem('cart');

    if (savedGoods) {
        const parsedGoods = JSON.parse(savedGoods);
        console.log('Товары в массиве parsedGoods:',parsedGoods);
        console.log('Товары в массиве savedGoods:' ,savedGoods);
        console.log('Товары в массиве cartData:' ,cartData);
        cartData.push(parsedGoods);
    }

    const newProd = getProdById(goodsArray, target.id);

    if (cartData.includes(newProd)) {
        console.log('Товар уже в корзине!');
        return
    };

    cartData.push(newProd);

    console.log('Товары в массиве cartData, при первом добовлении:' ,cartData);


    // Сохраняю данные в локал
    localStorage.setItem('cart', JSON.stringify(cartData));


    // Отображение кол-ва продуктов в корзине
    cartIconCounter.textContent = cartData.length;
};

// ф-я поиска id при клике по кнопке "купить"
const getProdById = (arr, id) => arr.find(x => x.id === id);

//ф-я получения данных из локал
function updateData() {
    cartData = JSON.parse(localStorage.getItem('cart')) || [];
    return cartData;
};

// ф-я сохранения данных в локал
function saveData() {
    localStorage.setItem('cart', JSON.stringify(cartData));
    return cartData;
};

//ф-я очистки корзины с изменением локального хранилища
function clearData() {
    cartData = [];
    saveData();
    return cartData;
};
