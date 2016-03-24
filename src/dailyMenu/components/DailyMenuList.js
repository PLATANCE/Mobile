import React, { View, ListView, Text, StyleSheet, Image, TouchableHighlight, Dimensions } from 'react-native';
import Color from '../../const/Color';
import Const from '../../const/Const';
import MediaURL from '../../const/MediaURL';
import MenuReviewStars from '../../commonComponent/MenuReviewStars';
import MenuPriceText from '../../commonComponent/MenuPriceText';
import AddCartButton from '../../commonComponent/AddCartButton';
import AmountInCart from '../../commonComponent/AmountInCart';
import SoldOutView from '../../commonComponent/SoldOutView';
import { Actions } from 'react-native-router-flux';

import cart from '../../util/cart';


export default class DailyMenuList extends React.Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(props.menus),
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.menus !== this.props.menus) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.menus)
            })
        }
    }

    pushMenu(idx, dailyMenuIdx) {
        console.log("add menu");
    }

    renderRow(rowData) {
        let menuName = rowData.name_menu;
        let menuNameKor = menuName.split('.')[0];
        let menuNameEng = menuName.split('.')[1];

        let menuURL = MediaURL.MENU_URL + rowData.image_url_menu;
        let chefURL = MediaURL.CHEF_URL + rowData.image_url_chef;
        let isSoldOut = (rowData.stock == 0) ? true : false;
        let contentInnerMenu = <View style={styles.amountInCart}>
                                    <AmountInCart amount={2}/>
                                </View>;
        if(isSoldOut) {
            contentInnerMenu = <SoldOutView stock={rowData.stock} />
        }
        return (
            <View style={styles.row}>
                <View style={styles.menuDetailBox}>
                    <TouchableHighlight style={styles.menuImageBox} onPress={()=>Actions.MenuDetailPage({menuIdx: rowData.menu_idx, title: menuNameKor, stock: rowData.stock})} underlayColor={'transparent'}>
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
                            <Text style={[styles.textBlack, styles.textBold]}>{menuNameKor}</Text>
                            <Text style={styles.textBlack}>{menuNameEng}</Text>
                            <View style={styles.chefNameBox}>
                                <Text style={styles.chefNameText}>{rowData.name_chef}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                
                <View style={styles.reviewPriceBox}>
                    <View style={styles.reviewBox}>
                        <MenuReviewStars score={rowData.rating}/>
                        <Text style={styles.reviewCountText}>({rowData.review_count})</Text>
                    </View>
                    <View style={styles.priceBox}>
                        <MenuPriceText originalPrice={rowData.price} sellingPrice={rowData.alt_price} align={{textAlign: 'right'}}/>
                    </View>
                    <View style={styles.cartButtonBox}>
                        <TouchableHighlight style={[styles.iconView, {marginRight: 5}]} onPress={()=>Actions.MenuDetailPage({menuIdx: rowData.menu_idx, title: menuNameKor})} underlayColor={Color.PRIMARY_ORANGE}>
                            <Image style={styles.iconImage} 
                                source={require('../../commonComponent/img/icon_detail.png')}/>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.iconView} underlayColor={Color.PRIMARY_ORANGE} onPress={() => this.pushMenu(rowData.menu_idx, rowData.idx)}>
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
    },
    row: {
        justifyContent: 'center',
        height: 400,
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
    },
    menuDetailBox: {
        height: 350,
    },
    menuImageBox: {
        height: 250,
        backgroundColor: 'black',
    },
    menuImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    amountInCart: {
        height: 40,
        flexDirection: 'row',
        left: 0,
        top: 210,
    },
    menuChefBox: {
        height: 100,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
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
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 5,
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
    chefNameText: {
        color: Color.PRIMARY_ORANGE,
    },
    reviewPriceBox: {
        height: 50,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
    },
    reviewBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    reviewCountText: {
        color: Color.PRIMARY_GRAY,
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
        width: 35,
        height: 35,
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
        width: 15,
        height: 15,
        resizeMode: 'contain',
    },
});
