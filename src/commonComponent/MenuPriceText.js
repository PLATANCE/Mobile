'use strict';
import React, {
    PropTypes,
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Color from '../const/Color';

export default class MenuPriceText extends React.Component {
    static propTypes = {
        
    };
    commaPrice(price) {
        price = String(price);
        return price.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }

    render() {
        let {
            originalPrice,
            sellingPrice,
            align
        } = this.props;

        if (originalPrice == sellingPrice) {
            return (
                <View style={styles.container}>
                    <Text style={[styles.sellingPriceText, align]}>{this.commaPrice(sellingPrice)}원</Text>
                </View>

            );
        } else {
            return (
                <View style={styles.container}>
                    <Text style={[styles.originalPriceText, align]} >{this.commaPrice(originalPrice)}원</Text>
                    <Text style={[styles.sellingPriceText, align]} >{this.commaPrice(sellingPrice)}원</Text>
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
    },
    originalPriceText: {
        color: Color.PRIMARY_GRAY,
        textDecorationLine: 'line-through',
        textAlign: 'right',
    },
    sellingPriceText: {
        color: Color.PRIMARY_BLACK,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    line: {
        borderColor: 'red',
        borderWidth: 0.5,
        overflow: 'visible',
        position: 'absolute',
    },

});
