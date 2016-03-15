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

export default class Banner extends React.Component {
    static propTypes = {

    };

    render() {
        let {
            url,
        } = this.props;

        return (
            <TouchableHighlight onPress={Actions.BannerDetailPage} underlayColor={'transparent'}>
                <View style={styles.container}>
                    <Image style={styles.img}
                        source={{uri: "http://plating.co.kr/app/media/banner/admin_banner.png"}} />
                </View>
            </TouchableHighlight>
        );

    }
}

let styles = StyleSheet.create({
    container: {
        height: 130,
    },
    img: {
        flex: 1,
        resizeMode: 'contain',
    },
    containerNothing: {
        height: 0,
    }
});
