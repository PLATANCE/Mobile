import React, { View, ListView, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Color from '../../const/Color';
import Const from '../../const/Const';
import { Font, normalize } from '../../const/Font';
import Mixpanel from '../../util/mixpanel';


export default class MyOrderList extends React.Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(props.orders),
            editReview: props.editReview,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.orders !== this.props.orders) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.orders)
            })
        }
    }

    renderRow(rowData) {
        const orderIdx = rowData.order_idx;
        const {
            changeEditReviewProperty
        } = this.props;
        
        return (   
            <TouchableHighlight 
                onPress={() => Actions.OrderDetailPage({ orderIdx: orderIdx })} 
                underlayColor={'transparent'} 
            >
                <View style={styles.row}>
                    <View>
                        <Text style={Font.DEFAULT_FONT_BLACK}>{rowData.request_date}</Text>
                        <Text style={[styles.addressText, Font.DEFAULT_FONT_BLACK]}>{rowData.address}</Text>
                        <Text style={Font.DEFAULT_FONT_BLACK}>{rowData.address_detail}</Text>
                    </View>
                    <View style={styles.footerBox}>
                        <Text style={Font.DEFAULT_FONT_BLACK}>{rowData.time_slot}</Text>
                        <View style={styles.buttonBox}>
                            <View style={[styles.buttonWhite, { marginRight: 10 }]}>
                                <Text style={Font.DEFAULT_FONT_BLACK}>상세 보기</Text>
                            </View>
                            <TouchableHighlight  
                                onPress={ () => { Actions.WriteReviewPage({ orderIdx: orderIdx, autoPopUp: false, }); changeEditReviewProperty(); } } 
                                underlayColor={'transparent'} >
                                <View style={styles.button}>
                                    <Image style={styles.buttonIconImage}
                                        source={require('../../commonComponent/img/icon_pencil.png')}/>
                                    <Text style={Font.DEFAULT_FONT_WHITE}>리뷰 작성</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)} />
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flex: 1,
        marginBottom: normalize(10),
        backgroundColor: 'white',
        padding: normalize(16),
    },
    addressText: {
        marginTop: 10,
    },
    footerBox: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    buttonBox: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
    },
    button: {
        width: normalize(85),
        height: normalize(35),
        borderColor: Color.PRIMARY_ORANGE,
        backgroundColor: Color.PRIMARY_ORANGE,
        borderRadius: normalize(5),
        borderWidth: 1,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        flexDirection: 'row',
    },
    buttonWhite: {
        width: normalize(85),
        height: normalize(35),
        borderColor: Color.PRIMARY_GRAY,
        backgroundColor: 'white',
        borderRadius: normalize(5),
        borderWidth: 1,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        flexDirection: 'row',
    },
    buttonIconImage: {
        width: normalize(15),
        height: normalize(15),
        resizeMode: 'contain',
        marginRight: 5,
    },
});
