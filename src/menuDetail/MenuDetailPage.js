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

import MenuReviewStars from '../commonComponent/MenuReviewStars';
import AddCartButton from '../commonComponent/AddCartButton';
import MenuPriceText from '../commonComponent/MenuPriceText';
import ReviewList from './components/ReviewList';
import Toolbar from '../commonComponent/Toolbar';
import Color from '../const/Color';

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
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.pageCommentBox}>
                    <Text>모든 메인메뉴는 전자렌지 조리용입니다.</Text>
                </View>
                <View style={styles.content} >

                    <View style={styles.menuNameBox}>
                        <Text style={styles.menuName}>{menu.name}</Text>
                        <Text style={styles.menuName}>{menu.foreignName}</Text>
                    </View>

                    <View style={styles.menuImageBox}>
                        <Image 
                            style={styles.imageview}
                            source={{uri: menu.url}}/>
                    </View>

                    

                    <View style={styles.reviewPriceBox}>
                        <View style={styles.reviewBox}>
                            <MenuReviewStars score={menu.averageReviewScore}/>
                            <Text style={styles.reviewCountText}>({menu.reviewCount})</Text>
                        </View>
                        <View style={styles.priceBox}>
                            <MenuPriceText originalPrice={menu.originalPrice} sellingPrice={menu.sellingPrice}/>
                        </View>
                        <View style={styles.cartButtonBox}>
                            <AddCartButton  />
                        </View>
                    </View>



                    <View style={styles.chefBox}>
                        <Image style={styles.chefImage}
                            source={{uri: chef.url}}></Image>
                        <View style={styles.chefSummaryBox}>
                            <Text style={styles.chefName}>{chef.name}</Text>
                            <Text style={styles.chefAffiliation}>{chef.affiliation}</Text>
                        </View>
                        <View style={styles.chefDetailButton}>
                            <Text style={styles.detailText}>></Text>
                        </View>
                    </View>
                    <View style={styles.menuInfoBox}>
                        <Text style={styles.menuInfoTitle}>Description</Text>
                        <Text style={styles.menuInfoDetail}>{menu.description}</Text>
                        <Text style={styles.menuInfoTitle}>Ingredients</Text>
                        <Text style={styles.menuInfoDetail}>{menu.ingredients}</Text>
                        <Text style={styles.menuInfoTitle}>Calories</Text>
                        <Text style={styles.menuInfoDetail}>{menu.calories.toLocaleString()}Kcal</Text>
                    </View>
                    <View style={styles.reviewListBox}>
                        <ReviewList reviews={menu.reviews} isCurrentShowALL={isShowAllReview}/>
                    </View>
                </View>
            </View>
            
            </ScrollView>
        );
    }
}

/*
 * Style
 */
let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: Color.PRIMARY_BACKGROUND
    },
    pageCommentBox: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: 30,
        justifyContent: 'center',
    },
    menuNameBox: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    menuName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Color.PRIMARY_BLACK,
    },

    menuImageBox: {
        height: 300,
    },
    imageview: {
        flex: 1,
        resizeMode: 'cover',
    },
    reviewPriceBox: {
        height: 40,
        flexDirection: 'row',
        marginTop: 10,
        marginRight: 10,
        marginLeft: 5,
    },
    reviewBox: {
        flex: 4,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    reviewCountText: {
        color: Color.PRIMARY_GRAY,
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
    },
    chefBox: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: 'white',
        height: 70,
        justifyContent: 'center',
    },
    chefImage: {
        flex: 1,
        margin: 3,
        resizeMode: 'contain',
    },
    chefSummaryBox: {
        flex: 3,
        justifyContent: 'center',
    },
    chefName: {
        fontSize: 16,
        color: Color.PRIMARY_BLACK,
    },
    chefAffiliation: {
        fontSize: 13,
        color: Color.PRIMARY_GRAY,
    },
    chefDetailButton: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: 50,
        marginRight: 10,
    },
    detailText: {
        fontSize: 20,
        color: Color.PRIMARY_GRAY,
    },
    menuInfoBox: {
        marginTop: 10,
        backgroundColor: 'white',
    },
    menuInfoTitle: {
        paddingTop: 10,
        paddingLeft: 10,
        color: Color.PRIMARY_ORANGE,
        fontSize: 16,
    },
    menuInfoDetail: {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 16,
        color: Color.PRIMARY_GRAY,
    },
    reviewListBox: {
        backgroundColor: 'white',
        marginTop: 10,
    },
    

});



/*
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.pageCommentBox}>
                        <Text>모든 메인메뉴는 전자렌지 조리용입니다.</Text>
                    </View>
                    <View style={styles.menuNameBox}>
                        <Text style={styles.menuName}>{menu.name}</Text>
                        <Text style={styles.menuName}>{menu.foreignName}</Text>
                    </View>
                    <View>
                        <Image
                            //style={}
                            //source={}
                        />
                    </View>
                    <View>
                        <View>
                            <MenuReviewStars score={menu.averageReviewScore}/>
                            <Text>({menu.reviewCount})</Text>
                        </View>
                        <View>
                            <MenuPriceText originalPrice={menu.originalPrice} sellingPrice={menu.sellingPrice}/>
                        </View>
                        <View>
                            <AddCartButton cartCount={cartCount}/>
                        </View>
                    </View>
                    <View>
                        <TouchableHighlight>
                            <View>
                                <View>
                                    <Image
                                        //style={}
                                        //source={}
                                    />
                                </View>
                                <View>
                                    <Text>{chef.name}</Text>
                                    <Text>{chef.affiliation}</Text>
                                </View>
                                <View>
                                    <Image
                                        //style={}
                                        //source={}
                                    />
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <Text>Description</Text>
                        <Text>{menu.description}</Text>
                        <Text>Ingredients</Text>
                        <Text>{menu.ingredients}</Text>
                        <Text>Calories</Text>
                        <Text>{menu.calories.toLocaleString()}Kcal</Text>
                    </View>
                    <ReviewList reviews={menu.reviews} isCurrentShowALL={isShowAllReview}/>
                </View>
            </View>
        );
        */
