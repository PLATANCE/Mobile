import {
    CartActions
} from '../actions/CartActions';
import Mixpanel from '../../util/mixpanel';
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
                    Mixpanel.trackWithProperties('Add Item to Cart', { menu: cartItem.menuNameKor });
                    
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

                    Mixpanel.trackWithProperties('Decrease Item to Cart', { menu: cartItem.menuNameKor });

                    return Object.assign({}, state, {
                        cart: newCart
                    });

                } else {
                    return state;
                }
            }
        case CartActions.CLEAR_CART:
            {
                Mixpanel.track('Clear Cart');
                return Object.assign({}, state, {
                    cart: {}
                });
            }
        default:
            return state;
    }
};

export default cartReducer;
