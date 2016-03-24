import React, { View, ListView, Text, StyleSheet, TouchableHighlight, AlertIOS } from 'react-native';
import Prompt from 'react-native-prompt';
import Color from '../../const/Color';
import Separator from '../../commonComponent/Separator';

export default class SearchedAddressList extends React.Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(props.addressList),
            promptVisible: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.addressList !== this.props.addressList) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.addressList)
            })
        }
    }
    inputAddressDetail(title, message) {
        AlertIOS.prompt(
            title,
            message,
            [
                {text: '취소', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '등록', onPress: password => console.log('OK Pressed')},
            ],
        );
    }
    
    renderRow(rowData) {
        let textStyle = rowData.available ? { color: Color.PRIMARY_ORANGE } : { color: Color.PRIMARY_GRAY };
        let title = rowData.available ? '주소를 입력해 주세요.' : '배달이 불가능한 지역입니다.';
        let message = rowData.available ? '' : '나머지 주소를 입력하고 확인을 누르면 배달 지역 확장시 알려드리겠습니다.';

        return (
            <View style={styles.row}>
                <TouchableHighlight onPress={() => this.inputAddressDetail(title, message)}>
                    <Text style={textStyle}>{rowData.title}</Text>
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
                <Prompt title="1"
                    placeholder="2"
                    
                    visible={ this.state.promptVisible } 
                    onCancel={ () => this.cancelPrompt() } 
                    onSubmit={ () => this.submitPrompt() } />
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
