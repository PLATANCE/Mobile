import React, { View, ListView, Text, StyleSheet, TouchableHighlight, AlertIOS, Alert } from 'react-native';
import Prompt from 'react-native-prompt';
import { Actions } from 'react-native-router-flux';
import Color from '../../const/Color';
import RequestURL from '../../const/RequestURL';
import Separator from '../../commonComponent/Separator';

import userInfo from '../../util/userInfo';
const userIdx = userInfo.idx;

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
    openAlertAddressDetail(title, message, address, deliveryAvailable) {
        AlertIOS.prompt(
            title,
            message,
            [
                { text: '취소', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: '등록', onPress: (addressDetail) => this.submitDeliveryAddress(address, addressDetail, deliveryAvailable) },
            ],
        );
    }
    
    submitDeliveryAddress(address, addressDetail, deliveryAvailable) {
        console.log(address, addressDetail, deliveryAvailable);

        const param = {
            user_idx: userIdx,
            address: address,
            address_detail: addressDetail,
            delivery_available: deliveryAvailable,
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
        })
        .catch((error) => {
            console.warn(error);
        })
        .done();
        
    }

    renderRow(rowData) {
        let textStyle = rowData.available ? { color: Color.PRIMARY_ORANGE } : { color: Color.PRIMARY_GRAY };
        let title = rowData.available ? '주소를 입력해 주세요.' : '배달이 불가능한 지역입니다.';
        let message = rowData.available ? '' : '나머지 주소를 입력하고 확인을 누르면 배달 지역 확장시 알려드리겠습니다.';

        let address = rowData.address;
        let deliveryAvailable = rowData.available;
        return (
            <View style={styles.row}>
                <TouchableHighlight onPress={ () => this.openAlertAddressDetail(title, message, address, deliveryAvailable)} >
                    <Text style={textStyle}>{address}</Text>
                </TouchableHighlight>
                <Separator />
            </View>
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
        marginTop: 10,
        flex: 1,
    },
});
