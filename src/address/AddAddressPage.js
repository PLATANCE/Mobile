'use strict';
import React, { View, Text, StyleSheet, TouchableHighlight, TextInput, ScrollView, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Prompt from 'react-native-prompt';

import SearchedAddressList from './components/SearchedAddressList';
import Color from '../const/Color';
import Const from '../const/Const';
import Font from '../const/Font';
import RequestURL from '../const/RequestURL';
import Mixpanel from '../util/mixpanel';
import {
  fetchMyAddressList,
} from '../app/actions/AddressActions';


export default class AddAddressPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addressList: [],
        }
    }
    searchAddress(event) {
        let input = event.nativeEvent.text;
        this.fetchSearchedAddressList(input);
    }
    fetchSearchedAddressList(address) {
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
    render() {
        const {
            dispatch,
        } = this.props;
        return (
            <ScrollView>
                <View style={styles.container} >
                    <View style={styles.pageTextBox} >
                        <Text style={Font.DEFAULT_FONT_BLACK_BOLD}>주소 입력 (동 + 지번)</Text>
                        <Text style={Font.DEFAULT_FONT_BLACK}>예) 신사동 123-4</Text>
                    </View>
                	<View style={styles.textInputBox} >
    	                <TextInput style={[styles.textInput, Font.DEFAULT_FONT_BLACK]} autoFocus={true} 
                            keyboardType='default' autoCorrect={false} 
                            onSubmitEditing={this.searchAddress.bind(this)}
    					    placeholder='예) 신사동 123-4' />
    				</View>
    				<SearchedAddressList 
                        fetchMyAddressList={ () => dispatch(fetchMyAddressList()) }
                        addressList={this.state.addressList} />
                </View>
            </ScrollView>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        marginTop: Const.MARGIN_TOP,
        justifyContent: 'center',
    },
    pageTextBox: {
        marginTop: 20 * Const.DEVICE_RATIO,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputBox: {
        height: 30 * Const.DEVICE_RATIO,
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
        marginBottom: 20,
    },
});
