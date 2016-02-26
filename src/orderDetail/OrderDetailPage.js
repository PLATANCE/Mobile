'use strict';
import React, { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

import Color from '../const/Color';
import OrderedMenu from './components/OrderedMenu';

export default class OrderDetailPage extends React.Component {

    render() {
        var menus = this.props.order.menus;
        var orderedMenuList = [];
        for (var i = 0; i < menus.length; i++) {
            let menu = menus[i].menu;
            orderedMenuList.push(<OrderedMenu key={menu.idx} name={menu.name} foreignName={menu.foreignName} amount={menu.amount} status={this.props.order.status}/>);
        }
        let order = this.props.order;
        return (
            <View style={styles.container}>
                <View style={styles.content} >
                    <View style={styles.statusBox}>
                        <Text>{order.status}</Text>
                    </View>
                    {orderedMenuList}
                    <View style={styles.orderInfoBox}>
                        <View style={styles.orderInfoRow}>
                            <Text style={styles.leftText}>합계</Text>
                            <Text style={styles.rightText}>{order.totalPrice}</Text>
                        </View>
                        <View style={styles.orderInfoRow}>
                            <Text style={styles.leftText}>배달 시간</Text>
                            <Text style={styles.rightText}>{order.requestTime}</Text>
                        </View>
                    </View>
                    <View style={styles.reviewBox}>
                        <Image style={styles.img}
                            source={require('../commonComponent/img/icon_star_empty_yellow.png')}/>
                        <View style={styles.leftBox}>
                            <Text>리뷰를 남겨주세요 :)</Text>
                            <Text>추첨을 통해 무료 시식권을 드립니다.</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.PRIMARY_BACKGROUND,

    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusBox: {
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    orderInfoBox: {
        width: 300,
        backgroundColor: 'white',
        marginTop: 10,
    },
    orderInfoRow: {
        flexDirection: 'row',
    },
    leftText: {

    },
    rightText: {
        flex: 1,
        textAlign: 'right'
    },
    reviewBox: {
        width: 300,
        marginTop: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    leftBox: {
        flex: 1,
    }

});
