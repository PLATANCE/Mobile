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
  Image,
  Alert,
} from 'react-native';
import {
  fetchCartInfo,
} from '../app/actions/CartInfoActions';
import {
  setCardNumber,
  setExpiry,
  setBirth,
  initialBirth,
  setPasswordPre2Digit,
  setAgreed,
  getCardInfo,
} from '../app/actions/CardActions';
import { Font, normalize } from '../const/Font';
import Color from '../const/Color';
import PersonalBirthView from './components/PersonalBirthView';
import CompanyBirthView from './components/CompanyBirthView';
import userInfo from '../util/userInfo';


export default class IamPortAddCardPage extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  updateKindOfCard(selectedIndex) {
    this.setState({
      selectedIndex
    });
    this.props.dispatch(initialBirth());
  }

  sendDataToServer() {
    const {
      cardInfo,
    } = this.props;
    if(!this.isEnableRegist(cardInfo)) {
      Alert.alert(
        '알림',
        '카드 정보를 모두 입력해주세요.',
      );
      return false;
    }
    const {
      cardNumber,
      expiry,
      birth,
      passwordPre2Digit,
      isAgreed,
    } = cardInfo;

    let cardNumberParam = '';
    let expiryParam = '';
    let birthParam = '';

    for(let index in cardNumber) {
      cardNumberParam += cardNumber[index] + '-';
    }
    cardNumberParam = cardNumberParam.substring(0, cardNumberParam.length - 1);
    expiryParam = expiry[1] + '-' + expiry[0];

    for(let index in birth) {
      birthParam += birth[index];
    }

    const param = {
      cardNumber: cardNumberParam,
      expiry: expiryParam,
      birth: birthParam,
      passwordPre2Digit: passwordPre2Digit,
      userIdx: userInfo.idx,
    };

    console.log(param);
    /*
    fetch(RequestURL.CREATE_BILL_KEY, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    })
    .then((response) => response.json())
    .then((responseData) => {
      const code = responseData.code;
      const status = responseData.status;
      const message = responseData.message;
    }).catch((error) => {
      console.warn(error);
    });
    */
  }

  isEnableRegist(cardInfo) {
    console.log(cardInfo);
    const {
      cardNumber,
      expiry,
      birth,
      passwordPre2Digit,
      isAgreed,
    } = cardInfo;
    const {
      selectedIndex
    } = this.state;

    // check cardNumber
    if(cardNumber.length != 4) {
      return false;
    }
    if(passwordPre2Digit.length != 2) {
      return false;
    }
    if(expiry.length != 2) {
      return false;
    }
    if(selectedIndex) {
      if(birth.length != 3) {
        return false;
      }
    } else {
      if(birth.length != 1) {
        return false;
      }
    }
    if(!isAgreed) {
      return isAgreed;
    }
    return true;
  }

  render() {
    const {
      selectedIndex,
    } = this.state;
    const {
      dispatch,
      cardInfo,
    } = this.props;
    const {
      isAgreed,
    } = cardInfo;

    //console.log(cardInfo);
    const view = selectedIndex ? 
      <CompanyBirthView setBirth={ (birth, index) => this.props.dispatch(setBirth(birth, index)) } />
      : 
      <PersonalBirthView setBirth={ (birth, index) => this.props.dispatch(setBirth(birth, index)) } />;

    const checkedCardStyle = selectedIndex ? styles.unCheckedCard : styles.checkedCard;
    const unCheckedCardStyle = selectedIndex ? styles.checkedCard : styles.unCheckedCard;
    const checkedCardTextStyle = selectedIndex ? Font.DEFAULT_FONT_ORANGE : Font.DEFAULT_FONT_WHITE;
    const unCheckedCardTextStyle = selectedIndex ? Font.DEFAULT_FONT_WHITE : Font.DEFAULT_FONT_ORANGE;

    const style = isAgreed ? 
      { backgroundColor: Color.PRIMARY_ORANGE }
      :
      { borderColor: Color.PRIMARY_ORANGE, borderWidth: 1 };

    const checkView = isAgreed ? 
      <Image style={{width: 10, height: 10}} source={require('../commonComponent/img/cart_white.png')} />
      :
      false;

    const buttonStyle = this.isEnableRegist(cardInfo) ? styles.enableBtn : styles.disableBtn;

    return (
      <View style={styles.container}>
        <View style={styles.row} >
          <Text style={Font.DEFAULT_FONT_BLACK}>카드번호</Text>
          <View style={styles.rowRight}>
            <TextInput
              ref='cardNumberFirst'
              style={styles.default}
              maxLength={4}
              autoFocus={true}
              keyboardType={'number-pad'}
              onChangeText={ (text) => { 
                  if(text.length == 4) {
                    this.refs.cardNumberSecond.focus();
                    dispatch(setCardNumber(text, 0));
                  }
                }
              }
            />
            <TextInput
              style={[styles.default, { marginLeft: normalize(5) }]}
              ref='cardNumberSecond'
              maxLength={4}
              keyboardType={'number-pad'}
              onChangeText={ (text) => {
                  if (text.length === 4) { 
                    this.refs.cardNumberThird.focus();
                    dispatch(setCardNumber(text, 1));
                  }
                }
              }
            />
            <TextInput
              style={[styles.default, { marginLeft: normalize(5) }]}
              ref='cardNumberThird'  
              maxLength={4}
              keyboardType={'number-pad'}
              onChangeText={ (text) => {
                  if (text.length === 4) { 
                    this.refs.cardNumberFourth.focus();
                    dispatch(setCardNumber(text, 2));
                  }
                }
              }
            />
            <TextInput
              style={[styles.default, { marginLeft: normalize(5) }]}
              ref='cardNumberFourth'
              maxLength={4}
              keyboardType={'number-pad'}
              onChangeText={ (text) => {
                  if (text.length === 4) { 
                    this.refs.passWord.focus();
                    dispatch(setCardNumber(text, 3));
                  }
                }
              }
            />
          </View>
        </View>
        <View style={styles.row} >
          <Text style={Font.DEFAULT_FONT_BLACK}>비밀번호</Text>
          <View style={styles.rowRight}>
            <TextInput
              ref='passWord'
              style={[styles.default, { width: normalize(37) }]}
              maxLength={2}
              keyboardType={'number-pad'}
              onChangeText={ (text) => {
                  if (text.length == 2) {
                    this.refs.monthExpiry.focus();
                    dispatch(setPasswordPre2Digit(text));
                  }
                }
              }
            />
            <Text style={[Font.DEFAULT_FONT_BLACK, { marginLeft: normalize(5) }]}>**</Text>
          </View>
        </View>
        <View style={styles.row} >
          <Text style={Font.DEFAULT_FONT_BLACK}>유효기간(mm/yyyy)</Text>
          <View style={styles.rowRight}>
            <TextInput
              ref='monthExpiry'
              style={[styles.default, { width: normalize(39) }]}
              maxLength={2}
              placeholder={'mm'}
              keyboardType={'number-pad'}
              onChangeText={ (text) => {
                  if (text.length == 2) {
                    this.refs.yearExpiry.focus();
                    dispatch(setExpiry(text, 0));
                  }
                }
              }
              
            />
            <Text style={[Font.DEFAULT_FONT_BLACK, { marginLeft: normalize(5), marginRight: normalize(5) }]}>/</Text>
            <TextInput
              ref='yearExpiry'
              style={styles.default}
              maxLength={4}
              placeholder={'yyyy'}
              keyboardType={'number-pad'}
              onChangeText={ (text) => {
                  if (text.length == 4) {
                    dispatch(setExpiry(text, 1));
                  }             
                }
              }
              
            />
          </View>
        </View>
        <View style={[styles.row, { marginTop: normalize(20) }]} >
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.btn, checkedCardStyle, { marginRight: normalize(2) }]}
            onPress={ () => this.updateKindOfCard(0)}
          >
            <Text style={checkedCardTextStyle}>개인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.btn, unCheckedCardStyle, { marginLeft: normalize(2) }]}
            onPress={ () => this.updateKindOfCard(1)}
          >
            <Text style={unCheckedCardTextStyle}>법인</Text>
          </TouchableOpacity>
        </View>
        
        {view}

        <TouchableOpacity
          style={[styles.row, { marginTop: normalize(20)}]}
          activeOpacity={0.8}
          onPress={ () => dispatch(setAgreed(!isAgreed)) }>
          <Text style={Font.DEFAULT_FONT_BLACK}>아래 약관 내용에 모두 동의합니다.</Text>
          <View style={styles.rowRight}>
            <View style={[styles.checkBox, style]}>
              {checkView}
            </View>
          </View>
        </TouchableOpacity>

        <View style={[styles.row, { backgroundColor: Color.PRIMARY_BACKGROUND }]}>
          <Text style={[Font.DEFAULT_FONT_ORANGE_UNDERLINE, { fontSize: normalize(12) }]}>정기과금 이용약관</Text>
        </View>

        <View style={styles.registBtnArea}>
          <TouchableOpacity
            underlayColor={'transparent'}
            onPress={() => this.sendDataToServer()}
          >
            <View style={[styles.registBtn, buttonStyle]}>
              <Text style={styles.btnText}>등록하기</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const SIZE = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    paddingLeft: normalize(16),
    paddingRight: normalize(16),
    height: normalize(50),
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  rowRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  segment: {
    flex: 1,
  },
  default: {
    height: 26,
    width: normalize(50),
    borderWidth: 1,
    borderColor: Color.PRIMARY_BLACK,
    borderRadius: 3,
    overflow: 'hidden',
    fontSize: normalize(16),
    padding: 4,
    textAlign: 'center',
    color: Color.PRIMARY_BLACK,
  },
  checkBox: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registBtnArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  btn: {
    flex: 1,
    height: 26,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.PRIMARY_ORANGE,
  },
  registBtn: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(20),
    marginLeft: normalize(16),
    marginRight: normalize(16),
  },
  btnText: {
    color: 'white',
    fontSize: normalize(17),
    fontWeight: 'bold',
  },
  checkedCard: {
    backgroundColor: Color.PRIMARY_ORANGE,
  },
  unCheckedCard: {
    backgroundColor: 'white',
  },
  disableBtn: {
    backgroundColor: Color.PRIMARY_GRAY_BUTTON,
    borderColor: Color.PRIMARY_GRAY_BUTTON,
  },
  enableBtn: {
    backgroundColor: Color.PRIMARY_ORANGE,
    borderColor: Color.PRIMARY_ORANGE,
  },
});
