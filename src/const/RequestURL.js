const RequestURL = {
    // login
    REQUEST_FB_SIGN_UP: 'http://api.plating.co.kr/signup',  // POST

    // commonComponent -> SideDrawer
    SUBMIT_POINT_REGISTER: 'http://api.plating.co.kr/promo/register?', // user_idx, code

    // dailyMenu
    REQUEST_DAILY_MENU: 'http://api.plating.co.kr/daily_menu',
    REQUEST_MY_ADDRESS: 'http://api.plating.co.kr/user/get_address?',
    REQUEST_REVIEW_AVAILABLE: 'http://api.plating.co.kr/review/isAvailable?', // user_idx

    // menuDetail
    REQUEST_MENU_DETAIL: 'http://api.plating.co.kr/menu_detail',    // menu_idx
    REQUEST_REVIEW_LIST: 'http://api.plating.co.kr/review/view_more',   // menu_idx

    // address
    REQUEST_MY_ADDRESS_LIST: 'http://api.plating.co.kr/user/get_address_list?', // user_idx
    REQUEST_SEARCHED_ADDRESS_LIST: 'http://address.plating.co.kr?',  // text
    SUBMIT_IN_USE_ADDRESS: 'http://api.plating.co.kr/user/update_address?', // idx, user_idx, mode
    SUBMIT_UPDATE_ADDRESS: 'http://api.plating.co.kr/update_info?', // user_idx, address, address_detail, delivery_available, lat, lon

    // refer
    REQUEST_GET_USER_CODE: 'http://api.plating.co.kr/user/user_code?',  // user_idx
    REQUEST_GET_POLICY_REFER_POINT: 'http://api.plating.co.kr/policy/policy_refer_point',

    // chefDetail
    REQUEST_CHEF_DETAIL: 'http://api.plating.co.kr/chef_detail?',   // chef_idx

    // review
    REQUEST_WRITE_REVIEW_LIST: 'http://api.plating.co.kr/review/written_by_user?',  // order_idx

    // order
    REQUEST_MY_ORDER_LIST: 'http://api.plating.co.kr/order/history?',   // user_idx

    // orderDetail
    REQUEST_MY_ORDER_DETAIL: 'http://api.plating.co.kr/order/detail?',  // order_idx

    // coupon
    REQUEST_MY_COUPON_LIST: 'http://api.plating.co.kr/coupon/my_coupon?',   // user_idx
    REQUEST_COUPON_AVAILABLE: 'http://api.plating.co.kr/coupon/coupon_available?',   // user_idx POST
    
    // cart
    REQUEST_CART_INFO: 'http://api.plating.co.kr/cart_info?', // user_idx
    SUBMIT_UPDATE_MOBILE: 'http://api.plating.co.kr/update_info?', // user_idx, phone_no
    SUBMIT_PLACE_ORDER: 'http://api.plating.co.kr/place_order?',   // user_idx, time_slot, menu_d_idx, order_amount, credit_used, point, total_price, pay_method, coupon_idx, include_cutlery
    SUBMIT_PLACE_ORDER_TEST: 'http://api.plating.co.kr/test/place_order_test?',

    // sidedrawer
    REQUEST_USER_POINT: 'http://api.plating.co.kr/promo/point?',

    // customerService
    REQUEST_FAQ_LIST: 'http://api.plating.co.kr/policy/FAQ',

    /*
     *---------------------
     * NOT YET
     *---------------------
     */
    REQUEST_APP_UPDATE_AVAILABLE: 'http://api.plating.co.kr/check_app_update_available', //version_code, build, user_agent
    REQUEST_DIALOG: 'http://api.plating.co.kr/dialog/get_dialog',
    

    /*
     * SUBMIT REQUEST
     */
    SUBMIT_WRITE_REVIEW: 'http://api.plating.co.kr/submit_review',  // order_idx, order_d_idx, rating, comment
    
    
};

module.exports = RequestURL;

