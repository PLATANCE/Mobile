'use strict';
import React, {
    PropTypes,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    ScrollView,
    InteractionManager,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import MenuReviewStars from '../commonComponent/MenuReviewStars';
import AddCartButton from '../commonComponent/AddCartButton';
import MenuPriceText from '../commonComponent/MenuPriceText';
import AmountInCart from '../commonComponent/AmountInCart';
import PageComment from '../commonComponent/PageComment';
import PlaceholderView from '../commonComponent/PlaceholderView';
import ReviewList from './components/ReviewList';
import Color from '../const/Color';
import Const from '../const/Const';
import Font from '../const/Font';
import RequestURL from '../const/RequestURL';
import MediaURL from '../const/MediaURL';

import { addItemToCart } from '../app/actions/CartActions';


export default class MenuDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            reviews: [],
            renderPlaceholderOnly: false,
        }
    }

    componentDidMount() {
        this.fetchMenuDetail();
    }

    fetchMenuDetail() {
        fetch(RequestURL.REQUEST_MENU_DETAIL + "?menu_idx=" + this.props.menuIdx)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    menu: responseData[0],
                    reviews: responseData[0].review,
                });
                InteractionManager.runAfterInteractions( () => {
                    this.setState({
                        renderPlaceholderOnly: true,
                    });
                })
            })
            .catch((error) => {
                console.warn(error);
            })
            .done();
    }
    renderPlaceholderView() {
        return (
            <PlaceholderView />
        );
    }
    render() {
        const { dispatch, cart, menuIdx, menuDIdx } = this.props;
        const menu = this.state.menu;
        let menuURL;
        let chefURL;
        let contentInnerMenu = false;
        let addButtonEnable;

        // place holder
        if(!this.state.renderPlaceholderOnly) {
            return this.renderPlaceholderView();
        }

        if(menu){
            const stock = this.props.stock;
            menuURL = MediaURL.MENU_URL + menu.image_url_menu;
            chefURL = MediaURL.CHEF_URL + menu.image_url_chef;
            let isSoldOut = (stock == 0 || stock < 0) ? true : false;
            addButtonEnable = (stock != 0) ? true : false;
            
            if(isSoldOut) {
                if(stock == 0) {
                    contentInnerMenu = <View style={styles.menuImageAlpha}>
                                    <Text style={[Font.DEFAULT_FONT_WHITE_BOLD, styles.textEng]}>SOLD OUT</Text>
                                    <Text style={[Font.DEFAULT_FONT_WHITE, styles.textKor]}>금일 메뉴가 매진 되었습니다.</Text>
                                </View>;
                } else if(stock < 0) {
                    contentInnerMenu = <View style={styles.menuImageAlpha}>
                                    <Text style={[Font.DEFAULT_FONT_WHITE_BOLD, styles.textEng]}>주문 마감</Text>
                                    <Text style={[Font.DEFAULT_FONT_WHITE, styles.textKor]}>오늘은 플레이팅 쉬는 날 입니다.</Text>
                                </View>;
                }
                
            } else if(cart[menu.idx] && cart[menu.idx].amount > 0){

                const amount = cart[menu.idx].amount;
                contentInnerMenu = <View style={styles.amountInCart}>
                                        <AmountInCart amount={amount}/>
                                    </View>;
            }
        }
        
        return (
            <View style={styles.container}>
                <PageComment text="모든 메인메뉴는 전자렌지 조리용입니다."/>
                <ScrollView>
                    <View style={styles.content} >
                        <View style={styles.menuNameBox}>
                            <Text style={[Font.DEFAULT_FONT_BLACK_BOLD, { fontSize: 16 * Const.DEVICE_RATIO }]}>{menu.name_menu}</Text>
                            <Text style={[Font.DEFAULT_FONT_BLACK]}>{menu.name_menu_eng}</Text>
                        </View>
                        <View style={styles.menuImageBox}>
                            <Image style={styles.menuImage}
                                source={{uri: menuURL}} >
                                {contentInnerMenu}
                            </Image>
                        </View>
                        <View style={styles.reviewPriceBox}>
                            <View style={styles.reviewBox}>
                                <MenuReviewStars score={menu.rating}/>
                                
                                <TouchableHighlight onPress={() =>Actions.MenuReviewPage({menuIdx: this.props.menuIdx})} underlayColor={'transparent'}>
                                    <View style={styles.reviewTextBox}>
                                        <Text style={[Font.DEFAULT_FONT_GRAY_UNDERLINE, {marginLeft: 3, fontSize: 15 * Const.DEVICE_RATIO}]}>{menu.review_count}개의 리뷰보기</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.priceBox}>
                                <MenuPriceText originalPrice={menu.price} sellingPrice={menu.alt_price}/>
                            </View>
                            <View style={styles.cartButtonBox}>
                                <AddCartButton addItemToCart={ () => dispatch(addItemToCart(menuDIdx, menuIdx, menu.price, menu.alt_price, menu.image_url_menu, menu.name_menu, menu.name_menu_eng, addButtonEnable)) } />
                            </View>
                        </View>
                        <TouchableHighlight onPress={()=>Actions.ChefDetailPage({chefIdx: menu.idx_chef})} underlayColor={'transparent'}>
                            <View style={styles.chefBox}>
                                <Image style={styles.chefImage}
                                    source={{uri: chefURL}}></Image>
                                <View style={styles.chefSummaryBox}>
                                    <Text style={[styles.textBlack, {marginBottom: 2}, Font.DEFAULT_FONT_BLACK]}>{menu.name_chef}</Text>
                                    <Text style={Font.DEFAULT_FONT_GRAY}>{menu.career_summ}</Text>
                                </View>
                                <View style={styles.iconBox}>
                                    <View style={styles.iconView}>
                                        <Image style={styles.iconImage} 
                                            source={require('../commonComponent/img/icon_detail.png')}/>
                                    </View>
                                </View>
                            </View>
                        </TouchableHighlight>
                        <View style={styles.menuInfoBox}>
                            <Text style={[styles.textOrange, Font.DEFAULT_FONT_ORANGE]}>Description</Text>
                            <Text style={[styles.textBlack, Font.DEFAULT_FONT_BLACK]}>{menu.story}{'\n'}</Text>
                            <Text style={[styles.textOrange, Font.DEFAULT_FONT_ORANGE]}>Ingredients</Text>
                            <Text style={[styles.textBlack, Font.DEFAULT_FONT_BLACK]}>{menu.ingredients}{'\n'}</Text>
                            <Text style={[styles.textOrange, Font.DEFAULT_FONT_ORANGE]}>Calories</Text>
                            <Text style={[styles.textBlack, Font.DEFAULT_FONT_BLACK]}>{menu.calories}Kcal</Text>
                        </View>
                        <View style={styles.reviewListBox}>
                            <ReviewList reviews={this.state.reviews}/>
                        </View>
                        <TouchableHighlight onPress={() =>Actions.MenuReviewPage({menuIdx: this.props.menuIdx})} underlayColor={'transparent'}>
                            <View style={styles.showMoreButtonBox}>
                                <Text style={Font.DEFAULT_FONT_WHITE}>리뷰 더 보기</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>

        );
    }
}

