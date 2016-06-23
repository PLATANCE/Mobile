'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Font, normalize } from '../../const/Font';
import Color from '../../const/Color';

export default class DeliveryInfoDeliveryType extends Component {
  props: {
    canImmediateDelivery: boolean;
  };
  constructor(props) {
    super(props);
    this.state = {
      isChecked: true
    };
  }
  
  render() {
    const {
      canImmediateDelivery,
    } = this.props;
    const {
      isChecked,
    } = this.state;

    const checkedStyle = (isChecked) ? styles.checkedBtnStyle : styles.unCheckedBtnStyle;
    const checkedTextStyle = (isChecked) ? Font.DEFAULT_FONT_WHITE : Font.DEFAULT_FONT_ORANGE;
    const checkedImage = (isChecked) ? 
      <Image style={[styles.iconInCheckBtn, { marginRight: normalize(5) }]} 
        source={require('../img/thunder_icon.png')}
        resizeMode={'contain'}/>
      :
      false;
    const unCheckedStyle = (isChecked) ? styles.unCheckedBtnStyle : styles.checkedBtnStyle;
    const unCheckedTextStyle = (isChecked) ? Font.DEFAULT_FONT_ORANGE : Font.DEFAULT_FONT_WHITE;
    const unCheckedImage = (isChecked) ? 
      false
      :
      <Image style={[styles.iconInCheckBtn, { marginRight: normalize(5) }]} 
        source={require('../img/clock_icon.png')}
        resizeMode={'contain'}/>;

    if(canImmediateDelivery) {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.checkBtn, { marginRight: normalize(2) }, checkedStyle]}
            onPress={() => this.setState({ isChecked: !isChecked })}
          >
            {checkedImage}
            <Text style={checkedTextStyle}>즉시 배달</Text>
          
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.checkBtn, { marginLeft: normalize(2) }, unCheckedStyle]}
            onPress={() => this.setState({ isChecked: !isChecked })}
          >
            {unCheckedImage}
            <Text style={unCheckedTextStyle}>예약 배달</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.checkBtn, { marginRight: normalize(2) }]}

          >
            <Text style={Font.BLUR_FONT_ORANGE}>즉시 배달</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.checkBtn, { marginLeft: normalize(2), backgroundColor: Color.PRIMARY_ORANGE }]}
          >
            <Image style={[styles.iconInCheckBtn, { marginRight: normalize(5) }]} 
              source={require('../img/clock_icon.png')}
              resizeMode={'contain'}/>
            <Text style={Font.DEFAULT_FONT_WHITE}>예약 배달</Text>
          </TouchableOpacity>
        </View>
      );
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
  checkBtn: {
    flex: 1,
    height: 26,
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.PRIMARY_ORANGE_BLUR,
    flexDirection: 'row',
  },
  iconInCheckBtn: {
    width: 15,
    height: 15,
  },
  checkedBtnStyle: {
    backgroundColor: Color.PRIMARY_ORANGE,
  },
  unCheckedBtnStyle: {
    backgroundColor: 'white',
  },
});
