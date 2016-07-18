'use strict';
import React, {
  Component,
  PropTypes,
} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Color from '../../const/Color';
import Const from '../../const/Const';
import { Font, normalize } from '../../const/Font';
import MediaURL from '../../const/MediaURL';
import MenuPriceText from '../../commonComponent/MenuPriceText';

export default class CartItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const {
      item,
      onAddItemToCart,
      onDecreaseItemFromCart,
    } = this.props;

    const {
      menuIdx,
      menuDIdx,
      menuNameKor,
      menuNameEng,
      price,
      altPrice,
      imageUrlMenu,
      amount,
    } = item;

    const imageURL = MediaURL.MENU_URL + imageUrlMenu;

    return (
      <View style={styles.container}>
        <Image style={styles.menuImage}
          source={{ uri: imageURL }} />
        <View style={styles.menuInfoBox}>
          <Text style={Font.DEFAULT_FONT_BLACK_BOLD}>{menuNameKor}</Text>
          <Text style={[Font.DEFAULT_FONT_BLACK, {flex: 1}]}>{menuNameEng}</Text>
          <View style={styles.priceBox}>
            <MenuPriceText originalPrice={price} sellingPrice={altPrice} align={{textAlign: 'left'}}/>
            <View style={styles.setAmountBox}>
              <TouchableOpacity
                onPress={ () => onDecreaseItemFromCart(menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng) }  
              >
                <View style={styles.button}>
                  <Text style={Font.DEFAULT_FONT_WHITE}>-</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.amountTextView}>
                <Text style={Font.DEFAULT_FONT_BLACK}>{amount}</Text>
              </View>
              <TouchableOpacity
                onPress={ () => onAddItemToCart(menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng, true) }  
              >
                <View style={styles.button}>
                  <Text style={Font.DEFAULT_FONT_WHITE}>+</Text>
                </View>
              </TouchableOpacity>
            {/*
              <TouchableHighlight underlayColor={'transparent'}
                onPress={ () => onDecreaseItemFromCart(menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng) }  
              >
                <Image style={styles.iconImage}
                  source={require('../img/icon_minus.png')}/>
              </TouchableHighlight>
              <Text style={[styles.amountText, Font.DEFAULT_FONT_BLACK]}>{amount}</Text>
              <TouchableHighlight underlayColor={'transparent'}
                onPress={ () => onAddItemToCart(menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng, true) }  
              >
                <Image style={styles.iconImage}
                  source={require('../img/icon_plus.png')}/>
              </TouchableHighlight>
              */}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const WIDTH = 25;

let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: normalize(12),
    backgroundColor: 'white',
    flex: 1,
  },
  menuImage: {
    width: normalize(80),
    height: normalize(80),
    resizeMode: 'cover',
  },
  menuInfoBox: {
    flex: 1,
    marginLeft: normalize(10),
  },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  setAmountBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    width: WIDTH,
    height: WIDTH,
    backgroundColor: Color.PRIMARY_ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Color.PRIMARY_ORANGE,
    overflow: 'hidden',
  },
  amountTextView: {
    width: 40,
    height: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
