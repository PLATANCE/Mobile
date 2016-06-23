'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Font, normalize } from '../../const/Font';
import Color from '../../const/Color';

export default class DeliveryInfoDeliveryType extends Component {
  props: {
    canImmediateDelivery: boolean;
    isImmediateDeliveryChecked: boolean;
  };

  render() {
    const {
      canImmediateDelivery,
      isImmediateDeliveryChecked,
      onSetDeliveryTypeCheck,
    } = this.props;

    const checkedStyle = (isImmediateDeliveryChecked) ? styles.checkedBtnStyle : styles.unCheckedBtnStyle;
    const checkedTextStyle = (isImmediateDeliveryChecked) ? Font.DEFAULT_FONT_WHITE : Font.DEFAULT_FONT_ORANGE;
    const checkedImage = (isImmediateDeliveryChecked) ? 
      <Image style={[styles.iconInCheckBtn, { marginRight: normalize(5) }]} 
        source={require('../img/thunder_icon.png')}
        resizeMode={'contain'}/>
      :
      false;
    const unCheckedStyle = (isImmediateDeliveryChecked) ? styles.unCheckedBtnStyle : styles.checkedBtnStyle;
    const unCheckedTextStyle = (isImmediateDeliveryChecked) ? Font.DEFAULT_FONT_ORANGE : Font.DEFAULT_FONT_WHITE;
    const unCheckedImage = (isImmediateDeliveryChecked) ? 
      false
      :
      <Image style={[styles.iconInCheckBtn, { marginRight: normalize(5) }]} 
        source={require('../img/clock_icon.png')}
        resizeMode={'contain'}/>;

    if(canImmediateDelivery) {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.checkBtn, { marginRight: normalize(2) }, checkedStyle]}
            onPress={() => onSetDeliveryTypeCheck(!isImmediateDeliveryChecked)}
          >
            {checkedImage}
            <Text style={checkedTextStyle}>즉시 배달</Text>
          
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.checkBtn, { marginLeft: normalize(2) }, unCheckedStyle]}
            onPress={() => onSetDeliveryTypeCheck(!isImmediateDeliveryChecked)}
          >
            {unCheckedImage}
            <Text style={unCheckedTextStyle}>예약 배달</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.checkBtn, { marginRight: normalize(2) }]}

          >
            <Text style={Font.BLUR_FONT_ORANGE}>즉시 배달</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.checkBtn, { marginLeft: normalize(2), backgroundColor: Color.PRIMARY_ORANGE }]}
          >
            <Image style={[styles.iconInCheckBtn, { marginRight: normalize(5) }]} 
              source={require('../img/clock_icon.png')}
              resizeMode={'contain'}/>
            <Text style={Font.DEFAULT_FONT_WHITE}>예약 배달</Text>
          </TouchableOpacity>
        </View>
      );
    }
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
