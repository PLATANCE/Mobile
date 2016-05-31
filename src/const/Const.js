import { Dimensions, PixelRatio, Platform } from 'react-native';

const deviceRatio = 0;
if(PixelRatio.get() === 2) {
    deviceRatio = 0.9;
} else if(PixelRatio.get() === 3) {
    deviceRatio = 1;
}

const Const = {
    MARGIN_TOP: Platform.OS === 'ios' || Platform.Version > 19 ? 64 : 44,
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
    CART_ADDRESS_INPUT_MESSAGE: '주소를 입력해주세요',
    CART_MOBILE_INPUT_MESSAGE: '전화번호를 입력해주세요',
    CART_DELIVERY_TIME_CLOSED_MESSAGE: '선택 가능한 배달 시간이 없습니다.',
    CART_CARD_INPUT_MESSAGE: '카드를 등록해주세요',
    DEVICE_RATIO: deviceRatio,
};

module.exports = Const;

