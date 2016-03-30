export const CartActions = {
    ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
    DECREASE_ITEM_FROM_CART: "DECREASE_ITEM_FROM_CART",
    CLAER_CART: "CLAER_CART"
};

export const addItemToCart = (menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng, enable) => ({
	type: CartActions.ADD_ITEM_TO_CART,
	cartItem: {
		menuDIdx: menuDIdx, 
		menuIdx: menuIdx,
		price: price,
		altPrice: altPrice,
		imageUrlMenu: imageUrlMenu,
		menuNameKor: menuNameKor,
		menuNameEng: menuNameEng,
	},
	enable: enable
});

export const decreaseItemFromCart = (menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng) => ({
	type: CartActions.DECREASE_ITEM_FROM_CART,
	cartItem: {
		menuDIdx: menuDIdx, 
		menuIdx: menuIdx,
		price: price,
		altPrice: altPrice,
		imageUrlMenu: imageUrlMenu,
		menuNameKor: menuNameKor,
		menuNameEng: menuNameEng,
	}
});

export const clearCart = () => ({
	type: CartActions.CLAER_CART
});