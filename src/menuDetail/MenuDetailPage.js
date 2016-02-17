'use strict';
import React, {
    PropTypes,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import MenuReviewStars from '../commonComponent/MenuReviewStars';
import AddCartButton from '../commonComponent/AddCartButton';
import MenuPriceText from '../commonComponent/MenuPriceText';
import ReviewList from './components/ReviewList';

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
         * Style
         */
        let styles = StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
            }
        });

        return (
            <View style={styles.container}>
                <View>
                    <Text>모든 메인메뉴는 전자렌지 조리용입니다.</Text>
                </View>
                <View>
                    <View>
                        <Text>{menu.name}</Text>
                        <Text>{menu.foreignName}</Text>
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
    }
}
