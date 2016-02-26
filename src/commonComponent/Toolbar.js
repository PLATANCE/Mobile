import React, {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import Color from '../const/Color';

export default class Toolbar extends React.Component {

	render() {
        let {
            leftIcon,
            text,
            rightIcon
        } = this.props;

		return (
			<View>
				<View style={styles.toolbar}>
                    <Image style={styles.imageLeft}
                        source={{uri: leftIcon}}/>
                    <Text style={styles.toolbarTitle}>{text}</Text>
                    <Image style={styles.imageRight}
                        source={{uri: rightIcon}}/>
				</View>
			</View>
		)
	};
}

var styles = StyleSheet.create({
	toolbar: {
        backgroundColor: Color.PRIMARY_ORANGE,
        paddingTop: 30,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        width: 50,
        backgroundColor: 'red'
    },
    imageLeft: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginLeft: 10
    },
    imageRight: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginRight: 10
    },
    toolbarTitle: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1          
    }
});