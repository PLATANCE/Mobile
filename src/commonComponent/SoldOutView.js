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

import EventTextInMenuImage from '../commonComponent/EventTextInMenuImage';
import Color from '../const/Color';
import Const from '../const/Const';
import { Font, normalize } from '../const/Font';

export default class SoldOutView extends Component {

  render() {
    const {
      stock,
      isEvent,
      isNew,
    } = this.props;
        
    if (stock == 0) {
      return(
        <View style={styles.containerAlpha}>
          <View style={[styles.textWholeView]}>
            <Text style={[Font.DEFAULT_FONT_WHITE_BOLD, styles.textEng]}>SOLD OUT</Text>
            <Text style={[Font.DEFAULT_FONT_WHITE, styles.textKor]}>금일 메뉴가 매진 되었습니다.</Text>
          </View>
          <EventTextInMenuImage isEvent={isEvent} isNew={isNew} />
        </View>
      );
    } else if (stock < 0) {
      return(
        <View style={styles.containerAlpha}>
          <Text style={[Font.DEFAULT_FONT_WHITE_BOLD, styles.textEng]}>주문 마감</Text>
          <Text style={[Font.DEFAULT_FONT_WHITE, styles.textKor]}>오늘은 플레이팅 쉬는 날 입니다.</Text>
        </View>
      );
    }
  }
}

/*
 * Style
 */
let styles = StyleSheet.create({
    containerAlpha: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    textEng: {
        fontSize: normalize(25),
    },
    textKor: {
        marginTop: normalize(10),
        fontSize: normalize(17),
    },
    textWholeView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});
