'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Font, normalize } from '../../const/Font';
import Color from '../../const/Color';

export default class DeliveryInfoPaymentType extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    const {
      selectedPayMethod,
      onSelectPayMethod,
    } = this.props;

    const checkedStyle = (selectedPayMethod === 1) ? styles.checkedBtnStyle : styles.unCheckedBtnStyle;
    const checkedTextStyle = (selectedPayMethod === 1) ? Font.DEFAULT_FONT_WHITE : Font.DEFAULT_FONT_ORANGE;
    const checkedImage = (selectedPayMethod === 1) ? 
      <Image style={[styles.iconInCheckBtn, { marginRight: normalize(5) }]} 
        source={require('../img/thunder_icon.png')}
        resizeMode={'contain'}/>
      :
      false;
    const unCheckedStyle = (selectedPayMethod === 1) ? styles.unCheckedBtnStyle : styles.checkedBtnStyle;
    const unCheckedTextStyle = (selectedPayMethod === 1) ? Font.DEFAULT_FONT_ORANGE : Font.DEFAULT_FONT_WHITE;
    const unCheckedImage = (selectedPayMethod === 1) ? 
      false
      :
      <Image style={[styles.iconInCheckBtn, { marginRight: normalize(5) }]} 
        source={require('../img/money_icon.png')}
        resizeMode={'contain'}/>;

    
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.checkBtn, { marginRight: normalize(2) }, checkedStyle]}
          onPress={() => onSelectPayMethod(1)}
        >
          {checkedImage}
          <Text style={checkedTextStyle}>즉시 결제</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.checkBtn, { marginLeft: normalize(2) }, unCheckedStyle]}
          onPress={() => onSelectPayMethod(2)}
        >
          {unCheckedImage}
          <Text style={unCheckedTextStyle}>현장 결제</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: normalize(16),
  },
  checkBtn: {
    flex: 1,
    height: 26,
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.PRIMARY_ORANGE_BLUR,
    flexDirection: 'row',
  },
  iconInCheckBtn: {
    width: 15,
    height: 15,
  },
  checkedBtnStyle: {
    backgroundColor: Color.PRIMARY_ORANGE,
  },
  unCheckedBtnStyle: {
    backgroundColor: 'white',
  },
});
