import React, {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

export default class Toolbar extends React.Component {
	render() {
		return (
			<View>
				<View style={styles.toolbar}>
					<Text style={styles.toolbarButton}>Back</Text>
                    <Text style={styles.toolbarTitle}>TODAY'S MENU</Text>
                    <Text style={styles.toolbarButton}>장바구니</Text>
				</View>
			</View>
		)
	};
}

var styles = StyleSheet.create({
	toolbar: {
        backgroundColor:'#E27149',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row'    //Step 1
    },
    toolbarButton: {
        width: 50,            //Step 2
        color:'#fff',
        textAlign:'center'
    },
    toolbarTitle: {
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
        flex:1                //Step 3
    }
});