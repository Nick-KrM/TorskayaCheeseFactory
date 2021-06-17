import documentRefs from './refs.js';
import { getProdById, updateData, saveData, clearData, cartVisibility, counterItemsCart, getAllPropValues } from './cartIcon.js';

let cartData = updateData();
let totalWeightOfAllGoods = 0;
let totalAmountOfAllGoods = 0;

const objTotalWeightOfItems = getAllPropValues(cartData, 'productWeight');
const objTotalAmountOfItems = getAllPropValues(cartData, 'totalPriceSelectedItem');
const orderList = [];

for (const number of objTotalWeightOfItems) {
    totalWeightOfAllGoods += number;
};

for (const number of objTotalAmountOfItems) {
    totalAmountOfAllGoods += number;
};

for (const item of cartData) {
    let message = `${item.name} ${item.productWeight}г - ${item.totalPriceSelectedItem}грн;`;
    orderList.push(message);
};

const orderMessage = `Замовлення:\n\n\n${orderList.join('\n\n')}\n\n\nРазом: ${totalAmountOfAllGoods}грн\nЗагальна вага замовлення: ${totalWeightOfAllGoods}г`;

console.log(orderMessage);