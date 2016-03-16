'use strict';

const CartSchema = {
    name: "Cart",
    properties: {
       	idx: 'int',
        dailyMenuIdx: 'int',
        amount: 'int',
    }
}

module.exports = CartSchema;
