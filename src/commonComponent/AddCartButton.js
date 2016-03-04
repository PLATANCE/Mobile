'use strict';
import React, {
    PropTypes,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native';

import Color from '../const/Color';

export default class AddCartButton extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} 
                    source={require('./img/icon_plus.png')}/>
                <Text style={styles.addCartButton}>추가하기</Text>
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
        flexDirection: 'row',
        backgroundColor: Color.PRIMARY_ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        borderColor: Color.PRIMARY_ORANGE,
    },
    addCartButton: {
        color: 'white',
    },
    image: {
        width: 10,
        height: 10,
        marginRight: 3,
        resizeMode: 'contain',
    },
});
