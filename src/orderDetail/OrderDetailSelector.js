export default (state) => ({
    order: {
        status: '배달 완료',
        menus: [{
            idx: 18,
            name: '트러플 버섯 리조또',
            foreignName: 'Truffle Mushroom Risotto',
            amount: 1

        }, {
            idx: 14,
            name: '쉬림프 까넬로니 파스타',
            foreignName: 'Shrimp Cannelloni Pasta',
            amount: 2
        }],
        totalPrice: 12000,
        requestTime: '8:00pm~8:30pm'
    }
});
