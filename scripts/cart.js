import documentRefs from './refs.js';
import goodsArray from './products.js';

const allGoods = documentRefs.allGoods;
const cartIconCounter = documentRefs.cartIconCounter;

let cartData;
console.log(cartData);
updateData();
console.log(cartData);
cartIconCounter.textContent = cartData.length;


function handleBtnClick(e) {
    e.preventDefault();
    updateData();

    const target = e.target;

    if (target.nodeName !== "BUTTON") {
        return
    };

    const newProduct = getProdById(goodsArray, target.id);

    if (cartData.length === 0) {
        cartData.push(newProduct);
        saveData();

    } else {
        const requiredEl = getProdById(cartData, target.id);
        console.log(requiredEl);
        console.log(!requiredEl);

        if (!requiredEl) {
            cartData.push(newProduct);
            saveData();
            // console.log(cartData.includes(newProduct.id));
            // console.log(`такого объекта ${newProduct.id} нет - пушим`);
        } else {
            // console.log('Такой объект уже есть - выходим');
            alert(`Товар уже в корзине!`);
        };
    };

    // console.log('cartData после всех проверок:', cartData);

    // Отображение кол-ва продуктов в корзине
    cartIconCounter.textContent = cartData.length;
};

// ф-я поиска id при клике по кнопке "купить"
const getProdById = (arr, id) => {
    return arr.find(x => x.id === id);
};

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

allGoods.addEventListener('click', handleBtnClick);