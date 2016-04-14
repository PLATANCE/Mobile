import React, { View, ListView, Text, StyleSheet, Image, TouchableHighlight, PixelRatio } from 'react-native';
import Color from '../../const/Color';
import Const from '../../const/Const';
import Font from '../../const/Font';
import MediaURL from '../../const/MediaURL';
import MenuReviewStars from '../../commonComponent/MenuReviewStars';
import MenuPriceText from '../../commonComponent/MenuPriceText';
import AddCartButton from '../../commonComponent/AddCartButton';
import AmountInCart from '../../commonComponent/AmountInCart';
import SoldOutView from '../../commonComponent/SoldOutView';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';


export default class DailyMenuList extends React.Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (prevRow, nextRow) => (_.isEqual(prevRow, nextRow) == false),
        });

        const rows = this.generateRows(props.cart, props.menus);

        this.state = {
            dataSource: dataSource.cloneWithRows(rows),
        }
    }

    componentWillReceiveProps(nextProps) {
        const rows = this.generateRows(nextProps.cart, nextProps.menus);

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(rows),
        });
    }


    generateRows(cart, menus) {
        let rows = [];

        menus.forEach(menu => {
            const menuIdx = menu.menu_idx;
            let amount;

            if(cart && cart[menuIdx]) {
                amount = cart[menuIdx].amount;
            } else {
                amount = 0;
            }

            let row = Object.assign({}, menu, {
                amount
            });

            rows.push(row);
        });

        return rows;
    }

    renderRow(rowData) {      
        const {
            addItemToCart
        } = this.props;

        let menuName = rowData.name_menu;
        let menuNameKor = menuName.split('.')[0];
        let menuNameEng = menuName.split('.')[1];

        let menuURL = MediaURL.MENU_URL + rowData.image_url_menu;
        let chefURL = MediaURL.CHEF_URL + rowData.image_url_chef;
        let isSoldOut = (rowData.stock == 0 || rowData.stock < 0) ? true : false;
        let enableAddButton = (rowData.stock != 0) ? true : false;
        let contentInnerMenu = false;

        if(isSoldOut) {
            contentInnerMenu = <SoldOutView stock={rowData.stock} />
        } else if(rowData.amount && rowData.amount > 0){
            contentInnerMenu = <View style={styles.amountInCart}>
                                    <AmountInCart amount={rowData.amount}/>
                                </View>;
        }
        
        return (

            <View style={styles.row}>
                <View style={styles.menuDetailBox}>
                    <TouchableHighlight style={styles.menuImageBox} 
                        onPress={()=>Actions.MenuDetailPage({ menuIdx: rowData.menu_idx, menuDIdx: rowData.idx, stock: rowData.stock })} 
                        underlayColor={'transparent'}>
                        <Image style={styles.menuImage}
                            source={{uri: menuURL}} >
                            {contentInnerMenu}
                        </Image>
                    </TouchableHighlight>
                    <View style={styles.menuChefBox}>
                        <View style={styles.chefImageBox}>
                            <Image style={styles.chefImage}
                                source={{uri: chefURL}} /> 
                        </View>
                        <View style={styles.menuChef}>
                            <Text style={Font.DEFAULT_FONT_BLACK_BOLD}>{menuNameKor}</Text>
                            <Text style={Font.DEFAULT_FONT_BLACK}>{menuNameEng}</Text>
                            <View style={styles.chefNameBox}>
                                <Text style={Font.DEFAULT_FONT_ORANGE}>{rowData.name_chef}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                
                <View style={styles.reviewPriceBox}>
                    <View style={styles.reviewBox}>
                        <MenuReviewStars score={rowData.rating}/>
                        <Text style={[styles.reviewCountText, Font.DEFAULT_FONT_GRAY]}>({rowData.review_count})</Text>
                    </View>
                    <View style={styles.priceBox}>
                        <MenuPriceText originalPrice={rowData.price} sellingPrice={rowData.alt_price} align={{textAlign: 'right'}}/>
                    </View>
                    <View style={styles.cartButtonBox}>
                        <TouchableHighlight style={[styles.iconView, {marginRight: 5}]} onPress={ () => Actions.MenuDetailPage({ menuIdx: rowData.menu_idx, menuDIdx: rowData.idx }) } underlayColor={Color.PRIMARY_ORANGE}>
                            <Image style={styles.iconImage} 
                                source={require('../../commonComponent/img/icon_detail.png')}/>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.iconView} 
                            underlayColor={Color.PRIMARY_ORANGE} 
                            onPress={ () => addItemToCart(rowData.idx, rowData.menu_idx, rowData.price, rowData.alt_price, rowData.image_url_menu, menuNameKor, menuNameEng, enableAddButton) } >
                            <Image style={styles.iconImage} 
                                source={require('../../commonComponent/img/icon_plus.png')}/>
                        </TouchableHighlight>
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
        marginTop: 10 * Const.DEVICE_RATIO,
    },
    row: {
        justifyContent: 'center',
        height: 400 * Const.DEVICE_RATIO,
        backgroundColor: 'white',
        marginTop: 10 * Const.DEVICE_RATIO,
        marginBottom: 10 * Const.DEVICE_RATIO,
    },
    menuDetailBox: {
        height: 350 * Const.DEVICE_RATIO,
    },
    menuImageBox: {
        height: 250 * Const.DEVICE_RATIO,
        backgroundColor: 'black',
    },
    menuImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    amountInCart: {
        height: 40 * Const.DEVICE_RATIO,
        flexDirection: 'row',
        left: 0,
        top: 210 * Const.DEVICE_RATIO,
    },
    menuChefBox: {
        height: 100 * Const.DEVICE_RATIO,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
    },
    chefImageBox: {
        flex: 1,
    },
    chefImage: {
        flex: 1,
        resizeMode: 'contain',
    },
    menuChef: {
        flex: 4,
        paddingLeft: 5,
        paddingBottom: 10 * Const.DEVICE_RATIO,
        paddingTop: 10 * Const.DEVICE_RATIO,
    },
    textBlack: {
        color: Color.PRIMARY_BLACK,
    },
    textBold: {
        fontWeight: 'bold',
    },
    chefNameBox: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    reviewPriceBox: {
        height: 50  * Const.DEVICE_RATIO,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10, 
    },
    reviewBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    reviewCountText: {
        marginLeft: 5,
    },
    priceBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 10,
    },
    cartButtonBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconView: {
        width: 35 * Const.DEVICE_RATIO,
        height: 35 * Const.DEVICE_RATIO,
        backgroundColor: Color.PRIMARY_ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Color.PRIMARY_ORANGE,
        overflow: 'hidden',
        marginRight: 0,
    },
    iconImage: {
        width: 15 * Const.DEVICE_RATIO,
        height: 15 * Const.DEVICE_RATIO,
        resizeMode: 'contain',
    },
});
