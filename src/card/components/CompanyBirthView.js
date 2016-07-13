'use strict'
import React, {
  Component,
} from 'react';
import { 
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Font, normalize } from '../../const/Font';
import Color from '../../const/Color';

export default class CompanyBirthView extends Component {
	render() {
		return (
			<View style={styles.container} >
        <Text style={Font.DEFAULT_FONT_BLACK}>사업자 번호</Text>
        <View style={styles.rowRight}>
          <TextInput
            ref='companyBirthFirst'
            style={styles.default}
            maxLength={3}
            keyboardType={'number-pad'}
            onChangeText={ (text) => {
                if (text.length === 3) { 
                  this.refs.companySecondFirst.focus();
                  this.props.setBirth(text, 0);
                }
              }
            }
          />
          <Text style={[Font.DEFAULT_FONT_BLACK, { marginLeft: normalize(3), marginRight: normalize(3) }]}>-</Text>
          <TextInput
            ref='companySecondFirst'
            style={[styles.default, { width: normalize(35) }]}
            maxLength={2}
            keyboardType={'number-pad'}
            onChangeText={ (text) => {
                if (text.length === 2) {
                  this.refs.companyThirdFirst.focus();
                  this.props.setBirth(text, 1);
                }
              }
            }
          />
          <Text style={[Font.DEFAULT_FONT_BLACK, { marginLeft: normalize(3), marginRight: normalize(3) }]}>-</Text>
          <TextInput
            ref='companyThirdFirst'
            maxLength={5}
            keyboardType={'number-pad'}
            style={[styles.default, { width: normalize(80) }]}
            onChangeText={ (text) => {
                if (text.length === 5) { 
                  this.props.setBirth(text, 2);
                }
              }
            }
          />
				</View>
      </View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		paddingLeft: normalize(16),
    paddingRight: normalize(16),
    height: normalize(50),
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
	},
	rowRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  default: {
    height: 26,
    width: normalize(50),
    borderWidth: 1,
    borderColor: Color.PRIMARY_BLACK,
    borderRadius: 3,
    overflow: 'hidden',
    fontSize: normalize(16),
    padding: 4,
    textAlign: 'center',
    color: Color.PRIMARY_BLACK,
  },
});