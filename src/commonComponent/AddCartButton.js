'use strict';
import React, {
    PropTypes,
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import Color from '../const/Color';

export default class AddCartButton extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.addCartButton}>+추가하기</Text>
            </View>
        );
    }
}

/*
 * Style
 */
let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.PRIMARY_ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addCartButton: {
        color: 'white',
    }
});
