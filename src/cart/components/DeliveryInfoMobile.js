'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Font, normalize } from '../../const/Font';
import Const from '../../const/Const';

export default class DeliveryInfoMobile extends Component {
  props: {
    mobile: string;
    couponIdxWillUse: number;
  };
  
  render() {
    const {
      mobile,
      couponIdxWillUse,
    } = this.props;
    
    const couponIdx = couponIdxWillUse;

    if(mobile === Const.CART_MOBILE_INPUT_MESSAGE) {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={ () => Actions.InputMobilePage({couponIdx: couponIdx}) }
        >
          <View style={styles.container}>
            <Text style={Font.DEFAULT_FONT_BLACK}>내 연락처</Text>
            <Text style={[styles.data, Font.DEFAULT_FONT_ORANGE, { paddingRight: 5 }]}>{Const.CART_MOBILE_NEW_INPUT_MESSAGE}</Text>
            <Image style={styles.iconDetailImage}
              source={require('../../commonComponent/img/icon_input.png')} 
            />
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={Font.DEFAULT_FONT_BLACK}>내 연락처</Text>
          <Text style={[styles.data, Font.DEFAULT_FONT_BLACK, { paddingRight: 15 }]}>{mobile}</Text>
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
  data: {
    flex: 1,
    textAlign: 'right',
  },
  iconDetailImage: {
    width: 10,
    height: 10,
  }
});
