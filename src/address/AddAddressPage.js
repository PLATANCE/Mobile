'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SearchedAddressList from './components/SearchedAddressList';
import Color from '../const/Color';
import Const from '../const/Const';

export default class AddAddressPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.pageTextBox}>
            	   <Text style={styles.pageText}>요리가 배달될 주소 입력</Text>
                </View>
            	<View style={styles.textInputBox} >
	                <TextInput style={styles.textInput} autoFocus={true} 
                        keyboardType="default" autoCorrect={false}
					    placeholder='동이름을 입력하세요' />
				</View>
				<SearchedAddressList addressList={this.props.addressList} />
                <TouchableHighlight style={styles.addressCoverBox} onPress={Actions.AddressCoveragePage}>
                    <Text style={styles.textOrange}>배달 가능한 지역 보기</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        marginTop: Const.MARGIN_TOP,
        justifyContent: 'center',
    },
    pageTextBox: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageText: {
        color: Color.PRIMARY_BLACK,
    },
    textInputBox: {
        height: 30,
        backgroundColor: Color.PRIMARY_BACKGROUND,
        borderColor: Color.PRIMARY_BACKGROUND,
        overflow: 'hidden',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
    },
    addressCoverBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textOrange: {
        color: Color.PRIMARY_ORANGE,
    }
});
