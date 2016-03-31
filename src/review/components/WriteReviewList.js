import React, { View, ListView, Text, StyleSheet, Image, TextInput } from 'react-native';
import StarRating from 'react-native-star-rating';
import Color from '../../const/Color';
import MediaURL from '../../const/MediaURL';

export default class WriteReviewList extends React.Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(props.reviews)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.reviews !== this.props.reviews) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.reviews)
            })
        }
    }

    setRating(rating) {
        console.log(rating);
    }

    setComment() {

    }
    renderRow(rowData) {
        let menuName = rowData.name_menu;
        let menuNameKor = menuName.split('.')[0];
        let menuNameEng = menuName.split('.')[1];
        let menuURL = MediaURL.MENU_URL + rowData.image_url_menu;
        return (
            <View style={styles.row}>
                <View style={styles.menuBox}>
                    <Image style={styles.menuImage}
                        source={{uri: menuURL}}/>
                    <View style={styles.menuInfoBox}>
                        <Text style={[styles.textBlack, styles.textBold]}>{menuNameKor}</Text>
                        <Text style={styles.textBlack}>{menuNameEng}</Text>
                        <Text style={styles.chefNameText}>{rowData.name_chef}</Text>
                        <View style={styles.starBox}>
                            <StarRating
                                ref={(rating) => {this.rating = rating;}}
                                disabled={false}
                                maxStars={5}
                                rating={rowData.rating}
                                starColor={'yellow'}
                                selectedStar={(rating) => this.setRating(rating)}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.reviewBox}>
                    <TextInput style={styles.textInput} 
                        keyboardType="default" 
                        autoCorrect={false} 
                        placeholder='솔직한 리뷰는, 플레이팅을 더 맛있게 합니다 :)' 
                        multiline={true}
                        onSubmitEditing={this.setComment()}
                    />
                </View>
                <View style={styles.buttonBox}>
                    <Text style={styles.textWhite}>리뷰 저장</Text>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        padding: 10,
    },
    menuBox: {
        flexDirection: 'row',
        height: 120,
    },
    menuImage: {
        width: 120,
        height: 120,
    },
    menuInfoBox: {
        flex: 1,
        marginLeft: 10,
    },
    textBlack: {
        color: Color.PRIMARY_BLACK,
    },
    textBold: {
        fontWeight: 'bold',
    },
    chefNameText: {
        marginTop: 20,
        color: Color.PRIMARY_ORANGE,
    },
    starBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    starImage: {
        width: 40,
        height: 40,
    },
    reviewBox: {
        backgroundColor: 'green',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.PRIMARY_BACKGROUND,
        overflow: 'hidden',
        height: 70,
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 13,
    },
    buttonBox: {
        flexDirection: 'row',
        marginTop: 10,
        borderColor: Color.PRIMARY_ORANGE,
        backgroundColor: Color.PRIMARY_ORANGE,
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textWhite: {
        color: 'white',
    },
});
