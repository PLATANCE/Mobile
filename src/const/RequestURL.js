const RequestURL = {
    // login
    REQUEST_FB_SIGN_UP: 'http://api.plating.co.kr/signup',  // POST
    CHECK_ALREADY_SIGNED_UP: 'http://api.plating.co.kr/check_already_signed_up',  // GET

    // commonComponent -> SideDrawer
    SUBMIT_POINT_REGISTER: 'http://api.plating.co.kr/promo/register?', // user_idx, code

    // dailyMenu
    REQUEST_DAILY_MENU: 'http://api.plating.co.kr/daily_menu',
    REQUEST_MY_ADDRESS: 'http://api.plating.co.kr/user/get_address?',
    REQUEST_REVIEW_AVAILABLE: 'http://api.plating.co.kr/review/isAvailable?', // user_idx
    REQUEST_DIALOG: 'http://api.plating.co.kr/dialog/get_dialog',
    REQUEST_APP_UPDATE_AVAILABLE_IOS: 'http://api.plating.co.kr/check_app_update_available_ios?', //build
    REQUEST_APP_UPDATE_AVAILABLE_ANDROID: 'http://api.plating.co.kr/check_app_update_available_android?', //build

    // menuDetail
    REQUEST_MENU_DETAIL: 'http://api.plating.co.kr/menu_detail',    // menu_idx
    REQUEST_REVIEW_LIST: 'http://api.plating.co.kr/review/view_more',   // menu_idx

    // address
    REQUEST_MY_ADDRESS_LIST: 'http://api.plating.co.kr/user/get_address_list?', // user_idx
    REQUEST_SEARCHED_ADDRESS_LIST: 'https://address.plating.co.kr?',  // text
    SUBMIT_IN_USE_ADDRESS: 'http://api.plating.co.kr/user/update_address?', // idx, user_idx, mode
    SUBMIT_UPDATE_ADDRESS: 'http://api.plating.co.kr/update_info?', // user_idx, address, address_detail, delivery_available, lat, lon

    // refer
    REQUEST_GET_USER_CODE: 'http://api.plating.co.kr/user/user_code?',  // user_idx
    REQUEST_GET_POLICY_REFER_POINT: 'http://api.plating.co.kr/policy/policy_refer_point',

    // chefDetail
    REQUEST_CHEF_DETAIL: 'http://api.plating.co.kr/chef_detail?',   // chef_idx

    // review
    REQUEST_WRITE_REVIEW_LIST: 'http://api.plating.co.kr/review/written_by_user?',  // order_idx
    SUBMIT_WRITE_REVIEW: 'http://api.plating.co.kr/review/submit_review_one',  // order_idx, order_d_idx, rating, comment
    CANCEL_WRITE_REVIEW: 'http://api.plating.co.kr/review/cancel?',  // order_idx,

    // order
    REQUEST_MY_ORDER_LIST: 'http://api.plating.co.kr/order/history?',   // user_idx

    // orderDetail
    REQUEST_MY_ORDER_DETAIL: 'http://api.plating.co.kr/order/detail?',  // order_idx

    // coupon
    REQUEST_MY_COUPON_LIST: 'http://api.plating.co.kr/coupon/my_coupon?',   // user_idx
    REQUEST_COUPON_AVAILABLE: 'http://api.plating.co.kr/coupon/coupon_available?',   // user_idx POST
    
    // cart
    REQUEST_CART_INFO: 'http://api.plating.co.kr/cart_info_update_with_iamport?', // user_idx
    SUBMIT_UPDATE_MOBILE: 'http://api.plating.co.kr/update_info?', // user_idx, phone_no
    GET_AVAILABLE_POINT: 'http://api.plating.co.kr/policy/get_available_point?', // user_idx, point_input
    SUBMIT_PLACE_ORDER: 'http://api.plating.co.kr/place_order_update_with_iamport?',   // user_idx, time_slot, menu_d_idx, order_amount, credit_used, point, total_price, pay_method, coupon_idx, include_cutlery
    REQUEST_AUTH_NUMBER: 'https://smsauth.plating.co.kr/user/{userIdx}/requestAuthNumber',
    VALIDATE_AUTH_NUMBER: 'https://smsauth.plating.co.kr/user/{userIdx}/validateAuthNumber',
    CREATE_BILL_KEY: 'https://iamport.plating.co.kr/createBillKey',

    // sidedrawer
    REQUEST_USER_POINT: 'http://api.plating.co.kr/promo/point?',

    // customerService
    REQUEST_FAQ_LIST: 'http://api.plating.co.kr/policy/FAQ',
    REQUEST_DELIVERY_COVERAGE: 'http://api.plating.co.kr/policy/get_delivery_coverage'

    /*
     *---------------------
     * NOT YET
     *---------------------
     */

    /*
     * SUBMIT REQUEST
     */
    
    
    
};

module.exports = RequestURL;

