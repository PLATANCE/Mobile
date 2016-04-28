'use strict';
import React, {
    PropTypes,
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';
import { Font, normalize } from '../const/Font';

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
        height: normalize(32),
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
