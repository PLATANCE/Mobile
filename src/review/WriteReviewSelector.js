'use strict';
/*
export default (state) => ({
    menus: state.menus,
    address: state.address
});
*/

export default (state) => ({
    reviews: [{
        menu: {
            idx: 20,
            url: 'http://plating.co.kr/app/media/2015.12.17-Spicy-Spare-Ribs.jpg',
            name: '매운 갈비와 글레이즈 사과',
            foreignName: 'Spicy Ribs & Glazed Apple',
        },
        chef: {
            name: '김봉수 Chef'
        },
        review: {
            score: '5',
            content: '해갷개해개해개해개해개해개해개해개해개해개핵 존맛!!'
        }
    }, {
        menu: {
            idx: 13,
            url: 'http://plating.co.kr/app/media/2015.11.06-cannelloni_pasta.jpg',
            name: '쉬림프 까넬로니 파스타',
            foreignName: 'Shrimp Cannelloni Pasta',
        },
        chef: {
            name: '장정은 Chef'
        },
        review: {
            score: '10',
            content: '10점은 왜 없나요? ㅠㅠㅠㅠㅠ!!'
        }
    }]
});
