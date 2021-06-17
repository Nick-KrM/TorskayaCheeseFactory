import goodsArray from './products.js';


const getGoodsInStock = (goodsArray, min) => {
    const objectsGoodsInStock = goodsArray.filter(product => product.availability > min);
    return objectsGoodsInStock
};

export default getGoodsInStock(goodsArray, 0);