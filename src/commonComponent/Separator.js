import React, {
    Component,
} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import Color from '../const/Color';

export default class Separator extends Component {
	render() {
		return (
			<View style={styles.separator} />
		)
	};
}

var styles = StyleSheet.create({
	separator: {
        borderColor: Color.PRIMARY_GRAY,
        borderWidth: 0.5,
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
    },
});