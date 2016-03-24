'use strict';
import realm from '../realm';

let cart = realm.objects('Cart');

const pushMenu = function(idx, dailyMenuIdx) {
    let result = cart.filtered(`dailyMenuIdx = ${dailyMenuIdx}`);
    let menu;
    if (result.length == 0) {
        realm.write(() => {
            // 책 객체를 생성하고 저장합니다
           menu = realm.create('Cart', { idx: idx, dailyMenuIdx: dailyMenuIdx, amount: 1 });
        });
    } else {
        menu = result[0];
        realm.write(() => {
            menu.amount++;
        });
    }
    console.log("pushMenu: idx=" + idx + "&dailyMenuIdx=" + dailyMenuIdx + "&amount=" + menu.amount);
    return menu.amount;
};

const pullMenu = function(idx, dailyMenuIdx) {
    let result = cart.filtered(`dailyMenuIdx = ${dailyMenuIdx}`);
    if (menu.length == 0) {
        return;
    } else {
        let menu = result[0];
        if (menu.amount > 1) {
            realm.write(() => {
                menu.amount--;
            });
        } else {
            realm.delete(menu);
        }
    }
    console.log("pullMenu: idx=" + idx + "&dailyMenuIdx=" + dailyMenuIdx);
};

const getMenus = function() {
	return JSON.stringify(cart);
}

module.exports = {
	pushMenu,
	pullMenu,
	getMenus
};