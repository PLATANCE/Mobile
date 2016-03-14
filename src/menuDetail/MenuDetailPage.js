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

import {Actions} from 'react-native-router-flux'
import MenuReviewStars from '../commonComponent/MenuReviewStars';
import AddCartButton from '../commonComponent/AddCartButton';
import MenuPriceText from '../commonComponent/MenuPriceText';
import PageComment from '../commonComponent/PageComment';
import ReviewList from './components/ReviewList';
import Color from '../const/Color';
import Const from '../const/Const';


export default class MenuDetailPage extends React.Component {
    static propTypes = {
        menu: PropTypes.shape({
            name: PropTypes.string.isRequired,
            foreignName: PropTypes.string.isRequired,
            averageReviewScore: PropTypes.number.isRequired,
            reviewCount: PropTypes.number.isRequired,
            originalPrice: PropTypes.number.isRequired,
            sellingPrice: PropTypes.number.isRequired,
            chef: PropTypes.shape({
                name: PropTypes.string.isRequired,
                affiliation: PropTypes.string.isRequired
            }).isRequired,
            description: PropTypes.string.isRequired,
            ingredients: PropTypes.string.isRequired,
            calories: PropTypes.number.isRequired,
            reviews: PropTypes.arrayOf(PropTypes.shape({
                score: PropTypes.number.isRequired,
                dateString: PropTypes.string.isRequired,
                content: PropTypes.string.isRequired,
                maskedPhoneNumber: PropTypes.string.isRequired
            })).isRequired,
        }).isRequired,
        cartCount: PropTypes.number.isRequired,
        isShowAllReview: PropTypes.bool.isRequired
    };

    render() {
        let {
            menu,
            cartCount,
            isShowAllReview
        } = this.props;
        let {
            chef
        } = menu;


        return (
            
            <View style={styles.container}>
                <PageComment text="모든 메인메뉴는 전자렌지 조리용입니다."/>
                <ScrollView>
                    <View style={styles.content} >
                        <View style={styles.menuNameBox}>
                            <Text style={[styles.textBlack, {fontSize: 16, fontWeight: 'bold'}]}>{menu.name}</Text>
                            <Text style={[styles.textBlack]}>{menu.foreignName}</Text>
                        </View>
                        <View style={styles.menuImageBox}>
                            <Image 
                                style={styles.imageview}
                                source={{uri: menu.url}}/>
                        </View>
                        <View style={styles.reviewPriceBox}>
                            <View style={styles.reviewBox}>
                                <MenuReviewStars score={menu.averageReviewScore}/>
                                <TouchableHighlight onPress={Actions.MenuReviewPage} underlayColor={'transparent'}>
                                    <View style={styles.reviewTextBox}>
                                        <Text style={[styles.textGray, {textDecorationLine: 'underline', marginLeft: 3, fontSize: 15}]}>{menu.reviewCount}개의 리뷰보기</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.priceBox}>
                                <MenuPriceText originalPrice={menu.originalPrice} sellingPrice={menu.sellingPrice}/>
                            </View>
                            <View style={styles.cartButtonBox}>
                                <AddCartButton  />
                            </View>
                        </View>
                        <TouchableHighlight onPress={Actions.ChefDetailPage} underlayColor={'transparent'}>
                            <View style={styles.chefBox}>
                                <Image style={styles.chefImage}
                                    source={{uri: chef.url}}></Image>
                                <View style={styles.chefSummaryBox}>
                                    <Text style={[styles.textBlack, {marginBottom: 2}]}>{chef.name}</Text>
                                    <Text style={styles.textGray}>{chef.affiliation}</Text>
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
                            <Text style={styles.textBlack}>{menu.description}{'\n'}</Text>
                            <Text style={styles.textOrange}>Ingredients</Text>
                            <Text style={styles.textBlack}>{menu.ingredients}{'\n'}</Text>
                            <Text style={styles.textOrange}>Calories</Text>
                            <Text style={styles.textBlack}>{menu.calories.toLocaleString()}Kcal</Text>
                        </View>
                        <View style={styles.reviewListBox}>
                            <ReviewList reviews={menu.reviews}/>
                        </View>
                        <TouchableHighlight onPress={Actions.MenuReviewPage} underlayColor={'transparent'}>
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
    },
    imageview: {
        flex: 1,
        resizeMode: 'cover',
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
    }
});
