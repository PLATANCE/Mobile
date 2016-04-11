import React, { Alert, View, ListView, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Color from '../../const/Color';
import Const from '../../const/Const';
import Font from '../../const/Font';

export default class FAQList extends React.Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(props.FAQ)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.FAQ !== this.props.FAQ) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.FAQ)
            })
        }
    }
    openAlertAnswer(question, answer) {
        Alert.alert(question, answer);
    }

    renderRow(rowData) {
        let question = rowData.question;
        let answer = rowData.answer;
        return (
            <TouchableHighlight onPress={() => this.openAlertAnswer(question, answer)} underlayColor={'transparent'}>
                <View style={styles.row}>
                    <Image style={styles.img} 
                        source={require('../../commonComponent/img/icon_input.png')}/>
                    <Text style={[styles.textBlack, Font.DEFAULT_FONT_BLACK]}>{rowData.question}</Text>
        		</View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View>
	        	<ListView
	        		dataSource={this.state.dataSource}
	        		renderRow={this.renderRow.bind(this)}
	        	/>
        	</View>
        );
    }
}

let styles = StyleSheet.create({
    row: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        height: 50 * Const.DEVICE_RATIO,
    },
    textBlack: {
        marginLeft: 10,
    },
    img: {
        width: 10 * Const.DEVICE_RATIO,
        height: 10 * Const.DEVICE_RATIO,
    }
});
