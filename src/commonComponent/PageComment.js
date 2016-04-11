'use strict';
import React, {
    PropTypes,
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';
import Font from '../const/Font';

export default class PageComment extends React.Component {
    static propTypes = {
        
    };

    render() {
        let {
            text
        } = this.props;

        return (
            <View style={styles.container}>
                <Text style={Font.DEFAULT_FONT_ORANGE}>{text}</Text>
            </View>

        );
    }
}

/*
 * Style
 */
let styles = StyleSheet.create({
    container: {
        height: 32 * Const.DEVICE_RATIO,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
