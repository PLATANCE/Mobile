import React, {
    Component,
} from 'react';
import { View, ListView, Text, StyleSheet, Image, TouchableHighlight, PixelRatio } from 'react-native';
import Color from '../../const/Color';
import Const from '../../const/Const';
import { Font, normalize } from '../../const/Font';
import MediaURL from '../../const/MediaURL';
import Mixpanel from '../../util/mixpanel';
import MenuReviewStars from '../../commonComponent/MenuReviewStars';
import MenuPriceTextInRow from '../../commonComponent/MenuPriceTextInRow';
import ChangableAddCartButton from '../../commonComponent/ChangableAddCartButton';
import AddCartButton from '../../commonComponent/AddCartButton';
import MenuInfo from '../../commonComponent/MenuInfo';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
        
export default class DailyMenuItem extends Component {
  constructor(props) {
    super(props);
  }

  moveToMenuDetailPage(menuIdx, menuDIdx, stock, menuNameKor, isEvent, isNew) {
    const promo = (isEvent) ? true : false;
    Actions.MenuDetailPage({ menuIdx: menuIdx, menuDIdx: menuDIdx, stock: stock, isEvent, isNew: isNew });
    Mixpanel.track('(Screen) Daily Menu List');
    Mixpanel.trackWithProperties('Show Menu Detail', { menu: menuNameKor, promo: promo });
  }

  render() {
    const {
      addItemToCart,
      decreaseItemFromCart,
      menu,
      cart,
    } = this.props;
    
    const {
      menu_idx,
      idx,
      name_menu,
      image_url_menu,
      name_chef,
      image_url_chef,
      stock,
      is_event,
      rating,
      review_count,
      price,
      alt_price,
      is_new,
    } = menu;
    
    let amount = 0;
    Object.keys(cart).map((idx) => {
      if(idx == menu_idx) {
        amount = cart[idx].amount;
      }
    })
    let menuName = name_menu;
    let menuNameKor = menuName.split('.')[0];
    let menuNameEng = menuName.split('.')[1];

    let menuURL = MediaURL.MENU_URL + image_url_menu;
    let chefURL = MediaURL.CHEF_URL + image_url_chef;
    let isSoldOut = stock <= 0 ? true : false;
    const menuInfo = <MenuInfo stock={stock} isEvent={is_event} isNew={is_new}/>;
    
    return (
      <TouchableHighlight
        onPress={ () => this.moveToMenuDetailPage(menu_idx, idx, stock, menuNameKor, is_event, is_new) }
        underlayColor={'transparent'}
      >
        <View style={styles.row}>
          <View style={styles.menuDetailBox}>
            <Image style={styles.menuImage}
              resizeMode='cover'
              source={{uri: menuURL}} >
              {menuInfo}
            </Image>
            <View style={styles.menuChefBox}>
              <View style={styles.chefImageBox}>
                <Image style={styles.chefImage}
                  resizeMode='contain'
                  source={{uri: chefURL}} /> 
              </View>
            <View style={styles.menuChef}>
              <Text style={[Font.DEFAULT_FONT_BLACK_BOLD, {fontSize: normalize(16)}]}>{menuNameKor}</Text>
              <Text style={Font.DEFAULT_FONT_BLACK}>{menuNameEng}</Text>
              <View style={styles.chefNameBox}>
                <Text style={Font.DEFAULT_FONT_ORANGE}>{name_chef}</Text>
              </View>
            </View>
            </View>
          </View>
          <View style={styles.priceBox}>
            <MenuPriceTextInRow originalPrice={price} sellingPrice={alt_price} align={{textAlign: 'right'}}/>
          </View>
          
          <View style={styles.reviewPriceBox}>
            <View style={styles.reviewBox}>
              <MenuReviewStars score={rating}/>
              <Text style={[styles.reviewCountText, Font.DEFAULT_FONT_GRAY]}>({review_count})</Text>
            </View>
            
            <View style={styles.cartButtonBox}>
              <View style={[styles.menuButton, {marginRight: normalize(15)}]} >
                <Text style={Font.DEFAULT_FONT_BLACK}>더보기</Text>
              </View>
              <ChangableAddCartButton
                cart={cart}
                menuIdx={menu_idx}
                onAddItemToCart={() => addItemToCart(idx, menu_idx, price, alt_price, image_url_menu, menuNameKor, menuNameEng, !isSoldOut)}
                onDecreaseItemFromCart={() => decreaseItemFromCart(idx, menu_idx, price, alt_price, image_url_menu, menuNameKor, menuNameEng)}
                stock={stock}
              />
            </View>
          </View>
          <View style={styles.marginBox}>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: normalize(10),
    },
    row: {
        justifyContent: 'center',
        height: normalize(400),
        backgroundColor: 'white',
        marginTop: normalize(10),
        marginBottom: normalize(10),
    },
    menuDetailBox: {
        height: normalize(330),
    },
    menuImageBox: {
        height: normalize(250),
        backgroundColor: 'black',
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
    menuChefBox: {
        height: normalize(80),
        flexDirection: 'row',
        marginLeft: normalize(16),
        marginRight: normalize(16),
    },
    chefImageBox: {
        flex: 1,
    },
    chefImage: {
        flex: 1,
    },
    menuChef: {
        flex: 4,
        paddingLeft: normalize(10),
        marginBottom: normalize(5),
        marginTop: normalize(10),
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
        flex: 1,
        flexDirection: 'row',
        paddingLeft: normalize(16),
        paddingRight: normalize(16),
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
        height: 20,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingLeft: normalize(16),
        paddingRight: normalize(16),
    },
    cartButtonBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    menuButton: {
        width: normalize(60),
        height: normalize(35),
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Color.PRIMARY_GRAY,
        overflow: 'hidden',
        marginRight: 0,
    },
    marginBox: {
        height: normalize(6),
    }
});
