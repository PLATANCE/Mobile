'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image, TextInput } from 'react-native';
import SearchedAddressList from './components/SearchedAddressList';
import Color from '../const/Color';

export default class AddAddressPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
            	<Text style={styles.pageText}>요리가 배달될 주소 입력</Text>
            	<View style={styles.textInputBox} >
	                <TextInput style={styles.textInput}
					    placeholder='동이름을 입력하세요' />
				</View>
				<SearchedAddressList addressList={this.props.addressList} />
				
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pageText: {
        textAlign: 'center'
    },
    textInputBox: {
        height: 30,
        backgroundColor: Color.PRIMARY_BACKGROUND,
        borderColor: Color.PRIMARY_BACKGROUND,
        overflow: 'hidden',
        marginLeft: 10,
        marginRight: 10,
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
    },
});
