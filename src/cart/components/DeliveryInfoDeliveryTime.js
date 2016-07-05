'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Picker from 'react-native-picker';
import { Actions } from 'react-native-router-flux';
import { Font, normalize } from '../../const/Font';
import Const from '../../const/Const';
import Color from '../../const/Color';


export default class DeliveryInfoDeliveryTime extends Component {
  props: {
    selectedTimeSlot: Object;
    immediateDeliveryTime: string;
    isImmediateDeliveryChecked: boolean;
    canImmediateDelivery: boolean;
  };

  render() {
    const {
      selectedTimeSlot,
      immediateDeliveryTime,
      isImmediateDeliveryChecked,
      canImmediateDelivery,
      onTogglePicker,
    } = this.props;

    const {
      idx, timeSlot
    } = selectedTimeSlot;

    if(idx === -1) {
      return (
        <View style={styles.container}>
          <Text style={Font.DEFAULT_FONT_BLACK}>배달 시간</Text>
          <Text style={[styles.data, Font.DEFAULT_FONT_ORANGE, { paddingRight: 15 }]}>{timeSlot}</Text>
        </View>
      );
    } else {
      if(isImmediateDeliveryChecked && canImmediateDelivery) {
        return (
          <View style={styles.container}>
            <Text style={Font.DEFAULT_FONT_BLACK}>배달 시간</Text>
            <Text style={[styles.data, Font.DEFAULT_FONT_BLACK, { paddingRight: 15 }]}>{immediateDeliveryTime}</Text>
          </View>
        );
      } else {
        return (
          <TouchableOpacity
            activeOpacity={1}
            onPress={ () => onTogglePicker() }
          >
            <View style={styles.container}>
              <Text style={Font.DEFAULT_FONT_BLACK}>배달 시간</Text>
              <Text style={[styles.data, Font.DEFAULT_FONT_BLACK]}>{timeSlot}</Text>
              <Image style={styles.iconDetailImage}
                source={require('../../commonComponent/img/icon_input.png')}
              />
            </View>
          </TouchableOpacity>
        );
      }
    }
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
  },
  pickerStyle: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    height: 320,
    backgroundColor: Color.PRIMARY_BACKGROUND,
  }
});
