import React, { View, ListView, Text, StyleSheet, Image } from 'react-native';
import Color from '../../const/Color';
import MediaURL from '../../const/MediaURL';

export default class MyCouponList extends React.Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(props.coupons)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.coupons !== this.props.coupons) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.coupons)
            })
        }
    }

    renderRow(rowData) {
        let imageURL = MediaURL.COUPON_URL + rowData.image_url_coupon;
        return (
            <View style={styles.row} >
                <Image style={styles.img}
                    source={{uri: imageURL}} />                
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
        height: 190,
        marginBottom: 10,
    },
    img: {
        flex: 1,
        resizeMode: 'stretch',
    }
});
