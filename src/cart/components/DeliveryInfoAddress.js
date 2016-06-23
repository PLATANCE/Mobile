'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Font, normalize } from '../../const/Font';
import Const from '../../const/Const';

export default class DeliveryInfoAddress extends Component {
  props: {
    address: string;
    addressDetail: string;
  };

  render() {
    const {
      address,
      addressDetail,
    } = this.props;

    const addressInfo = (address === Const.CART_ADDRESS_INPUT_MESSAGE) ?
      Const.CART_ADDRESS_INPUT_MESSAGE
      :
      `${address} ${addressDetail}`;
    const textStyle = (address === Const.CART_ADDRESS_INPUT_MESSAGE) ? Font.DEFAULT_FONT_ORANGE : Font.DEFAULT_FONT_BLACK;

    if(address === Const.CART_ADDRESS_INPUT_MESSAGE) {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => Actions.AddAddressPage()}
        >
          <View style={styles.container}>
            <Text style={Font.DEFAULT_FONT_BLACK}>배달 주소</Text>
            <Text style={[styles.data, textStyle]}>{addressInfo}</Text>
            <Image style={styles.iconDetailImage}
              source={require('../../commonComponent/img/icon_input.png')}
            />
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => Actions.MyAddressPage()}
        >
          <View style={styles.container}>
            <Text style={Font.DEFAULT_FONT_BLACK}>배달 주소</Text>
            <Text style={[styles.data, textStyle]}>{addressInfo}</Text>
            <Image style={styles.iconDetailImage}
              source={require('../../commonComponent/img/icon_input.png')}
            />
          </View>
        </TouchableOpacity>
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
    paddingRight: 5,
  },
  iconDetailImage: {
    width: 10,
    height: 10,
  }
});
