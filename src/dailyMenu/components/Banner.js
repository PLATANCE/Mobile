'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Color from '../../const/Color';
import Mixpanel from '../../util/mixpanel';
import { Font, normalize } from '../../const/Font';

export default class Banner extends Component {
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
                        source={{uri: "http://plating.co.kr/app/media/banner/admin_banner_ver2.png?t=" + Math.round(new Date().getTime() / 1000)}} />
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
