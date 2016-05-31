'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Color from '../const/Color';
import { Font, normalize } from '../const/Font';

export default class MenuPriceTextInRow extends Component {
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
                    <Text style={[styles.sellingPriceText, align, Font.DEFAULT_FONT_BLACK_BOLD]}>{this.commaPrice(sellingPrice)}원</Text>
                </View>

            );
        } else {
            return (
                <View style={styles.container}>
                    <Text style={[styles.originalPriceText, align, Font.DEFAULT_FONT_GRAY_LINETHROUGH]} >{this.commaPrice(originalPrice)}원</Text>
                    <Text style={[styles.sellingPriceText, align, Font.DEFAULT_FONT_BLACK_BOLD, {marginLeft: normalize(5),}]} >{this.commaPrice(sellingPrice)}원</Text>
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
        flexDirection: 'row',
    },
    originalPriceText: {
        textAlign: 'right',
    },
    sellingPriceText: {
        textAlign: 'right',
    },
});
