'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet, WebView, Dimensions } from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';
import { Font, normalize } from '../const/Font';
import Tabs from 'react-native-tabs';

const TERM_URL = 'http://api.plating.co.kr/app/term.html';
const PRIVACY_URL = 'http://api.plating.co.kr/app/privacy.html';


export default class CSPolicyPage extends Component {
    constructor(props) {
        super(props);
        if(props.uri && props.page) {
            this.state = { 
                page: this.props.page,
                uri: this.props.uri,
            };
        } else {
            this.state = { 
                page: 'servicePolicy',
                uri: TERM_URL,
            };
        }
    }

    changeWebViewURI(element) {
        this.setState({ 
            page: element.props.name,
        });
        if(element.props.name == 'privacyPolicy') {
            this.setState({ 
                uri: PRIVACY_URL,
            });
        } else {
            this.setState({ 
                uri: TERM_URL,
            });
        }
        
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textBox}>
                    <Text style={Font.DEFAULT_FONT_BLACK}>회원가입과 동시에 플레이팅의 서비스 이용약관과</Text>
                    <Text style={Font.DEFAULT_FONT_BLACK}>개인정보 취급방침에 동의하시게 됩니다.</Text>
                </View>
                <WebView 
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{ uri: this.state.uri }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                />
                <Tabs style={styles.tabStyle} 
                    selected={this.state.page}
                    selectedStyle={Font.DEFAULT_FONT_ORANGE}
                    onSelect={ (el) => this.changeWebViewURI(el) } 
                >
                    <Text name={"servicePolicy"} style={Font.DEFAULT_FONT_BLACK}>서비스 이용약관</Text>
                    <Text name={"privacyPolicy"} style={Font.DEFAULT_FONT_BLACK}>개인정보 취급방침</Text>
                </Tabs>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
    tabStyle: {
        backgroundColor: 'white',
    },
    textBox: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: normalize(16),
    },
    webView: {
        width: Const.WIDTH,
    }
});
