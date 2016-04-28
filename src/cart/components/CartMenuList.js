import React, { View, ListView, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Color from '../../const/Color';
import Const from '../../const/Const';
import { Font, normalize } from '../../const/Font';
import MediaURL from '../../const/MediaURL';
import MenuPriceText from '../../commonComponent/MenuPriceText';
import _ from 'lodash';

export default class CartMenuList extends React.Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (prevRow, nextRow) => _.isEqual(prevRow, nextRow) == false,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(props.cart),
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.cart),
        });
    }

    renderRow(rowData) {
        const {
            addItemToCart,
            decreaseItemFromCart,
        } = this.props;

        let imageURL = MediaURL.MENU_URL + rowData.imageUrlMenu;
        return (
            <View style={styles.row}>
                <Image style={styles.menuImage}
                    source={{ uri: imageURL }} />
                <View style={styles.menuInfoBox}>
                    <Text style={Font.DEFAULT_FONT_BLACK_BOLD}>{rowData.menuNameKor}</Text>
                    <Text style={[Font.DEFAULT_FONT_BLACK, {flex: 1}]}>{rowData.menuNameEng}</Text>
                    <View style={styles.priceBox}>
                        <MenuPriceText originalPrice={rowData.price} sellingPrice={rowData.altPrice} align={{textAlign: 'left'}}/>
                        <View style={styles.setAmountBox}>
                            <TouchableHighlight underlayColor={'transparent'}
                                onPress={ () => decreaseItemFromCart(rowData.menuDIdx, rowData.menuIdx, rowData.price, rowData.altPrice, rowData.imageUrlMenu, rowData.menuNameKor, rowData.menuNameEng) }  
                            >
                                <Image style={styles.iconImage}
                                    source={require('../img/icon_minus.png')}/>
                            </TouchableHighlight>
                            <Text style={[styles.amountText, Font.DEFAULT_FONT_BLACK]}>{rowData.amount}</Text>
                            <TouchableHighlight underlayColor={'transparent'}
                                onPress={ () => addItemToCart(rowData.menuDIdx, rowData.menuIdx, rowData.price, rowData.altPrice, rowData.imageUrlMenu, rowData.menuNameKor, rowData.menuNameEng, true) }  
                            >
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
        flex: 1,
        backgroundColor: 'white',
    },
    row: {
        height: normalize(90),
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
        flex: 1,
        textAlign: 'center',
    },
    iconImage: {
        width: normalize(25),
        height: normalize(25),
        resizeMode: 'contain',
    },
});
