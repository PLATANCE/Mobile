'use strict';
import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Color from '../const/Color';
import { Font, normalize } from '../const/Font';

export default class MenuCountCircleInCartButton extends Component {
	props: {
		cart: Object;
	};

  render() {
  	const {
  		cart,
  	} = this.props;

  	if(Object.keys(cart).length == 0) {
  		return false;
  	}
  	
  	let menuCount = 0;
  	Object.keys(cart).map((menuIdx) => {
  		menuCount += cart[menuIdx].amount;
  	});

  	return (
    	<View style={styles.container}>
    		<Text style={Font.DEFAULT_FONT_ORANGE}>{menuCount}</Text>
    	</View>
    );
	}
}

const SIZE = 20;

const styles = StyleSheet.create({
	container: {
		width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginLeft: normalize(3),
    marginBottom: 5,
	},
});