/*
 * Style
 */
let styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Const.MARGIN_TOP,
    },
    content: {
        backgroundColor: Color.PRIMARY_BACKGROUND
    },
    menuNameBox: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center'
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
    reviewPriceBox: {
        height: 50 * Const.DEVICE_RATIO,
        flexDirection: 'row',
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10,
    },
    reviewBox: {
        flex: 4,
    },
    priceBox: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 10,
    },
    cartButtonBox: {
        flex: 2,
        marginTop: 5 * Const.DEVICE_RATIO,
        marginBottom: 5 * Const.DEVICE_RATIO,
    },
    chefBox: {
        flexDirection: 'row',
        marginTop: 20 * Const.DEVICE_RATIO,
        backgroundColor: 'white',
        height: 70 * Const.DEVICE_RATIO,
        justifyContent: 'center',
    },
    chefImage: {
        flex: 2,
        margin: 3,
        resizeMode: 'contain',
    },
    chefSummaryBox: {
        flex: 6,
        justifyContent: 'center',
    },
    iconBox: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 10,
    },
    iconView: {
        width: 35 * Const.DEVICE_RATIO,
        height: 35 * Const.DEVICE_RATIO,
        backgroundColor: Color.PRIMARY_ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Color.PRIMARY_ORANGE,
        overflow: 'hidden',
    },
    iconImage: {
        width: 15 * Const.DEVICE_RATIO,
        height: 15 * Const.DEVICE_RATIO,
        resizeMode: 'contain',
    },
    menuInfoBox: {
        marginTop: 20,
        backgroundColor: 'white',
        padding: 10,
        paddingBottom: 15,
    },
    reviewListBox: {
        marginTop: 20,
    },
    showMoreButtonBox: {
        height: 40 * Const.DEVICE_RATIO,
        backgroundColor: Color.PRIMARY_ORANGE,
        borderColor: Color.PRIMARY_ORANGE,
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    textBlack: {
        lineHeight: 20 * Const.DEVICE_RATIO,
    },
    textOrange: {
        lineHeight: 20 * Const.DEVICE_RATIO,
    },
    reviewTextBox: {
        marginTop: 3,
    },
    menuImageAlpha: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    textEng: {
        fontSize: 25 * Const.DEVICE_RATIO,
    },
    textKor: {
        marginTop: 10,
        fontSize: 17 * Const.DEVICE_RATIO,
    },
    menuImageNotAlpha: {
        backgroundColor: 'transparent',
    }
});
