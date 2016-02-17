'use strict';
/*
export default (state) => ({
    menus: state.menus,
    address: state.address
});
*/

export default (state) => ({
    dailyMenus: [{
        'idx': 0,
        'menuImage': 'menuImage-0',
        'chefImage': 'chefImage-0',
        'menuName': 'menuName-0',
        'chefName': 'chefName-0',
        'star': 'star-0',
        'price': 'price-0'
    }, {
        'idx': 1,
        'menuImage': 'menuImage-1',
        'chefImage': 'chefImage-1',
        'menuName': 'menuName-1',
        'chefName': 'chefName-1',
        'star': 'star-1',
        'price': 'price-1'
    }],
    address: state.address
});
