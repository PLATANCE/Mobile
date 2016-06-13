'use strict';
import React, {
  Component,
  PropTypes,
} from 'react';
import { 
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  fetchCartInfo,
  clearCartInfo,
} from '../app/actions/CartInfoActions';
import {
  Font, normalize
} from '../const/Font';
import Color from '../const/Color';
import RequestURL from '../const/RequestURL';
import userInfo from '../util/userInfo';
import realm from '../util/realm';
import Mixpanel from '../util/mixpanel';

export default class MobileAuthPage extends Component {
  constructor(props) {
    super(props);
  }

  clearText() {
    this.refs.textinput.clear();
  }

  sendAuthNumberToServer(authNumber) {
    console.log(authNumber);
    const { 
      phoneNumber,
      couponIdx, 
    } = this.props;
    const param = {
      authNumber,
    };
    const userIdx = userInfo.idx;
    const url = RequestURL.VALIDATE_AUTH_NUMBER.replace('{userIdx}', userIdx);
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    })
    .then((response) => response.json())
    .then((responseData) => {
      // isSuccessful, message
      console.log(responseData);
      const isSuccessful = responseData.isSuccessful;
      const message = responseData.message;
      if(!isSuccessful) {
        this.refs.textinput.clear();
        Alert.alert(
          '인증 오류',
          message,
          [
            { text: '확인', onPress: () => { this.clearText(); } },
          ]
        );
      } else {
        if(!responseData.hasOwnProperty('switchUserIdx')) {
          Alert.alert(
            '인증 성공',
            message,
            [
              {
                text: '확인', onPress: () => { this.submitUserMobile(phoneNumber, couponIdx); }
              }
            ]
          );
        } else {
          const switchUserIdx = responseData.switchUserIdx;
          console.log(switchUserIdx);
          Alert.alert(
            '인증 성공(알려드립니다)',
            message,
            [
              {
                text: '확인', onPress: () => { this.switchUserIdx(switchUserIdx); }
              }
            ]
          );
        }
      }
    })
    .catch((error)=> {
      Alert.alert(
        '서버 오류',
        '잠시 후 다시 시도해 주세요 :)'
      );
    })
  }

  switchUserIdx(switchUserIdx) {
    realm.write(() => { userInfo.idx = parseInt(switchUserIdx); });
    this.props.dispatch(clearCartInfo());
    Actions.DailyMenuPage({type: 'reset'});
    Actions.CartPage();
  }

  submitUserMobile(phoneNumber, couponIdx) {
    Mixpanel.trackWithProperties('Enter Phone Number', { number: phoneNumber });
    const param = {
      user_idx: userInfo.idx,
      phone_no: phoneNumber,
    };

    fetch(RequestURL.SUBMIT_UPDATE_MOBILE, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      this.props.dispatch(fetchCartInfo(couponIdx));
      Actions.pop();
      Actions.pop();
    })
    .catch((error) => {
      console.warn(error);
    })
  }
  render() {
    const {
      phoneNumber
    } = this.props;
    console.log(phoneNumber);
    return (
      <View style={styles.container}>
        <Text style={[Font.DEFAULT_FONT_ORANGE, { fontSize: normalize(20) }]}>{phoneNumber}</Text>
        <Text style={[Font.DEFAULT_FONT_BLACK, { lineHeight: normalize(20) }]}>
          문자(SMS)로 받으신 인증코드를 입력해주세요 :
        </Text>
        <TextInput
          ref={"textinput"}
          style={[Font.DEFAULT_FONT_BLACK, styles.textInput]}
          autoFocus={true}
          autoCorrect={false}
          maxLength={4}
          keyboardType={'number-pad'}
          onChange={
            (event) => {
              const authNumber = event.nativeEvent.text;
              if(authNumber.length === 4) {
                this.sendAuthNumberToServer(authNumber);
              }
            }
          }
        />        
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: normalize(50),
  },
  textInput: {
    borderColor: 'white',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: normalize(40),
    width: normalize(100),
    marginTop: normalize(10),
    fontSize: normalize(30),
  },
});
