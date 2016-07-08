'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

import SearchedAddressList from './components/SearchedAddressList';
import Color from '../const/Color';
import Const from '../const/Const';
import { Font, normalize } from '../const/Font';
import RequestURL from '../const/RequestURL';
import Mixpanel from '../util/mixpanel';
import {
  fetchMyAddressList,
  fetchMyAddress, 
} from '../app/actions/AddressActions';
import {
  fetchCartInfo,
} from '../app/actions/CartInfoActions';


export default class AddAddressPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addressList: [],
            textQuery: '',
        }
    }
    searchAddress(event) {
        let input = event.nativeEvent.text;
        this.fetchSearchedAddressList(input);
    }
    searchAddressFromButton() {
        const query = this.state.textQuery;
        this.fetchSearchedAddressList(query);
    }
    fetchSearchedAddressList(address) {
        if(address === '') {
            Alert.alert(
                '입력 오류',
                '검색어를 입력해 주세요. 예) 신사동 123-4'
            );
            return;
        }
        fetch(RequestURL.REQUEST_SEARCHED_ADDRESS_LIST + "query=" + address)
            .then((response) => response.json())
            .then((responseData) => {
                Mixpanel.trackWithProperties('Search Address', { keyword: address, result: responseData.length });
                if(responseData.length == 0) {
                    Alert.alert('검색 결과가 없습니다.');
                }
                this.setState({
                    addressList: responseData,
                });
            })
            .catch((error)=> {
                console.warn(error);
            })
            .done();
    }
    updateText(text) {
        this.setState({
            textQuery: text,
        });
    }
    render() {
        const {
            dispatch,
        } = this.props;
        const iconOpacityStyle = this.state.textQuery === '' ? {opacity: 0.2} : {opacity: 1};
        return (
            <ScrollView
                keyboardShouldPersistTaps={true}
            >
                <View style={styles.container} >
                    <View style={styles.pageTextBox} >
                        <Text style={Font.DEFAULT_FONT_BLACK_BOLD}>주소 입력 (동 + 지번)</Text>
                        <Text style={Font.DEFAULT_FONT_BLACK}>예) 신사동 123-4</Text>
                    </View>
                	<View style={styles.textInputBox} >
    	                <TextInput style={[styles.textInput, Font.DEFAULT_FONT_BLACK]} autoFocus={true} 
                            keyboardType='default' autoCorrect={false} 
                            onSubmitEditing={this.searchAddress.bind(this)}
                            onChange={(event) => this.updateText(event.nativeEvent.text)}
    					    placeholder='예) 신사동 123-4' />
                        <TouchableOpacity 
                            onPress={this.searchAddressFromButton.bind(this)}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.searchIconBox, iconOpacityStyle]}>
                                <Image style={styles.searchIconImage} 
                                    source={require('./img/address_input.png')}/>
                            </View>
                        </TouchableOpacity>
    				</View>
    				<SearchedAddressList 
                        fetchMyAddressList={ () => dispatch(fetchMyAddressList()) }
                        fetchMyAddress={ () => dispatch(fetchMyAddress()) }
                        fetchCartInfo={ () => dispatch(fetchCartInfo()) }
                        addressList={this.state.addressList} />
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={ () => Actions.CSAddressCoveragePage() } 
                    >
                        <View style={styles.button}>
                            <Text style={Font.DEFAULT_FONT_WHITE}>배달 가능한 지역 보기</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    pageTextBox: {
        marginTop: normalize(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputBox: {
        height: normalize(30),
        marginLeft: normalize(16),
        marginRight: normalize(16),
        marginTop: normalize(10),
        flexDirection: 'row',
    },
    textInput: {
        flex: 1,
        paddingLeft: normalize(10),
        marginRight: normalize(10),
        backgroundColor: Color.PRIMARY_BACKGROUND,
        borderColor: Color.PRIMARY_BACKGROUND,
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
    },
    addressCoverBox: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: normalize(10),
    },
    searchIconBox: {
        height: normalize(30),
        width: normalize(45),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.PRIMARY_ORANGE,
        borderColor: Color.PRIMARY_ORANGE,
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
    },
    searchIconImage: {
        height: normalize(16),
        width: normalize(16),
    },
    button: {
        height: normalize(40),
        borderColor: Color.PRIMARY_ORANGE,
        backgroundColor: Color.PRIMARY_ORANGE,
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: normalize(20),
        marginBottom: normalize(20),
        marginLeft: normalize(16),
        marginRight: normalize(16),
    },
});
