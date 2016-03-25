import {
    CartActions
} from '../actions/CartActions';


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
                const menuIdx = cartItem.menuIdx;

                let newCart = Object.assign({}, cart);
                let itemInCart = newCart[menuIdx];

                if (itemInCart) {
                    itemInCart.amount++;
                } else {
                    newCart[menuIdx] = Object.assign({}, cartItem, { amount: 1 });
                }
                
                return Object.assign({}, state, {
                    cart: newCart
                });
            }
        case CartActions.REMOVE_ITEM_FROM_CART:
            {
                const cart = state.cart;
                const item = action.item;
                const menuIdx = item.menuIdx;

                let newCart = Object.assign({}, cart);
                let itemInCart = cart[menuIdx];

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
