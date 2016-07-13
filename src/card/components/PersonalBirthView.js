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

export default class PersonalBirthView extends Component {
	render() {
		return (
			<View style={styles.container} >
        <Text style={Font.DEFAULT_FONT_BLACK}>생년월일(yymmdd)</Text>
        <View style={styles.rowRight}>
          <TextInput
            ref='personalBirth'
            style={styles.default}
            maxLength={6}
            placeholder={'(6자리)'}
            keyboardType={'number-pad'}
            onChangeText={ (text) => {
                if(text.length == 6) {
                  this.props.setBirth(text, 0);
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
    width: normalize(70),
    borderWidth: 1,
    borderColor: Color.PRIMARY_BLACK,
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: normalize(5),
    fontSize: normalize(16),
    padding: 4,
    textAlign: 'center',
    color: Color.PRIMARY_BLACK,
  },
});