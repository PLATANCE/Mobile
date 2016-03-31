import React, { View, ListView, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Color from '../../const/Color';

export default class AddressCoverageList extends React.Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(props.addressCoverages)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.addressCoverages !== this.props.addressCoverages) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.addressCoverages)
            })
        }
    }

    renderRow(rowData) {
        var dongList = '';
        let dongArray = rowData.dong;
        dongArray.forEach(dong => {
            dongList += dong.name + ', ';
        });
        dongList = dongList.substring(0, dongList.length - 2);
        return (
            <View style={styles.row}>
                <Text style={[styles.textBlack, styles.textBold, styles.textSize15]}>{rowData.gu}</Text>
                <Text style={[styles.textBlack, {marginTop: 5}]}>{dongList}</Text>
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
        marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        height: 100,

    },
    textBlack: {
        color: Color.PRIMARY_BLACK,
    },
    textBold: {
        fontWeight: 'bold',
    },
    textSize15: {
        fontSize: 15,
    },
});
