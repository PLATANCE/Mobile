'use strict';
import React, { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import Const from '../const/Const';


export default class AddressCoveragePage extends React.Component {

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
        marginTop: Const.MARGIN_TOP,
    },
    img: {
        flex: 1,
        resizeMode: 'contain',
    }
});
