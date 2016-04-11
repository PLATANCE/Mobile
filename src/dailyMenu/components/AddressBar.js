'use strict';
import React, {
    PropTypes,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    PixelRatio,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Color from '../../const/Color';
import Const from '../../const/Const';
import Font from '../../const/Font';

export default class AddressBar extends React.Component {
    static propTypes = {
        address: PropTypes.string.isRequired,
        addressDetail: PropTypes.string.isRequired,
    };

    render() {
        let {
            address,
            addressDetail
        } = this.props;

        if (address != undefined && addressDetail != undefined) {
            return (
                <TouchableHighlight onPress={Actions.MyAddressPage}>
	                <View style={styles.container}>
	                    <Image style={styles.img}
	                        source={require('../img/address_marker.png')} />
	                    <Text style={Font.DEFAULT_FONT_ORANGE}>{address}&nbsp;{addressDetail}</Text>
	                </View>
                </TouchableHighlight>

            );
        } else {
            return (
                <TouchableHighlight onPress={Actions.AddAddressPage}>
	                <View style={styles.container}>
	                    <Image style={styles.img}
	                        source={require('../img/address_marker.png')} />
	                    <Text style={Font.DEFAULT_FONT_ORANGE}>먼저, 배달 가능 지역을 확인해주세요 :)</Text>
	                </View>
                </TouchableHighlight>
            );
        }
    }
}

/*
 * Style
 */
let styles = StyleSheet.create({
    container: {
        height: 35 * Const.DEVICE_RATIO,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    img: {
        marginLeft: 10 * Const.DEVICE_RATIO,
        width: 20 * Const.DEVICE_RATIO,
        height: 20 * Const.DEVICE_RATIO,
    },
    text: {
        flex: 1,
        marginLeft: 10,
    }
});
