'use strict';
import React, { View, Text, StyleSheet, WebView, Dimensions } from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';
import Tabs from 'react-native-tabs';

let TEST_URL = 'http://api.plating.co.kr/app/term.html';


export default class CSPolicyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { page: 'servicePolicy' };
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textBox}>
                    <Text style={styles.textBlack}>회원가입과 동시에 플레이팅의 서비스 이용약관과</Text>
                    <Text style={styles.textBlack}>개인정보 취급방침에 동의하시게 됩니다.</Text>
                </View>
                <WebView 
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{uri: TEST_URL}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                />
                <Tabs style={styles.tabStyle} selected={this.state.page} selectedStyle={styles.tabSelectedStyle}
                    onSelect={el=>this.setState({page:el.props.name})}>
                    <Text name={"servicePolicy"}>서비스 이용약관</Text>
                    <Text name={"privacyPolicy"}>개인정보 취급방침</Text>
                </Tabs>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.PRIMARY_BACKGROUND,
        marginTop: Const.MARGIN_TOP,
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
    tabStyle: {
        backgroundColor: 'white',
    },
    tabSelectedStyle: {
        color: Color.PRIMARY_ORANGE,
    },
    textBox: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    textBlack: {
        color: Color.PRIMARY_BLACK,
    },
    webView: {
        width: Const.WIDTH,
        margin: 10,
    }
});
