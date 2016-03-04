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
        isBannerOpen: PropTypes.bool.isRequired,
    };

    render() {
        let {
            isBannerOpen,
            url,
        } = this.props;

        if (isBannerOpen) {
            return (
                <TouchableHighlight onPress={Actions.BannerDetailPage} underlayColor={'transparent'}>
	                <View style={styles.container}>
	                    <Image style={styles.img}
	                        source={{uri: url}} />
	                </View>
                </TouchableHighlight>

            );
        } else {
            return (
	            <View style={styles.containerNothing} />
            );
        }
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
