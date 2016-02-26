'use strict';

export default (state) => ({
    addressList: [{
        address: {
            idx: 4389,
            address: '서울 강남구 신사동',
            addressDetail: '533-9',
            inUse: true,
            deliveryAvailable: true
        }
    }, {
        address: {
            idx: 4603,
            address: '서울 서초구 우면동',
            addressDetail: '533-9',
            inUse: false,
            deliveryAvailable: false
        }
    }, {
        address: {
            idx: 4604,
            address: '세종특별자치시 연동면',
            addressDetail: '123-456',
            inUse: false,
            deliveryAvailable: false
        }
    }, {
        address: {
            idx: 5111,
            address: '서울 서초구 양재1동',
            addressDetail: '1010-1010',
            inUse: false,
            deliveryAvailable: false
        }
    }]
});
