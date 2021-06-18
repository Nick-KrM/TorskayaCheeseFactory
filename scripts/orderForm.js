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
    let message = `<p><strong>${item.name}</strong> ${item.productWeight}г - ${item.totalPriceSelectedItem}грн;`;
    orderList.push(message);
};

const orderMessage = `<h3>Замовлення:</h3>${orderList.join('<br>')}<br><br><p>Разом: <strong>${totalAmountOfAllGoods}</strong>грн<br><p>Загальна вага замовлення: <strong>${totalWeightOfAllGoods}</strong>г<br><br>`;

documentRefs.orderFormInput.textContent = orderMessage;
console.log(documentRefs.orderFormInput.textContent);

export default orderMessage;