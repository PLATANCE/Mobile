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
} from 'react-native';

import Color from '../const/Color';
import { Font, normalize } from '../const/Font';
import Const from '../const/Const';

export default class AmountInCart extends Component {
  static propTypes = {
    amount: PropTypes.number.isRequired,
  };

  render() {
    const {
      amount,
      isEvent,
    } = this.props;

    const eventTag = isEvent ? 
      <Image style={{ width: normalize(80), height: normalize(60), marginRight: normalize(20), alignSelf: 'flex-end', resizeMode: 'contain' }}
        source={require('./img/event_icon.png')} />
      :
      false;

    if (amount > 0) {
      return (
        <View style={styles.container}>
          {eventTag}
          <View style={styles.textWholeView}>
            <View style={styles.cartInfoView}>
              <Text style={styles.text}>{amount} 개가 장바구니에 추가되었습니다.</Text>
            </View>
          </View>  
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {eventTag}
        </View>
      );
    }
  }
}

/*
 * Style
 */
let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textWholeView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  cartInfoView: {
    height: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.PRIMARY_YELLOW,
  },
  text: {
    fontSize: normalize(16),
    color: 'white',
  }
});
