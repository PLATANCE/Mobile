'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Font, normalize } from '../../const/Font';

const CUTLERY = {
  YES: '예',
  NO: '아니요',
};
const CUTLERY_DATA = [
  CUTLERY.YES,
  CUTLERY.NO,
];

export default class DeliveryInfoCutlery extends Component {
  props: {
    selectedCutlery: string;
  };
  
  render() {
    const {
      selectedCutlery,
      onTogglePicker,
    } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={ () => onTogglePicker() }
      >
        <View style={styles.container}>
          <Text style={Font.DEFAULT_FONT_BLACK}>포크/나이프가 필요하세요?</Text>
          <Text style={[styles.data, Font.DEFAULT_FONT_BLACK]}>{CUTLERY_DATA[selectedCutlery]}</Text>
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
