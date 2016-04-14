'use strict';
import React, {
    View,
    StyleSheet,
    Image,
} from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';

export default class PlaceholderView extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.img}
                    source={require('./img/placeholder.png')}/>
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
        marginTop: Const.MARGIN_TOP,
    },
    img: {
        height: Const.HEIGHT,
        width: Const.WIDTH,
        resizeMode: 'contain'
    },
});
