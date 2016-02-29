'use strict';
/*
export default (state) => ({
    menus: state.menus,
    address: state.address
});
*/

export default (state) => ({
    cart: {
        menus: [{
            idx: 20,
            url: 'http://plating.co.kr/app/media/2015.12.17-Spicy-Spare-Ribs.jpg',
            name: '매운 갈비와 글레이즈 사과',
            foreignName: 'Spicy Ribs & Glazed Apple',
            originalPrice: 11000,
            sellingPrice: 8000,
            amount: 1
        }, {
            idx: 13,
            url: 'http://plating.co.kr/app/media/2015.11.06-cannelloni_pasta.jpg',
            name: '쉬림프 까넬로니 파스타',
            foreignName: 'Shrimp Cannelloni Pasta',
            originalPrice: 10000,
            sellingPrice: 10000,
            amount: 2
        }],
        menuTotalPrice: 18000,
        deliveryFee: 3500,
        pointUsed: 2000,
        DiscountCouponPrice: 4000,
        totalPrice: 8500,
        address: '서울 강남구 신사동',
        addressDetail: '533-9번지 402호',
        mobile: '010-3648-5294',
        timeSlot: [{ '0': '05:30pm - 06:00pm' },
            { '1': '06:00pm - 06:30pm' },
            { '2': '06:30pm - 07:00pm' },
            { '5': '07:00pm - 07:30pm' },
            { '6': '07:30pm - 08:00pm' },
            { '7': '08:00pm - 08:30pm' },
            { '8': '08:30pm - 09:00pm' },
            { '9': '09:00pm - 09:30pm' },
            { '10': '09:30pm - 10:00pm' }
        ],
        includeCutlery: 'Y',
        payMethod: 'Card',
        cardNumber: '1234-5678-0000-1234',
        buttonText: '주문하기',
        buttonStatus: 'TRUE'
    },
    toolbar: {
        leftIcon: 'http://plating.co.kr/app/media/icon/Back-White-100.png',
        text: 'ORDER',
        rightIcon: ''
    }
});
