'use strict';

export default (state) => ({
    cart: state.CartReducers.cart,
    myAddress: state.AddressReducer.myAddress,
});


/*
export default (state) => ({
    menus: [{
        menu: {
            idx: 20,
            url: 'http://plating.co.kr/app/media/2015.12.17-Spicy-Spare-Ribs.jpg',
            name: '매운 갈비와 글레이즈 사과',
            foreignName: 'Spicy Ribs & Glazed Apple',
            originalPrice: 11000,
            sellingPrice: 8000,
            averageReviewScore: 3.8,
            reviewCount: 93,
        },
        chef: {
            url: 'http://plating.co.kr/app/media/chef/2015.11.24-chef_bong_2.png',
            name: '김봉수 Chef'
        }
    }, {
        menu: {
            idx: 13,
            url: 'http://plating.co.kr/app/media/2015.11.06-cannelloni_pasta.jpg',
            name: '쉬림프 까넬로니 파스타',
            foreignName: 'Shrimp Cannelloni Pasta',
            originalPrice: 10000,
            sellingPrice: 10000,
            averageReviewScore: 5,
            reviewCount: 134,
        },
        chef: {
            url: 'http://plating.co.kr/app/media/chef/2015.11.06-chef_jang.png',
            name: '장정은 Chef'
        }
    }],
    address: {
        address: '서울 강남구 신사동',
        addressDetail: '533-9'
    },
    banner: {
        isBannerOpen: true,
        url: 'http://plating.co.kr/app/media/banner/admin_banner.png'
    }
});
*/
