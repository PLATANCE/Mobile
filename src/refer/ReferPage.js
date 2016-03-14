'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';

export default class ReferPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageBox}>
                    <Image style={styles.referImage}
                        source={{uri: this.props.url}} />
                </View>
                <View style={styles.codeBox}>
                    <View style={styles.codeTextBox}>
                        <Text style={styles.codeText}>{this.props.userCode}</Text>
                    </View>
                    <View style={styles.detailTextBox}>
                        <Text style={styles.textWhite}>친구가 첫 주문을 하면</Text>
                        <Text style={styles.textWhite}>나에게도 10,000원이 바로 적립!
                            <Text style={styles.textDetail}>자세히</Text></Text>
                    </View>
                </View>
                <View style={styles.methodBox}>
                    <View style={styles.method}>
                        <Image style={styles.methodImage}
                            source={require('./img/refer_kakao_icon.png')}/>
                        <Text>카카오톡</Text>
                    </View>
                    <View style={styles.method}>
                        <Image style={styles.methodImage}
                            source={require('./img/refer_sms_icon.png')}/>
                        <Text>문자</Text>
                    </View>
                    <View style={styles.method}>
                        <Image style={styles.methodImage}
                            source={require('./img/refer_url_icon.png')}/>
                        <Text>URL 복사</Text>
                    </View>
                </View>    
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Const.MARGIN_TOP,
    },
    imageBox: {
        flex: 5,
    },
    referImage: {
        flex: 1,
    },
    codeBox: {
        flex: 3,
        backgroundColor: Color.REFER_BACKGROUND
    },
    codeTextBox: {
        borderWidth: 3,
        borderColor: Color.PRIMARY_ORANGE,
        flex: 2,
        marginTop: 20,
        marginBottom: 0,
        marginLeft: 100,
        marginRight: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    codeText: {
        color: Color.PRIMARY_ORANGE,
        fontSize: 50,
        fontWeight: 'bold',
    },  
    detailTextBox: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textWhite: {
        color: 'white',
        fontSize: 18,
    },
    textDetail: {
        color: Color.PRIMARY_ORANGE,
        textDecorationLine: 'underline',
    },
    methodBox: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    method: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    methodImage: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
    }
});