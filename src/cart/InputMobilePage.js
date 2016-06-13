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
  Font, normalize
} from '../const/Font';
import Color from '../const/Color';
import RequestURL from '../const/RequestURL';
import userInfo from '../util/userInfo';

export default class InputMobilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      isBlocking: false,
    }
  }
  updateText(phoneNumber) {
    this.setState({
      phoneNumber,
    });
  }
  clearText() {
    this.refs.textinput.clear();
  }
  sendPhoneNumberToServer() {
    const isBlocking = this.state.isBlocking;
    console.log(isBlocking);
    if (isBlocking) {
      return;
    }
    
    this.setState({
      isBlocking: true,
    });
    const phoneNumber = this.state.phoneNumber;
    const couponIdx = this.props.couponIdx;
    const userIdx = userInfo.idx;
    const url = RequestURL.REQUEST_AUTH_NUMBER.replace('{userIdx}', userIdx)

    const param = {
      phoneNumber,
    };

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
      // isSent, message, isServerError
      console.log(responseData);
      const isSent = responseData.isSent;
      const isServerError = responseData.isServerError;
      const message = responseData.message;
      if(!isSent) {
        Alert.alert(
          '전송 오류',
          message,
          [
            { text: '확인', onPress: () => { this.clearText(); } },
            { text: '문의하기', onPress: () => { Actions.CSEnquiryPage(); } },
          ]
        );
      }
      if(isServerError) {
        Alert.alert(
          '서버 오류',
          message,
          [
            { text: '확인', onPress: () => { this.clearText(); } },
            { text: '문의하기', onPress: () => { Actions.CSEnquiryPage(); } },
          ]
        );
      }
      if(isSent && !isServerError) {
        const receivedPhoneNumber = responseData.phoneNumber
        Actions.MobileAuthPage({phoneNumber: receivedPhoneNumber, couponIdx});
      }
    })
    .catch((error)=> {
      Alert.alert(
        '서버 오류',
        '잠시 후 다시 시도해 주세요 :)'
      );
    })
    .then(() => {
      this.setState({
        isBlocking: false,
      });
      console.log(this.state.isBlocking);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.phoneBox}>
          <Text style={{color: 'gray'}}>+82</Text>
          <TextInput
            ref={"textinput"}
            style={[Font.DEFAULT_FONT_BLACK, styles.textInput]}
            placeholder={'번호 입력'}
            onChange={(event) => this.updateText(event.nativeEvent.text)}
            autoFocus={true}
            keyboardType={'number-pad'}
          />
        </View>
        <TouchableOpacity
          onPress={this.sendPhoneNumberToServer.bind(this)}
          pointerEvents={'none'}
        >
          <View style={styles.authbtn}>
            <Text style={Font.DEFAULT_FONT_WHITE_BOLD}>인증하기</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  phoneBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(30),
    marginLeft: normalize(16),
    marginRight: normalize(16),
  },
  textInput: {
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    flex: 1,
    fontSize: normalize(25),
    height: normalize(50),
    paddingLeft: normalize(10),
    marginLeft: normalize(16),
  },
  authbtn: {
    height: normalize(40),
    borderColor: Color.PRIMARY_ORANGE,
    backgroundColor: Color.PRIMARY_ORANGE,
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(20),
    marginLeft: normalize(16),
    marginRight: normalize(16),
  },
});
