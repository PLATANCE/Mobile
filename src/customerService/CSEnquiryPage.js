import React, {
  View,
  ListView,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  NativeModules
} from 'react-native';
import Communications from 'react-native-communications';

import Color from '../const/Color';
import Const from '../const/Const';
import Mixpanel from '../util/mixpanel';

export default class CSEnquiryPage extends React.Component {
  chatKakao() {
    const KakaoManager = NativeModules.KakaoManager;
    KakaoManager.openKakaoTalkToCustomerService();
  }
  contactPhone() {
    Communications.phonecall('070-7777-6114', true);
  }
  sendMail() {
    Communications.email(['contact@plating.co.kr'], null, null, '문의하기', '');
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableHighlight 
            onPress={ () => { this.chatKakao(), Mixpanel.trackWithProperties('Contact Plating', { via: 'Kakao' }) } } 
            underlayColor={'transparent'}
            >
            <View style={styles.row}>
              <Image style={styles.img} source={require('./img/enquiry_kakao.png')} />
            </View>
          </TouchableHighlight>
          <TouchableHighlight 
            onPress={ () => { this.contactPhone(), Mixpanel.trackWithProperties('Contact Plating', { via: 'Call' }) } } 
            underlayColor={'transparent'}
          >
            <View style={styles.row}>
              <Image style={styles.img} source={require('./img/enquiry_phone.png')} />
            </View>
          </TouchableHighlight>
          <TouchableHighlight 
            onPress={ () => { this.sendMail(), Mixpanel.trackWithProperties('Contact Plating', { via: 'Email' }) } } 
            underlayColor={'transparent'}
          >
            <View style={styles.row}>
              <Image style={styles.img} source={require('./img/enquiry_mail.png')} />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.PRIMARY_BACKGROUND,
    marginTop: Const.MARGIN_TOP,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    marginTop: 10,
    height: 70,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBox: {
    flex: 2,
    alignItems: 'flex-end',
    marginRight: 30,
  },
  img: {
    width: 250,
    height: 25,
    resizeMode: 'contain',
  },
  textBox: {
    flex: 3,
  },
  text: {
    fontSize: 17,
    color: Color.PRIMARY_BLACK,
  },
});
