'use strict';
import React, {
    PropTypes,
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class MenuPriceText extends React.Component {
    static propTypes = {
        originalPrice: PropTypes.number.isRequired,
        sellingPrice: PropTypes.number.isRequired
    };

    render() {
        let {
            originalPrice,
            sellingPrice,
        } = this.props;

        /*
         * Style
         */
        let styles = StyleSheet.create({

        });

        return (
            <View>
                <Text>{originalPrice.toLocaleString()}원</Text>
                <Text>{sellingPrice.toLocaleString()}원</Text>
            </View>
        );
    }
}
