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
import { Font, normalize } from '../const/Font';
import RequestURL from '../const/RequestURL';
import MediaURL from '../const/MediaURL';
import Mixpanel from '../util/mixpanel';

import { addItemToCart } from '../app/actions/CartActions';


export default class MenuDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            reviews: [],
            renderPlaceholderOnly: false,
            bestReviewOffsetY: 0,
        }
    }

    componentDidMount() {
        Mixpanel.track('(Screen) Menu Detail')
        this.fetchMenuDetail();
    }
    onBestReviewLayout(e) {
        const bestReviewOffsetY = e.nativeEvent.layout.y;
        this.setState({
            bestReviewOffsetY: bestReviewOffsetY,
        });
    }
    moveToBestReview() {
        //this.refs.bestReview.measure(this.logWelcomeLayout());
        Mixpanel.trackWithProperties(eventName, { menu: menuName })
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

    moveToMenuReviewPage(eventName, menuIdx, menuName) {
        Actions.MenuReviewPage({ menuIdx: menuIdx });
        Mixpanel.trackWithProperties(eventName, { menu: menuName })
    }

    moveToChefDetailPage(chefIdx, chefName, menuName) {
        Actions.ChefDetailPage({ chefIdx: chefIdx });
        Mixpanel.trackWithProperties('Show Chef Detail', { menu: menuName, chef: chefName })
    }

    renderPlaceholderView() {
        return (
            <PlaceholderView />
        );
    }

    render() {
        const { dispatch, cart, menuIdx, menuDIdx } = this.props;
        const menu = this.state.menu;
        let _scrollView: ScrollView;
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
                <ScrollView
                    ref={(scrollView) => { _scrollView = scrollView; }}
                >
                    <View style={styles.content} >
                        <View style={styles.menuNameBox}>
                            <Text style={[Font.DEFAULT_FONT_BLACK_BOLD, { fontSize: normalize(18) }]}>{menu.name_menu}</Text>
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
                                
                                <TouchableHighlight 
                                    /*onPress={ () => this.moveToMenuReviewPage('View Review Button', this.props.menuIdx, menu.name_menu) } */
                                    onPress={ () => { _scrollView.scrollTo({y: this.state.bestReviewOffsetY}); Mixpanel.trackWithProperties('View Review Button', { menu: menu.name_menu })} }
                                    underlayColor={'transparent'}
                                >
                                    <View style={styles.reviewTextBox}>
                                        <Text style={[Font.DEFAULT_FONT_GRAY_UNDERLINE, {marginLeft: 3, fontSize: normalize(15)}]}>리뷰보기({menu.review_count})</Text>
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
                        <TouchableHighlight 
                            onPress={ () => this.moveToChefDetailPage(menu.idx_chef, menu.name_chef, menu.name_menu) }
                            underlayColor={'transparent'}
                        >
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
                        <View
                            ref='bestReview'
                            onLayout={this.onBestReviewLayout.bind(this)}
                            style={styles.reviewListBox} >
                            <ReviewList 
                                reviews={this.state.reviews} />
                        </View>
                        <TouchableHighlight 
                            onPress={ () => this.moveToMenuReviewPage('Show More Reviews', this.props.menuIdx, menu.name_menu) } 
                            underlayColor={'transparent'}
                        >
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
        height: normalize(250),
        backgroundColor: 'black',
    },
    menuImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    amountInCart: {
        height: normalize(40),
        flexDirection: 'row',
        left: 0,
        top: normalize(210),
    },
    reviewPriceBox: {
        height: normalize(50),
        flexDirection: 'row',
        marginTop: normalize(20),
        marginRight: normalize(16),
        marginLeft: normalize(16),
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
        marginTop: normalize(5),
        marginBottom: normalize(5),
    },
    chefBox: {
        flexDirection: 'row',
        marginTop: normalize(20),
        backgroundColor: 'white',
        height: normalize(70),
        paddingLeft: normalize(16),
        paddingRight: normalize(16),
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
    },
    iconView: {
        width: normalize(35),
        height: normalize(35),
        backgroundColor: Color.PRIMARY_ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Color.PRIMARY_ORANGE,
        overflow: 'hidden',
    },
    iconImage: {
        width: normalize(15),
        height: normalize(15),
        resizeMode: 'contain',
    },
    menuInfoBox: {
        marginTop: 20,
        backgroundColor: 'white',
        padding: normalize(16),
        paddingBottom: 15,
    },
    reviewListBox: {
        marginTop: 20,
    },
    showMoreButtonBox: {
        height: normalize(40),
        backgroundColor: Color.PRIMARY_ORANGE,
        borderColor: Color.PRIMARY_ORANGE,
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        marginLeft: normalize(16),
        marginRight: normalize(16),
    },
    textBlack: {
        marginTop: normalize(6),
    },
    textOrange: {
        //marginTop: normalize(10),
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
        fontSize: normalize(25),
    },
    textKor: {
        marginTop: 10,
        fontSize: normalize(17),
    },
    menuImageNotAlpha: {
        backgroundColor: 'transparent',
    }
});
