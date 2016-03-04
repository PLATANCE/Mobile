'use strict';
import React, { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';
import OrderedMenu from './components/OrderedMenu';

export default class OrderDetailPage extends React.Component {

    render() {
        var menus = this.props.order.menus;
        var orderedMenuList = [];
        menus.forEach(menu => {
            orderedMenuList.push(<OrderedMenu key={menu.idx} name={menu.name} foreignName={menu.foreignName} amount={menu.amount} status={this.props.order.status}/>);
        })
        
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
                            <Text style={styles.textBlack}>합계</Text>
                            <Text style={styles.rightText}>{order.totalPrice}</Text>
                        </View>
                        <View style={styles.orderInfoRow}>
                            <Text style={styles.textBlack}>배달 시간</Text>
                            <Text style={styles.rightText}>{order.requestTime}</Text>
                        </View>
                    </View>
                    <View style={styles.reviewBox}>
                        <Text style={styles.textBlack}>리뷰를 남겨주세요 :)</Text>
                        <Text style={styles.textBlack}>추첨을 통해 무료 시식권을 드립니다 :)</Text>
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
        marginTop: Const.MARGIN_TOP,
    },
    content: {
        flex: 1,
        marginTop: 10,
    },
    statusBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 10,
    },
    orderInfoBox: {
        backgroundColor: 'white',
        marginTop: 1,
    },
    orderInfoRow: {
        flexDirection: 'row',
        margin: 10,
    },
    rightText: {
        flex: 1,
        textAlign: 'right',
        color: Color.PRIMARY_BLACK,
    },
    textBold: {
        fontWeight: 'bold',
    },
    reviewBox: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        overflow: 'hidden',
    },
    textBlack: {
        color: Color.PRIMARY_BLACK,
    }
});
