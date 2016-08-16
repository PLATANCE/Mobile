import { Dimensions, PixelRatio, Platform } from 'react-native';

const Const = {
    MARGIN_TOP: Platform.OS === 'ios' || Platform.Version > 19 ? 64 : 44,
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
    CART_ADDRESS_INPUT_MESSAGE: '주소를 입력해주세요',
    CART_MOBILE_INPUT_MESSAGE: '전화번호를 입력해주세요',
    CART_MOBILE_NEW_INPUT_MESSAGE: '핸드폰 번호를 입력해주세요',
    CART_DELIVERY_TIME_CLOSED_MESSAGE: '선택 가능한 배달 시간이 없습니다.',
    CART_CARD_INPUT_MESSAGE: '카드를 등록해주세요',
    IS_NOT_SUPPORTED_AREA_MESSAGE: '배달 지역이 아닙니다.',
    PLEASE_RE_APPLY_POINT_OR_COUPON: '포인트와 쿠폰을 올바르게 적용해주세요.',
};

module.exports = Const;

