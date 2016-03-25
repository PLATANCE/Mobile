'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MyAddressList from './components/MyAddressList';
import Color from '../const/Color';
import Const from '../const/Const';
import RequestURL from '../const/RequestURL';

import userInfo from '../util/userInfo';
const userIdx = userInfo.idx;

export default class MyAddressPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addressList: [],
        }
    }
    componentDidMount() {
        this.fetchMyAddressList();
    }
    fetchMyAddressList() {
        fetch(RequestURL.REQUEST_MY_ADDRESS_LIST + 'user_idx=' + userIdx)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                this.setState({
                    addressList: responseData,
                });
            })
            .catch((error)=> {
                console.warn(error);
            })
            .done();
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <MyAddressList addressList={this.state.addressList} fetchMyAddressList={this.fetchMyAddressList}/>
                    <TouchableHighlight onPress={Actions.AddAddressPage} underlayColor={'transparent'}>
                    <View style={styles.addBox}>
                        <Image style={styles.img}
                        	source={require('./img/address_add.png')} />
                        <Text style={styles.addAddressText}>주소 추가하기</Text>
                    </View>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Const.MARGIN_TOP,
        backgroundColor: Color.PRIMARY_BACKGROUND,
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
