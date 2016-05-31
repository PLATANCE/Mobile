'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image, WebView } from 'react-native';
import Const from '../const/Const';

export default class BannerDetailPage extends Component {

    render() {
        console.log(this.props);
        return (
            <View style={styles.container} >
                <WebView style={styles.webView}
                    automaticallyAdjustContentInsets={false}
                    source={{uri: "http://www.plating.co.kr/admin/admin_banner_main.php"}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true} />
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webView: {
        flex: 1,
    }
});
