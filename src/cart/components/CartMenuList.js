import React, { View, ListView, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
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
                	<Text style={[styles.textBlack, styles.textBold]}>{rowData.name}</Text>
                	<Text style={[styles.textBlack, {flex: 1}]}>{rowData.foreignName}</Text>
                	<View style={styles.priceBox}>
                		<MenuPriceText originalPrice={rowData.originalPrice} sellingPrice={rowData.sellingPrice} align={{textAlign: 'left'}}/>
                		<View style={styles.setAmountBox}>
                            <TouchableHighlight underlayColor={'transparent'}>
                    			<Image style={styles.iconImage}
                                    source={require('../img/icon_minus.png')}/>
                            </TouchableHighlight>
                			<Text style={styles.amountText}>{rowData.amount}</Text>
                            <TouchableHighlight underlayColor={'transparent'}>
                        		<Image style={styles.iconImage}
                                    source={require('../img/icon_plus.png')}/>
                            </TouchableHighlight>
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
    	margin: 10,
    },
    menuImage: {
    	flex: 2,
    	resizeMode: 'cover',
    },
    menuInfoBox: {
    	flex: 5,
    	marginLeft: 10,
    },
    priceBox: {
    	flexDirection: 'row',
    	alignItems: 'flex-end',
        marginBottom: 5,
    },
    setAmountBox: {
    	flexDirection: 'row',
    	flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
    },
    amountText: {
        color: Color.PRIMARY_BLACK,
        flex: 1,
        textAlign: 'center',
    },
    iconImage: {
        width: 20,
        height: 20,
    },
    textBlack: {
        color: Color.PRIMARY_BLACK,
    },
    textBold: {
        fontWeight: 'bold',
    },
});
