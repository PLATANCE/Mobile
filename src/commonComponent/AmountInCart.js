'use strict';
import React, {
    PropTypes,
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Color from '../const/Color';
import Modal from 'react-native-modal';

export default class AmountInCart extends React.Component {
    static propTypes = {
        amount: PropTypes.number.isRequired,
    };

    render() {
        let {
            amount
        } = this.props;

        if (amount > 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>{amount} 개가 장바구니에 있습니다.</Text>
                </View>

            );
        } else {
            return (
                <View style={styles.containerNothing}>
                </View>
            );
        }
    }
}

/*
 * Style
 */
let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.PRIMARY_YELLOW,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerNothing: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    text: {
        color: 'white',
    }
});
