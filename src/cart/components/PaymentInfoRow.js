'use strict';
import React, {
    PropTypes,
    View,
    Text,
    StyleSheet
} from 'react-native';

import Color from '../../const/Color';

export default class PaymentInfoRow extends React.Component {
    commaPrice(price) {
        price = String(price);
        return price.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }
	static propTypes = {
        headerText: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        userInput: PropTypes.string.isRequired,
    };

    render() {
        let {
            headerText,
            price,
            userInput,
            headerStyle,
            priceStyle
        } = this.props;

        if(userInput == 'Y') {
            return (
                <View style={styles.container}>
                    <Text style={[styles.headerText, headerStyle]}>{headerText}</Text>
                    <Text style={[styles.price, priceStyle]}>{this.commaPrice(price.toLocaleString())}원</Text>
                    <Text style={styles.userInput}>></Text>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Text style={[styles.headerText, headerStyle]}>{headerText}</Text>
                    <Text style={[styles.price, priceStyle]}>{this.commaPrice(price.toLocaleString())}원</Text>
                    <Text style={styles.userInput}></Text>
                </View>
            );
        }
        
    }
}


let styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 40,
        backgroundColor: 'white',
        alignItems: 'center',
        marginBottom: 1,
    },
    headerText: {
        paddingLeft: 5,
    },
    price: {
        flex: 4,
        textAlign: 'right',
        paddingRight: 5,
    },
    userInput: {
        width: 30,
        textAlign: 'center',
        paddingRight: 5,
    }
});