import React, { View, ListView, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Color from '../../const/Color';
import {Actions} from 'react-native-router-flux';

export default class MyOrderList extends React.Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(props.orders)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.orders !== this.props.orders) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.orders)
            })
        }
    }

    renderRow(rowData) {
        return (
            <View style={styles.row}>
                <View>
                    <Text style={styles.dateText}>{rowData.date}<Text>({rowData.day})</Text></Text>
                    <Text style={styles.addressText}>{rowData.address}</Text>
                    <Text style={styles.addressDetailText}>{rowData.addressDetail}</Text>
                </View>
                <View style={styles.footerBox}>
                    <Text style={styles.requestTimeText}>{rowData.requestTime}</Text>
                    <View style={styles.buttonBox}>
                        <TouchableHighlight onPress={Actions.OrderDetailPage}>
                            <View style={styles.button}>
                                <Image style={styles.buttonIconImage} 
                                    source={require('../../commonComponent/img/icon_detail.png')}/>
                                <Text style={styles.textWhite}>상세 보기</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight  onPress={Actions.WriteReviewPage}>
                            <View style={styles.button}>
                                <Image style={styles.buttonIconImage} 
                                    source={require('../../commonComponent/img/icon_detail.png')}/>
                                <Text style={styles.textWhite}>리뷰 작성</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow} />
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flex: 1,
        marginBottom: 10,
        backgroundColor: 'white',
        padding: 10,
    },
    dateText: {
        color: Color.PRIMARY_BLACK,
    },
    addressText: {
        color: Color.PRIMARY_BLACK,
        marginTop: 10,
    },
    addressDetailText :{
        color: Color.PRIMARY_BLACK,
    },
    requestTimeText: {
        color: Color.PRIMARY_BLACK,
    },
    footerBox: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    buttonBox: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
    },
    button: {
        width: 90,
        height: 30,
        borderColor: Color.PRIMARY_ORANGE,
        backgroundColor: Color.PRIMARY_ORANGE,
        borderRadius: 5,
        borderWidth: 1,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        alignSelf: 'flex-end',
        flexDirection: 'row',
    },
    buttonIconImage: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        marginRight: 5,
    },
    textWhite: {
        color: 'white',
    },

});
