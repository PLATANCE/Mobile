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

export default class EventTextInMenuImage extends Component {
  static propTypes = {
    isEvent: PropTypes.number.isRequired,
    isNew: PropTypes.number.isRequired,
  };

  render() {
    const {
      isEvent,
      isNew,
    } = this.props;

    if(!isEvent && !isNew) {
      return false;
    }
    const eventText = isEvent ? 'EVENT' : 'NEW';
    return (
      <View style={styles.container}>
        <Text style={[Font.DEFAULT_FONT_WHITE, { fontSize: normalize(16) }]}>{eventText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.PRIMARY_YELLOW,
  },
});
