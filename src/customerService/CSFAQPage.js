'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';
import Font from '../const/Font';
import RequestURL from '../const/RequestURL';
import FAQList from './components/FAQList';


export default class CSFAQPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FAQ: [],
        }
    }
    componentDidMount() {
        this.fetchFAQList();
    }
    fetchFAQList() {
        fetch(RequestURL.REQUEST_FAQ_LIST)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    FAQ: responseData.FAQ,
                });
            })
            .catch((error)=> {
                console.warn(error);
            })
            .done();
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content} >
                    <View style={styles.header}>
                        <Text style={[Font.DEFAULT_FONT_BLACK_BOLD, {fontSize: 17 * Const.DEVICE_RATIO}]}>FAQ</Text>
                    </View>
                    <FAQList FAQ={this.state.FAQ} />
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
    header: {
        height: 50,
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 10,
    },
});