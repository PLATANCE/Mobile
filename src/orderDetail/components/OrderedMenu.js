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
                    <View style={styles.leftBox}>
                        <Text>{name}</Text>
                        <Text>{foreignName}</Text>
                    </View>
                    <View style={styles.rightBox}>
                        <Text>{amount}인분</Text>
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
    },
    menuBox: {
        flexDirection: 'row',
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusText: {
    },
    leftBox: {

    },
    rightBox: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    }
});
