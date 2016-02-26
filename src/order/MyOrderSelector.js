export default (state) => ({
    orders: [{
        order: {
            date: '2/11',
            day: '수',
        	address: '서울 강남구 신사동',
            addressDetail: '533-9 401호',
            requestTime: '6:00pm ~ 6:30pm'
        }
    }, {
        order: {
        	date: '2/12',
            day: '목',
            address: '서울 강남구 신사동',
            addressDetail: '533-9 402호',
            requestTime: '7:00pm ~ 7:30pm'
        }
    }, {
    	order: {
    		date: '2/13',
            day: '금',
            address: '서울 강남구 신사동',
            addressDetail: '533-9 403호',
            requestTime: '8:00pm ~ 8:30pm'
    	}
    }],
});
