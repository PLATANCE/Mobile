'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Color from '../const/Color';
import Const from '../const/Const';
import { Font, normalize } from '../const/Font';
import Mixpanel from '../util/mixpanel';


export default class CSMainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewDeliveryArea: props.viewDeliveryArea,
            viewFAQ: props.viewFAQ,
            viewContact: props.viewContact,
            viewTerms: props.viewTerms,
        }
    }
    componentWillUnmount() {
        Mixpanel.trackWithProperties(
            '(Screen) Support',
            {
                viewDeliveryArea: this.state.viewDeliveryArea,
                viewFAQ: this.state.viewFAQ,
                viewContact: this.state.viewContact,
                viewTerms: this.state.viewTerms,
            }
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content} >
                    <TouchableHighlight 
                        onPress={ () => { Actions.CSAddressCoveragePage(); this.setState({ viewDeliveryArea: true, }) } } 
                        underlayColor={'transparent'}
                    >
                        <View style={styles.row} >
                            <Text style={[styles.textBlack, Font.DEFAULT_FONT_BLACK]}>배달 가능 지역</Text>
                            <Image style={styles.img}
                                source={require('../commonComponent/img/icon_input.png')}/>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        onPress={ () => { Actions.CSFAQPage(); this.setState({ viewFAQ: true, }) } } 
                        underlayColor={'transparent'}
                    >
                        <View style={styles.row} >
                            <Text style={[styles.textBlack, Font.DEFAULT_FONT_BLACK]}>FAQ</Text>
                            <Image style={styles.img}
                                source={require('../commonComponent/img/icon_input.png')}/>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        onPress={ () => { Actions.CSEnquiryPage(); this.setState({ viewContact: true, }) } } 
                        underlayColor={'transparent'}
                    >
                        <View style={styles.row} >
                            <Text style={[styles.textBlack, Font.DEFAULT_FONT_BLACK]}>문의하기</Text>
                            <Image style={styles.img}
                                source={require('../commonComponent/img/icon_input.png')}/>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        onPress={ () => { Actions.CSPolicyPage(); this.setState({ viewTerms: true, }) } } 
                        underlayColor={'transparent'}
                    >
                        <View style={styles.row} >
                            <Text style={[styles.textBlack, Font.DEFAULT_FONT_BLACK]}>이용약관</Text>
                            <Image style={styles.img}
                                source={require('../commonComponent/img/icon_input.png')}/>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        onPress={ () => { Actions.PlatingPage(); this.setState({ viewTerms: true, }) } } 
                        underlayColor={'transparent'}
                    >
                        <View style={styles.row} >
                            <Text style={[styles.textBlack, Font.DEFAULT_FONT_BLACK]}>Plating 이란?</Text>
                            <Image style={styles.img}
                                source={require('../commonComponent/img/icon_input.png')}/>
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
    },
    row: {
        marginBottom: 1,
        padding: normalize(16),
        flexDirection: 'row',
        alignItems: 'center',
        height: normalize(50),
        borderColor: Color.PRIMARY_GRAY,
        backgroundColor: 'white',
    },
    textBlack: {
        flex: 1,
    },
    img: {
        width: normalize(10),
        height: normalize(10),
    }
});