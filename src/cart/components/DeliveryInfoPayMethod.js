'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Font, normalize } from '../../const/Font';

export default class DeliveryInfoPayMethod extends Component {
  props: {
    selectedPayMethod: string;
  };
  
  render() {
    const {
      selectedPayMethod,
      onTogglePicker
    } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={ () => onTogglePicker() }
      >
        <View style={styles.container}>
          <Text style={Font.DEFAULT_FONT_BLACK}>결제수단</Text>
          <Text style={[styles.data, Font.DEFAULT_FONT_BLACK]}>{selectedPayMethod}</Text>
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
