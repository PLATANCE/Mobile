'use strict';
/*
export default (state) => ({
    menus: state.menus,
    address: state.address
});
*/

export default (state) => ({
    chef: {
        idx: 2,
        url: 'http://plating.co.kr/app/media/chef/2015.11.06-chef_jang_big.png',
        name: '장정은 Chef',
        career: '現 류니끄 Sous Chef',
        summary: '고전적 요리에 현대적 감각을 더해 새로운 즐거움을 만들어내는 컨템포러리 요리에 매료되어 류니끄에서 3년간 수 셰프로 근무하고 있습니다. 현재 촉망받는 젊은 셰프로써 류니끄만의 정신을 가장 잘 계승하고 유지시켜 나가고 있습니다.',
    },
    toolbar: {
        leftIcon: 'http://plating.co.kr/app/media/icon/Back-White-100.png',
        text: 'CHEF',
        rightIcon: 'http://plating.co.kr/app/media/icon/Cart-White-100.png'
    }
});
