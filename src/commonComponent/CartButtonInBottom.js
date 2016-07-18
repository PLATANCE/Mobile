'use strict';
import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import MenuCountCircleInCartButton from './MenuCountCircleInCartButton';
import Color from '../const/Color';
import { Font, normalize } from '../const/Font';
import Mixpanel from '../util/mixpanel';

export default class CartButtonInBottom extends Component {
  static propTypes = {
    cart: PropTypes.object.isRequired,
  };

	onCartButtonPressed() {
    const {
    	cart,
    } = this.props;
            
    if(Object.keys(cart).length == 0) {
    	Mixpanel.trackWithProperties('Show Cart', { success: false });
      Alert.alert(
      	'장바구니가 비어있습니다.',
        '오늘 드실 플레이팅 요리를 추가해주세요.'
      );
    } else {
    	Mixpanel.trackWithProperties('Show Cart', { success: true });
      Actions.CartPage();
    }
  }

  render() {
  	const {
  		cart,
  	} = this.props;

    if(Object.keys(cart).length == 0) {
      return false;
    }

  	return (
  		<View style={styles.container}>
    	<TouchableOpacity
    		style={styles.button}
    		onPress={this.onCartButtonPressed.bind(this)}
    	>
    		<Text style={[Font.DEFAULT_FONT_WHITE, { fontSize: normalize(17),fontWeight: 'bold', }]}>장바구니</Text>
    		<MenuCountCircleInCartButton cart={cart} />
    	</TouchableOpacity>
    	</View>
    );
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
	},
	button: {
		height: 40,
		backgroundColor: Color.PRIMARY_ORANGE,
		borderColor: Color.PRIMARY_ORANGE,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
    marginTop: 5,
    marginLeft: normalize(100),
    marginRight: normalize(100),
    flexDirection: 'row',
	},
});