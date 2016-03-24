'use strict';
import React, {
    PropTypes,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Color from '../../const/Color';

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

        if (address != '' && addressDetail != '') {
            return (
                <TouchableHighlight onPress={Actions.MyAddressPage}>
	                <View style={styles.container}>
	                    <Image style={styles.img}
	                        source={require('../img/address_marker.png')} />
	                    <Text style={styles.text}>{address}&nbsp;{addressDetail}</Text>
	                </View>
                </TouchableHighlight>

            );
        } else {
            return (
                <TouchableHighlight onPress={Actions.AddAddressPage}>
	                <View style={styles.container}>
	                    <Image style={styles.img}
	                        source={require('../img/address_marker.png')} />
	                    <Text style={styles.text}>먼저, 배달 가능 지역을 확인해주세요 :)</Text>
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
        height: 35,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    img: {
        marginLeft: 10,
        width: 20,
        height: 20,
    },
    text: {
        flex: 1,
        color: Color.PRIMARY_ORANGE,
        marginLeft: 10,
    }
});
