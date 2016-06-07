'use strict';
import React, {
  Component,
  PropTypes,
} from 'react';
import { 
  View,
  Text,
  StyleSheet,
  TextInput,
  DatePickerAndroid,
  DatePickerIOS,
} from 'react-native';
import {
  fetchCartInfo,
} from '../app/actions/CartInfoActions';


export default class IamPortAddCardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChange={
            (event) => {
              const text = event.nativeEvent.text;
              if(text.length === 4) {
                this.refs.SecondInput.focus();
              }
            }
          }
          style={styles.default}
          maxlength={4}
        />
        <TextInput
          ref='SecondInput'
          style={styles.default}
          maxlength={4}
          onChange={
            (event) => {
              const text = event.nativeEvent.text;
              if(text.length === 4) {
                this.refs.ThirdInput.focus();
              }
            }
          }
        />
        <TextInput
          ref='ThirdInput'
          style={styles.default}
          maxlength={4}
          onChange={
            (event) => {
              const text = event.nativeEvent.text;
              if(text.length === 4) {
                this.refs.ForthInput.focus();
              }
            }
          }
        />
        <TextInput
          ref='ForthInput'
          style={styles.default}
          maxlength={4}
          onChange={
            (event) => {
              const text = event.nativeEvent.text;
            }
          }
        />
        <DatePickerIOS 
          date={new Date()}
          mode={'date'}
          onDateChange={(date) => console.log(date)}
          //timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  default: {
    height: 26,
    borderWidth: 1,
    borderColor: '#0f0f0f',
    backgroundColor: 'white',
    flex: 1,
    fontSize: 13,
    padding: 4,
  },
});
