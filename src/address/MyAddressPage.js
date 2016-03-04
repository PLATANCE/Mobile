'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MyAddressList from './components/MyAddressList';
import Color from '../const/Color';
import Const from '../const/Const';

export default class MyAddressPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <MyAddressList addressList={this.props.addressList} />
                    <TouchableHighlight onPress={Actions.AddAddressPage}>
                    <View style={styles.addBox}>
                    	<Image style={styles.img}
                    		source={require('./img/address_add.png')} />
                    	<Text style={styles.addAddressText}>주소 추가하기</Text>
                    </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Const.MARGIN_TOP,
    },
    addBox: {
    	height: 50,
    	flexDirection: 'row',
    	alignItems: 'center',
    },
    img: {
    	width: 30,
    	height: 30,
    	marginLeft: 10,
    },
    addAddressText: {
    	fontSize: 18,
    	color: Color.PRIMARY_ORANGE,
    	marginLeft: 10,
    }
});
