import React, {
    Component,
    PropTypes,
} from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, AlertIOS, Alert, PixelRatio } from 'react-native';
import { DefaultRenderer } from 'react-native-router-flux';
import Drawer from 'react-native-drawer';
import Color from '../const/Color';
import Const from '../const/Const';
import { Font, normalize } from '../const/Font';
import { Actions } from 'react-native-router-flux';
import RequestURL from '../const/RequestURL';
import userInfo from '../util/userInfo';
import Mixpanel from '../util/mixpanel';

const contextTypes = {
  drawer: React.PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
        flex: 1,
        justifyContent: 'center',
    },
    headerBox: {
        height: normalize(180),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.PRIMARY_ORANGE,
    },
    imageLogo: {
        height: normalize(20),
        width: normalize(170),
        marginTop: normalize(32),
        resizeMode: 'contain',
    },
    pointText: {
        marginTop: normalize(30),
    },
    actionPoint: {
        height: normalize(40),
        width: normalize(170),
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: normalize(5),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: normalize(10),
        marginBottom: normalize(10),
        marginLeft: normalize(16),
        marginRight: normalize(16),
    },
    drawerRowBox: {
        flex: 1,
        marginLeft: normalize(20),
    },
    drawerRow: {
        height: normalize(60),
        borderBottomWidth: 0.2,
        borderColor: Color.PRIMARY_GRAY,
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: normalize(10),
    },
    drawerImage: {
        width: normalize(20),
        height: normalize(20),
    },
    footerBox: {
        height: normalize(100),
        backgroundColor: Color.PRIMARY_ORANGE,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: normalize(20),
    },
    footerImage: {
        width: normalize(50),
        height: normalize(50),
    },
    footerTextBox: {
        justifyContent: 'center',
        marginLeft: normalize(10),
    },
});







const SideView = (props, context) => {
  const drawer = context.drawer;
  const point = props.point;
  const cntCoupon = props.cntCoupon;
  const cntCouponText = (cntCoupon > 0) ? '(' + cntCoupon + ')' : '';


  const rowInfo = [
    { text: "내 쿠폰함 ", cnt: cntCouponText, image: require('./img/icon_left_coupon.png'), action: () => { drawer.close(); Actions.MyCouponPage({ disable: false }), Mixpanel.track('View My Coupons') } },
    { text: "주문 내역", image: require('./img/icon_left_order.png'), action: () => { drawer.close(); Actions.MyOrderPage(); Mixpanel.track('View Order History') } },
    { text: "고객 센터", image: require('./img/icon_left_headset.png'), action: () => { drawer.close(); Actions.CSMainPage(); } },
  ];

  var drawerRow = [];
  rowInfo.forEach(row => {
    const text = row.text;
    const image = row.image;
    const action = row.action;
    const cnt = row.cnt;

  drawerRow.push(<TouchableHighlight key={text} onPress={action} underlayColor={'transparent'}>
      <View style={styles.drawerRow}>
        <Image style={styles.drawerImage}
          source={image}/>
        <Text style={[Font.DEFAULT_FONT_BLACK, { marginLeft: 10 }]}>{text}
          <Text style={Font.DEFAULT_FONT_ORANGE}>{cnt}</Text>
        </Text>
      </View>
    </TouchableHighlight>);
  });

  function commaPrice(price) {
    price = String(price);
    return price.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  }

  function openCodeDialog() {
    AlertIOS.prompt(
      '코드 등록',
      '등록하신 코드는 포인트 혹은 쿠폰으로 전환되어 결제할 때 사용됩니다.',
      [
        { text: '취소', onPress: () => Mixpanel.trackWithProperties('Enter Promo Code', { entered: false }) },
        { text: '등록', onPress: (code) => submitCode(code) },
      ]
    );
  }

  function submitCode(code) {
  Mixpanel.trackWithProperties('Enter Promo Code', { entered: true, code: code });
  const param = 'user_idx=' + userInfo.idx + '&code=' + code;

  fetch(RequestURL.SUBMIT_POINT_REGISTER + param)
  .then((response) => response.json())
  .then((responseData) => {
    if(responseData.isValidCode) {
      Alert.alert(
        responseData.title,
        responseData.message,
        [
          { text: '확인', onPress: () => props.fetchUserPoint() }
        ]
      );
    } else {
      Alert.alert(
        responseData.title,
        responseData.message,
      [
        { text: '확인' }
      ]
      );
    }
    })
  .catch((error) => {
    console.warn(error);
  })
}
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Image style={styles.imageLogo}
          source={require('./img/plating_logo.png')}/>
        <Text style={[styles.pointText, Font.DEFAULT_FONT_WHITE]}>내 포인트:
          <Text style={{fontSize: normalize(20)}}> {commaPrice(point)}p</Text>
        </Text>
        <TouchableHighlight
          onPress={ () => openCodeDialog() }
          underlayColor={'transparent'}
        >
          <View style={styles.actionPoint}>
            <Text style={[{margin: normalize(10)}, Font.DEFAULT_FONT_WHITE ]}>+ 포인트·쿠폰코드 등록</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.drawerRowBox} >
        {drawerRow}
      </View>
      <TouchableHighlight
        onPress={ () => { drawer.close(); Actions.ReferPage(); Mixpanel.track } }
        underlayColor={'transparent'}
      >
        <View style={styles.footerBox}>
          <Image style={styles.footerImage}
            source={require('./img/invite_friend.png')} />
          <View style={styles.footerTextBox}>
            <Text style={[Font.DEFAULT_FONT_WHITE, { textDecorationLine: 'underline', fontSize: normalize(20) }]}>친구 초대하기</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

SideView.contextTypes = contextTypes;

export default SideView;