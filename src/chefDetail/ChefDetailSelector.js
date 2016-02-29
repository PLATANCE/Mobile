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
        url: 'http://plating.co.kr/app/media/chef/2015.11.24-chef_andrew_big_2.jpg',
        name: 'Andrew Kim Chef',
        affiliation: '前 Purearena Executive Chef',
        summary: '대학에서 분자생물학 전공 후, 요리사의 꿈을 이루기 위해 경희대 조리과학과를 수료했습니다. 호주의 정통 French Restaurant인 The Botanical에서 셰프가 갖춰야할 덕목에 대해 배우고 한국에 돌아와 Pure Areana에서 Executive Chef를 담당했습니다.',
    },
    toolbar: {
        leftIcon: 'http://plating.co.kr/app/media/icon/Back-White-100.png',
        text: 'CHEF',
        rightIcon: 'http://plating.co.kr/app/media/icon/Cart-White-100.png'
    }
});
