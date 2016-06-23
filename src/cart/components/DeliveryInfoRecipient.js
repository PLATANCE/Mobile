'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Font, normalize } from '../../const/Font';

export default class DeliveryInfoRecipient extends Component {
  props: {
    selectedRecipient: string;
  };
  
  render() {
    const {
      selectedRecipient,
      onTogglePicker,
    } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={ () => onTogglePicker() }
      >
        <View style={styles.container}>
          <Text style={Font.DEFAULT_FONT_BLACK}>어느 분이 음식을 받습니까?</Text>
          <Text style={[styles.data, Font.DEFAULT_FONT_BLACK]}>{selectedRecipient}</Text>
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
