'use strict';
import React, { View, Text, StyleSheet, TouchableHighlight, Image, WebView } from 'react-native';
import Const from '../const/Const';

export default class BannerDetailPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <WebView style={styles.webView}
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
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
        marginTop: Const.MARGIN_TOP,
    },
    webView: {
        flex: 1,
    }
});
