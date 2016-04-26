import React, { View, ListView, Text, StyleSheet, TouchableHighlight, AlertIOS, Alert, Image } from 'react-native';
import Prompt from 'react-native-prompt';
import { Actions } from 'react-native-router-flux';
import Color from '../../const/Color';
import Const from '../../const/Const';
import Font from '../../const/Font';
import RequestURL from '../../const/RequestURL';
import Separator from '../../commonComponent/Separator';
import userInfo from '../../util/userInfo';
import Mixpanel from '../../util/mixpanel';

export default class SearchedAddressList extends React.Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(props.addressList),
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.addressList !== this.props.addressList) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.addressList)
            })
        }
    }
    openAlertAddressDetail(title, message, jibunAddress, roadNameAddress, deliveryAvailable, area, reservationType, latitude, longitude) {
        Mixpanel.track('Choose Address from Result');
        AlertIOS.prompt(
            title,
            message,
            [
                { text: '취소', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: '등록', onPress: (addressDetail) => this.submitDeliveryAddress(jibunAddress, roadNameAddress, addressDetail, deliveryAvailable, area, reservationType, latitude, longitude) },
            ],
        );
    }
    
    submitDeliveryAddress(jibunAddress, roadNameAddress, addressDetail, deliveryAvailable, area, reservationType, latitude, longitude) {
        const userIdx = userInfo.idx;
        Mixpanel.trackWithProperties('Enter Address Detail', { entered: addressDetail });
        const param = {
            user_idx: userIdx,
            address: jibunAddress,
            road_name_address: roadNameAddress,
            address_detail: addressDetail,
            delivery_available: deliveryAvailable,
            area: area,
            reservation_type: reservationType,
            lat: latitude,
            lon: longitude,
        };
        
        fetch(RequestURL.SUBMIT_UPDATE_ADDRESS, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(param)
        })
        .then((response) => response.json())
        .then((responseData) => {
            Alert.alert(
                '주소 추가',
                '성공적으로 주소를 추가하였습니다.',
            );
            Actions.pop();
            this.props.fetchMyAddressList();
            this.props.fetchMyAddress();
        })
        .catch((error) => {
            console.warn(error);
        })
        .done();
        
    }

    renderRow(rowData) {        
        //  jibunAddress: String,
        //  roadNameAddress: String,
        const textStyle = rowData.available ? Font.DEFAULT_FONT_ORANGE : Font.DEFAULT_FONT_GRAY;
        const jibunAddress = rowData.jibunAddress;
        const roadNameAddress = rowData.roadNameAddress;
        const deliveryAvailable = rowData.available;
        const area = rowData.available ? rowData.area : null;
        const reservationType = rowData.available ? rowData.reservationType : null;
        const latitude = rowData.latitude;
        const longitude = rowData.longitude;
        const title = rowData.available ? '나머지 주소를 입력해 주세요.' : '배달이 불가능한 지역입니다.';
        const message = rowData.available ? '예)  몇호, 무슨빌라 몇호 ' : '나머지 주소를 입력하고 확인을 누르면 배달 지역 확장시 알려드리겠습니다.';
        const deliveryAvailableImage = rowData.available ? require('../img/delivery_available.png') : require('../img/delivery_not_available.png')

        return (
            <TouchableHighlight 
                onPress={ () => this.openAlertAddressDetail(title, message, jibunAddress, roadNameAddress, deliveryAvailable, area, reservationType, latitude, longitude)} 
                underlayColor={'transparent'}
            >
            <View style={styles.row}>
                <Image style={styles.img} source={deliveryAvailableImage}/>
                <View style={styles.addressBox}>
                    <Text style={Font.DEFAULT_FONT_BLACK_BOLD}>{jibunAddress}</Text>
                    <Text style={Font.DEFAULT_FONT_BLACK}>[도로명]{roadNameAddress}</Text>
                </View>
            </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)} />
            </View>
        );
        
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: Color.PRIMARY_GRAY,
        alignItems: 'center',
    },
    img: {
        width: 30 * Const.DEVICE_RATIO,
        height: 30 * Const.DEVICE_RATIO,
        resizeMode: 'contain',
    },
    addressBox: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    }
});
