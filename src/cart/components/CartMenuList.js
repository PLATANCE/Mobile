import React, { View, ListView, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Color from '../../const/Color';
import MediaURL from '../../const/MediaURL';
import MenuPriceText from '../../commonComponent/MenuPriceText';

export default class CartMenuList extends React.Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (prevRow, nextRow) => JSON.stringify(prevRow) !== JSON.stringify(nextRow),
        });

        const cart = Object.assign({}, this.props.cart);
        this.state = {
            cart: cart,
            dataSource: dataSource.cloneWithRows(cart),
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.cart) != JSON.stringify(this.state.cart)) {

            const cart = Object.assign({}, nextProps.cart);
            this.setState({
                cart: cart,
                dataSource: this.state.dataSource.cloneWithRows(cart),
            });
        }
    }

    renderRow(rowData) {
        const {
            addItemToCart,
        } = this.props;
        console.log(rowData);
        let imageURL = MediaURL.MENU_URL + rowData.imageUrlMenu;
        return (
            <View style={styles.row}>
                <Image style={styles.menuImage}
                	source={{ uri: imageURL }} />
                <View style={styles.menuInfoBox}>
                	<Text style={[styles.textBlack, styles.textBold]}>{rowData.menuNameKor}</Text>
                	<Text style={[styles.textBlack, {flex: 1}]}>{rowData.menuNameEng}</Text>
                	<View style={styles.priceBox}>
                		<MenuPriceText originalPrice={rowData.price} sellingPrice={rowData.altPrice} align={{textAlign: 'left'}}/>
                		<View style={styles.setAmountBox}>
                            <TouchableHighlight underlayColor={'transparent'}>
                    			<Image style={styles.iconImage}
                                    source={require('../img/icon_minus.png')}/>
                            </TouchableHighlight>
                			<Text style={styles.amountText}>{rowData.amount}</Text>
                            <TouchableHighlight underlayColor={'transparent'}
                                onPress={ () => addItemToCart(rowData.menuDIdx, rowData.menuIdx, rowData.price, rowData.altPrice, rowData.imageUrlMenu, rowData.menuNameKor, rowData.menuNameEng) }  >
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
	        		renderRow={this.renderRow.bind(this)}
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
