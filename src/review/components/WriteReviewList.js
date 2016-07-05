import React, {
    Component,
    PropTypes,
} from 'react';
import { View, ListView, Text, StyleSheet, Image, TextInput, TouchableHighlight, Alert } from 'react-native';
import StarRating from 'react-native-star-rating';
import Color from '../../const/Color';
import Const from '../../const/Const';
import { Font, normalize } from '../../const/Font';
import MediaURL from '../../const/MediaURL';
import RequestURL from '../../const/RequestURL';

export default class WriteReviewList extends Component {
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

    getRowLayout(layout) {
        console.log(layout);
    }

    submitReview(orderDIdx, enableButton) {
        const {
            orderIdx,
            reviews,
            onFetchWriteReviewList,
        } = this.props;
        let rating;
        let comment;
        reviews.forEach((review) => {
            if(orderDIdx === review.idx) {
                rating = review.rating;
                comment = review.comment;
            }
        })
        const param = {
            order_idx: orderIdx,
            order_d_idx: orderDIdx,
            rating: rating,
            comment: comment,
        };
        console.log(param);
        if(enableButton) {
            fetch(RequestURL.SUBMIT_WRITE_REVIEW, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(param),
                }).then((response) => response.json())
                .then((responseData) => {
                    Alert.alert(
                        '소중한 의견 감사합니다.',
                    );
                    onFetchWriteReviewList();
                }).catch((error) => {
                  console.warn(error);
                }).done();
        }
    }   
    renderRow(rowData) {
        const {
            onChangeStarRating,
            onChangeTextInputComment,
            onChangeSubmitProperty
        } = this.props;

        const orderDIdx = rowData.idx;
        const menuName = rowData.name_menu;
        const menuNameKor = menuName.split('.')[0];
        const menuNameEng = menuName.split('.')[1];
        const menuURL = MediaURL.MENU_URL + rowData.image_url_menu;
        const rating = rowData.rating;
        const enableButton = (rating > 0) ? false : true;
        const enableButtonBackground = (rating > 0) ? 
            { borderColor: Color.PRIMARY_GRAY, backgroundColor: Color.PRIMARY_GRAY } : 
            { borderColor: Color.PRIMARY_ORANGE, backgroundColor: Color.PRIMARY_ORANGE };
        return (
            <View style={styles.row}
                onLayout={(event) => this.getRowLayout(event.nativeEvent.layout)}>
                <View style={styles.menuBox}>
                    <Image style={styles.menuImage}
                        source={{uri: menuURL}}/>
                    <View style={styles.menuInfoBox}>
                        <Text style={Font.DEFAULT_FONT_BLACK_BOLD}>{menuNameKor}</Text>
                        <Text style={Font.DEFAULT_FONT_BLACK}>{menuNameEng}</Text>
                        <Text style={[styles.chefNameText, Font.DEFAULT_FONT_ORANGE]}>{rowData.name_chef}</Text>
                        <View style={styles.starBox}>
                            <StarRating
                                ref={(rating) => {this.rating = rating;}}
                                disabled={!enableButton}
                                maxStars={5}
                                rating={rating}
                                starColor={'#FFD057'}
                                starSize={35}
                                selectedStar={(rating) => onChangeStarRating(orderDIdx,rating)}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.reviewBox} >
                    <TextInput
                        ref='textinput'
                        style={[styles.textInput, Font.DEFAULT_FONT_BLACK]} 
                        keyboardType="default" 
                        autoCorrect={false}
                        value={rowData.comment}
                        multiline={true}
                        placeholder='솔직한 리뷰는, 플레이팅을 더 맛있게 합니다 :)'
                        onChange={(event) => onChangeTextInputComment(orderDIdx, event.nativeEvent.text)}
                    />
                </View>
                <TouchableHighlight 
                    underlayColor={'transparent'}
                    onPress={ () => { this.submitReview(orderDIdx, enableButton);  onChangeSubmitProperty(); } }
                >
                    <View style={[styles.buttonBox, enableButtonBackground]}>
                        <Text style={Font.DEFAULT_FONT_WHITE}>리뷰 저장</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    enableEmptySections={true}
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
        padding: normalize(16),
    },
    menuBox: {
        flexDirection: 'row',
        height: normalize(120),
    },
    menuImage: {
        width: normalize(120),
        height: normalize(120),
    },
    menuInfoBox: {
        flex: 1,
        marginLeft: 10,
    },
    chefNameText: {
        marginTop: 10,
    },
    starBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    starImage: {
        width: normalize(40),
        height: normalize(40),
    },
    reviewBox: {
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: Color.PRIMARY_BACKGROUND,
        overflow: 'hidden',
        height: normalize(70),
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
    },
    buttonBox: {
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        height: normalize(40),
        alignItems: 'center',
        justifyContent: 'center',
    },
});
