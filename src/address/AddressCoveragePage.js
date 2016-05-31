'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import Const from '../const/Const';


export default class AddressCoveragePage extends Component {

    render() {
        return (
            <View>
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
