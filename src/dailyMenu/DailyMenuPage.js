'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image, ScrollView } from 'react-native';
import DailyMenuList from './components/DailyMenuList';
import AddressBar from './components/AddressBar';
import Banner from './components/Banner';
import PageComment from '../commonComponent/PageComment';
import Color from '../const/Color';
import Const from '../const/Const';

export default class DailyMenuPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <PageComment text='모든 메뉴는 당일 조리, 당일 배송 됩니다(5:30pm~10:00pm)' />
                <View style={styles.content}>
                    <ScrollView>
                        <Banner isBannerOpen={this.props.banner.isBannerOpen} url={this.props.banner.url}/>
                        <DailyMenuList styles={styles.menuList} menus={this.props.menus} />
                    </ScrollView>
                    <AddressBar address={this.props.address.address} addressDetail={this.props.address.addressDetail}/>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Const.MARGIN_TOP,
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
    img: {
        marginLeft: 10,
        width: 20,
        height: 20,
    },
});
