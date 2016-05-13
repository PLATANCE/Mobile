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
import Mixpanel from '../../util/mixpanel';
import { Font, normalize } from '../../const/Font';

export default class Banner extends React.Component {
    static propTypes = {

    };

    render() {
        let {
            url,
        } = this.props;
        
        return (
            <TouchableHighlight onPress={ () => { Actions.BannerDetailPage(),  Mixpanel.track('Click Banner') }} underlayColor={'transparent'}>
                <View style={styles.container}>
                    <Image style={styles.img}
                        source={{uri: "http://plating.co.kr/app/media/banner/admin_banner_ver2.png"}} />
                </View>
            </TouchableHighlight>
        );

    }
}

let styles = StyleSheet.create({
    container: {
        height: normalize(130),
    },
    img: {
        flex: 1,
        resizeMode: 'stretch',
    },
    containerNothing: {
        height: 0,
    }
});
