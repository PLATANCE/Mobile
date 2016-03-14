'use strict';
import React, {
    PropTypes,
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Color from '../../const/Color';

export default class OrderedMenu extends React.Component {
    static propTypes = {

    };

    render() {
        let {
            name,
            foreignName,
            amount,
            status
        } = this.props;


        return (
            <View style={styles.container}>
                <View style={styles.menuBox}>
                    <View>
                        <Text style={[styles.textBlack, styles.textBold]}>{name}</Text>
                        <Text style={styles.textBlack}>{foreignName}</Text>
                    </View>
                    <View style={styles.rightBox}>
                        <Text style={styles.textBlack}>{amount}인분</Text>
                    </View>
                </View>
            </View>
        );

    }
}

/*
 * Style
 */
let styles = StyleSheet.create({
    container: { 
        backgroundColor: 'white',
        padding: 10,
    },
    menuBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightBox: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    textBlack: {
        color: Color.PRIMARY_BLACK,
    },
    textBold: {
        fontWeight: 'bold',
    }
});
