'use strict';
import React, {
    PropTypes,
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Color from '../const/Color';

export default class PageComment extends React.Component {
    static propTypes = {
        
    };

    render() {
        let {
            text
        } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.text}>{text}</Text>
            </View>

        );
    }
}

/*
 * Style
 */
let styles = StyleSheet.create({
    container: {
        height: 32,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: Color.PRIMARY_ORANGE,
    }
});
