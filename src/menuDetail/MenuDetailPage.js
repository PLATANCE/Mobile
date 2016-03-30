'use strict';
import React, {
    PropTypes,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    ScrollView,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import StarRating from 'react-native-star-rating';
import MenuReviewStars from '../commonComponent/MenuReviewStars';
import AddCartButton from '../commonComponent/AddCartButton';
import MenuPriceText from '../commonComponent/MenuPriceText';
import AmountInCart from '../commonComponent/AmountInCart';
import PageComment from '../commonComponent/PageComment';
import SoldOutView from '../commonComponent/PageComment';
import ReviewList from './components/ReviewList';
import Color from '../const/Color';
import Const from '../const/Const';
import RequestURL from '../const/RequestURL';
import MediaURL from '../const/MediaURL';

import { addItemToCart } from '../app/actions/CartActions';

export default class MenuDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            reviews: [],
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
            })
            .catch((error) => {
                console.warn(error);
            })
            .done();
    }
    onStarRatingPress(rating) {
        console.log(rating);
    }

    render() {
        const { dispatch, cart, menuIdx, menuDIdx } = this.props;
        let menu = this.state.menu;
        let menuURL;
        let chefURL;
        let contentInnerMenu = false;
        let addButtonEnable;

        if(menu){
            menuURL = MediaURL.MENU_URL + menu.image_url_menu;
            chefURL = MediaURL.CHEF_URL + menu.image_url_chef;
            let isSoldOut = (this.props.stock == 0) ? true : false;
            addButtonEnable = (this.props.stock != 0) ? true : false;
            
            if(isSoldOut) {

                contentInnerMenu = <View style={styles.menuImageAlpha}>
                                    <Text style={styles.textEng}>SOLD OUT</Text>
                                    <Text style={styles.textKor}>금일 메뉴가 매진 되었습니다.</Text>
                                </View>;
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
                            <Text style={[styles.textBlack, {fontSize: 16, fontWeight: 'bold'}]}>{menu.name_menu}</Text>
                            <Text style={[styles.textBlack]}>{menu.name_menu_eng}</Text>
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
                                {/*<StarRating 
                                    disabled={false}
                                    maxStars={5}
                                    rating={menu.rating}
                                    selectedStar={(rating) => this.onStarRatingPress(rating)} /> */}
                                <TouchableHighlight onPress={() =>Actions.MenuReviewPage({menuIdx: this.props.menuIdx})} underlayColor={'transparent'}>
                                    <View style={styles.reviewTextBox}>
                                        <Text style={[styles.textGray, {textDecorationLine: 'underline', marginLeft: 3, fontSize: 15}]}>{menu.review_count}개의 리뷰보기</Text>
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
                                    <Text style={[styles.textBlack, {marginBottom: 2}]}>{menu.name_chef}</Text>
                                    <Text style={styles.textGray}>{menu.career_summ}</Text>
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
                            <Text style={styles.textOrange}>Description</Text>
                            <Text style={styles.textBlack}>{menu.story}{'\n'}</Text>
                            <Text style={styles.textOrange}>Ingredients</Text>
                            <Text style={styles.textBlack}>{menu.ingredients}{'\n'}</Text>
                            <Text style={styles.textOrange}>Calories</Text>
                            <Text style={styles.textBlack}>{menu.calories}Kcal</Text>
                        </View>
                        <View style={styles.reviewListBox}>
                            <ReviewList reviews={this.state.reviews}/>
                        </View>
                        <TouchableHighlight onPress={() =>Actions.MenuReviewPage({menuIdx: this.props.menuIdx})} underlayColor={'transparent'}>
                            <View style={styles.showMoreButtonBox}>
                                <Text style={styles.textWhite}>리뷰 더 보기</Text>
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
    reviewPriceBox: {
        height: 50,
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
        marginTop: 5,
        marginBottom: 5,
    },
    chefBox: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: 'white',
        height: 70,
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
        width: 35,
        height: 35,
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
        width: 15,
        height: 15,
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
        height: 40,
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
        color: Color.PRIMARY_BLACK,
        lineHeight: 20,
    },
    textGray: {
        color: Color.PRIMARY_GRAY,
    },
    textOrange: {
        color: Color.PRIMARY_ORANGE,
        lineHeight: 20,
    },
    textWhite: {
        color: 'white',
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
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
    },
    textKor: {
        color: 'white',
        marginTop: 10,
        fontSize: 17,
    },
    menuImageNotAlpha: {
        backgroundColor: 'transparent',
    }
});
