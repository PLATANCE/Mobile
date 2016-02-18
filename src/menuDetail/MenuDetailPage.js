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
        return(
            <ScrollView>
            <View style={styles.container}>
                <Toolbar />
                <View style={styles.pageCommentBox}>
                    <Text>모든 메인메뉴는 전자렌지 조리용입니다.</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.menuNameBox}>
                        <Text style={styles.menuName}>{menu.name}</Text>
                        <Text style={styles.menuName}>{menu.foreignName}</Text>
                    </View>
                    <Image 
                        style={styles.imageview}
                        source={{uri: 'http://plating.co.kr/app/media/2015.11.06-salmon_steak.jpg'}}/>
                    <View style={styles.summaryBox}>
                        <View style={styles.reviewCount}>
                            <MenuReviewStars score={menu.averageReviewScore}/>
                            <Text>({menu.reviewCount})</Text>
                        </View>
                        <View style={styles.priceAndButton}>
                            <MenuPriceText originalPrice={menu.originalPrice} sellingPrice={menu.sellingPrice}/>
                            <AddCartButton cartCount={cartCount}/>
                        </View>
                    </View>
                    <View style={styles.chefBox}>
                        <Image style={styles.chefImage}></Image>
                        <View style={styles.chefSummaryBox}>
                            <Text style={styles.chefName}>{chef.name}</Text>
                            <Text style={styles.chefAffiliation}>{chef.affiliation}</Text>
                        </View>
                        <Text style={styles.chefDetailButton}>Go!</Text>
                    </View>
                    <View style={styles.menuInfoBox}>
                        <Text style={styles.menuInfoTitle}>Description</Text>
                        <Text style={styles.menuInfoDetail}>{menu.description}</Text>
                        <Text style={styles.menuInfoTitle}>Ingredients</Text>
                        <Text style={styles.menuInfoDetail}>{menu.ingredients}</Text>
                        <Text style={styles.menuInfoTitle}>Calories</Text>
                        <Text style={styles.menuInfoDetail}>{menu.calories.toLocaleString()}Kcal</Text>
                    </View>
                </View>
                <Image 
                    style={styles.imageview}
                    source={{uri: 'http://plating.co.kr/app/media/2015.11.06-salmon_steak.jpg'}}/>
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
        alignItems: 'stretch'
    },
    content: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#e0e0e0'
    },
    pageCommentBox: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: 30,
        justifyContent: 'center',
    },
    menuNameBox: {
        alignItems: 'center'
    },
    menuName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    imageview: {
        height: 300,
        alignItems: 'center',
    },
    summaryBox: {
        flexDirection: 'row',
        marginTop: 10,
    },
    reviewCount: {
        flex: 3,
        flexDirection: 'row',
    },
    priceAndButton: {
        flex: 2,
        flexDirection: 'row',
    },
    chefBox: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: 'white',
        height: 50,
        justifyContent: 'center',
    },
    chefImage: {
        width: 100,
    },
    chefSummaryBox: {
        flex: 1,
        justifyContent: 'center',
    },
    chefName: {
    },
    chefAffiliation: {
    },
    chefDetailButton: {
        width: 50,
    },
    menuInfoBox: {
        marginTop: 10,
        backgroundColor: 'white',
    },
    menuInfoTitle: {
        paddingTop: 10,
        paddingLeft: 10,
        color: 'orange',
        fontSize: 16,
    },
    menuInfoDetail: {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 16,
    },

});
