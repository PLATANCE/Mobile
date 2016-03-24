'use strict';
import React, { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';
import OrderedMenu from './components/OrderedMenu';
import RequestURL from '../const/RequestURL';

export default class OrderDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: [],
            menus: [],
        }
    }
    componentDidMount() {
        this.fetchMyOrderDetail();
    }
    fetchMyOrderDetail() {
        fetch(RequestURL.REQUEST_MY_ORDER_DETAIL + 'order_idx=' + this.props.orderIdx)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    order: responseData,
                    menus: responseData.order_detail,
                });
            })
            .catch((error)=> {
                console.warn(error);
            })
            .done();
    }
    render() {
        let order = this.state.order;
        let menus = this.state.menus;

        let orderedMenuList = [];
        menus.forEach(menu => {
            let menuName = menu.name_menu;
            let menuNameKor = menuName.split('.')[0];
            let menuNameEng = menuName.split('.')[1];
            orderedMenuList.push(<OrderedMenu key={menu.idx} name={menuNameKor} foreignName={menuNameEng} amount={menu.amount} />);
        })

        let reviewButtonText = (order.review_status) ? '리뷰를 남겨주셔서 감사합니다.' : '리뷰를 남겨주세요 :)';
        let reviewButtonSubText = (order.review_status) ? '앞으로도 더욱 좋은 음식으로 보답하겠습니다.':'추첨을 통해 무료 시식권을 드립니다 :) ';
        
        return (
            <View style={styles.container}>
                <View style={styles.content} >
                    <View style={styles.statusBox}>
                        <Text style={[styles.textBlack, styles.textFont20]}>{order.description}</Text>
                    </View>
                    {orderedMenuList}
                    <View style={styles.orderInfoBox}>
                        <View style={styles.orderInfoRow}>
                            <Text style={[styles.textBlack, styles.textBold]}>합계</Text>
                            <Text style={styles.rightText}>{order.total_price}</Text>
                        </View>
                        <View style={styles.orderInfoRow}>
                            <Text style={[styles.textBlack, styles.textBold]}>배달 시간</Text>
                            <Text style={styles.rightText}>{order.time_slot}</Text>
                        </View>
                    </View>
                    <View style={styles.reviewBox}>
                        <Image style={styles.imageStar}
                            source={require('../commonComponent/img/icon_star_filled_yellow.png')}/>
                        <View style={styles.reviewTextBox} >
                            <Text style={styles.textWhite}>{reviewButtonText}</Text>
                            <Text style={styles.textWhite}>{reviewButtonSubText}</Text>
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
        padding: 10,
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
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: Color.PRIMARY_ORANGE,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    imageStar: {
        width: 50,
        height: 50,
    },
    reviewTextBox: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    textBlack: {
        color: Color.PRIMARY_BLACK,
    },
    textFont20: {
        fontSize: 20,
    },
    textWhite: {
        color: 'white',
    }
});
