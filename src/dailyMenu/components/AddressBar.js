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
import { Font, normalize } from '../../const/Font';
import Mixpanel from '../../util/mixpanel';

export default class AddressBar extends React.Component {
    static propTypes = {
        myAddress: PropTypes.object.isRequired,
    };

    render() {
        let {
            myAddress,
        } = this.props;
        
        if (myAddress !== null) {
            const address = myAddress.address;
            const addressDetail = myAddress.address_detail;
            return (
                <TouchableHighlight 
                    onPress={ () => { Actions.MyAddressPage(),  Mixpanel.track('Set Address Banner')} } 
                    underlayColor={'transparent'}
                >
	                <View style={styles.container}>
	                    <Image style={styles.img}
	                        source={require('../img/address_marker.png')} />
	                    <Text style={Font.DEFAULT_FONT_ORANGE}>{address}&nbsp;{addressDetail}</Text>
	                </View>
                </TouchableHighlight>

            );
        } else {
            return (
                <TouchableHighlight 
                    onPress={ () => { Actions.AddAddressPage(), Mixpanel.track('Set Address Banner') } } 
                    underlayColor={'transparent'}
                >
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
        height: normalize(35),
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    img: {
        marginLeft: normalize(10),
        width: normalize(20),
        height: normalize(20),
    },
    text: {
        flex: 1,
        marginLeft: 10,
    }
});
