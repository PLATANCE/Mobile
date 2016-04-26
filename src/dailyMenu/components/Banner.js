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

const rowHeightRatio = 0;
if(PixelRatio.get() === 2) {
    rowHeightRatio = 0.75;
} else if(PixelRatio.get() === 3) {
    rowHeightRatio = 1;
}
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
        height: 130 * rowHeightRatio,
    },
    img: {
        flex: 1,
        resizeMode: 'stretch',
    },
    containerNothing: {
        height: 0,
    }
});
