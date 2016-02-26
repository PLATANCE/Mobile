'use strict';
import React, { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

export default class BannerDetailPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
            	<Image style={styles.img} 
                    source={{uri: this.props.url}}/>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        flex: 1,
        resizeMode: 'contain',
    }
});
