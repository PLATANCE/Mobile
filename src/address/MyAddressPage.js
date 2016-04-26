'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MyAddressList from './components/MyAddressList';
import Color from '../const/Color';
import Const from '../const/Const';
import Font from '../const/Font';
import RequestURL from '../const/RequestURL';
import {
  fetchCartInfo,
} from '../app/actions/CartInfoActions';
import {
  fetchMyAddressList,
  fetchMyAddress,
} from '../app/actions/AddressActions';
import userInfo from '../util/userInfo';
import Mixpanel from '../util/mixpanel';

export default class MyAddressPage extends React.Component {
    constructor(props) {
        super(props);
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
                    <TouchableHighlight 
                        onPress={ () => { Actions.AddAddressPage(),  Mixpanel.track('Add New Address') } } 
                        underlayColor={'transparent'}
                    >
                        <View style={styles.addBox}>
                            <Image style={styles.img}
                            	source={require('./img/address_add.png')} />
                            <Text style={styles.addAddressText}>주소 추가하기</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={ () => Actions.AddressCoveragePage() } 
                    >
                        <View style={styles.button}>
                            <Text style={Font.DEFAULT_FONT_WHITE}>배달 가능한 지역 보기</Text>
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
    	height: 50 * Const.DEVICE_RATIO,
    	flexDirection: 'row',
    	alignItems: 'center',
    },
    img: {
    	width: 30 * Const.DEVICE_RATIO,
    	height: 30 * Const.DEVICE_RATIO,
    	marginLeft: 10,
    },
    addAddressText: {
    	fontSize: 18 * Const.DEVICE_RATIO,
    	color: Color.PRIMARY_ORANGE,
    	marginLeft: 10,
    },
    coverageImg: {
        width: Const.WIDTH,
        height: Const.HEIGHT,
        resizeMode: 'contain',
    },
    button: {
        height: 40,
        borderColor: Color.PRIMARY_ORANGE,
        backgroundColor: Color.PRIMARY_ORANGE,
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
});
