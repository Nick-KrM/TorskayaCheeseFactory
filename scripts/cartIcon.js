import documentRefs from './refs.js';
import goodsArray from './products.js';

const allGoods = documentRefs.allGoods;
const cartIconCounter = documentRefs.cartIconCounter;
const cartIconBlock = documentRefs.cartIconBlock;

let cartData;

updateData(); // обновляю данные из хранилища
counterItemsCart(); // отражение кол-ва товаров в корзине
cartVisibility(); // прячу или показываю корзину, в зависимости от наличия в ней товаров


function handleBtnClick(e) {
    e.preventDefault();
    updateData();

    const target = e.target;
    let btnText = target.textContent;

    if (target.nodeName !== "BUTTON") {
        return
    };

    const newProduct = getProdById(goodsArray, target.id);

    if (cartData.length === 0) {
        cartData.push(newProduct);
        saveData();

    } else {
        const requiredEl = getProdById(cartData, target.id);

        if (!requiredEl) {
            cartData.push(newProduct);
            saveData();
            console.log(`Товар летит в корзину`);

            // Надо добавить pop-up
        } else {
            console.log('Такой объект уже есть - ничего не делаем');
            // alert(`Товар уже в корзине!`);

            // Надо добавить pop-up
        };
    };

    counterItemsCart();
    cartVisibility();

    btnText = "done";
    console.log(btnText);
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

// ф-я видимости иконки корзины
function cartVisibility() {
    if (cartIconCounter !== null) {

        if (cartData.length > 0) {
            cartIconBlock.classList.remove('hidden');
            cartIconBlock.classList.add('cartAnim');
        }

        // if (cartData.length === 0) {
        //     console.log(`Нет товаров в корзине, прячем корзину`);
        //     // cartIconBlock.classList.add('hidden');
        //     // cartIconBlock.classList.remove('cartAnim');
        // } else {
        //     cartIconBlock.classList.add('cartAnim');
        //     cartIconBlock.classList.remove('hidden');
        // };
    }
};

// ф-я отображения значения кол-ва товаров в корзине
function counterItemsCart() {
    if (cartIconCounter !== null) {
        cartIconCounter.textContent = cartData.length;
    }
};

if (allGoods !== null) {
    allGoods.addEventListener('click', handleBtnClick);
};

// ф-я получает массив всех значений объектов по ключу
function getAllPropValues(arr, prop) {
    const arrProp = [];

    for (let item of arr) {
        if (item[prop] !== undefined) {
            arrProp.push(item[prop]);
        }
    } return arrProp;
};

export { getProdById, updateData, saveData, clearData, cartVisibility, counterItemsCart, getAllPropValues };