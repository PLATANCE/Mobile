import React, { View, ListView, Text, StyleSheet, Image } from 'react-native';
import Color from '../../const/Color';

export default class SearchedAddressList extends React.Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(props.addressList)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.addressList !== this.props.addressList) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.addressList)
            })
        }
    }

    renderRow(rowData) {
        let textStyle = rowData.address.deliveryAvailable ? { color: Color.PRIMARY_BLACK } : { color: Color.PRIMARY_GRAY };

        return (
            <View style={styles.row}>
                <Text style={textStyle}>{rowData.address.address}</Text>
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
        margin: 10,
    },
    row: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
});
