'use strict';
import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import Color from '../const/Color';
import { Font, normalize } from '../const/Font';
import Const from '../const/Const';

export default class ChangableAddCartButton extends Component {
  static propTypes = {
    cart: PropTypes.object.isRequired,
    menuIdx: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  };

  render() {
    const {
      cart,
      menuIdx,
      onAddItemToCart,
      onDecreaseItemFromCart,
      style,
      stock,
    } = this.props;

    let shouldChanged = false;
    let menuAmountInCart = 0;
    Object.keys(cart).map((idx) => {
      if(idx == menuIdx) {
        shouldChanged = true;
        menuAmountInCart = cart[idx].amount;
      }
    });

    if(shouldChanged) {
      return(
        <View style={[styles.container, style]}>
          <TouchableOpacity
            style={styles.changedButtonArea}
            onPress={() => onDecreaseItemFromCart()}>
            <View style={styles.changedButton}>
              <Text style={Font.DEFAULT_FONT_WHITE}>-</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.amountTextView}>
            <Text style={[Font.DEFAULT_FONT_BLACK, { fontSize: normalize(16) }]}>{menuAmountInCart}</Text>
          </View>
          <TouchableOpacity
            style={styles.changedButtonArea}
            onPress={() => onAddItemToCart()}>
            <View style={styles.changedButton}>
              <Text style={Font.DEFAULT_FONT_WHITE}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
    if(stock > 0) {
      return (
        <View style={[styles.container, style]}>
          <TouchableOpacity
            onPress={() => onAddItemToCart()}
          >
            <View style={styles.button}>
              <Text style={Font.DEFAULT_FONT_WHITE}>담기</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity
          activeOpacity={1}
        >
        <View style={[styles.button, { backgroundColor: Color.PRIMARY_GRAY_BUTTON, borderColor: Color.PRIMARY_GRAY_BUTTON }]}>
          <Text style={Font.DEFAULT_FONT_WHITE}>담기</Text>
        </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  changedButtonArea: {
    width: normalize(35),
    height: normalize(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  changedButton: {
    width: normalize(30),
    height: normalize(30),
    backgroundColor: Color.PRIMARY_ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Color.PRIMARY_ORANGE,
    overflow: 'hidden',
  },
  button: {
    width: normalize(60),
    height: normalize(35),
    backgroundColor: Color.PRIMARY_ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Color.PRIMARY_ORANGE,
    overflow: 'hidden',
  },
  amountTextView: {
    width: normalize(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: normalize(10),
    height: normalize(10),
  },
});
