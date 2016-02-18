import React, { View, ListView, Text, StyleSheet } from 'react-native';

export default class DailyMenuList extends React.Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(props.menus)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.menus !== this.props.menus) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.menus)
            })
        }
    }

    renderRow(rowData) {
        return (
            <View style={styles.row}>
    			<Text>{rowData.idx}</Text>
    			<Text>{rowData.menuImage}</Text>
    			<Text>{rowData.chefImage}</Text>
    			<Text>{rowData.menuName}</Text>
    			<Text>{rowData.chefName}</Text>
    			<Text>{rowData.star}</Text>
    			<Text>{rowData.price}</Text>
    		</View>
        );
    }

    render() {
        return (
            <View>
	        	<ListView
	        		dataSource={this.state.dataSource}
	        		renderRow={this.renderRow}
	        	/>
        	</View>
        );
    }
}

let styles = StyleSheet.create({
	row: {
	    margin: 10,
	    backgroundColor: 'orange',
        justifyContent: 'center',
	}
});
