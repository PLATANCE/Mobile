import { Dimensions, PixelRatio } from 'react-native';

const deviceRatio = 0;
if(PixelRatio.get() === 2) {
    deviceRatio = 0.9;
} else if(PixelRatio.get() === 3) {
    deviceRatio = 1;
}

const Const = {
    MARGIN_TOP: 64,
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
    CART_ADDRESS_INPUT_MESSAGE: '주소를 입력해주세요',
    CART_MOBILE_INPUT_MESSAGE: '전화번호를 입력해주세요',
    CART_DELIVERY_TIME_CLOSED_MESSAGE: '금일 주문이 마감되었습니다',
    CART_CARD_INPUT_MESSAGE: '카드를 등록해주세요',
    DEVICE_RATIO: deviceRatio,
};

module.exports = Const;

