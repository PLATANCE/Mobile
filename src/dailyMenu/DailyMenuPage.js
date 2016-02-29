'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import DailyMenuList from './components/DailyMenuList';
import Color from '../const/Color';
import Const from '../const/Const';

export default class DailyMenuPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.pageCommentBox}>
                    <Text style={styles.pageCommentText}>모든 메인메뉴는 전자렌지 조리용입니다.</Text>
                </View>
                <View style={styles.content}>
                    <DailyMenuList styles={styles.menuList} menus={this.props.menus} />
                    <View style={styles.addressBox}>
                        <Image style={styles.img}
                            source={require('./img/address_marker.png')} />
                        <Text style={styles.addressText}>{this.props.address.address}&nbsp;{this.props.address.addressDetail}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Const.CONTAINER_MARGIN_TOP,
    },
    pageCommentBox: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: 30,
        justifyContent: 'center',
    },
    pageCommentText: {
        color: Color.PRIMARY_ORANGE,
    },
    content: {
        flex: 1,
        backgroundColor: Color.PRIMARY_BACKGROUND,
    },
    menuList: {
        flex: 1,
    },
    addressBox: {
        height: 30,
        backgroundColor: 'white',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    img: {
        marginLeft: 10,
        width: 20,
        height: 20,
    },
    addressText: {
        flex: 1,
        color: Color.PRIMARY_ORANGE,
        marginLeft: 10,
    }
});