import React, { Alert, View, ListView, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Color from '../../const/Color';

export default class FAQList extends React.Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(props.questions)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.questions !== this.props.questions) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.questions)
            })
        }
    }
    test(content) {
        Alert.alert("Plating 이란?", content);
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight onPress={() => this.test(rowData.content)} underlayColor={'transparent'}>
                <View style={styles.row}>
                    <Image style={styles.img} 
                        source={require('../../commonComponent/img/icon_input.png')}/>
                    <Text style={styles.textBlack}>{rowData.title}</Text>
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

    },
    textBlack: {
        color: Color.PRIMARY_BLACK,
        marginLeft: 10,
    },
    img: {
        width: 10,
        height: 10,
    }
});
