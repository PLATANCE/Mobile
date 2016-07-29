'use strict';
import React, {
  Component,
  PropTypes,
} from 'react';
import {
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
import ChangableAddCartButton from '../commonComponent/ChangableAddCartButton';
import MenuPriceText from '../commonComponent/MenuPriceText';
import MenuInfo from '../commonComponent/MenuInfo';
import PageComment from '../commonComponent/PageComment';
import PlaceholderView from '../commonComponent/PlaceholderView';
import CartButtonInBottom from '../commonComponent/CartButtonInBottom';
import MenuReviewItem from '../review/components/MenuReviewItem';
import Color from '../const/Color';
import Const from '../const/Const';
import { Font, normalize } from '../const/Font';
import RequestURL from '../const/RequestURL';
import MediaURL from '../const/MediaURL';
import Mixpanel from '../util/mixpanel';

import {
  addItemToCart,
  decreaseItemFromCart,
} from '../app/actions/CartActions';

export default class MenuDetailPage extends Component {
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
    Mixpanel.trackWithProperties(eventName, { menu: menuName })
  }

  fetchMenuDetail() {
    console.log(RequestURL.REQUEST_MENU_DETAIL + "?menu_idx=" + this.props.menuIdx);
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
    const { 
      dispatch,
      cart,
      menuIdx,
      menuDIdx,
      stock,
      isEvent,
      isNew,
    } = this.props;

    const {
      menu,
      reviews,
      bestReviewOffsetY,
      renderPlaceholderOnly,
    } = this.state;

    const {
      name_menu,
      name_menu_eng,
      image_url_menu,
      image_url_chef,
      rating,
      review_count,
      price,
      alt_price,
      name_chef,
      idx_chef,
      career_summ,
      story,
      ingredients,
      calories,
    } = menu;

    if(!renderPlaceholderOnly) {
      return this.renderPlaceholderView();
    }

    let _scrollView: ScrollView;
    const isSoldOut = (stock <= 0) ? true : false;
    const menuInfo = <MenuInfo stock={stock} isEvent={isEvent} isNew={isNew}/>;
    const amount = cart[menuIdx] ? cart[menuIdx].amount : 0;

    const menuURL = MediaURL.MENU_URL + image_url_menu;
    const chefURL = MediaURL.CHEF_URL + image_url_chef;

    var reviewItems = reviews.map((review) => (
      <MenuReviewItem
        key={review.idx}
        review={review}
      />
    ));

    return (
      <View style={styles.container}>
        <PageComment text="모든 메인메뉴는 전자렌지 조리용입니다."/>
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
        >
          <View style={styles.content} >
            <View style={styles.menuNameBox}>
              <Text style={[Font.DEFAULT_FONT_BLACK_BOLD, { fontSize: normalize(18) }]}>{name_menu}</Text>
              <Text style={[Font.DEFAULT_FONT_BLACK]}>{name_menu_eng}</Text>
            </View>
            <View style={styles.menuImageBox}>
              <Image style={styles.menuImage}
                source={{uri: menuURL}}
                resizeMode={'cover'} >
                {menuInfo}
              </Image>
            </View>
            <View style={styles.reviewPriceBox}>
              <View style={styles.reviewBox}>
                <MenuReviewStars score={rating}/>
                <TouchableHighlight 
                  onPress={ () => { _scrollView.scrollTo({y: bestReviewOffsetY}); Mixpanel.trackWithProperties('View Review Button', { menu: name_menu })} }
                  underlayColor={'transparent'}
                >
                <View style={styles.reviewTextBox}>
                  <Text style={[Font.DEFAULT_FONT_GRAY_UNDERLINE, {marginLeft: 3, fontSize: normalize(15)}]}>리뷰보기({review_count})</Text>
                </View>
                </TouchableHighlight>
              </View>
              <View style={styles.priceBox}>
                <MenuPriceText
                  originalPrice={price}
                  sellingPrice={alt_price}
                />
                <ChangableAddCartButton
                  cart={cart}
                  menuIdx={menuIdx}
                  style={ { marginLeft: normalize(10) } }
                  onAddItemToCart={ () => dispatch(addItemToCart(menuDIdx, menuIdx, price, alt_price, image_url_menu, name_menu, name_menu_eng, !isSoldOut)) }
                  onDecreaseItemFromCart={ () => dispatch(decreaseItemFromCart(menuDIdx, menuIdx, price, alt_price, image_url_menu, name_menu, name_menu_eng)) }
                  stock={stock}
                />
              </View>
            </View>
            <TouchableHighlight 
              onPress={ () => this.moveToChefDetailPage(idx_chef, name_chef, name_menu) }
              underlayColor={'transparent'}
            >
              <View style={styles.chefBox}>
                <Image style={styles.chefImage}
                  source={{uri: chefURL}} 
                  resizeMode={'contain'}
                />
                <View style={styles.chefSummaryBox}>
                  <Text style={[styles.textBlack, {marginBottom: 2}, Font.DEFAULT_FONT_BLACK]}>{name_chef}</Text>
                  <Text style={Font.DEFAULT_FONT_GRAY}>{career_summ}</Text>
                </View>
                <View style={styles.iconBox}>
                  <Image
                    style={styles.iconImage} 
                    source={require('../commonComponent/img/icon_input.png')}
                  />
                </View>
              </View>
            </TouchableHighlight>
            <View style={styles.menuInfoBox}>
              <Text style={[styles.textOrange, Font.DEFAULT_FONT_ORANGE]}>Description</Text>
              <Text style={[styles.textBlack, Font.DEFAULT_FONT_BLACK]}>{story}{'\n'}</Text>
              <Text style={[styles.textOrange, Font.DEFAULT_FONT_ORANGE]}>Ingredients</Text>
              <Text style={[styles.textBlack, Font.DEFAULT_FONT_BLACK]}>{ingredients}{'\n'}</Text>
            </View>
            <View
              ref='bestReview'
              onLayout={this.onBestReviewLayout.bind(this)}
              style={styles.reviewListBox}
            >
              <View style={styles.headerBox}>
                <Text style={[Font.DEFAULT_FONT_BLACK, styles.headerText]}>BEST 리뷰</Text>
              </View>
              {reviewItems}
            </View>
            <TouchableHighlight 
              onPress={ () => this.moveToMenuReviewPage('Show More Reviews', menuIdx, name_menu) } 
              underlayColor={'transparent'}
            >
              <View style={styles.showMoreButtonBox}>
                <Text style={Font.DEFAULT_FONT_WHITE}>리뷰 더 보기</Text>
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
        <CartButtonInBottom cart={cart}/>
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
    },
    menuImage: {
        flex: 1,
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
    },
    priceBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 10,
    },
    cartButtonBox: {
        flex: 2,
        marginTop: normalize(5),
        marginBottom: normalize(5),
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    chefSummaryBox: {
        flex: 6,
        justifyContent: 'center',
    },
    iconBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    headerBox: {
        backgroundColor: 'white',
        padding: normalize(10),
    },
    headerText: {
        textAlign: 'center',
        fontSize: normalize(18),
    },
});
