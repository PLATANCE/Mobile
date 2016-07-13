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

import EventTextInMenuImage from './EventTextInMenuImage';
import Color from '../const/Color';
import { Font, normalize } from '../const/Font';
import Const from '../const/Const';

export default class MenuInfo extends Component {
  static propTypes = {
    isEvent: PropTypes.number.isRequired,
    isNew: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  };

  render() {
    const {
      isEvent,
      isNew,
      stock,
    } = this.props;

    const soldOutOpacity = stock > 0 ? { backgroundColor: 'transparent' } : { backgroundColor: 'rgba(0, 0, 0, 0.3)' };
    const menuInfoTitle = stock > 0 ? false : stock === 0 ? 'SOLD OUT' : '주문 마감';
    const menuInfoContent = stock > 0 ? false : stock === 0 ? '금일 메뉴가 매진 되었습니다.' : '오늘은 플레이팅 쉬는 날 입니다.';

    return (
      <View style={[styles.container, soldOutOpacity]}>
        <View style={styles.textView}>
          <Text style={[Font.DEFAULT_FONT_WHITE_BOLD, styles.textTitle]}>{menuInfoTitle}</Text>
          <Text style={[Font.DEFAULT_FONT_WHITE, styles.textContent]}>{menuInfoContent}</Text>
        </View>
        <EventTextInMenuImage isEvent={isEvent} isNew={isNew} />
      </View>
    );
  }
}

/*
 * Style
 */
let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: normalize(25),
  },
  textContent: {
    marginTop: normalize(10),
    fontSize: normalize(17),
  },
});
