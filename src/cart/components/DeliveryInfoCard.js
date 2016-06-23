'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Font, normalize } from '../../const/Font';
import Const from '../../const/Const';

export default class DeliveryInfoCard extends Component {
  props: {
    cardNumber: string;
  };
  
  render() {
    const {
      cardNumber,
    } = this.props;

    const textStyle = cardNumber === Const.CART_CARD_INPUT_MESSAGE ? Font.DEFAULT_FONT_ORANGE : Font.DEFAULT_FONT_BLACK
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={ () => Actions.AddCardPage() }
      >
        <View style={styles.container}>
          <Text style={Font.DEFAULT_FONT_BLACK}>신용/체크카드</Text>
          <Text style={[styles.data, textStyle]}>{cardNumber}</Text>
          <Image style={styles.iconDetailImage}
            source={require('../../commonComponent/img/icon_input.png')} 
          />
        </View>
      </TouchableOpacity>
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
