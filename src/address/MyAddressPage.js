'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MyAddressList from './components/MyAddressList';
import Color from '../const/Color';
import Const from '../const/Const';
import RequestURL from '../const/RequestURL';
import {
  fetchCartInfo,
} from '../app/actions/CartInfoActions';
import {
  fetchMyAddressList,
  fetchMyAddress,
} from '../app/actions/AddressActions';
import userInfo from '../util/userInfo';
const userIdx = userInfo.idx;

export default class MyAddressPage extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        props.dispatch(fetchMyAddressList());
    }
    componentDidMount() {
        //this.fetchMyAddressList();
    }
    render() {
        const {
          dispatch,
        } = this.props;
        const {
            myAddressList
        } = this.props;

        return (
            <View style={styles.container}>
                <ScrollView>
                    <MyAddressList
                      myAddressList={myAddressList}
                      fetchMyAddressList={() => dispatch(fetchMyAddressList())}
                      fetchCartInfo={() => dispatch(fetchCartInfo())}
                      fetchMyAddress={() => dispatch(fetchMyAddress())}
                    />
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
