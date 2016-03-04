import React, { View, ListView, Text, StyleSheet, Image } from 'react-native';
import Color from '../../const/Color';

export default class MyAddressList extends React.Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(props.addressList)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.addressList !== this.props.addressList) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.addressList)
            })
        }
    }

    renderRow(rowData) {
        let leftIcon = rowData.address.inUse ? require('../img/check_circle.png') : require('../img/empty_circle.png');
        let textStyle = rowData.address.deliveryAvailable ? {color: Color.PRIMARY_BLACK} : {color: Color.PRIMARY_GRAY};
        
        if (rowData.address.deliveryAvailable) {
            return (
                <View style={styles.row}>
            	<Image style={styles.img} source={leftIcon}/>
            	<View style={styles.addressBox}>
                	<Text style={textStyle}>{rowData.address.address}</Text>
                	<Text style={textStyle}>{rowData.address.addressDetail}</Text>
                </View>
                <Text style={styles.deleteText}>삭제</Text>
    		</View>
            );
        } else {
            return (
                <View style={styles.row}>
            	<Image style={styles.img} source={leftIcon}/>
            	<View style={styles.addressBox}>
                	<Text style={textStyle}>{rowData.address.address}</Text>
                	<Text style={textStyle}>{rowData.address.addressDetail}</Text>
                	<Text style={{color:'red'}}>배달이 불가능한 지역입니다.</Text>
                </View>
                <Text style={styles.deleteText}>삭제</Text>
    		</View>
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
	        	<ListView
	        		dataSource={this.state.dataSource}
	        		renderRow={this.renderRow}
	        	/>
        	</View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: Color.PRIMARY_GRAY,
    },
    img: {
        width: 30,
        height: 30,
    },
    addressBox: {
    	flex: 1,
        marginLeft: 10,
    	justifyContent: 'center',
    },
    deleteText: {
    	color: Color.PRIMARY_ORANGE,
    	textDecorationLine: 'underline'
    }
});
