export const CartActions = {
    ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
    DECREASE_ITEM_FROM_CART: "REMOVE_ITEM_FROM_CART",
    CLAER_CART: "CLAER_CART"
};

export const addItemToCart = (item) => ({
	type: CartActions.ADD_ITEM_TO_CART,
	item
});

export const decreaseItemFromCart = (item) => ({
	type: CartActions.DECREASE_ITEM_FROM_CART,
	item
});

export const clearCart = () => ({
	type: CartActions.CLAER_CART
});