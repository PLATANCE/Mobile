'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import MyAddressList from './components/MyAddressList';
import Color from '../const/Color';

export default class MyAddressPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <MyAddressList addressList={this.props.addressList} />
                    <View style={styles.addBox}>
                    	<Image style={styles.img}
                    		source={require('./img/address_add.png')} />
                    	<Text style={styles.addAddressText}>주소 추가하기</Text>
                    </View>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
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
