import React, { View, ListView, Text, StyleSheet, Image } from 'react-native';
import Color from '../../const/Color';
import MenuPriceText from '../../commonComponent/MenuPriceText';

export default class CartMenuList extends React.Component {
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
                <Image style={styles.menuImage}
                	source={{uri:rowData.url}} />
                <View style={styles.menuInfoBox}>
                	<Text>{rowData.name}</Text>
                	<Text>{rowData.foreignName}</Text>
                	<View style={styles.spaceBox} />
                	<View style={styles.priceBox}>
                		<MenuPriceText originalPrice={rowData.originalPrice} sellingPrice={rowData.sellingPrice} align={{textAlign: 'left'}}/>
                        <View style={styles.spaceBox} />
                		<View style={styles.setamountBox}>
                			<View style={styles.setAmount}>
                				<Text style={styles.setAmountText}>-</Text>
                			</View>
                			<Text style={styles.amountText}>{rowData.amount}</Text>
                			<View style={styles.setAmount}>
                				<Text style={styles.setAmountText}>+</Text>
                			</View>
                		</View>
                	</View>
                </View>
    		</View>
        );
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
		backgroundColor: 'white',
	},
    row: {
    	height: 90,
    	flexDirection: 'row',
    	marginTop: 10,
    	marginLeft: 10,
    },
    menuImage: {
    	flex: 2,
    	resizeMode: 'cover',
    },
    menuInfoBox: {
    	flex: 5,
    	marginLeft: 5,
    },
    spaceBox: {
    	flex: 1,
    },
    priceBox: {
    	flexDirection: 'row',
    	alignItems: 'center',
        marginBottom: 5,
    },
    setamountBox: {
    	flexDirection: 'row',
    	justifyContent: 'flex-end',
    	alignItems: 'flex-end',
    },
    amountText: {
    	marginRight: 20,
    },
    setAmount: {
    	height: 20,
    	width: 20,
        backgroundColor: Color.PRIMARY_ORANGE,
        borderColor: Color.PRIMARY_ORANGE,
        borderWidth: 1,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    setAmountText: {
    	color: 'white',
    	fontSize: 17,
    	fontWeight: 'bold'
    }

});
