import documentRefs from './refs.js';
import { getProdById, updateData, saveData, clearData, cartVisibility, counterItemsCart } from './cartIcon.js';
const prodListCart = documentRefs.prodListCart;
let totalAmountOfItemsBx = document.querySelector('.prodTotalCost');
let totalAmountOfAllGoods = 0;

// Обновляю массив объектов из локального хранилища
let selectedProdCart = updateData();

// ф-я получает массив всех значений объектов по ключу
const getAllPropValues = function (arr, prop) {
    const arrProp = [];

    for (let item of selectedProdCart) {
        if (item[prop] !== undefined) {
            arrProp.push(item[prop]);
        }
    } return arrProp;
};

let objTotalAmountOfItems = getAllPropValues(selectedProdCart, 'totalPriceSelectedItem');


for (const number of objTotalAmountOfItems) {
    totalAmountOfAllGoods += number;
};
totalAmountOfItemsBx.textContent = totalAmountOfAllGoods;


// Рендеринг страницы
const cartItems = document.querySelector('#cart-template').innerHTML.trim();
const cartTemplate = Handlebars.compile(cartItems);
let cartMarkup = selectedProdCart.map(item => cartTemplate(item)).join('');


function weigthChangeBtn(e) {
    e.preventDefault();

    const targetBtnAssignment = e.target.dataset.btnAssignment; // Определение кнопки по атрибуту назначения кнопки
    const targetId = e.target.dataset.btnItemName; // Определение кнопки по атрибуту имени кнопки
    let selectedItemObj = getObjByName(selectedProdCart, targetId); // кликнутый объект со всеми данными
    let iconMinusStatus = e.target.parentNode.parentNode.children[2]; // кликнутый объект с кнопкой "минус" для изменения стилей

    if (targetBtnAssignment === undefined) {
        return
    };

    // Переменные веса и цены изменяемого объекта
    let selectedItemWeight = e.target.parentNode.parentNode.parentNode.children[1].children[1].children[0];
    let selectedItemPrice = e.target.parentNode.parentNode.parentNode.children[3].children[0];
    let selectedHTMLItem = e.target.parentNode.parentNode.parentNode;

    // Приведение к числу значений веса и цены
    let counterPriceValue = Number(selectedItemPrice.textContent);
    let counterWeightValue = Number(selectedItemWeight.textContent);

    if (targetBtnAssignment === 'add') {
        counterPriceValue += selectedItemObj.price100;
        counterWeightValue += 100;

        // Цена выбраного товара
        selectedItemPrice.textContent = counterPriceValue;
        selectedItemObj.totalPriceSelectedItem = counterPriceValue;

        // Вес выбраного товара
        selectedItemWeight.textContent = counterWeightValue;
        selectedItemObj.productWeight = counterWeightValue;

        selectedItemObj.iconMinusStatus = 'active';
        iconMinusStatus.classList.remove('notActive');

        setTotalAmount();
        saveData();
    };

    if (targetBtnAssignment === 'reduce') {

        if (Number(selectedItemWeight.textContent) > 400) {
            counterPriceValue -= selectedItemObj.price100;
            counterWeightValue -= 100;

            // Изменяю цену текстКонтента и в объекте
            selectedItemPrice.textContent = counterPriceValue;
            selectedItemObj.totalPriceSelectedItem = counterPriceValue;
            // Изменяю вес текстКонтента и в объекте
            selectedItemWeight.textContent = counterWeightValue;
            selectedItemObj.productWeight = counterWeightValue;

            setTotalAmount();
            saveData();
        } else {
            // Присваиваю значение минимального заказа и цены

            selectedItemPrice.textContent = selectedItemObj.price300;
            selectedItemObj.totalPriceSelectedItem = selectedItemObj.price300;

            selectedItemWeight.textContent = selectedItemObj.minProductWeight;
            selectedItemObj.productWeight = selectedItemObj.minProductWeight;

            selectedItemObj.iconMinusStatus = 'notActive';
            iconMinusStatus.classList.add('notActive');

            setTotalAmount();
            saveData();
        };
    };

    console.log(selectedProdCart.length);

    if (targetBtnAssignment === 'delete') {

        console.log(selectedHTMLItem);
        let objPosition = selectedProdCart.indexOf(selectedItemObj);
        const deletedGoods = selectedProdCart.splice(objPosition, 1);

        // Переадресовую на страницу с товарами, если товаров в массиве не осталось, если же товары есть, то обновляю стр.
        if (selectedProdCart.length < 1) {
            location = location.href = "index.html#products";
        } else {
            selectedHTMLItem.remove();
        };

        setTotalAmount();
        saveData();
    };
};

// Вешаю слушателя на список товаров, если он не пустой.
if (prodListCart !== null) {
    prodListCart.addEventListener('click', weigthChangeBtn);
};

prodListCart.innerHTML = cartMarkup;
// prodListCart.insertAdjacentHTML('beforeend', cartMarkup);


// поиск объекта в массиве по имени
const getObjByName = (arr, name) => {
    return arr.find(x => x.name === name);
};

// ф-я получая массив всех сумм товара, суммирует данные массива и присваетвает полученное значение к textContent
function setTotalAmount() {
    objTotalAmountOfItems = getAllPropValues(selectedProdCart, 'totalPriceSelectedItem');
    totalAmountOfAllGoods = 0;

    for (const number of objTotalAmountOfItems) {
        totalAmountOfAllGoods += number;
    };

    totalAmountOfItemsBx.textContent = totalAmountOfAllGoods;
};