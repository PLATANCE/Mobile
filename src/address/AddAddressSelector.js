'use strict';

export default (state) => ({
    addressList: [{
        address: {
            address: '서울 강남구 신사동',
            deliveryAvailable: true
        }
    }, {
        address: {
            address: '서울 관악구 신사동',
            deliveryAvailable: false
        }
    }, {
        address: {
            address: '서울 은평구 신사동',
            deliveryAvailable: false
        }
    }, {
        address: {
            address: '서울 은평구 신사1동',
            deliveryAvailable: false
        }
    }, {
        address: {
            address: '서울 은평구 신사2동',
            deliveryAvailable: false   
        }
    }]
});
