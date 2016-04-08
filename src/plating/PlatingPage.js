'use strict';
import React, { View, StyleSheet, WebView } from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';
import MediaURL from '../const/MediaURL';

export default class PlatingPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <WebView style={styles.webView}
                    automaticallyAdjustContentInsets={false}
                    source={{uri: "http://www.plating.co.kr/admin/what_is_plating.php"}}
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
        backgroundColor: Color.PRIMARY_BACKGROUND,
        marginTop: Const.MARGIN_TOP,
    },
    webView: {
        flex: 1,
    }
});