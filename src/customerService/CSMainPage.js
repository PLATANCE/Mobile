'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { 
  View,
  ScrollView,
  Text, 
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  NativeModules,
  Alert,
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import Color from '../const/Color';
import Const from '../const/Const';
import {
  Font,
  normalize
} from '../const/Font';
import Mixpanel from '../util/mixpanel';
import Communications from 'react-native-communications';


export default class CSMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewDeliveryArea: props.viewDeliveryArea,
      viewFAQ: props.viewFAQ,
      viewContact: props.viewContact,
      viewTerms: props.viewTerms,
    }
  }
  componentWillUnmount() {
    Mixpanel.trackWithProperties(
      '(Screen) Support',
      {
        viewDeliveryArea: this.state.viewDeliveryArea,
        viewFAQ: this.state.viewFAQ,
        viewContact: this.state.viewContact,
        viewTerms: this.state.viewTerms,
      }
    );
  }
  chatKakao() {
    const KakaoManager = NativeModules.KakaoManager;
    KakaoManager.openKakaoTalkToCustomerService();
  }
  contactPhone() {
    Alert.alert(
      '알림',
      '플레이팅 고객센터 운영 시간은 오전 10시 30분 ~ 오후 9시 까지 입니다 :)',
      [
        { text: '취소', style: 'cancel'},
        { text: '전화걸기', onPress: () => Communications.phonecall('070-7777-6114', false) }
      ]
    )
  }
  sendMail() {
    Communications.email(['contact@plating.co.kr'], null, null, '문의하기', '');
  }
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.content} >
            <TouchableHighlight 
              onPress={ () => { Actions.CSAddressCoveragePage(); this.setState({ viewDeliveryArea: true, }) } } 
              underlayColor={'transparent'}
            >
              <View style={styles.row} >
                <Text style={[styles.textBlack, Font.DEFAULT_FONT_BLACK]}>배달 가능 지역</Text>
                <Image style={styles.img}
                  source={require('../commonComponent/img/icon_input.png')}/>
              </View>
            </TouchableHighlight>
            <TouchableHighlight 
              onPress={ () => { Actions.CSFAQPage(); this.setState({ viewFAQ: true, }) } } 
              underlayColor={'transparent'}
            >
              <View style={styles.row} >
                <Text style={[styles.textBlack, Font.DEFAULT_FONT_BLACK]}>FAQ</Text>
                <Image style={styles.img}
                  source={require('../commonComponent/img/icon_input.png')}/>
              </View>
            </TouchableHighlight>
            <TouchableHighlight 
              onPress={ () => { Actions.CSPolicyPage(); this.setState({ viewTerms: true, }) } } 
              underlayColor={'transparent'}
            >
              <View style={styles.row} >
                <Text style={[styles.textBlack, Font.DEFAULT_FONT_BLACK]}>이용약관</Text>
                <Image style={styles.img}
                  source={require('../commonComponent/img/icon_input.png')}/>
              </View>
            </TouchableHighlight>
            <TouchableHighlight 
              onPress={ () => { Actions.PlatingPage(); this.setState({ viewTerms: true, }) } } 
              underlayColor={'transparent'}
            >
              <View style={styles.row} >
                <Text style={[styles.textBlack, Font.DEFAULT_FONT_BLACK]}>Plating 이란?</Text>
                <Image style={styles.img}
                  source={require('../commonComponent/img/icon_input.png')}/>
              </View>
            </TouchableHighlight>
            <View style={styles.buttonEnquiryBox} >
              <Text style={[Font.DEFAULT_FONT_BLACK, { fontSize: normalize(18), marginBottom: normalize(30) }]}>문의하기:</Text>
              <View style={styles.enquiryBox}>
                <TouchableOpacity
                  onPress={ () => { this.chatKakao(), Mixpanel.trackWithProperties('Contact Plating', { via: 'Kakao' }) } }
                >
                  <View style={styles.enquiryMethod}>
                    <Image
                      style={styles.enquiryImage}
                      source={require('./img/kakao_icon.png')} />
                    <Text style={Font.DEFAULT_FONT_BLACK}>카카오톡</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={ () => { this.contactPhone(), Mixpanel.trackWithProperties('Contact Plating', { via: 'Kakao' }) } }
                >
                  <View style={[styles.enquiryMethod, { marginLeft: normalize(40), marginRight: normalize(40) }]}>
                    <Image
                      style={styles.enquiryImage}
                      source={require('./img/call_icon.png')} />
                    <Text style={Font.DEFAULT_FONT_BLACK}>전화</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={ () => { this.sendMail(), Mixpanel.trackWithProperties('Contact Plating', { via: 'Kakao' }) } }
                >
                  <View style={styles.enquiryMethod}>
                    <Image
                      style={styles.enquiryImage}
                      source={require('./img/email_icon.png')} />
                    <Text style={Font.DEFAULT_FONT_BLACK}>메일</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      </View>
    );
  }
}

const WIDTH = normalize(54);

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  row: {
    marginBottom: 1,
    padding: normalize(16),
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(60),
    borderColor: Color.PRIMARY_GRAY,
    backgroundColor: 'white',
  },
  textBlack: {
    flex: 1,
  },
  img: {
    width: normalize(10),
    height: normalize(10),
  },
  buttonEnquiryBox: {
    flex: 1,
    backgroundColor: Color.PRIMARY_BACKGROUND,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  enquiryBox: {
    flexDirection: 'row',
    marginBottom: normalize(40),
  },
  enquiryImage: {
    width: WIDTH,
    height: WIDTH,
    marginBottom: normalize(10),
  },
  enquiryMethod: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});