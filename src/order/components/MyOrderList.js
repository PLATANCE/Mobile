import React, { View, ListView, Text, StyleSheet, Image } from 'react-native';
import Color from '../../const/Color';
import Separator from '../../commonComponent/Separator';

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
                <View style={styles.mainBox}>
                    <View style={styles.leftBox}>
                        <Text>{rowData.order.date}<Text>({rowData.order.day})</Text></Text>
                        <Text>{rowData.order.address}</Text>
                        <Text>{rowData.order.addressDetail}</Text>
                        <Text>{rowData.order.requestTime}</Text>
                    </View>
                    <View style={styles.rightBox}>
                        <View style={styles.button}>
                            <Text style={styles.textWhite}>자세히보기</Text>
                        </View>
                        <View style={styles.button}>
                            <Text style={styles.textWhite}>리뷰남기기</Text>
                        </View>
                    </View>
                </View>
                <Separator />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
        backgroundColor: 'white',
    },
    mainBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
    },
    leftBox: {
        justifyContent: 'center',
    },
    rightBox: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    button: {
        width: 100,
        borderColor: Color.PRIMARY_ORANGE,
        backgroundColor: Color.PRIMARY_ORANGE,
        borderRadius: 5,
        borderWidth: 1,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },
    textWhite: {
        color: 'white',
    }

});
