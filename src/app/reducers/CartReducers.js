import {
    CartActions
} from '../actions/CartActions';

import _ from 'lodash';


const cartReducer = function(state = {
    cart: {
        //menuidx: (item with amount)
    }
}, action) {
    switch (action.type) {
        case CartActions.ADD_ITEM_TO_CART:
            {

                const cart = state.cart;
                const cartItem = action.cartItem;
                const enable = action.enable;
                const menuIdx = cartItem.menuIdx;
                if(enable) {
                    let newCart = _.cloneDeep(cart);
                    let itemInCart = newCart[menuIdx];

                    if (itemInCart) {
                        itemInCart.amount++;
                    } else {
                        newCart[menuIdx] = Object.assign({}, cartItem, { amount: 1 });
                    }
                    
                    return Object.assign({}, state, {
                        cart: newCart
                    });
                } else {
                    return Object.assign({}, state, {
                        cart: cart
                    });
                }
            }
        case CartActions.DECREASE_ITEM_FROM_CART:
            {
                const cart = state.cart;
                const cartItem = action.cartItem;
                const menuIdx = cartItem.menuIdx;

                let newCart = _.cloneDeep(cart);
                let itemInCart = newCart[menuIdx];

                if (itemInCart) {

                    if (itemInCart.amount > 1) {
                        itemInCart.amount--;
                    } else {
                        delete newCart[menuIdx];
                    }

                    return Object.assign({}, state, {
                        cart: newCart
                    });

                } else {

                    console.log("카트에 없는데 지우려고 하는 경우 : " + action);
                    return state;

                }
            }
        case CartActions.CLAER_CART:
            {
                return Object.assign({}, state, {
                    cart: {}
                });
            }
        default:
            return state;
    }
};

export default cartReducer;
