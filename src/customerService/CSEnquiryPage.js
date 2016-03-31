'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import Communications from 'react-native-communications';

import Color from '../const/Color';
import Const from '../const/Const';

export default class CSEnquiryPage extends React.Component {
    chatKakao() {
        console.log("카카오톡 채팅하기");
    }
    contactPhone() {
        //070-7777-6114
        console.log("전화걸기");
        Communications.text('070-7777-6114')
    }
    sendMail() {
        console.log("메일 보내기");
        Communications.email('contact@plating.co.kr', null, null, '문의하기', '');
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content} >
                    <TouchableHighlight onPress={this.chatKakao} underlayColor={'transparent'}>
                        <View style={styles.row} >
                            <Image style={styles.img} 
                                source={require('../commonComponent/img/icon_left_meal.png')}/>
                            <Text style={styles.text}>카카오톡 채팅하기</Text>
                        </View>
                    </TouchableHighlight> 
                    <TouchableHighlight onPress={this.contactPhone} underlayColor={'transparent'}>
                        <View style={styles.row} >
                            <Image style={styles.img} 
                                source={require('../commonComponent/img/icon_left_meal.png')}/>
                            <Text style={styles.text}>전화걸기</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.sendMail} underlayColor={'transparent'}>
                        <View style={styles.row} >
                            <Image style={styles.img} 
                                source={require('../commonComponent/img/icon_left_meal.png')}/>
                            <Text style={styles.text}>메일 보내기</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.PRIMARY_BACKGROUND,
        marginTop: Const.MARGIN_TOP,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    row: {
        marginTop: 10,
        backgroundColor: 'white',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    text: {
        fontSize: 20,
        color: Color.PRIMARY_BLACK,
        marginLeft: 10,
    },
    img: {
        width: 30,
        height: 30,
    }
});
