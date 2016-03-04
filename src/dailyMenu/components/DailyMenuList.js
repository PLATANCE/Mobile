import React, { View, ListView, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Color from '../../const/Color';
import MenuReviewStars from '../../commonComponent/MenuReviewStars';
import MenuPriceText from '../../commonComponent/MenuPriceText';
import AddCartButton from '../../commonComponent/AddCartButton';
import AmountInCart from '../../commonComponent/AmountInCart';
import {Actions} from 'react-native-router-flux';


export default class DailyMenuList extends React.Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(props.menus)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.menus !== this.props.menus) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.menus)
            })
        }
    }

    renderRow(rowData) {
        return (
            <View style={styles.row}>
                <View style={styles.menuDetailBox}>
                    <TouchableHighlight style={styles.menuImageBox} onPress={Actions.MenuDetailPage} underlayColor={'transparent'}>
                        <Image style={styles.menuImage}
                            source={{uri: rowData.menu.url}} >
                            <View style={styles.amountInCart}>
                                <AmountInCart amount={2}/>
                            </View>
                        </Image>
                    </TouchableHighlight>
                    <View style={styles.menuChefBox}>
                        <View style={styles.chefImageBox}>
                            <Image style={styles.chefImage}
                                source={{uri: rowData.chef.url}} /> 
                        </View>
                        <View style={styles.menuChef}>
                            <Text style={[styles.textBlack, styles.textBold]}>{rowData.menu.name}</Text>
                            <Text style={styles.textBlack}>{rowData.menu.foreignName}</Text>
                            <View style={styles.chefNameBox}>
                                <Text style={styles.chefNameText}>{rowData.chef.name}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                
                <View style={styles.reviewPriceBox}>
                    <View style={styles.reviewBox}>
                        <MenuReviewStars score={rowData.menu.averageReviewScore}/>
                        <Text style={styles.reviewCountText}>({rowData.menu.reviewCount})</Text>
                    </View>
                    <View style={styles.priceBox}>
                        <MenuPriceText originalPrice={rowData.menu.originalPrice} sellingPrice={rowData.menu.sellingPrice} align={{textAlign: 'right'}}/>
                    </View>
                    <View style={styles.cartButtonBox}>
                        <TouchableHighlight style={[styles.iconView, {marginRight: 5}]} onPress={Actions.MenuDetailPage} underlayColor={'transparent'}>
                            <Image style={styles.iconImage} 
                                source={require('../../commonComponent/img/icon_detail.png')}/>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.iconView} underlayColor={'transparent'}>
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
	        		renderRow={this.renderRow}
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
    },
    menuImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    amountInCart: {
        height: 40,
        flexDirection: 'row',
        position: 'relative',
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
