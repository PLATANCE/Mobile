import React, { View, ListView, Text, StyleSheet, Image } from 'react-native';
import Color from '../../const/Color';
import MenuReviewStars from '../../commonComponent/MenuReviewStars';
import MenuPriceText from '../../commonComponent/MenuPriceText';
import AddCartButton from '../../commonComponent/AddCartButton';



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
                <View style={styles.menuImageBox}>
                    <Image style={styles.menuImage}
                        source={{uri: rowData.menu.url}} />
                </View>

                <View style={styles.menuChefBox}>
                    <View style={styles.chefImageBox}>
                        <Image style={styles.chefImage}
                            source={{uri: rowData.chef.url}} /> 
                    </View>
                    <View style={styles.menuChef}>
                        <Text style={styles.menuNameText}>{rowData.menu.name}</Text>
                        <Text style={styles.menuNameText}>{rowData.menu.foreignName}</Text>
                        <View style={styles.chefNameBox}>
                            <Text style={styles.chefNameText}>{rowData.chef.name}</Text>
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
                        <AddCartButton  />
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
        marginBottom: 10,
	},
    menuImageBox: {
        flex: 7,
    },
    menuImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    menuChefBox: {
        flex: 3,
        flexDirection: 'row',
    },
    chefImageBox: {
        flex: 1,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    chefImage: {
        flex: 1,
        resizeMode: 'contain',
    },
    menuChef: {
        flex: 4,
        marginTop: 20,
        marginBottom: 15,
        marginLeft: 5,
    },
    menuNameText: {
        color: Color.PRIMARY_BLACK,
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
        flex: 1,
        flexDirection: 'row',
        margin: 10,
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
        flex: 1,
        marginLeft: 5,
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
    }
});
